import * as React from "react";
import { SFC } from "react";
import { Route, Switch } from "react-router";

import TopBar from "./shell/TopBar";
import Background from "./shell/Background";
// Note: I hate touching App.tsx file but I did not know where to render the component.
// I can change this just let me know where shall we render the componenent.
import { Support } from "./shell";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Dapp from "./pages/Dapp";
import DAOcreator from "./pages/DAOcreator";

const App: SFC = () => (
  <div
    style={{
      position: "absolute",
      width: "100vw",
      height: "100vh",
      minWidth: "450px",
      maxWidth: "100%"
    }}
  >
    <Background />
    <TopBar />
    <Support />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/about" component={About} />
      <Route exact path="/dapp" component={Dapp} />
      <Route exact path="/dao-creator" component={DAOcreator} />
    </Switch>
  </div>
);

export default App;
