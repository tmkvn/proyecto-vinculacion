import React, { useState } from 'react';
import "./CazadoresNumeros.css";

const SumaYEncuentra = () => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1); // Rondas del juego
  const [isGameOver, setIsGameOver] = useState(false); // Estado para verificar si el juego terminó
  const [message, setMessage] = useState(""); // Mensaje de error o éxito

  // Genera un número aleatorio
  const generateNumber = () => {
    return Math.floor(Math.random() * 50 + 1);
  };

  // Genera opciones de suma donde una es correcta
  const generateOptions = (correctSum) => {
    const options = new Set();
    options.add(correctSum);
    while (options.size < 4) {
      const number = generateNumber();
      if (number !== correctSum) {
        options.add(number);
      }
    }
    return Array.from(options).sort((a, b) => a - b);
  };

  // Genera dos números aleatorios y su suma correcta
  const generateProblem = () => {
    const num1 = generateNumber();
    const num2 = generateNumber();
    const correctSum = num1 + num2;
    return { num1, num2, correctSum };
  };

  const [problem, setProblem] = useState(generateProblem());
  const [options, setOptions] = useState(() => generateOptions(problem.correctSum));

  const handleClick = (number) => {
    if (number === problem.correctSum) {
      setScore(score + 1);
      if (round < 5) {
        setRound(round + 1);
        const newProblem = generateProblem();
        setProblem(newProblem);
        setOptions(generateOptions(newProblem.correctSum));
        setMessage(""); // Limpiar mensaje de error
      } else {
        setMessage(`🎉 ¡Felicidades! Has completado todas las rondas. Puntaje final: ${score + 1} 🎉`);
        setIsGameOver(true); // El juego ha terminado
      }
    } else {
      setMessage("⚠️ ¡Sigue intentando! ⚠️");
    }
  };

  const restartGame = () => {
    setScore(0);
    setRound(1);
    setIsGameOver(false);
    setMessage("");
    const newProblem = generateProblem();
    setProblem(newProblem);
    setOptions(generateOptions(newProblem.correctSum));
  };

  return (
    <div className="game-container">
      <h1>Suma y Encuentra</h1>
      <p>Resuelve la suma y selecciona la respuesta correcta</p>
      {!isGameOver ? (
        <>
          <p>
            {problem.num1} + {problem.num2} = ?
          </p>
          <div className="number-grid">
            {options.map((number, index) => (
              <button
                key={index}
                className="number-button"
                onClick={() => handleClick(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <p>Puntaje: {score}</p>
          <p>Ronda: {round} de 5</p>
          <p>{message}</p>
        </>
      ) : (
        // Mostrar mensaje y botón de reinicio al terminar
        <div className="game-over-message">
          <h2>{message}</h2>
          <button className="restart-button" onClick={restartGame}>
            Reiniciar Juego
          </button>
        </div>
      )}
    </div>
  );
};

export default SumaYEncuentra;
