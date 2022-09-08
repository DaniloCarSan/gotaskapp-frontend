import { AuthStateType } from "../types";

const AuthInitialState: AuthStateType = {
    isAuth: false,
    token: null,
    user: null,
};

export default AuthInitialState;