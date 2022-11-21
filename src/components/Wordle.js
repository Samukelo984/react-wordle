import React, { useState, useEffect } from "react";

import UseWordle from "../hooks/UseWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
  const [showModal, setShowModal] = useState(false);
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } =
    UseWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    if (isCorrect) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => window.removeEventListener("keyup", handleKeyUp);
    }

    if (turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => window.removeEventListener("keyup", handleKeyUp);
    }

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp, isCorrect, turn]);

  return (
    <section>
      <div>solution - {solution} </div>
      <div> current guess - {currentGuess} </div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </section>
  );
};

export default Wordle;
