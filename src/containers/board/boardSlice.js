import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initState = {
  playCard: "X",
  board: "---------",
  boardUrl: null,
  isSubmitting: false,
  submitResponse: null,
  submitError: null,
};

export const boardSlice = createSlice({
  name: "board",
  initialState: initState,
  reducers: {
    setBoardValue: (state, action) => {
      state.board = action.payload;
    },
    setNewGame: (state) => {
      state.board = initState.board;
      state.playCard = initState.playCard;
      state.boardUrl = initState.boardUrl;
      state.submitResponse = initState.submitResponse;
      state.submitError = initState.submitError;
      state.isSubmitting = initState.isSubmitting;
    },
    putMoveStarted: (state) => {
      state.isSubmitting = true;
    },
    setSubmitResponse: (state, action) => {
      state.submitResponse = action.payload;
      state.isSubmitting = false;
      if (action.payload && typeof action.payload.location !== "undefined") {
        state.boardUrl = action.payload.location;
      }
      if (action.payload && typeof action.payload.board !== "undefined") {
        state.board = action.payload.board;
      }
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
      state.isSubmitting = false;
    },
  },
});

export const { setBoardValue, setNewGame } = boardSlice.actions;

export const selectBoard = (state) => state.board;
export const selectBoardUrl = (state) => state.board.boardUrl;
export const selectPlayCard = (state) => state.board.playCard;
export const selectSubmitResponse = (state) => state.board.submitResponse;
export const selectSubmitError = (state) => state.board.submitError;
export const selectSubmitting = (state) => state.board.isSubmitting;

export const getNewGame = createAsyncThunk(
  "board/getNewGame",
  async (args, thunkAPI) => {
    thunkAPI.dispatch(boardSlice.actions.putMoveStarted());

    axios
      .get(args.location)
      .then((res) => {
        thunkAPI.dispatch(boardSlice.actions.setSubmitResponse(res.data));
      })
      .catch((err) => {
        thunkAPI.dispatch(boardSlice.actions.setSubmitError(err.message));
      });
  }
);

export const putMoveToApi = createAsyncThunk(
  "board/putMoveToApi",
  async (args, thunkAPI) => {
    const method = args.boardUrl ? "put" : "post";
    const url = args.boardUrl || `/api/v1/games`;
    const board = args.newBoard;

    thunkAPI.dispatch(boardSlice.actions.putMoveStarted());

    axios[method](url, {
      board,
    })
      .then((res) => {
        thunkAPI.dispatch(boardSlice.actions.setSubmitResponse(res.data));
        if (res.data && typeof res.data.location != "undefined") {
          thunkAPI.dispatch(getNewGame({ location: res.data.location }));
        }
      })
      .catch((err) => {
        thunkAPI.dispatch(boardSlice.actions.setSubmitError(err.message));
      });
  }
);

export default boardSlice.reducer;
