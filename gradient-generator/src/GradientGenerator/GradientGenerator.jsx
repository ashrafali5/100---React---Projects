import React, { useEffect, useState } from "react";
import colorLogo from "../assets/colorLogo.png";
import { MdContentCopy } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

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

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: 'linear-gradient(${degreeString}, ${color1}, ${color2})'`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: 'radial-gradient(circle, ${color1}, ${color2})'`,
        });
      }
    }
    setGradients(colors);
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  const copy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Copied !");
  };
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "radial-gradient(circle, #4827c9, #0c201a)",
      }}
    >
      <div className="w-3/4 mx-auto py-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl flex justify-start items-center font-bold">
            <img className="w-24 h-auto" src={colorLogo} alt="colorLogo" />
            <span>Gradient Generator - {type}</span>
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
              <option value="linear">Linear</option>
              <option value="Radial">Radial</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={generateGradient}
            className="px-8 py-2 bg-[#0a1429] rounded-lg cursor-pointer"
          >
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-5">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-46 rounded-xl relative"
              style={{ background: item.gradient }}
            >
              <button
                onClick={() => copy(item.css)}
                className="absolute bottom-0 right-0 cursor-pointer bg-black/40 hover:bg-black px-4 py-2 rounded-br-lg"
              >
                <MdContentCopy />
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GradientGenerator;
