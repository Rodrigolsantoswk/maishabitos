import { useContext, createContext } from "react";
import { THabitRoutineDispatch} from "./types";
import { initialState } from "./rdcer";

export const HabitRoutineContext = createContext<THabitRoutineDispatch | null>(null);

export function useContextHabitRoutine() {
    const value = useContext(HabitRoutineContext);

    const nullDispatch: THabitRoutineDispatch = {
        state: initialState,
        dispatch: () => {},
    };

    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error("useContextUser must be wrapped in a <UserProvider />");
        }
    }

    return value ? value : nullDispatch;
}