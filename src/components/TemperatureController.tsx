import React, { useEffect, useState } from "react";
import "./TemperatureController.css";

interface TemperatureControllerProps {}

interface Item {
  id: number;
  title: string;
}

const TemperatureController: React.FC<TemperatureControllerProps> = () => {
  const max = 50;
  const min = 0;
  const step = 10;
  const smallStep = 5;
  const heightWater = 250;
  const [temperature, setTemperature] = useState<number>(0);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(Number(e.target.value));
  };

  // const { max, min, step, smallStep } = dataRuler;
  const [listItemRuler, setListItemRuler] = useState<Item[]>();

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
      alert(
        "Hiệu lượng nước lớn nhất và nhỏ nhất không phải là bội số của bước nhảy lớn hoặc bước nhảy quá nhiều"
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
  const itemFake: Item = {
    id: Math.random(),
    title: "-",
  };

  const getItemFakes = (step: number, smallStep: number): Item[] => {
    const items: Item[] = [];
    for (let i = 1; i < step / smallStep; i++) {
      items.push(itemFake);
    }
    return items;
  };

  const handleRenderItem = (title: string) => {
    if (parseInt(title) === 0) {
      return (
        <span className=" text-[10.5px] font-bold">
          <span className="font-bold">- </span>
          {title}
        </span>
      );
    }
    if (!parseInt(title)) {
      return <span className=" text-[10.5px] font-bold"> {title}</span>;
    } else {
      return (
        <span className=" text-[10.5px] font-bold">
          <span className="font-bold">- </span>
          {title}
        </span>
      );
    }
  };

  useEffect(() => {
    let lastedItem: Item[] = [];
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
      setListItemRuler(lastedItem);
    } else {
      setListItemRuler([]);
    }

    return () => {
      lastedItem = [];
    };
  }, [max, min, step, smallStep]);

  /* test  */
  const [displayHeight, setDisplayHeight] = useState(0);
  const calculateDisplayHeight = () => {
    const ratio = temperature / max;
    const height = ratio * heightWater;
    setDisplayHeight(height);
  };

  useEffect(() => {
    calculateDisplayHeight();
  }, [temperature]);

  console.log("check list item", listItemRuler);

  return (
    <div className="temperature-controller flex items-center justify-center gap-[20px] relative">
      <div className="wrap-thermometer relative border-[1px] border-solid border-[#bdb3b3] rounded-[25px] flex flex-col gap-[8px] justify-center items-center px-[20px] py-[8px] h-[300px]">
        <div className="thermometer relative w-[10px] h-full bg-[#ccc]">
          <div
            className="thermometer-progress absolute bottom-0 left-0 w-full bg-[#ff0000]  transition-height duration-200 ease-in-out"
            style={{ height: displayHeight }}
          ></div>

          <div className="thermometer-bulb absolute bottom-[-5px] left-[48%] translate-x-[-50%] w-[14px] h-[14px] rounded-[50%] bg-[#ff0000] "></div>
        </div>
        <div
          className="thermometer-ruler  flex flex-col-reverse w-fit absolute gap-[2px] left-[51%] z-[110] bottom-[35px]"
          style={{
            height: heightWater,
          }}
        >
          {listItemRuler &&
            listItemRuler.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    height: heightWater / ((max - min) / smallStep + 1),
                  }}
                >
                  {handleRenderItem(item.title)}
                </div>
              );
            })}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={smallStep}
          value={temperature}
          onChange={handleTemperatureChange}
          className="progress w-[200px] mb-[20px] rotate-[-90deg] cursor-pointer absolute top-[50%] left-[10px]"
        />
        <div className="temperature-display text-[14px] font-bold w-[25px]">
          {temperature}°C
        </div>
      </div>
    </div>
  );
};

export default TemperatureController;
