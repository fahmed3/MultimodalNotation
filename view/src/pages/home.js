import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {
  Typography,
  Grid,
  Button,
  Box,
  TextareaAutosize,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ReplayIcon from "@material-ui/icons/Replay";
import withStyles from "@material-ui/core/styles/withStyles";
import { OpenSheetMusicDisplay, Voice } from "opensheetmusicdisplay";
import AudioPlayer from "osmd-audio-player";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import { Dialog } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

import * as Tone from "tone";

// import Abcjs from "react-abcjs";

import * as ABCJS from "../abcjs/abcjs-basic";
import "../abcjs/abcjs-audio.css";

// import InputABC from "../components/input";
import Tutorial from "../components/tutorial";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./home.css";
import QuickStart from "../components/quickStart";

import styles from "./homeStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = (props) => {
  const { classes } = props;
  const [errors, setErrors] = useState([]);
  const [abcjsEditor, setAbcjsEditor] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [loading, setLoading] = useState(false);
  const [braille, setBraille] = useState(null);
  const [musicxml, setMusicxml] = useState(undefined);
  const [playActive, setPlayActive] = useState(true);
  const [instruments, setInstruments] = useState([]);
  const [instrumentId, setInstrumentId] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [responsiveEditing, setResponsiveEditing] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleTutorialChange = () => {
    setDrawerOpen(!showTutorial);
  };

  // this.paper = React.createRef();
  /*
  handleSubmit = (event) => {
    this.setState({ instruments: this.audioPlayer.availableInstruments });
    console.log(typeof event);
    if (this.state.musicxml) {
      this.setState({ playActive: true });
      this.audioPlayer.stop();
    }
    if (typeof event == "string" || event.target[0].value) {
      let data;
      if (typeof event == "string") {
        data = { userdata: event };
      } else {
        data = { userdata: event.target[0].value };
      }
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
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            this.setState({
              braille: response["braille"],
              musicxml: response["user_input"],
            });

            let osmd = this.osmd;
            let audioPlayer = this.audioPlayer;
            osmd
              .load(this.state.musicxml)
              .then(function () {
                osmd.render();
              })
              .then(function () {
                audioPlayer.loadScore(osmd);
                audioPlayer.on("iteration", (notes) => {
                  // console.log(notes);
                });
              });
          })
          .catch((e) => console.log(e));
      });
      if (!(typeof event == "string")) {
        event.preventDefault();
      }
    }
  };

  handlePlay = () => {
    this.setState({ playActive: false });
    this.audioPlayer.play();
  };

  handlePause = () => {
    this.setState({ playActive: true });
    this.audioPlayer.pause();
  };

  handleStop = () => {
    this.setState({ playActive: true });
    this.audioPlayer.stop();
  };

  handleInstrumentChange = (event) => {
    this.setState({ instrumentId: event.target.value });
    this.audioPlayer.setInstrument(
      this.audioPlayer.scoreInstruments[0].Voices[0],
      event.target.value
    );
  };

 
  switchHandler = () => {
    this.setState({ responsiveEditing: !this.state.responsiveEditing });
  };

  keydownHandler = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      this.handleSubmit(event.target.value);
    }
    if (event.keyCode === 32 && this.state.responsiveEditing) {
      const synth = new Tone.Synth().toDestination();
      let note = "";
      let lastSpace = 0;
      for (
        lastSpace = event.target.selectionStart - 1;
        event.target.value.charAt(lastSpace) !== " ";
        lastSpace--
      ) {}
      note = event.target.value.substring(
        lastSpace + 1,
        event.target.selectionStart
      );
      let octave = 4;
      if (note.charAt(0) === note.charAt(0).toLowerCase()) {
        octave = 5;
      }
      for (let i = 0; i < note.length; i++) {
        if (note.charAt(i) == "'") {
          octave++;
        }
        if (note.charAt(i) == ",") {
          octave--;
        }
      }
      let noteLength = "1/8";
      if (event.target.value.includes("L:")) {
        noteLength = event.target.value.substring(
          event.target.value.indexOf("L:") + 2,
          event.target.value
            .substring(event.target.value.indexOf("L:"))
            .indexOf("\n")
        );
      }
      for (let i = 0; i < note.length; i++) {
        if (note.charAt(i) <= 9) {
          if (noteLength.includes("/")) {
            noteLength = eval(noteLength);
          }
          noteLength = noteLength * eval(note.charAt(i));
        }
      }
      noteLength = eval(noteLength) ** -1;

      // console.log(note);
      // console.log(lastSpace);
      // console.log(event.target.selectionStart);
      // console.log(octave);
      // console.log(noteLength);
      synth.triggerAttackRelease(
        note.charAt(0) + "" + octave,
        noteLength + "n"
      );
    }
  };

  // componentDidMount = () => {
  //   abcjsEditor = new ABCJS.Editor("abc", {
  //     canvas_id: "paper",
  //     warnings_id: "warnings",
  //     synth: {
  //       el: "#audio",
  //       options: {
  //         displayLoop: true,
  //         displayRestart: true,
  //         displayPlay: true,
  //         displayProgress: true,
  //         displayWarp: true,
  //       },
  //     },
  //     abcjsParams: {
  //       add_classes: true,
  //       clickListener: clickListener,
  //     },
  //     selectionChangeCallback: selectionChangeCallback,
  //   });
  //   // this.osmd = new OpenSheetMusicDisplay(this.osmdContainer.current);
  //   // this.audioPlayer = new AudioPlayer();
  //   // this.osmd.setOptions({
  //   //   backend: "svg",
  //   //   drawingParameters: "compacttight", // don't display title, composer etc., smaller margins
  //   // });
  // };

  componentWillUpdate = () => {
    if (this.state.musicxml) {
      this.audioPlayer.setInstrument(
        this.audioPlayer.scoreInstruments[0].Voices[0],
        this.state.instrumentId
      );
    }
  };*/

  // headers for key signature and all that stuff
  // Volume setting
  // Make a button to make expand the font size for the text editor
  // Try to make a TextField onChange so that when the space bar is hit that it will play the inputted note
  // Switch to make Midi editor like FL piano roll and export midi to musicXML
  // https://github.com/paulrosen/abcjs
  // https://www.npmjs.com/package/react-abcjs
  // https://cdn.rawgit.com/paulrosen/abcjs/main/examples/editor.html

  let form = document.getElementById("formID");
  // let braille_sect = document.getElementById("brailleSection");
  let textinput = document.getElementById("abc");

  const handleFormSubmit = (event, isArr = true) => {
    event.preventDefault();
    let data;
    if (isArr) {
      data = { userdata: event.target[0].value };
    } else {
      data = { userdata: event.target.value };
    }

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
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setBraille(response["braille"]);
          console.log(response["braille"]);
        })
        .catch((e) => console.log(e));
    });
  };

  const keydownHandler = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      console.log(event);
      handleFormSubmit(event, false);
    }
  };

  const print = () => {
    window.print();
  };

  // window.onload = function () {
  //   abcjsEditor = new ABCJS.Editor("abc", {
  //     canvas_id: "paper",
  //     warnings_id: "warnings",
  //     synth: {
  //       el: "#audio",
  //       options: {
  //         displayLoop: true,
  //         displayRestart: true,
  //         displayPlay: true,
  //         displayProgress: true,
  //         displayWarp: true,
  //       },
  //     },
  //     abcjsParams: {
  //       add_classes: true,
  //       clickListener: clickListener,
  //     },
  //     selectionChangeCallback: selectionChangeCallback,
  //   });
  // };

  useEffect(() => {
    setAbcjsEditor(
      new ABCJS.Editor("abc", {
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
      })
    );
  }, []);

  const handleTextChange = () => {
    console.log(errors);
    setErrors(abcjsEditor.warnings);
    console.log(abcjsEditor);
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

  // function selectionChangeCallback(start, end) {
  //   if (abcjsEditor) {
  //     var el = abcjsEditor.tunes[0].getElementFromChar(start);
  //     if (!el) return;
  //     console.log(el);
  //   }
  // }

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
    }
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={drawerOpen ? classes.shift : null}>
            <Typography component="h1" variant="h5">
              Welcome To MultiModal Notation!
            </Typography>
            <div
              style={{
                position: "absolute",
                right: "2%",
                top: "20%",
              }}
            >
              <Link to="/tutorial" className="nav-link">
                <Button
                  variant="outlined"
                  className="tutorial-button"
                  color="inherit"
                  // onClick={this.handleTutorialChange.bind(this)}
                >
                  {/* Tutorial */}
                  Tutorial
                </Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h5">
            <b>Quick Reference Guide</b>
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <QuickStart />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.root}>
          <center>
            <Dialog
              onClose={handleTutorialChange}
              maxWidth={"lg"}
              fullWidth
              TransitionComponent={Transition}
              open={showTutorial}
            >
              <IconButton
                className={classes.closeButton}
                edge="start"
                color="inherit"
                onClick={handleTutorialChange}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Tutorial />
            </Dialog>
          </center>
          {/* 
          <Grid
            container
            spacing={1}
            className={classes.grid}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={6}>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                  <TextField
                    id="textinput"
                    variant="outlined"
                    label="ABCNotation"
                    name="abcnotation"
                    margin="normal"
                    multiline
                    rows={10}
                    rowsMax={25}
                    fullWidth
                    onKeyDown={this.keydownHandler.bind(this)}
                    // onKeyPress={this.handleKeyPress.bind(this)}
                    defaultValue="L:1/8 
                    M:4/4 
                    K:Bbmaj 
                    Q:1/4=128
                    G G F F C z1/2 F1/2, B c | B z1/2 B z1/2 F F z1/2 F z1/2 E, | G2 G2 E E G B | G z1/2 G z1/2 G e d e .d |]"
                  />
                  <br />
                  <Grid container direction="row">
                    <Grid item>
                      <Button
                        type="submit"
                        // onClick={this.handleSubmit.bind(this)}
                        variant="contained"
                        startIcon={<ReplayIcon />}
                        color="primary"
                        ref={(node) => (this.btn = node)}
                      >
                        <div style={{ margin: "2.5px" }}>Render</div>
                      </Button>
                    </Grid>
                    <Grid
                      item
                      style={{
                        marginTop: "7px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography style={{ fontSize: "18.5px" }}>
                        Responsive Editing
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Switch
                        checked={this.state.responsiveEditing}
                        onChange={this.switchHandler.bind(this)}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </Grid>
                  </Grid> */}
          {/* <button type="submit">Render</button> */}
          {/* </div>
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <Card variant="outlined" fullWidth className={classes.braille}>
                  <CardContent>
                    <Typography>Braille Output</Typography>
                    <Typography>{this.state.braille}</Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
          <div style={{ margin: "1.69%" }}>
            <Typography>Music XML section</Typography> */}
          {/* L:1/8 
M:4/4 
K:none 
Q:1/4=128
g,g,f,f,C z1/2,F1/2,^a,c',^A z1/2,^A z1/2,f,F z1/2,F z1/2,^D,g2,g2,^d,^d,g,^a,G z1/2,G z1/2,g,^d',d',^d',D' |] 

L:1/8 
M:4/4 
K:Bbmaj 
Q:1/4=128
g,g,f,f,C z1/2,F1/2,b,c',B z1/2,B z1/2,f,F z1/2,F z1/2,E,g2,g2,e,e,g,b,G z1/2,G z1/2,g,e',d',e',.D' g,g,f,f,C z1/2,F1/2,b,c',B z1/2,B z1/2,f,F z1/2,F z1/2,E,g2,g2,e,e,g,b,G z1/2,G z1/2,g,e',d',e',D' |]*/}
          {/* <div
              className="controls"
              style={
                this.state.musicxml ? { display: "block" } : { display: "none" }
              }
            >
              <Grid container>
                <Grid item>
                  <Button
                    style={
                      this.state.playActive
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                    variant="outlined"
                    id="btn-play"
                    startIcon={<PlayArrowIcon />}
                    onClick={this.handlePlay.bind(this)}
                  >
                    <div style={{ margin: "2.5px" }}>Play</div>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    style={
                      this.state.playActive
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                    variant="outlined"
                    id="btn-pause"
                    startIcon={<PauseIcon />}
                    onClick={this.handlePause.bind(this)}
                  >
                    <div style={{ margin: "2.5px" }}>Pause</div>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    id="btn-stop"
                    startIcon={<StopIcon />}
                    onClick={this.handleStop.bind(this)}
                  >
                    <div style={{ margin: "2.5px" }}>Stop</div>
                  </Button>
                </Grid>
                <Grid>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Instruments</InputLabel> */}
          {/* <div style={{ height: "210px" }}> */}
          {/* <Select
                      className={classes.selectInstrument}
                      onChange={this.handleInstrumentChange.bind(this)}
                    >
                      {this.state.instruments.map((instrument) => (
                        <MenuItem value={instrument.midiId}>
                          {instrument.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div> */}
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <div className={drawerOpen ? classes.shift : null}>
            <div className="container">
              <form id="formID" onSubmit={handleFormSubmit}>
                <textarea
                  className={classes.textArea}
                  id="abc"
                  cols="80"
                  rows="15"
                  spellCheck="false"
                  onKeyDown={keydownHandler}
                  onChange={handleTextChange}
                  defaultValue={
                    "L:1/16 \nM:3/4 \nK:none \nQ:1/4=128 \nD,4 D,E,F,^G, z4 | E12 |]"
                  }
                ></textarea>
                <br />

                <Button
                  type="submit"
                  variant="outlined"
                  className={classes.renderButton}
                >
                  Render
                </Button>
                <Button
                  variant="outlined"
                  onClick={print}
                  className={classes.renderButton}
                >
                  Print
                </Button>
              </form>
              {/* <div id="warnings"></div> */}
              {errors ? (
                errors.map((error, i) => (
                  <div key={i}>
                    <div>
                      <Alert severity="error" open={true}>
                        <AlertTitle>Error</AlertTitle>
                        {error}
                      </Alert>
                    </div>
                  </div>
                ))
              ) : (
                <Typography></Typography>
              )}

              <div id="paper"></div>
              <div id="audio"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default withStyles(styles)(Home);
