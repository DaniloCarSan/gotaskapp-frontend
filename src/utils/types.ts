export type reducerActionType = {
    type: string;
    payload: {
        [key: string]: any;
    }
}

export type actionsType = {
    [key: string]: (payload: any) => reducerActionType;
}