import { TStateUser, TUserActions, UserActionTypes } from "./types";

export const initialState: TStateUser = {
  user: null,
};

export function reducer(state: TStateUser, action: TUserActions): TStateUser {
  switch (action.type) {
    case UserActionTypes.DELETE_USER:
      return { ...state, user: null };
    default:
      return { ...state };
  }
}
