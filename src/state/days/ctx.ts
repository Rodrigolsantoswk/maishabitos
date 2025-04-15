import { createContext, useContext } from "react";
import { DiasDispatch } from "./types";
import { initialState } from "./rdcer";

export const DiasContext = createContext<DiasDispatch | null>(null);

export function useDiasContext() {
  const value = useContext(DiasContext);
  const fallback: DiasDispatch = {
    state: initialState,
    dispatch: () => {},
  };

  if (process.env.NODE_ENV !== "production" && !value) {
    throw new Error("useDiasContext precisa estar dentro do DiasProvider");
  }

  return value ?? fallback;
}
