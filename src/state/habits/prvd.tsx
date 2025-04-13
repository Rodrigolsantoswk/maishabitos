import { PropsWithChildren, useReducer } from "react";
import { HabitRoutineContext } from "./ctx";
import { initialState, reducer } from "./rdcer";

export function HabitRoutineProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <HabitRoutineContext.Provider value={{ state, dispatch }}>
            {children}
        </HabitRoutineContext.Provider>
    );
}