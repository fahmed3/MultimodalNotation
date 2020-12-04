# MultimodalNotation
<!-- ABOUT THE PROJECT -->
## About The Project
A web based tex editor that takes in ABC Notation, a text-based music notation, into live multimodal output. A score of the piece is rendered as well as braille output.

### Built With
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Music21](http://web.mit.edu/music21/)
* [OpenSheetMusicDisplay](https://opensheetmusicdisplay.org/)

<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites

This project uses the Flask framework and the Music21 library, you must install both to run the project locally.
* Flask
  ```sh
  $ pip install flask
  ```
* Music21
  ```sh
  $ pip install music21
  ```
  
### Installation

Clone the repo and enter the cloned repo.
   ```sh
   $ git clone https://github.com/fahmed3/MultimodalNotation.git
   $ cd MultimodalNotation/
   ```
### How to Run
  ```sh
   $ python app.py
   ```
Navigate to localhost:5000 to see the editor up and running. Here is a sample ABC Notation to paste into the text editor to get started:
  ```
  L:1/16
  M:3/4
  K:none
  D,4 D,E,F,^G, z4 | E12 |]
  ```
[View other examples of ABC Notation](http://abcnotation.com/examples).
