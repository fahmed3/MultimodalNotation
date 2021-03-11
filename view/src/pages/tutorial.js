import React, { Component } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ReplayIcon from "@material-ui/icons/Replay";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import './tutorial.css';
import InputABC from "../components/input";


const styles = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    borderRadius: "8px",
  },

});

class Tutorial extends Component{

    constructor(props) {
        super(props);
        this.osmdContainer = React.createRef();
    }


    render(){
        const { classes } = this.props;
        return(
            <div className="container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography component="h1" variant="h5">
                            A Short Tutorial on ABC Notation
                        </Typography >
                        <div style={{ position: "absolute", right: "2%" }}>
                            <Button variant="outlined" color="inherit">
                                <Link to="/" className="nav-link">Home</Link>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <div className={classes.root} >
                    <p className="intro">
                        The Multimodal Notation Music Interface uses ABC notation.
                        <br/>
                        ABC is a music notation language that allows musicians to create scores with just text input. 
                        <br/>
                        This page will present the essential syntax as well as a simple piece of music to illustrate the language.
                    </p>
                    <h2>The Structure</h2>
                    <p>A piece in ABC notation consists of two parts: the header and the notes. </p>
                    <h3>Header</h3>
                    <p>
                        The header contains information about the piece of music. <br/>
                        Each line of the header is a field that consists of a capital letter that represents what the field is, 
                        followed by a colon, followed by the value for that field. 
                    </p>
                    <p>
                        This is an example of a minimal header. <br/><br/>
                        X: 1 <br/>
                        M: 4/4 <br/>
                        K: Bb <br/><br/>
                        The ‘X’ field contains a number that uniquely identifies this piece of music. <br/>
                        The ‘M’ field indicates the time signature.<br/>
                        The ‘K’ field indicates the key of this piece. This field should be the last line of the header.<br/>

                    </p>
                    <h4>Optional Fields</h4>
                    <p>
                        A ‘T’ field indicates the title of the piece. <br/>
                        A ‘C’ field indicates the composer of the piece.
                    </p>
                    <h3>Notes</h3>
                    <p>
                        Notes are represented by their respective letters. <br/>
                        The capital ‘C’ represents the middle C note. <br/>
                        The lower case ‘c’ represents the C note one octave above the capital ‘C’. 
                    </p>
                    {/* A playable example here showing notes C, D, E and c,d,e*/}
                    <p>
                        Adding an apostrophe after the letter raises the octave. <br/>
                        Adding a comma after the letter lowers the octave.
                    </p>
                    <p>
                        Adding an underscore before the letter creates a flat. <br/>
                        Adding a carat before the letter creates a sharp. <br/>
                        You only need to add these for accidentals. 
                    </p>
                    <p>
                        Adding a number after the letter increases the note’s duration by a factor of that number. 
                    </p>
                    <p>
                        A lowercase ‘z’ indicates a rest. <br/><br/>

                        A vertical bar character, also known as a pipe, indicates a bar line. <br/>
                        Two vertical bars indicate a double bar. <br/>
                        A vertical bar followed by a right square bracket indicates the ending double bar. <br/>
                    </p>

                    <h2>
                        A Short Example: Mary Had a Little Lamb 
                    </h2>

                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12} sm={6}>
                        <form >
                            <div>
                                <TextField
                                ref={ref => this.textInput = ref}
                                id="textinput"
                                variant="outlined"
                                label="ABCNotation"
                                name="abcnotation"
                                margin="normal"
                                multiline
                                rows={10}
                                rowsMax={25}
                                fullWidth
                                defaultValue=" X:1
                                T:Mary Had A Little Lamb
                                M:4/4
                                K:Bb
                                D2 C2 B,2 C2 | D2 D2 D4 | C2 C2 C4 | D2 F2 F4 |
                                D2 C2 B,2 C2  | D2 D2 D2 D2 | C2 C2 D2 C2 | B,8 |]
                                "
                            />
                                <br />
                                {/* <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<ReplayIcon />}
                                    color="primary"
                                >
                                    <div style={{ margin: "2.5px" }}>Render</div>
                                </Button> */}
                            </div>
                        </form>
                        </Grid>
                    </Grid> {/*end of grid*/}
                
                </div> {/* content */}

            </div>
        );// return
    }//render()

}// class Tutorial

export default withStyles(styles)(Tutorial);