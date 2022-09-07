import { AuthStateType } from "../types";

export const authInitialState: AuthStateType = {
    isAuth: false,
    token: null,
    user: null,
};