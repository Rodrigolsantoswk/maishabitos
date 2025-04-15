import { THabitoRotinaAttr } from "@/src/model/habitRoutine";


export enum HabitoRotinaActionTypes {
    ADD_HABITROUTINE = "ADD_HABITROUTINE",
    DELETE_HABITROUTINE = "DELETE_HABITROUTINE",
    SET_ALL_HABITROUTINES = "SET_ALL_HABITROUTINES"
}

type AddHabitRoutineAction = {
    type: HabitoRotinaActionTypes.ADD_HABITROUTINE;
    payload: THabitoRotinaAttr;
};

type DeleteHabitRoutineAction = {
    type: HabitoRotinaActionTypes.DELETE_HABITROUTINE;
    payload: string;
};

type SetAllHabitRoutinesAction = {
    type: HabitoRotinaActionTypes.SET_ALL_HABITROUTINES;
    payload: THabitoRotinaAttr[];
};

export type THabitRoutineActions =
    | AddHabitRoutineAction
    | DeleteHabitRoutineAction
    | SetAllHabitRoutinesAction;

export type TStateHabitRoutine = {
    habitRoutines: THabitoRotinaAttr[];
};

export type THabitRoutineDispatch = {
    state: TStateHabitRoutine;
    dispatch: React.Dispatch<THabitRoutineActions>
}
