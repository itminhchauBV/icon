import React, { useState } from "react";
import "./TemperatureController.css";

interface TemperatureControllerProps {}

const TemperatureController: React.FC<TemperatureControllerProps> = () => {
  const [temperature, setTemperature] = useState<number>(0);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(Number(e.target.value));
  };

  return (
    <div className="temperature-controller">
      <div className="wrap-thermometer">
        <div className="thermometer">
          <div
            className="thermometer-progress"
            style={{ height: `${temperature * 2.5}%` }}
          ></div>
          <span className="zero">0</span>
          <span className="five">5</span>
          <span className="ten">10</span>
          <span className="fifteen">15</span>
          <span className="twenty">20</span>
          <span className="twentyfive">25</span>
          <span className="thirty">30</span>
          <span className="thirtyfive">35</span>
          <span className="forty">40</span>
          <div className="thermometer-bulb"></div>
        </div>
        <div className="temperature-display">{temperature}°C</div>
      </div>
      <input
        type="range"
        min={0}
        max={40}
        value={temperature}
        onChange={handleTemperatureChange}
        className="progress"
      />
    </div>
  );
};

export default TemperatureController;
