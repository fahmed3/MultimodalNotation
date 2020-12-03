from flask import Flask, render_template, url_for, request, jsonify, redirect, make_response
from music21 import *
from music21.braille import translate

app = Flask(__name__)

fragment = """
L:1/16
M:3/4
K:none
D,4 D,E,F,^G, z4 | E12 |] """

txt = ""
braille = ""

# abcTextSample = converter.parse(fragment) #parseData
# braille = translate.objectToBraille(abcTextSample)


@app.route('/')
def index():
    return render_template('index.html', braille=braille)


@app.route("/data", methods=['GET', 'POST'])
def getuserinput():
    if request.method == 'GET':
        data = {"user_input":txt, "braille": braille}
        return jsonify(data)
    # POST request
    if request.method == 'POST':
        data = request.get_json()['userdata']
        convert_to_music_xml(data)
        #print(request.json())  # parse as JSON
        return 'Success', 200


def convert_to_music_xml(userinput):
    try:
        abcTextSample = converter.parse(userinput) #parseData
        global braille
        braille = translate.objectToBraille(abcTextSample)
        GEX = musicxml.m21ToXml.GeneralObjectExporter(abcTextSample)
        out = GEX.parse()  # out is bytes
        outStr = out.decode('utf-8')  # now is string
        global txt
        txt = outStr.strip()
    except:
        error = 'Converter was not able to parse, you inputted: "{}"'.format(userinput)
        print(error)


if __name__ == '__main__':
    app.debug = True
    app.run()