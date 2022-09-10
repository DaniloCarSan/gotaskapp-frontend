import { Credential } from "./api/domain/entities/credential";

export type AuthStateType = {
    isAuth: boolean;
    credential: Credential | null;
}

export type AuthActionsType = {
    [key: string]: (state: AuthStateType, payload: AuthStateType) => AuthStateType;
}