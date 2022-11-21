import React, { useEffect } from "react";
import UseWordle from "../hooks/UseWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn } =
    UseWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <section>
      <div>solution - {solution} </div>
      <div> current guess - {currentGuess} </div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad />
    </section>
  );
};

export default Wordle;
