import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => b === 0 ? NaN : a / b,
};

const formatResult = (value) => {
  if (!Number.isFinite(value)) return "Error";
  const rounded = Number.parseFloat(value.toPrecision(12));
  const text = String(rounded);
  return text.length > 14 ? rounded.toExponential(7) : text;
};

const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [accumulator, setAccumulator] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [memory, setMemory] = useState(0);
  const [trail, setTrail] = useState("");

  const inputDigit = (digit) => {
    if (display === "Error" || waiting) {
      setDisplay(digit);
      setWaiting(false);
      return;
    }
    setDisplay((current) => current === "0" ? digit : `${current}${digit}`.slice(0, 14));
  };

  const inputDecimal = () => {
    if (display === "Error" || waiting) {
      setDisplay("0.");
      setWaiting(false);
    } else if (!display.includes(".")) setDisplay(`${display}.`);
  };

  const calculate = (left, right, operator) => operations[operator]?.(left, right) ?? right;

  const chooseOperation = (nextOperation) => {
    const inputValue = Number(display);
    if (!Number.isFinite(inputValue)) return;
    if (accumulator === null) setAccumulator(inputValue);
    else if (operation && !waiting) {
      const result = calculate(accumulator, inputValue, operation);
      setDisplay(formatResult(result));
      setAccumulator(result);
    }
    setOperation(nextOperation);
    setTrail(`${formatResult(accumulator === null ? inputValue : (operation && !waiting ? calculate(accumulator, inputValue, operation) : accumulator))} ${nextOperation}`);
    setWaiting(true);
  };

  const equals = () => {
    if (operation === null || accumulator === null) return;
    const inputValue = Number(display);
    const result = calculate(accumulator, inputValue, operation);
    setTrail(`${formatResult(accumulator)} ${operation} ${formatResult(inputValue)} =`);
    setDisplay(formatResult(result));
    setAccumulator(null);
    setOperation(null);
    setWaiting(true);
  };

  const clear = () => {
    setDisplay("0"); setAccumulator(null); setOperation(null); setWaiting(false); setTrail("");
  };

  const backspace = () => {
    if (waiting || display === "Error") return;
    setDisplay((current) => current.length <= 1 ? "0" : current.slice(0, -1));
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (event.target instanceof HTMLElement && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
      if (/^[0-9]$/.test(event.key)) inputDigit(event.key);
      else if (event.key === ".") inputDecimal();
      else if (event.key === "Enter" || event.key === "=") { event.preventDefault(); equals(); }
      else if (event.key === "Escape") clear();
      else if (event.key === "Backspace") backspace();
      else if (["+", "-", "*", "/"].includes(event.key)) chooseOperation({ "*": "×", "/": "÷" }[event.key] || event.key);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const buttons = [
    { label: "C", action: clear, kind: "utility" },
    { label: "+/-", action: () => setDisplay((current) => current === "0" || current === "Error" ? current : formatResult(-Number(current))), kind: "utility" },
    { label: "%", action: () => setDisplay((current) => formatResult(Number(current) / 100)), kind: "utility" },
    { label: "÷", action: () => chooseOperation("÷"), kind: "operator" },
    { label: "7", action: () => inputDigit("7") }, { label: "8", action: () => inputDigit("8") }, { label: "9", action: () => inputDigit("9") }, { label: "×", action: () => chooseOperation("×"), kind: "operator" },
    { label: "4", action: () => inputDigit("4") }, { label: "5", action: () => inputDigit("5") }, { label: "6", action: () => inputDigit("6") }, { label: "-", action: () => chooseOperation("-"), kind: "operator" },
    { label: "1", action: () => inputDigit("1") }, { label: "2", action: () => inputDigit("2") }, { label: "3", action: () => inputDigit("3") }, { label: "+", action: () => chooseOperation("+"), kind: "operator" },
    { label: "0", action: () => inputDigit("0"), kind: "zero" }, { label: ".", action: inputDecimal }, { label: "=", action: equals, kind: "operator" },
  ];

  return <div className="nkos-calculator-app"><div className="nkos-calculator-memory"><button type="button" onClick={() => setMemory(0)}>MC</button><button type="button" onClick={() => setDisplay(formatResult(memory))}>MR</button><button type="button" onClick={() => setMemory((value) => value + Number(display || 0))}>M+</button><button type="button" onClick={() => setMemory((value) => value - Number(display || 0))}>M-</button><span>{memory ? `M ${formatResult(memory)}` : "MEMORY EMPTY"}</span></div><div className="nkos-calculator-display"><small>{trail || "NITIN OS CALCULATOR"}</small><output>{display}</output><button type="button" onClick={backspace} aria-label="Delete last digit"><FiDelete /></button></div><div className="nkos-calculator-grid">{buttons.map((button) => <button type="button" key={button.label} className={button.kind || ""} onClick={button.action}>{button.label}</button>)}</div></div>;
};

export default CalculatorApp;
