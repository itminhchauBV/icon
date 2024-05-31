import { relative } from "path";
import React, { useState } from "react";

interface RulerProps {}
interface Item {
  id: number;
  title: string;
}

const Ruler: React.FC<RulerProps> = () => {
  const values = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div style={{ margin: 20 }}>
      {values.map((item) => {
        return (
          <div
            style={{
              height: 30,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "gray",
              border: "1px solid #fff",
              width: 50,
              position: "relative",
            }}
          >
            <span
              style={{ textAlign: "center", position: "absolute", top: "-50%" }}
            >
              {" "}
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Ruler;
