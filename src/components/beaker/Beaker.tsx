import React, { useMemo, useState } from "react";
import "./Beaker.css";

interface BeakerProps {}

const Beaker: React.FC<BeakerProps> = () => {
  const min = 25;
  const max = 100;
  const step = 10;
  const heightWater = 230;
  const [water, setWater] = useState<number>(min);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWater(Number(e.target.value));
  };

  const list = useMemo(() => {
    let value: number = 0;
    const newList = [...Array(max / step + 1)].map((item) => {
      const object = {
        id: Math.random(),
        title: value,
      };
      value = value + step;
      return object;
    });
    return newList;
  }, [min, max, step]);
  return (
    <div className="container">
      <div className="cup">
        <div className="top">
          <div className="circle">
            <div className="in"></div>
          </div>
        </div>
        <div className="water">
          <div className="cup1" style={{ height: water * (heightWater / max) }}>
            <div className="top1">
              <div className="cricle1">
                <div className="in1"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ruler"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            gap: step * (max / heightWater),
            width: "fit-content",
            position: "absolute",
            height: heightWater,
            top: 47,
            left: 50,
          }}
        >
          {list &&
            list.map((item) => {
              return (
                <span style={{ fontSize: "12px" }}>
                  <span>-</span>
                  {item.title}
                </span>
              );
            })}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={water}
        onChange={handleTemperatureChange}
        className="progress"
      />
    </div>
  );
};

export default Beaker;
