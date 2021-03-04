let form = document.getElementById("formid");
let braille_sect = document.getElementById("brailleSection");
let error_sect = document.getElementById("errorSection");
let musicxml = "";
let textinput = document.getElementById("textinput");
let btn = document.getElementsByTagName("button")[0];

//Keyboard shortcut, press alt+r to render output
Mousetrap.bindGlobal("alt+r", function (e) {
  btn.click();
});

var audioPlayer = new OsmdAudioPlayer(); //OsmdAudioPlayer.AudioPlayer()

//Open Sheet Music Display used to render sheet music from music xml
var openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay(
  "osmdContainer"
);
openSheetMusicDisplay.setOptions({
  backend: "svg",
  drawingParameters: "compacttight", // don't display title, composer etc., smaller margins
});

// On form submit, we post the user input to /data,
// allowing the POST request to be processed in app.py,
// and we use a then statement to wait for a successful request.
form.addEventListener("submit", (event) => {
  let data = { userdata: textinput.value };
  fetch("/data", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    // The POST request should result in updated global variables mxml and braille
    // in app.py that get posted to /data
    // We get the data with a GET request
    // /data now contains {user_input:mxml, braille:braille}
    .then((res) => {
      console.log("Request complete! response:", res);
      fetch("/data")
        .then(function (response) {
          return response.json();
        })
        // Convert musicxml to sheet music and display on the page
        // Updated the braille
        .then(function (response) {
          musicxml = response["user_input"];
          braille = response["braille"];
          errors = response["errors"];
          if (musicxml.length > 0) {
            openSheetMusicDisplay
              .load(musicxml)
              .then(function () {
                openSheetMusicDisplay.render();
              })
              .then(function () {
                registerButtonEvents(audioPlayer);
                audioPlayer.loadScore(openSheetMusicDisplay);
                audioPlayer.on("iteration", (notes) => {
                  console.log(notes);
                });
              });
          }
          braille_sect.innerHTML = braille;
          error_sect.innerHTML = errors;
        })
        .catch((e) => console.log(e));
    });

  event.preventDefault();
});

function registerButtonEvents(audioPlayer) {
  document.getElementById("btn-play").addEventListener("click", () => {
    if (audioPlayer.state === "STOPPED" || audioPlayer.state === "PAUSED") {
      audioPlayer.play();
    }
  });
  document.getElementById("btn-pause").addEventListener("click", () => {
    if (audioPlayer.state === "PLAYING") {
      audioPlayer.pause();
    }
  });
  document.getElementById("btn-stop").addEventListener("click", () => {
    if (audioPlayer.state === "PLAYING" || audioPlayer.state === "PAUSED") {
      audioPlayer.stop();
    }
  });
}
