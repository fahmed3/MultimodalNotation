import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Typography, Grid, Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import { Dialog } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";

import withStyles from "@material-ui/core/styles/withStyles";

import clsx from "clsx";
import axios from "axios";

import * as ABCJS from "../abcjs/abcjs-basic";
import "../abcjs/abcjs-audio.css";

import Tutorial from "../components/tutorial";

import "./home.css";

import QuickStart from "../components/quickStart";

import styles from "./homeStyles";

const Home = (props) => {
  const { classes } = props;
  const [abcjsEditor, setAbcjsEditor] = useState(null);
  const [braille, setBraille] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currabc, setCurrabc] = useState("");
  const [isSpace, setIsSpace] = useState(false);
  const [tune, setTune] = useState({});
  const [loadingBraille, setLoadingBraille] = useState(false);

  const containerRef = useRef();
  const { current } = containerRef;
  let history = useHistory();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleTutorialChange = () => {
    setDrawerOpen(!showTutorial);
  };

  let form = document.getElementById("formID");
  let textinput = document.getElementById("abc");

  const handleFormSubmit = (event, isArr = true) => {
    event.preventDefault();
    setLoadingBraille(true);
    let data;
    if (isArr) {
      data = { userdata: event.target[0].value };
    } else {
      data = { userdata: event.target.value };
    }

    axios({
      method: "post",
      data: JSON.stringify(data),
      url: "https://backend-multimodal.herokuapp.com/data",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoadingBraille(false);
        if (response.data.error.length > 0) {
          console.log("Error: ", response.data.error);
        } else {
          console.log("Braille: ", response.data.braille);
          setBraille(response.data.braille);
        }
      })
      .catch((err) => console.log(err));
  };

  const keydownHandler = (event) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      handleFormSubmit(event, false);
    }
    if (event.keyCode === 48 && event.ctrlKey) {
      document.getElementsByClassName("abcjs-midi-start abcjs-btn")[0].click();
    }
    if (event.keyCode === 191 && event.ctrlKey) {
      document.getElementsByClassName("abcjs-midi-reset abcjs-btn")[0].click();
    }
    if (event.keyCode === 190 && event.ctrlKey) {
      document.getElementsByClassName("abcjs-midi-loop abcjs-btn")[0].click();
    }
  };

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
          afterParsing: afterParsingCallback,
        },
        selectionChangeCallback: selectionChangeCallback,
      })
    );
  }, [current]);

  const handleTextChange = (event) => {
    setIsSpace(event.keyCode === 32);
    setCurrabc(event.target.value);
  };

  const handlePageChange = () => {
    history.push("/tutorial");
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
      .then(function (response) {})
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

  if (textinput) {
    var initabc = textinput.value.split(" ").join("");
  }

  function afterParsingCallback(tune, tuneNumber, abcString) {
    setTune(tune);
    if (abcjsEditor) {
      var start = abcjsEditor.editarea.getSelection().start - 1;
      var el = tune.getElementFromChar(start);

      setCurrabc(abcjsEditor.currentAbc.split(" ").join(""));

      if (
        abcString.substring(
          abcjsEditor.editarea.getSelection().start - 1,
          abcjsEditor.editarea.getSelection().end
        ) === " "
      ) {
        return;
      }
      if (initabc.length >= abcString.length || !el) {
        // if deleting and adding at same time (replaces highlighted text w/ new letter), ignores adding - fix later
        initabc = abcString;
        return;
      }
      initabc = abcString;
      setTimeout(() => {
        var lastClicked = el.midiPitches;
        if (!lastClicked) return;

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
    }
  }

  /*defaultValue="
  L:1/8
  M:4/4
  K:Bbmaj
  Q:1/4=128
  G G F F C z1/2 F1/2, B c | B z1/2 B z1/2 F F z1/2 F z1/2 E, | G2 G2 E E G B | G z1/2 G z1/2 G e d e .d |]
  "
*/
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
              MultiModal Notation
            </Typography>
            <div
              style={{
                position: "absolute",
                right: "2%",
                top: "20%",
              }}
            >
              <Button
                variant="outlined"
                className="tutorial-button"
                color="inherit"
                onClick={handlePageChange}
              >
                Tutorial
              </Button>
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
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <div className={drawerOpen ? classes.shift : null}>
            <div>
              <Grid container direction="row" style={{ display: "flex" }}>
                <Grid item>
                  <form id="formID" onSubmit={handleFormSubmit}>
                    <textarea
                      ref={containerRef}
                      className={classes.textArea}
                      id="abc"
                      cols="80"
                      rows="15"
                      spellCheck="false"
                      onKeyDown={keydownHandler}
                      onChange={handleTextChange}
                      placeholder="Input ABC Notation here..."
                    ></textarea>
                    <br />

                    <Button
                      type="submit"
                      variant="outlined"
                      className={classes.renderButton}
                    >
                      Render
                    </Button>
                  </form>
                </Grid>
                <Grid item>
                  <div>
                    <Card
                      variant="outlined"
                      fullWidth
                      // className={classes.braille}
                      tabindex="0"
                    >
                      <CardContent style={{ width: "500px" }}>
                        <Typography>Braille Output</Typography>
                        {!loadingBraille ? (
                          <Typography>{braille}</Typography>
                        ) : (
                          <LinearProgress />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              </Grid>

              <Typography id="warnings"></Typography>

              {/* {errors ? (
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
              )} */}
            </div>
            <div id="paper"></div>
            <div id="audio"></div>

            {/* document.getElementsByClassName('abcjs-midi-start abcjs-btn')[0].click(); */}
          </div>
        </div>
      </main>
    </div>
  );
};
export default withStyles(styles)(Home);
