import { AuthActionsType } from "../types";

export const actions: AuthActionsType = {
    SET_IS_AUTH: (state, payload) => {
        return {
            ...state,
            isAuth: payload.payload.isAuth,
        }
    }
};