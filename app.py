from flask import Flask, request, jsonify
from music21 import converter #, musicxml
from music21.braille import translate
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Accept POST request, takes user input from text editor and returns braille output or errors
@app.route("/data", methods=['GET', 'POST'])
def getuserinput():
    if request.method == 'POST':
        # change to less vague name like textinput
        data = request.get_json()['userdata']
        # Convert user input to the output
        error = ""
        braille = ""
        try:
            abcTextSample = converter.parse(data)
            braille = translate.objectToBraille(abcTextSample)
        except IndexError:  # Occurs when the user inputs nothing
            error = 'Converter cannot parse empty string'
        except converter.ConverterException:
            error = "Invalid syntax. Unable to convert."
        send_data = {"braille": braille, "error": error}
        return jsonify(send_data)
if __name__ == '__main__':
    app.debug = True
    app.run()