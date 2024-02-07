import { useState } from "react";
import { WINNING_COMBINATIONS } from "./data";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYER = {
  X: "Player 1",
  O: "Player 2",
};

function deriveWinner(gameBoard, playerName) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    )
      winner = playerName[firstSquare];
  }
  return winner;
}

function deriveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivePlayer(gameTurn) {
  let curPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") curPlayer = "O";
  return curPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYER);

  const player = derivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, playerName);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const curPlayer = derivePlayer(prevTurn);
      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prevTurn,
      ];
      return updateTurn;
    });
  }
  function handleRematch() {
    setGameTurn([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYER.X}
            symbol="X"
            isInTurn={player === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name={PLAYER.O}
            symbol="O"
            isInTurn={player === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onSelect={handleRematch} />
        )}
        <GameBoard onSelect={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
