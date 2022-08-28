import React, { useState } from "react";
import calculateWinner from "../helper";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [turnNumber, setTurnNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(history[turnNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (index) => {
    const historyPoint = history.slice(0, turnNumber + 1);
    const currentTurn = historyPoint[turnNumber];
    const squares = [...currentTurn];

    if (winner || squares[index]) return;

    squares[index] = xO;

    setHistory([...historyPoint, squares]);
    setTurnNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (turn) => {
    setTurnNumber(turn);
    setXIsNext(turn % 2 === 0);
  };

  const renderMoves = () =>
    history.map((turn, moveNum) => {
      console.log(`${turn}-${moveNum}`);
      const destination = moveNum ? `Go to move #${moveNum}` : "Reset";
      return (
        <li key={`${turn}-${moveNum}`}>
          <button onClick={() => jumpTo(moveNum)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <Board squares={history[turnNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next player's turn: " + xO}</h3>
      </div>
    </>
  );
}

export default Game;
