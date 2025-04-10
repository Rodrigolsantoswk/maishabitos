import { TUserAttr } from "@/src/model/user";

export enum UserActionTypes {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
}

type AddUserAction = {
  type: UserActionTypes.ADD_USER;
  payload: TUserAttr;
};

type DeleteUserAction = {
  type: UserActionTypes.DELETE_USER;
  payload: null;
};

export type TUserActions = AddUserAction | DeleteUserAction;

export type TStateUser = {
  user: TUserAttr | null;
};

export type TUserDispatch = {
  state: TStateUser;
  dispatch: React.Dispatch<TUserActions>;
};
