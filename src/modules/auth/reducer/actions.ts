import { AuthActionsType } from "../types";

const AuthActions: AuthActionsType = {
    SET_IS_AUTH: (state, payload) => {
        return {
            ...state,
            isAuth: payload.isAuth,
        }
    }
};

export default AuthActions;