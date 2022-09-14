export type reducerActionType = {
    type: string;
    payload: {
        [key: string]: any;
    }
}

export type actionsType = {
    [key: string]: (payload: any) => reducerActionType;
}

export type ApiResponseType<T> = {
    status: boolean;
    code: string;
    message: string;
    data?: T;
}