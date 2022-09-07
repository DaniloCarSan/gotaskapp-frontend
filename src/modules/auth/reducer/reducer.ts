import { reducerActionType } from "../../../utils/types";
import { AuthStateType } from "../types";
import { actions } from "./actions";

export const authReducer = (state: AuthStateType, action: reducerActionType) => {

    const exec = actions[action.type];

    if (exec) {
        return exec(state, action);
    }

    return state;
}