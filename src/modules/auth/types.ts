import { reducerActionType } from "../../utils/types";
import { UserType } from "../user/types";

export type AuthStateType = {
    isAuth: boolean;
    token: string | null;
    user: UserType | null;
}

export type AuthActionsType = {
    [key: string]: (state: AuthStateType, action: reducerActionType) => AuthStateType;
}