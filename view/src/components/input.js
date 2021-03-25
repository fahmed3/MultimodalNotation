import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Typography, Grid, Button } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";

import withStyles from "@material-ui/core/styles/withStyles";
const styles = (theme) => ({});

class inputabc extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
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
          // onKeyPress={this.handleKeyPress}
          defaultValue="L:1/8 
          M:4/4 
          K:Bbmaj 
          Q:1/4=128
          g,g,f,f,C z1/2,F1/2,b,c',B z1/2,B z1/2,f,F z1/2,F z1/2,E,g2,g2,e,e,g,b,G z1/2,G z1/2,g,e',d',e',.D' g,g,f,f,C z1/2,F1/2,b,c',B z1/2,B z1/2,f,F z1/2,F z1/2,E,g2,g2,e,e,g,b,G z1/2,G z1/2,g,e',d',e', D' |]"
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          startIcon={<ReplayIcon />}
          color="primary"
        >
          <div style={{ margin: "2.5px" }}>Render</div>
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(inputabc);
