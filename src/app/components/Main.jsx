"use client";
import React from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from "react-confetti";

export default function DiceGame() {
  const [dice, setDice] = React.useState([]);
  const [isGameWon, setIsGameWon] = React.useState(false);

  React.useEffect(() => {
    setDice(createInitialDice());
  }, []);

  function createInitialDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((el) => (el.id === id ? { ...el, isHeld: !el.isHeld } : el))
    );
  }

  function roll() {
    setDice((oldDice) =>
      oldDice.map((el) =>
        el.isHeld === true
          ? el
          : { ...el, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  const diceElements = dice.map((el) => (
    <Die
      value={el.value}
      hold={() => hold(el.id)}
      key={el.id}
      isHeld={el.isHeld}
    />
  ));

  function newGame() {
    setDice(createInitialDice());
  }

  React.useEffect(() => {
    if (dice.length > 0) {
      const won = dice.every((el) => el.isHeld && el.value === dice[0].value);
      setIsGameWon(won);
    }
  }, [dice]);

  console.log(isGameWon);

  return (
    <div className="main-frame">
      {isGameWon ? <Confetti /> : null}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-frame">{diceElements}</div>
      <button className="button-roll" onClick={isGameWon ? newGame : roll}>
        {isGameWon ? "New Game" : "Roll"}
      </button>
    </div>
  );
}
