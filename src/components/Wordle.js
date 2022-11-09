import React, { useEffect } from "react";
import UseWordle from "../hooks/UseWordle";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyUp } = UseWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);

  return <section>current guess - {currentGuess}</section>;
};

export default Wordle;
