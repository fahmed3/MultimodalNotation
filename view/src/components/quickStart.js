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

export default quickStartText;
