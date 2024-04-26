import React from "react";
import TemperatureController from "./components/TemperatureController";
import Beaker from "./components/beaker/Beaker";

function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", alignItems: "center", gap: "36px" }}
    >
      {/* <TemperatureController /> */}
      <Beaker />
    </div>
  );
}

export default App;
