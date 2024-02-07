import { useState } from "react";
export default function Player({ name, symbol, isInTurn, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  function handlerClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  }
  function handleChange(e) {
    setPlayerName(e.target.value);
  }
  return (
    <li className={isInTurn ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          ></input>
        ) : (
          <>
            <span className="player-name">{playerName}</span>
          </>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handlerClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
