import React, { useMemo, useState } from "react";
import "./Beaker.css";

interface BeakerProps {}

const Beaker: React.FC<BeakerProps> = () => {
  const min = 0;
  const max = 1000;
  const step = 200;
  const heightWater = 250;
  const smStep = 50;
  const [water, setWater] = useState<number>(min);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("check", e.target.value);

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

  const array = [1, 2, 3, 4];
  return (
    <div className="container">
      <div className="top">
        <div className="circle">
          <div className="in"></div>
        </div>
      </div>
      <div className="cup">
        <div className="water">
          <div
            className="cup1"
            style={{ height: water * (heightWater / max) + 50 }}
          >
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
            gap: heightWater / (max / step) - 16,
            width: "fit-content",
            position: "absolute",
            height: max,
            bottom: 14,
            left: "50%",
            zIndex: 110,
          }}
        >
          {list &&
            list.map((item) => {
              return (
                <>
                  <span style={{ fontSize: "12.5px", fontWeight: "bold" }}>
                    <span style={{ fontWeight: "bold" }}>-</span>
                    {item.title}
                  </span>
                  {/* {array &&
                    array.map((item, index) => {
                      return <span>-</span>;
                    })} */}
                </>
              );
            })}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={smStep}
        value={water}
        onChange={handleTemperatureChange}
        className="progress"
      />
    </div>
  );
};

export default Beaker;
