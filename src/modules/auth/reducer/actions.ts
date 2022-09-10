import { AuthActionsType } from "../types";

const AuthActions: AuthActionsType = {
    'SIGN_IN_SUCCESS': (state, payload) => {
        return {
            ...state,
            isAuth: true,
            credential: payload.credential
        }
    },
    'SIGN_IN_FAILURE': (state, payload) => {
        return {
            ...state,
            isAuth: false,
            credential: null
        }
    }

};

export default AuthActions;