import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState('');

  const KeypadNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operations = ['+', '-', '*', '/'];

  const handleClick = (val) => {
    // Atualiza o valor atual e concatena no display de operações completas
    setCurrentValue((prevValue) => {
      if (prevValue === '0') {
        return val;
      } else {
        return prevValue + val;
      }
    });
    setCompleteOperation((prevOperation) => prevOperation + val); // Corrigido para concatenar o valor corretamente
  };

  const handleOperation = (operation) => {
    if (pendingOperation !== null) {
      // Se já houver uma operação pendente, calcula o resultado antes de continuar
      handleCalculate();
    }

    // Define a operação pendente e armazena o valor atual
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCurrentValue('0');
    setCompleteOperation(
      (prevOperation) => prevOperation + ' ' + operation + ' '
    );
  };

  const handleClear = () => {
    // Limpa todos os estados
    setCurrentValue('0');
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation('');
  };

  const handleCalculate = () => {
    // Verifica se há uma operação pendente
    if (!pendingOperation || !pendingValue) {
      return;
    }

    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);

    let result;
    switch (pendingOperation) {
      case '+':
        result = num1 + num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '/':
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          // Evita a divisão por zero
          setCurrentValue('Error');
          setCompleteOperation('Error');
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;
      default:
        break;
    }

    // Atualiza o display com o resultado da operação
    setCompleteOperation(
      `${pendingValue} ${pendingOperation} ${currentValue} = ${result}`
    );
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
  };

  return (
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        {KeypadNumbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}
          </button>
        ))}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
