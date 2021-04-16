let form = document.getElementById("formID");
// let braille_sect = document.getElementById("brailleSection");
let textinput = document.getElementById("abc");
// textinput.addEventListener("keydown", keydownCallback);


form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = { userdata: textinput.value };
  console.log(data);
  fetch("/data", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then(() => {
    //click play button to start audio playback, same button to pause
    document.getElementsByClassName('abcjs-midi-start abcjs-btn')[0].click();
  })
  .catch((e) => console.log(e));
});

var abcjsEditor;

window.onload = function () {
  abcjsEditor = new ABCJS.Editor("abc", {
    canvas_id: "paper",
    warnings_id: "warnings",
    synth: {
      el: "#audio",
      options: {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      },
    },
    abcjsParams: {
      add_classes: true,
      clickListener: clickListener,
      afterParsing: afterParsingCallback,
    },
    selectionChangeCallback: selectionChangeCallback,
    // onchange: onchangeCallback,
  });
};


function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) {
  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches,
      abcjsEditor.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log("note played");
    })
    .catch(function (error) {
      console.log("error playing note", error);
    });
}

function selectionChangeCallback(start, end) {
  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    if (!el) return;
  }
}


var initabc = textinput.value.split(" ").join("");

function afterParsingCallback(tune, tuneNumber, abcString){
  // console.log("tune", tune);
  if(abcjsEditor){

    // console.log("abcjseditor ", abcjsEditor);
    var start = abcjsEditor.editarea.getSelection().start - 1;

    var el = tune.getElementFromChar(start);

    var currabc = abcjsEditor.currentAbc.split(" ").join("");

    console.log("current abc: ", currabc);
    console.log("initial abc: ", initabc);

    if(initabc.length >= currabc.length || !el){ // if deleting and adding at same time (replaces highlighted text w/ new letter), ignores adding - fix later
      initabc = currabc;
      return;
    }
    initabc = currabc;

    setTimeout(() => {
    var lastClicked = el.midiPitches;
    // console.log("last", Object.keys(el));
    if (!lastClicked) return;
    // console.log("hello");

    ABCJS.synth
      .playEvent(
        lastClicked,
        el.midiGraceNotePitches,
        abcjsEditor.millisecondsPerMeasure()
      )
      .then(function (response) {
        console.log("note played");
      })
      .catch(function (error) {
        console.log("error playing note", error);
      });
    }, 300);    
    initabc = currabc;
  }
  
}