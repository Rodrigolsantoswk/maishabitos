import { THabitoRotinaAttr } from "@/src/model/habitRoutine";


export enum HabitoRotinaActionTypes {
    ADD_HABITROUTINE = "ADD_HABITROUTINE",
    DELETE_HABITROUTINE = "DELETE_HABITROUTINE"
}

type AddHabitRoutineAction ={
    type: HabitoRotinaActionTypes.ADD_HABITROUTINE;
    payload: THabitoRotinaAttr
}

type DeleteHabitRoutineAction ={
    type: HabitoRotinaActionTypes.DELETE_HABITROUTINE;
    payload: null
}

export type THabitRoutineActions = AddHabitRoutineAction | DeleteHabitRoutineAction;

export type TStateHabitRoutine ={
    HabitRoutine: THabitoRotinaAttr | null;
}

export type THabitRoutineDispatch = {
    state: TStateHabitRoutine;
    dispatch: React.Dispatch<THabitRoutineActions>
}
