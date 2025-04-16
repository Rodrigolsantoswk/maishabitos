import { TStateHabitRoutine, HabitoRotinaActionTypes, THabitRoutineActions } from "./types";

export const initialState: TStateHabitRoutine = {
  habitRoutines: [],
};

export function reducer(
  state: TStateHabitRoutine,
  action: THabitRoutineActions
): TStateHabitRoutine {
  switch (action.type) {
    case HabitoRotinaActionTypes.ADD_HABITROUTINE:
      return { ...state, habitRoutines: [...state.habitRoutines, action.payload] };

    case HabitoRotinaActionTypes.DELETE_HABITROUTINE:
      return {
        ...state,
        habitRoutines: state.habitRoutines.filter(hr => hr.habito_rotina_id !== action.payload),
      };

    case HabitoRotinaActionTypes.SET_ALL_HABITROUTINES:
      return {
        ...state,
        habitRoutines: action.payload,
      };

    default:
      return state;
  }
}
