import React from "react";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

const QuickStart = (props) => {
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ width: "300px" }}>
        <Typography variant="h5">Short Cuts</Typography>
        <Divider />
        <Typography>
          <br />
          When focused in the text-editing area
          <List>
            <ListItem>Ctrl + Enter = Render</ListItem>
            <ListItem>Ctrl + 0 = Play/Pause</ListItem>
            <ListItem>Ctrl + / = Reset to beginning</ListItem>
            <ListItem>Ctrl + . = Loop</ListItem>
          </List>
        </Typography>
        <Typography variant="h5">Headers</Typography>
        <Divider />
        <Typography>
          <List>
            <ListItem>
              X:1 Where the tune begins, 1 is the tune number or index
            </ListItem>
            <ListItem>T: The title</ListItem>
            <ListItem>M: Time signature</ListItem>
            <ListItem>L: The default note length</ListItem>
            <ListItem>K: Key</ListItem>
            <ListItem>Q: Tempo</ListItem>
          </List>
        </Typography>
        <Typography variant="h5">Notes</Typography>
        <Divider />
        <Typography>
          <List>
            <ListItem>CDEFGAB are the available notes </ListItem>
            <ListItem>C is C4 (Capital letters begin at octave 4) </ListItem>
            <ListItem>c is C5 (Lowercase letters begin at octave 5)</ListItem>
            <ListItem>‘ (apostrophe) increment the octave</ListItem>
            <ListItem>, (comma) decrement the octave</ListItem>
            <ListItem>Sharp precede the note with ^ (caret)</ListItem>
            <ListItem>Double sharp is ^^ (double caret)</ListItem>
            <ListItem>Flat precede the note with _ (underscore)</ListItem>
            <ListItem>Double flat is __ (double underscore)</ListItem>
            <ListItem>Natural precede the note with = (equals)</ListItem>
          </List>
        </Typography>
        <Typography variant="h5">Rests</Typography>
        <Divider />
        <Typography>
          <List>
            <ListItem>z indicates a rest </ListItem>
          </List>
        </Typography>
        <Typography variant="h5">Lengths</Typography>
        <Divider />
        <Typography>
          <List>
            <ListItem>
              By default, the note length will be whatever L is set to
            </ListItem>
            <ListItem>
              To make a note longer, add a factor to the end of the note (after
              any octave markings). (C2 will set the length to twice the value
              of L)
            </ListItem>
            <ListItem>
              To make a note shorter, add a / (forward slash) and factor to the
              end of the note (after any octave markings). (C/2 will set the
              length to half the value of L)
            </ListItem>
          </List>
        </Typography>
        <Typography variant="h5">Bar Lines</Typography>
        <Divider />
        <Typography>
          <List>
            <ListItem>| (vertical bar) separates each measure</ListItem>
            <ListItem>
              |: (vertical bar + colon) and :| (colon + vertical bar) to denote
              a section to repeat (start and end respectively)
            </ListItem>
            <ListItem>|| (vertical bar + vertical bar) final bar line</ListItem>
            <ListItem>
              || (vertical bar + vertical bar) or [| (open square bracket +
              vertical bar) or |] (vertical bar + close square bracket) for
              double bar line
            </ListItem>
          </List>
        </Typography>
      </div>
    </div>
  );
};

let quickStartText = `Headers
X:1
Where the tune begins, 1 is the tune number or index
T: 
The title
M:
Time signature 
L:
The default note length 
K:
Key
Q: 
Tempo 

Notes
CDEFGAB are the available notes
C is C4 (Capital letters begin at octave 4)
c is C5 (Lowercase letters begin at octave 5)
‘ (apostrophe) increment the octave
, (comma) decrement the octave
Sharp precede the note with ^ (caret)
double sharp is ^^ (double carry)
Flat precede the note with _ (underscore)
double flat is __ (double underscore)
Natural precede the note with = (equals)

Rests
z indicates a rest

Lengths
By default, the note length will be whatever L is set to
To make a note longer, add a factor to the end of the note (after any octave markings). (C2 will set the length to twice the value of L) 
To make a note shorter, add a / (forward slash) and factor to the end of the note (after any octave markings). (C/2 will set the length to half the value of L)

Bar Lines
| (vertical bar) separates each measure
|: (vertical bar + colon) and  :| (colon + vertical bar) to denote a section to repeat (start and end respectively)
|| (vertical bar + vertical bar) final bar line
|| (vertical bar + vertical bar) or [| (open square bracket + vertical bar) or |] (vertical bar + close square bracket) for double bar line
`;

export default QuickStart;
