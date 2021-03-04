from flask import Flask, render_template, request, jsonify
from music21 import converter, musicxml
from music21.braille import translate

app = Flask(__name__)

fragment = """
L:1/16
M:3/4
K:none
D,4 D,E,F,^G, z4 | E12 |] """

mxml = ""
braille = ""
errors = ""


@app.route('/')
def index():
    return render_template('index.html')


# data will be used to store user input and
# its output to transfer to and from index.js
@app.route("/data", methods=['GET', 'POST'])
def getuserinput():
    # send the converted input to /data when there is a GET request
    if request.method == 'GET':
        data = {"user_input": mxml, "braille": braille, "errors": errors}
        return jsonify(data)

    # POST request
    # Accept POST request, used to take the user input from index.js
    if request.method == 'POST':
        data = request.get_json()['userdata']  # change to less vague name

        # Convert user input to the output
        convert_to_music_xml(data)

        return 'Success', 200


# Converts user input to music XML and braille notation and
# updates global variables
# TODO - Experiment with warnings (e.g. note cannot show up in braille)
def convert_to_music_xml(userinput):
    global errors
    global mxml
    global braille  
    try:
        # print("convert_to_musicxml")
        abcTextSample = converter.parse(userinput)
        braille = translate.objectToBraille(abcTextSample)
        GEX = musicxml.m21ToXml.GeneralObjectExporter(abcTextSample)
        out = GEX.parse()  # out is bytes
        outStr = out.decode('utf-8')  # now is string
        mxml = outStr.strip()
        errors = ""
        
    # Error Handling
    # Index Error - receives empty string
    # converter.ConverterException - not abcNotation
    # abcFormat.ABCHandlerException
    except IndexError:  # Occurs when the user inputs nothing

        ###### there is a check in home.js to see if input field is blank that
        ###### keeps this stuff from being called

        ###### anyway setting them back to "" is a bad fix
        ###### find a way to reset the json server theyre sent to every render
        ###### or how to actually pass input directly to getuserinput(), no global variables

        error = 'Converter cannot parse, you inputted: "{}"'.format(userinput)
        print(error)
        mxml = ""
        braille = ""
        errors = error

    # Send some kind of feedback to the user
    except converter.ConverterException:
        error = "invalid syntax. unable to convert"
        print(error)
        mxml = ""
        braille = ""
        errors = error


if __name__ == '__main__':
    app.debug = True
    app.run()
