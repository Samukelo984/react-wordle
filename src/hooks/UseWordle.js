import { useState } from "react";

const UseWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); //EACH GUESS IS AN ARRAY
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((l) => {
        const currentColour = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColour !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currentColour !== "green" &&
          currentColour !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("you've used all your guesses");
        return;
      }

      if (history.includes(currentGuess)) {
        console.log("you've already tried that word");
        return;
      }

      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };
  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp };
};

export default UseWordle;
