from flask import Flask, render_template, request, jsonify
from music21 import converter, musicxml
from music21.braille import translate

app = Flask(__name__, static_folder='./view/build', static_url_path='/')


braille = ""
fragment = """
L:1/16
M:3/4
K:none
D,4 D,E,F,^G, z4 | E12 |]
"""

# @app.route('/')
# def index():
#     return render_template('editor-synth.html')

@app.route("/data", methods=['GET', 'POST'])
def getuserinput():
    if request.method == 'GET':
        data = {"braille": braille}
        return jsonify(data)
    if request.method == 'POST':
        data = request.get_json()['userdata']  # change to less vague name
        print("received data: ", data)
        # Convert user input to the output
        convert_to_braille(data)
        return 'Success', 200


def convert_to_braille(userinput):
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
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 5000))
    app.debug = True
    # app.run()

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')