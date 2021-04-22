from flask import Flask, render_template, request, jsonify
from music21 import converter, musicxml
from music21.braille import translate

app = Flask(__name__)

braille = ""
fragment = """
L:1/16
M:3/4
K:none
D,4 D,E,F,^G, z4 | E12 |]
"""

@app.route('/')
def index():
    return render_template('editor-synth.html', braille=braille)

@app.route("/data", methods=['GET', 'POST'])
def getuserinput():
    if request.method == 'GET':
        return "get request"
    if request.method == 'POST':
        data = request.get_json()['userdata']  # change to less vague name
        # print("received data: ", data)
        # Convert user input to the output
        convert_to_music_xml(data)
        return 'Success', 200


def convert_to_music_xml(userinput):
    global braille  
    try:
        # print("convert_to_musicxml")
        abcTextSample = converter.parse(userinput)
        braille = translate.objectToBraille(abcTextSample)
        print("Braille output: ", braille)

    # Send some kind of feedback to the user
    except converter.ConverterException as e:
        print(e)
        error = "invalid syntax. unable to convert"
        print(error)
        braille = ""

if __name__ == '__main__':
    app.debug = True
    app.run()
