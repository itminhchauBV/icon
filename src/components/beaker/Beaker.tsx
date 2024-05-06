import React, { useState } from "react";

interface BeakerProps {}
interface Item {
  id: number;
  title: string;
}

const Beaker: React.FC<BeakerProps> = () => {
  const max = 1000;
  const min = 200;
  const step = 200;
  const smallStep = 50;
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
      for (let i = 0; i <= max; i += step) {
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
        <span className=" text-[10.5px] font-bold">
          <span className="font-bold">- </span>
          {title}
        </span>
      );
    }
    if (!parseInt(title)) {
      return <span className=" text-[10.5px] font-bold"> {title}</span>;
    } else {
      if (parseInt(title) === max) {
        return (
          <span className=" text-[10.5px] font-bold">
            <span className="font-bold">- </span>
            {title} mL
          </span>
        );
      } else {
        return (
          <span className=" text-[10.5px] font-bold">
            <span className="font-bold">- </span>
            {title}
          </span>
        );
      }
    }
  };

  return (
    <div className="container relative top-[50px] w-[210px]">
      <div className="top absolute top-[-30px] left-0 bg-gradient-to-r from-[#d0e9f9] to-[#fff] w-full h-[60px] rounded-[50%] border-[1px] border-solid border-[#bdb3b3] z-[100] ">
        <div className="circle absolute top-[5px] left-[10px]  h-[50px] bg-gradient-to-l from-[#d0e9f9] to-[#fff] rounded-[50%] border-[1px] border-solid border-[#bdb3b3] box-border w-[calc(100%-20px)]">
          <div className="in absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#d0e9f9] to-[#fff] rounded-[50%]"></div>
        </div>
      </div>
      <div className="cup relative w-[210px] h-[300px] bg-gradient-to-r from-[#d0e9f9] to-[#fff] rounded-b-[50px] border-[1px] border-solid border-[#bdb3b3] overflow-hidden">
        <div className="wrap-water relative top-[97px] ">
          <div
            className="water absolute bottom-[-201px] w-[209px] bg-gradient-to-r from-[#c5f1c6] to-[#fff] rounded-b-[50px] z-0 border-[1px] border-solid border-[#bdb3b3]"
            style={{ height: (water - min) * (heightWater / max) + 50 - 12.5 }}
          >
            <div className="water-top absolute top-[-30px] left-0 bg-gradient-to-r from-[#d0e9f9] to-[#fff] w-full h-[62px] rounded-[50%] border-[1px] border-solid border-[#bdb3b3]">
              <div className="water-cricle absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#d0e9f9] to-[#fff] rounded-[50%] border-[1px] border-solid border-[#bdb3b3]">
                <div className="water-in absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#d0e9f9] to-[#fff] rounded-[50%]"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ruler flex flex-col-reverse w-fit absolute bottom-[20px] gap-[0.5px] left-[50%] z-[110]"
          style={{
            height: heightWater,
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
        className="progress w-[200px] mb-[20px] rotate-[-90deg] cursor-pointer absolute top-[50%] left-[150px]"
      />
    </div>
  );
};

export default Beaker;
