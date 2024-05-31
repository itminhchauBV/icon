import React from "react";
import TemperatureController from "./components/TemperatureController";
import Beaker from "./components/beaker/Beaker";
import Ruler from "./components/ruler";
import Capacity from "./components/newcomponent/Capacity";

function App() {
  return (
    <div
      className="App"
      // style={{ display: "flex", alignItems: "center", gap: "36px" }}
    >
      {/* <TemperatureController /> */}
      {/* <Beaker /> */}
      <Capacity />
    </div>
  );
}

export default App;
