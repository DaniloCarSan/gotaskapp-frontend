import { createContext, useReducer } from 'react';

import { authInitialState } from "./modules/auth/reducer/initial_state";
import { authReducer } from "./modules/auth/reducer/reducer";
import { AuthStateType } from "./modules/auth/types";
import { reducerActionType } from "./utils/types";

type contextInitialStateType = {
    auth: AuthStateType;
};

type contextType = {
    state: contextInitialStateType;
    dispatch: React.Dispatch<any>;
}

type contextProviderType = {
    children: JSX.Element;
}

const contextInitialState: contextInitialStateType = {
    auth: authInitialState
};

export const AppContext = createContext<contextType>({
    state: contextInitialState,
    dispatch: () => null,
});

const combineReducers = (state: contextInitialStateType, action: reducerActionType) => ({
    auth: authReducer(state.auth, action)
});

export const AppContextProvider = ({ children }: contextProviderType) => {

    const [state, dispatch] = useReducer(combineReducers, contextInitialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}