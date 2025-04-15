import { DiasState, DiasActions, DiasActionTypes } from "./types";

export const initialState: DiasState = {
  dias: [],
};

export function reducer(state: DiasState, action: DiasActions): DiasState {
  switch (action.type) {
    case DiasActionTypes.SET_DIAS:
      return { ...state, dias: action.payload };
    default:
      return state;
  }
}
