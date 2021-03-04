import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Typography, Grid, Button } from "@material-ui/core";
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
import Select from "@material-ui/core/Select";
// import { PlaybackEvent } from "../../dist/PlaybackEngine";

// import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import InputABC from "../components/input";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const styles = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    borderRadius: "8px",
  },
  form: {
    margin: "70px",
  },
  grid: {
    // maxWidth: "33.33%",
    marginLeft: theme.spacing(0.25),
    padding: theme.spacing(2),
    // position: "absolute",
  },
  formControl: {
    margin: theme.spacing(1),
    top: -16,
    minWidth: 120,
  },
  selectInstrument: {},
});

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      loading: false,
      braille: null,
      musicxml: undefined,
      playActive: true,
      instruments: [],
      instrumentId: 0,
    };
    this.osmdContainer = React.createRef();
  }

  handleSubmit = (event) => {
    this.setState({ instruments: this.audioPlayer.availableInstruments });

    if (this.state.musicxml) {
      this.setState({
        playActive: true,
      });
      this.audioPlayer.stop();
    }
    if (event.target[0].value) {
      let data = { userdata: event.target[0].value };
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
      event.preventDefault();
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

  componentDidMount = () => {
    this.osmd = new OpenSheetMusicDisplay(this.osmdContainer.current);
    this.audioPlayer = new AudioPlayer();
    this.osmd.setOptions({
      backend: "svg",
      drawingParameters: "compacttight", // don't display title, composer etc., smaller margins
    });
  };

  componentWillUpdate = () => {
    if (this.state.musicxml) {
      this.audioPlayer.setInstrument(
        this.audioPlayer.scoreInstruments[0].Voices[0],
        this.state.instrumentId
      );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography component="h1" variant="h5">
              Welcome To MultiModal Notation!
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
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
                <InputABC />
              </form>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div>
                <Card variant="outlined" fullWidth>
                  <CardContent>
                    <Typography>Braille Output</Typography>
                    <Typography>{this.state.braille}</Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
          <Typography>Music XML section</Typography>
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
          <div
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
                  <InputLabel>Instruments</InputLabel>
                  {/* <div style={{ height: "210px" }}> */}
                  <Select
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
          </div>
          <br />
          <div ref={this.osmdContainer} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(home);
