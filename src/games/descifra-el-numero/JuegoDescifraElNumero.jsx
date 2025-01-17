import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NumberBlock from "./NumberBlock";
import DropZone from "./DropZone";
import Modal from "../../components/ui/Modal";

const JuegoDescifraElNumero = () => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({
    isCorrect: false,
    message: "",
  });

  const correctAnswersRef = useRef({
    hundreds: null,
    tens: null,
    ones: null,
  });

  const [userAnswer, setUserAnswer] = useState({
    hundreds: null,
    tens: null,
    ones: null,
  });

  const [lockedPositions, setLockedPositions] = useState({
    hundreds: false,
    tens: false,
    ones: false,
  });

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 900);
  };

  const getDigits = (number) => {
    const hundreds = Math.floor(number / 100);
    const tens = Math.floor((number % 100) / 10);
    const ones = number % 10;
    return { hundreds, tens, ones };
  };

  useEffect(() => {
    const newNumber = generateRandomNumber();
    setCurrentNumber(newNumber);
    const digits = getDigits(newNumber);

    correctAnswersRef.current = digits;

    console.log("Generated number:", newNumber);
    console.log("Digits:", digits);
  }, []);

  const handleDrop = (position, value) => {
    if (lockedPositions[position]) return;

    const numValue = Number(value);
    const isCorrectValue = numValue === correctAnswersRef.current[position];

    if (isCorrectValue) {
      setUserAnswer((prev) => ({
        ...prev,
        [position]: numValue,
      }));

      setLockedPositions((prev) => {
        const newLockedPositions = { ...prev, [position]: true };

        const allPositionsLocked = ["hundreds", "tens", "ones"].every(
          (pos) => newLockedPositions[pos]
        );

        const allPositionsCorrect = ["hundreds", "tens", "ones"].every(
          (pos) => numValue === correctAnswersRef.current[pos]
        );

        console.log("All positions locked:", allPositionsLocked);
        console.log("All positions correct:", allPositionsCorrect);

        if (allPositionsLocked || allPositionsCorrect) {
          setScore((prev) => prev + 10);
          setShowSuccessModal(true);
        }

        return newLockedPositions;
      });
    } else {
      setFeedbackMessage({
        isCorrect: false,
        message: `¡Ups! Este no es el número correcto para las ${
          position === "hundreds"
            ? "centenas"
            : position === "tens"
            ? "decenas"
            : "unidades"
        }. ¡Inténtalo de nuevo! 😊`,
      });
      setShowFeedbackModal(true);
    }
  };

  const handleNextNumber = () => {
    const newNumber = generateRandomNumber();
    setCurrentNumber(newNumber);
    setUserAnswer({ hundreds: null, tens: null, ones: null });
    setLockedPositions({ hundreds: false, tens: false, ones: false });
    correctAnswersRef.current = getDigits(newNumber);
    setShowSuccessModal(false);
    console.log(
      "Nuevo número generado:",
      newNumber,
      "Dígitos:",
      getDigits(newNumber)
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="newContainer mx-auto p-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Descomponer el número</h2>
          <p className="text-xl mb-2">Puntuación: {score}</p>
          <p className="text-2xl font-bold mb-4">Número: {currentNumber}</p>
        </div>

        <div className="grid grid-cols-3 grid-rows-1 gap-4 mb-8">
          <DropZone
            position="hundreds"
            onDrop={handleDrop}
            label="Centenas"
            value={userAnswer.hundreds}
            isLocked={lockedPositions.hundreds}
          />
          <DropZone
            position="tens"
            onDrop={handleDrop}
            label="Decenas"
            value={userAnswer.tens}
            isLocked={lockedPositions.tens}
          />
          <DropZone
            position="ones"
            onDrop={handleDrop}
            label="Unidades"
            value={userAnswer.ones}
            isLocked={lockedPositions.ones}
          />
        </div>

        <div className="flex justify-center gap-2 flex-wrap mt-2">
          {[...Array(10)].map((_, i) => (
            <NumberBlock key={i} number={i} />
          ))}
        </div>

        {/* Modal de Feedback */}
        <Modal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
        >
          <div
            className={`text-center p-6 ${
              feedbackMessage.isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                feedbackMessage.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedbackMessage.isCorrect
                ? "¡Correcto!"
                : "¡Inténtalo de nuevo!"}
            </h3>
            <p className="text-lg mb-4">{feedbackMessage.message}</p>
            <button
              onClick={() => setShowFeedbackModal(false)}
              className={`px-4 py-2 rounded-lg text-white
                ${
                  feedbackMessage.isCorrect
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
            >
              Continuar
            </button>
          </div>
        </Modal>

        {/* Modal de Éxito */}
        <Modal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        >
          <div className="text-center bg-green-50 p-6">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              ¡Felicitaciones! 🎉
            </h3>
            <p className="text-lg mb-4">
              ¡Has descompuesto correctamente el número {currentNumber}!
              <br />
              {userAnswer.hundreds} centenas, {userAnswer.tens} decenas y{" "}
              {userAnswer.ones} unidades
            </p>
            <p className="text-lg mb-6">¿Quieres intentar con otro número?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleNextNumber}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                ¡Siguiente Número! 🚀
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DndProvider>
  );
};

export default JuegoDescifraElNumero;
