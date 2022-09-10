import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../../context";

import { instance as authRepository } from "../../../modules/auth/api/infra/repositories/auth_repository";

type paramsType = {
    children: JSX.Element;
}

const AuthenticatedRoute = ({ children }: paramsType) => {

    const { state, dispatch } = React.useContext(AppContext);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        if (!state.auth.isAuth) {
            var credential = authRepository.getCredential();

            if (credential !== null) {
                dispatch({
                    type: 'SIGN_IN_SUCCESS',
                    payload: {
                        credential: authRepository.getCredential()
                    }
                });
            } else {
                dispatch({
                    type: 'SIGN_IN_FAILURE',
                    payload: {
                        credential: null
                    }
                });
            }
        }
        setLoading(false);
    }, [state.auth.isAuth, dispatch]);

    if (loading) {
        return <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Autenticando aguarde...</Typography>
        </Box>;
    }

    return (<>
        {state.auth.isAuth ? children : <Navigate to="/auth/sign/in" />}
    </>
    );
};

export default AuthenticatedRoute;