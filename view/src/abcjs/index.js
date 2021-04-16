let form = document.getElementById("formID");
// let braille_sect = document.getElementById("brailleSection");
let textinput = document.getElementById("abc");

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
  }).catch((e) => console.log(e));
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
    },
    selectionChangeCallback: selectionChangeCallback,
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
    console.log(el);
  }
}