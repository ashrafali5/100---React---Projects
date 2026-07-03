import React, { useEffect, useState } from "react";
import colorLogo from "../assets/colorLogo.png";
import { MdContentCopy } from "react-icons/md";

const GradientGenerator = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const hexCode = int.toString(16);
    const hexColor = hexCode.padStart(6, "0");
    return `#${hexColor}`;
  };

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;
      colors.push({
        gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
      });
    }
    setGradients(colors);
  };

  useEffect(() => {
    generateGradient();
  }, [num]);

  return (
    <div className="min-h-screen bg-[#0a1429] text-white">
      <div className="w-3/4 mx-auto py-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl flex justify-start items-center font-bold">
            <img className="w-24 h-auto" src={colorLogo} alt="colorLogo" />
            <span>Gradient Generator</span>
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="12"
              className="border border-slate-700 rounded-lg w-25 p-2 focus:outline-none"
              onChange={(e) => setNum(e.target.value)}
            />
            <select
              name=""
              id=""
              className="bg-[#0a1429] border text-center appearance-none border-slate-700 rounded-lg w-45 p-2 focus:outline-none cursor-pointer"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Linear">Linear</option>
              <option value="Radial">Radial</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-25">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-46 rounded-xl relative"
              style={{ background: item.gradient }}
            >
              <button className="absolute bottom-0 right-0 cursor-pointer bg-black/40 hover:bg-black px-4 py-2 rounded-br-lg">
                <MdContentCopy />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
