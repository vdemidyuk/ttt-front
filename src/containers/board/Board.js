import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBoardValue,
  selectBoard,
  selectBoardUrl,
  selectPlayCard,
  selectSubmitResponse,
  selectSubmitError,
  selectSubmitting,
  setNewGame,
  putMoveToApi,
} from "./boardSlice";
import "./css.css";
import BoardWrapper from "../../components/BoardWrapper";
import Tiles from "../../components/Tiles";

export function Board() {
  const playCard = useSelector(selectPlayCard);
  const board = useSelector(selectBoard);
  const boardUrl = useSelector(selectBoardUrl);
  const submitResponse = useSelector(selectSubmitResponse);
  const submitError = useSelector(selectSubmitError);
  const submitting = useSelector(selectSubmitting);
  const isGameFinished = submitResponse && submitResponse.status !== "RUNNING";
  const X_WON = isGameFinished && submitResponse.status === "X_WON";
  const O_WON = isGameFinished && submitResponse.status === "O_WON";
  const DRAW = isGameFinished && submitResponse.status === "DRAW";
  const ERROR = submitError;
  const dispatch = useDispatch();

  const newGame = () => {
    dispatch(setNewGame());
  };

  const placeMove = (tileIndex) => {
    if (isGameFinished || submitting) {
      return false;
    }
    let newBoard = "";
    board.board.split("").forEach((v, i) => {
      if (i === tileIndex) {
        newBoard += playCard;
      } else {
        newBoard += v;
      }
    });
    dispatch(setBoardValue(newBoard));
    dispatch(putMoveToApi({ newBoard, boardUrl }));
  };

  return (
    <div>
      <BoardWrapper>
        <Tiles
          isGameFinished={isGameFinished}
          board={board}
          placeMove={placeMove}
        />
      </BoardWrapper>
      <div className="Message">
        {X_WON && "You won!"}
        {O_WON && "Computer won!"}
        {DRAW && "It's a draw!"}
        {ERROR && "Error occurred!"}
        &nbsp;
      </div>
      <button className="button" aria-label="New Game" onClick={newGame}>
        New Game
      </button>
    </div>
  );
}
