
import React, { useState } from 'react';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };
  
  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
    setWaitingForOperand(true);
  };
  
  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(String(inputValue));
    } else if (operator) {
      const result = calculate(parseFloat(currentValue), inputValue, operator);
      const resultString = String(result);
      setDisplay(resultString);
      setCurrentValue(resultString);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && currentValue !== null) {
      const result = calculate(parseFloat(currentValue), inputValue, operator);
      const resultString = String(result);
      setDisplay(resultString);
      setCurrentValue(resultString); // For consecutive equals presses
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const calculate = (firstOperand: number, secondOperand: number, op: string): number => {
    switch (op) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs md:max-w-sm bg-black rounded-3xl shadow-2xl p-4 sm:p-6 space-y-4">
        <div className="bg-black text-white text-6xl font-light text-right p-4 rounded-lg break-all">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          <CalculatorButton onClick={clearDisplay} className="bg-zinc-400 text-black">AC</CalculatorButton>
          <CalculatorButton onClick={toggleSign} className="bg-zinc-400 text-black">+/-</CalculatorButton>
          <CalculatorButton onClick={inputPercent} className="bg-zinc-400 text-black">%</CalculatorButton>
          <CalculatorButton onClick={() => performOperation('/')} className="bg-orange-500 text-white">÷</CalculatorButton>

          <CalculatorButton onClick={() => inputDigit('7')} className="bg-zinc-800 text-white">7</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('8')} className="bg-zinc-800 text-white">8</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('9')} className="bg-zinc-800 text-white">9</CalculatorButton>
          <CalculatorButton onClick={() => performOperation('*')} className="bg-orange-500 text-white">×</CalculatorButton>

          <CalculatorButton onClick={() => inputDigit('4')} className="bg-zinc-800 text-white">4</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('5')} className="bg-zinc-800 text-white">5</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('6')} className="bg-zinc-800 text-white">6</CalculatorButton>
          <CalculatorButton onClick={() => performOperation('-')} className="bg-orange-500 text-white">-</CalculatorButton>

          <CalculatorButton onClick={() => inputDigit('1')} className="bg-zinc-800 text-white">1</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('2')} className="bg-zinc-800 text-white">2</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('3')} className="bg-zinc-800 text-white">3</CalculatorButton>
          <CalculatorButton onClick={() => performOperation('+')} className="bg-orange-500 text-white">+</CalculatorButton>

          <CalculatorButton onClick={() => inputDigit('0')} className="col-span-2 bg-zinc-800 text-white">0</CalculatorButton>
          <CalculatorButton onClick={inputDecimal} className="bg-zinc-800 text-white">.</CalculatorButton>
          <CalculatorButton onClick={handleEquals} className="bg-orange-500 text-white">=</CalculatorButton>
        </div>
      </div>
    </div>
  );
};

export default App;
