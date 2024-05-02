import React, { useMemo, useState } from "react";
import "./Beaker.css";

interface BeakerProps {}
interface Item {
  id: number;
  title: string;
}

const Beaker: React.FC<BeakerProps> = () => {
  const max = 2000;
  const min = 0;
  const step = 400;
  const smallStep = 100;
  const heightWater = 250;
  const [water, setWater] = useState<number>(0);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("check value", e.target.value);

    setWater(Number(e.target.value));
  };

  const validate = (
    max: number,
    min: number,
    step: number,
    smallStep: number
  ): boolean => {
    if (max < min) {
      console.error("max đang nhor hơn min");
      return false;
    }

    // Kiểm tra xem chiều cao có là bội số của bước nhảy lớn không
    if ((max - min) % step !== 0) {
      console.error(
        "lượng nước lớn nhất không phải là bội số của bước nhảy lớn"
      );
      return false;
    }

    // Kiểm tra xem chiều cao có là bội số của bước nhảy nhỏ không
    if ((max - min) % smallStep !== 0) {
      console.error(
        "lượng nước lớn nhất không thể là bội số của bước nhảy nhỏ"
      );
      return false;
    }

    // Nếu không có vấn đề nào, trả về true
    return true;
  };
  /* xxxxxxxx */

  const itemFake: Item = {
    id: Math.random(),
    title: "-",
  };
  const lastedItem: Item[] = [];

  const getItemFakes = (step: number, smallStep: number): Item[] => {
    const items: Item[] = [];
    for (let i = 1; i < step / smallStep; i++) {
      items.push(itemFake);
    }
    return items;
  };

  const handleItem = (
    max: number,
    min: number,
    step: number,
    smallStep: number
  ): Item[] => {
    if (validate(max, min, step, smallStep)) {
      const items: Item[] = [];
      for (let i = 0; i <= max - min; i += step) {
        items.push({ id: Math.random(), title: (i + min).toString() });
      }

      items.forEach((item) => {
        if (item.title === max.toString()) {
          lastedItem.push(item);
        } else {
          lastedItem.push(item, ...getItemFakes(step, smallStep));
        }
      });
      return lastedItem;
    }
    return lastedItem;
  };

  const handleRenderItem = (title: string) => {
    if (parseInt(title) === 0) {
      return (
        <span style={{ fontSize: "10.5px", fontWeight: "bold" }}>
          <span style={{ fontWeight: "bold" }}>- </span>
          {title}
        </span>
      );
    }
    if (!parseInt(title)) {
      return (
        <span style={{ fontSize: "10.5px", fontWeight: "bold" }}> {title}</span>
      );
    } else {
      if (parseInt(title) === max) {
        return (
          <span style={{ fontSize: "10.5px", fontWeight: "bold" }}>
            <span style={{ fontWeight: "bold" }}>- </span>
            {title} mL
          </span>
        );
      } else {
        return (
          <span style={{ fontSize: "10.5px", fontWeight: "bold" }}>
            <span style={{ fontWeight: "bold" }}>- </span>
            {title}
          </span>
        );
      }
    }
  };

  return (
    <div className="container">
      <div className="top">
        <div className="circle">
          <div className="in"></div>
        </div>
      </div>
      <div className="cup">
        <div className="wrap-water">
          <div
            className="water"
            style={{ height: (water - min) * (heightWater / max) + 50 - 12.5 }}
          >
            <div className="water-top">
              <div className="water-cricle">
                <div className="water-in"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ruler"
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            width: "fit-content",
            position: "absolute",
            height: heightWater,
            bottom: 20,
            gap: 0.5,
            left: "50%",
            zIndex: 110,
          }}
        >
          {handleItem(max, min, step, smallStep).map((item) => {
            return (
              <div
                style={{
                  height: heightWater / (max / smallStep + 1),
                }}
              >
                {handleRenderItem(item.title)}
              </div>
            );
          })}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={smallStep}
        value={water}
        onChange={handleTemperatureChange}
        className="progress"
      />
    </div>
  );
};

export default Beaker;
