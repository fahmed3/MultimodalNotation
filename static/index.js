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
      //   clickListener: clickListener,
    },
    selectionChangeCallback: selectionChangeCallback,
  });
};

var lastNote = [];

function selectionChangeCallback(start, end) {
  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);

    if (!el) return;

    //abcjs source code
    var lastClicked = el.midiPitches;
    if (!lastClicked) return; // returns when play button hasnt been pressed yet
    // synth not initialized yet?

    // if (lastClicked != lastNote) {
    //only plays if cursor moves to new note

    console.log(lastClicked);
    ABCJS.synth
      .playEvent(
        lastClicked,
        el.midiGraceNotePitches,
        abcjsEditor.millisecondsPerMeasure()
      )
      .then(function (response) {
        console.log("note played");
        lastNote = lastClicked;
      })
      .catch(function (error) {
        console.log("error playing note", error);
      });
    // }
  }
}
