import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [expression, setExpression] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setInput("0");
    setExpression("");
    setEvaluated(false);
  };

  const handleNumber = (value) => {
    if (evaluated) {
      setExpression(value);
      setInput(value);
      setEvaluated(false);
    } else {
      if (input === "0" && value !== ".") {
        setInput(value);
      } else {
        setInput(input + value);
      }
      setExpression(expression + value);
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setExpression(input + operator);
      setInput(operator);
      setEvaluated(false);
    } else {
        setExpression(prev => prev.replace(/[*+\-\\/]+$/, "") + operator);

      setInput(operator);
    }
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
      setExpression(expression + ".");
    }
  };

  const handleEqual = () => {
    try {
      let result = eval(expression.replace(/÷/g, "/").replace(/×/g, "*"));
      result = parseFloat(result.toFixed(4));
      setInput(result.toString());
      setExpression(result.toString());
      setEvaluated(true);
    } catch (error) {
      setInput("Error");
      setExpression("");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <div className="calculator border rounded p-3 bg-light">
        <div id="display" className="display bg-dark text-white p-2 mb-2">{input}</div>
        <div className="buttons">
          <button id="clear" className="btn btn-danger" onClick={handleClear}>AC</button>
          <button id="divide" className="btn btn-secondary" onClick={() => handleOperator("/")}>/</button>
          <button id="multiply" className="btn btn-secondary" onClick={() => handleOperator("*")}>*</button>
          <button id="subtract" className="btn btn-secondary" onClick={() => handleOperator("-")}>-</button>
          <button id="add" className="btn btn-secondary" onClick={() => handleOperator("+")}>+</button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button key={num} id={["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][num]} className="btn btn-dark" onClick={() => handleNumber(num.toString())}>{num}</button>
          ))}
          <button id="decimal" className="btn btn-dark" onClick={handleDecimal}>.</button>
          <button id="equals" className="btn btn-primary" onClick={handleEqual}>=</button>
        </div>
        <div className="credits text-muted mt-2">Kate Ann Property</div>
      </div>
    </div>
  );
};

export default Calculator;
