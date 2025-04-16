import { Dia, TDiaAttr } from "@/src/model/days/days";

export enum DiasActionTypes {
  SET_DIAS = "SET_DIAS",
}

type SetDiasAction = {
  type: DiasActionTypes.SET_DIAS;
  payload: TDiaAttr[];
};

export type DiasActions = SetDiasAction;

export type DiasState = {
  dias: TDiaAttr[];
};

export type DiasDispatch = {
  state: DiasState;
  dispatch: React.Dispatch<DiasActions>;
};
