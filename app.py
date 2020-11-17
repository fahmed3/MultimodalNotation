from flask import Flask, render_template, url_for, request, jsonify, redirect
from music21 import *
from music21.braille import translate

app = Flask(__name__)

fragment = """
L:1/16
M:3/4
K:none
D,4 D,E,F,^G, z4 | E12 |] """

txt = ""

abcTextSample = converter.parse(fragment) #parseData
braille = translate.objectToBraille(abcTextSample)

s1 = stream.Stream()
s1.append(note.Note('C#4', type='half'))
s1.append(note.Note('D5', type='quarter'))
# for thisNote in s1.notes:
#     print(thisNote.octave)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def results():
    global txt
    txt = request.form['userinput']
    abcTextSample = converter.parse(txt) #parseData
    GEX = musicxml.m21ToXml.GeneralObjectExporter(abcTextSample)
    out = GEX.parse()  # out is bytes
    outStr = out.decode('utf-8')  # now is string
    txt = outStr.strip()
    # except:
    #     txt = 'Converter was not able to parse, you inputted: "{}"'.format(txt)
    return redirect(url_for('index'))

@app.route("/xmldata")
def xml():
    return jsonify({'abcNotation' : txt})

if __name__ == '__main__':
    app.debug = True
    app.run()