let textinput = document.getElementById("textinput");
let musicxml = "";

var renderScore = function () {
  let text_notation = textinput.value;
  console.log("function worked: ", text_notation);
};

var openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay(
  "osmdContainer"
);
openSheetMusicDisplay.setOptions({
  backend: "svg",
  drawTitle: true,
  // drawingParameters: "compacttight" // don't display title, composer etc., smaller margins
});

fetch("/xmldata")
  .then(function (response) {
    return response.json();
  })
  .then(function (text) {
    console.log("Response: ");
    console.log(text);
    musicxml = text.abcNotation;
    openSheetMusicDisplay.load(musicxml).then(function () {
      openSheetMusicDisplay.render();
    });
  })
  .catch((e) => console.log(e));
