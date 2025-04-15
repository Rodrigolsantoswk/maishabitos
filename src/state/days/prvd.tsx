import { PropsWithChildren, useReducer } from "react";
import { DiasContext } from "./ctx";
import { initialState, reducer } from "./rdcer";

export function DiasProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DiasContext.Provider value={{ state, dispatch }}>
      {children}
    </DiasContext.Provider>
  );
}
