import React, { useState } from "react";
import "./index.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
    setResult("");
  };

  const clear = () => {
    setInput("");
    setResult("");
  };

  const deleteLast = () => {
    setInput((prev) => prev.slice(0, -1));
    setResult("");
  };

  const calculate = () => {
    try {
      if (!input || !/^[0-9+\-*/.()\s]+$/.test(input)) {
        setResult("Error");
        return;
      }

      const answer = Function('"use strict"; return (' + input + ")")();

      if (!Number.isFinite(answer)) {
        setResult("Cannot divide by zero");
        return;
      }

      setResult(String(Number(answer.toFixed(10))));
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    ["C", "clear"],
    ["DEL", "delete"],
    [".", "."],
    ["/", "/"],
    ["7", "7"],
    ["8", "8"],
    ["9", "9"],
    ["*", "*"],
    ["4", "4"],
    ["5", "5"],
    ["6", "6"],
    ["-", "-"],
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["+", "+"],
    ["0", "0"],
    ["=", "equals"],
  ];

  const handleButton = (value) => {
    if (value === "clear") {
      clear();
    } else if (value === "delete") {
      deleteLast();
    } else if (value === "equals") {
      calculate();
    } else {
      handleClick(value);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h1>Calculator</h1>

        <div className="display">
          <div className="expression">{input || "0"}</div>
          <div className="result">{result}</div>
        </div>

        <div className="buttons">
          {buttons.map(([label, value]) => (
            <button
              key={label}
              className={
                ["+", "-", "*", "/"].includes(value)
                  ? "operator"
                  : ["clear", "delete"].includes(value)
                  ? "special"
                  : value === "equals"
                  ? "equals"
                  : ""
              }
              onClick={() => handleButton(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
