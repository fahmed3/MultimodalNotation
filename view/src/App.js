import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/home";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={home} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
