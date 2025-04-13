import { TStateHabitRoutine, HabitoRotinaActionTypes, THabitRoutineActions } from "./types";

export const initialState: TStateHabitRoutine = {
    HabitRoutine: null,
}; 

export function reducer(state: TStateHabitRoutine, action: THabitRoutineActions): TStateHabitRoutine {
  switch (action.type) {
    case HabitoRotinaActionTypes.ADD_HABITROUTINE:
      return { ...state, HabitRoutine: action.payload };
    case HabitoRotinaActionTypes.DELETE_HABITROUTINE:
      return { ...state, HabitRoutine: null };
    default:
      return { ...state };
  }
}
