import { Dia } from "@/src/model/days/days";

export enum DiasActionTypes {
  SET_DIAS = "SET_DIAS",
}

type SetDiasAction = {
  type: DiasActionTypes.SET_DIAS;
  payload: Dia[];
};

export type DiasActions = SetDiasAction;

export type DiasState = {
  dias: Dia[];
};

export type DiasDispatch = {
  state: DiasState;
  dispatch: React.Dispatch<DiasActions>;
};
