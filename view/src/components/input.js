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
          //           defaultValue="L:1/16
          // M:3/4
          // K:none
          // D,4 D,E,F,^G, z4 | E12 |]"
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

        {/* <button type="submit">Render</button> */}
      </div>
    );
  }
}
export default withStyles(styles)(inputabc);
