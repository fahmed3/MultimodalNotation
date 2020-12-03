let form = document.getElementById("formid");
let braille_sect = document.getElementById("brailleSection");
let musicxml = "";
let textinput = document.getElementById("textinput");
let btn = document.getElementsByTagName("button")[0];

Mousetrap.bindGlobal('alt+r', function(e) {
  btn.click();
})

var openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay(
  "osmdContainer"
);
openSheetMusicDisplay.setOptions({
  backend: "svg",
  drawingParameters: "compacttight", // don't display title, composer etc., smaller margins
});

//ADD DOCUMENTATION TO GITHUB
form.addEventListener("submit", (event) => {
  let data = { userdata: textinput.value };
  fetch("/data", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("Request complete! response:", res);
    fetch("/data")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        musicxml = response["user_input"];
        braille = response["braille"];
        openSheetMusicDisplay.load(musicxml).then(function () {
          openSheetMusicDisplay.render();
        });

        braille_sect.innerHTML = braille;
      })
      .catch((e) => console.log(e));
  });

  event.preventDefault();
});