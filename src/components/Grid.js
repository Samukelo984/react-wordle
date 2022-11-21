import React from "react";
import Row from "./Row";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <aside>
      {guesses.map((guess, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </aside>
  );
};

export default Grid;
