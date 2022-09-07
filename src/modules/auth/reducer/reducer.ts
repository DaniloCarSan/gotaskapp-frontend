import { reducerActionType } from "../../../utils/types";
import { AuthStateType } from "../types";
import authActions from "./actions";

const AuthReducer = (state: AuthStateType, action: reducerActionType) => {

    const exec = authActions[action.type];

    if (exec) {
        return exec(state, action.payload as AuthStateType);
    }

    return state;
}

export default AuthReducer;