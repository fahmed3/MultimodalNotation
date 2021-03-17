import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/home";
import Tutorial from "./pages/tutorial"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/tutorial" component={Tutorial} />
        </Switch>
        
      </div>
    </Router>
  );
}
export default App;
