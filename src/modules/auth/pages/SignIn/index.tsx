import * as React from 'react';
import { Card, Typography, Box, TextField, Button, CircularProgress, Alert, Snackbar } from '@mui/material';
import { validateField, validateEmail, validatePassword } from '../../../../utils/validators/validators';
import { Link, useNavigate } from 'react-router-dom';
import Copyright from '../../../../utils/components/Copyright';

import { AppContext } from '../../../../context';

import { instance as authRepository } from '../../api/infra/repositories/auth_repository';
import { ApiResponseType } from '../../../../utils/types';

const SignInPage = () => {

    const navigate = useNavigate();
    const { state, dispatch } = React.useContext(AppContext);

    const [isFormValid, setIsFormValid] = React.useState(false);

    const [loadingSignIn, setLoadingSignin] = React.useState(false);
    const [loadingEmailVerification, setLoadingEmailVerification] = React.useState(false);

    const [responseSignIn, setResponseSignIn] = React.useState<ApiResponseType<any> | null>(null);
    const [responseEmailVerification, setResponseEmailVerification] = React.useState<ApiResponseType<any> | null>(null);

    /**
     * Form fields
    */
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    /**
     * Form fields errors 
    */
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    /**
     * Redirect to home if user is already logged in 
    */
    React.useEffect(() => {
        if (state.auth.isAuth) {
            navigate('/');
        }
    }, [state.auth.isAuth, navigate]);

    /**
     * Check if form is valid
    */
    React.useEffect(() => {
        setIsFormValid(
            (emailError == null && passwordError == null)
            &&
            (email !== '' && password !== '')
        );
    }, [emailError, passwordError, email, password]);

    /**
     * Set and validate email
    */
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateField(event.target.value, [
            validateEmail
        ], (msg) => setEmailError(msg));
    }

    /**
     * Set and validate password
    */
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validateField(event.target.value, [
            validatePassword
        ], (msg) => {
            setPasswordError(msg);
        });
    }

    /**
     * Handle form submit
    */
    const handleSubmitLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setLoadingSignin(true);
        authRepository.signIn({
            email,
            password
        }).then((credential) => {
            setResponseSignIn({
                status: true,
                message: 'Login successful',
                data: credential,
                code: "SUCCESS"
            });
            setLoadingSignin(false);
            dispatch({
                type: 'SIGN_IN_SUCCESS',
                payload: {
                    isAuth: true,
                    credential: credential
                }
            });
            navigate('/', { replace: true });
        }).catch((error) => {
            setLoadingSignin(false);
            setResponseSignIn(error);
        });
    }

    /*
    * Handle email verification
    */
    const handleEmailVerification = () => {
        setLoadingEmailVerification(true);
        authRepository.emailVerification(
            email
        ).then(() => {
            setResponseSignIn(null);
            setLoadingEmailVerification(false);
            setResponseEmailVerification({
                status: true,
                message: "A link has been sent to your email, if it's not in your inbox check your box span.",
                data: null,
                code: "SUCCESS"
            });
        }).catch((error: ApiResponseType<any>) => {
            setLoadingEmailVerification(false);
            setResponseEmailVerification(error);
        });
    }

    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'grey.300',
        }}>
            <Card elevation={3} sx={{ p: 2, flexDirection: "column", width: 300 }}>

                <Typography variant="h6" align='center' fontWeight='bold'>
                    Login
                </Typography>

                <Box sx={{ height: 15 }} />

                <Typography variant="subtitle2" align='center' >
                    Faça login com seu endereço de e-mail e senha.
                </Typography>

                <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    type="email"
                    value={email}
                    required
                    error={emailError !== null}
                    helperText={emailError}
                    onChange={handleEmailChange}
                    sx={{ width: '100%', mt: 2 }}
                />

                <TextField
                    label="Senha"
                    type="password"
                    size="small"
                    variant="outlined"
                    value={password}
                    error={passwordError !== null}
                    helperText={passwordError}
                    required
                    onChange={handlePasswordChange}
                    sx={{ width: '100%', mt: 2 }}
                />

                <Button
                    variant="contained"
                    sx={{ width: '100%', mt: 2 }}
                    onClick={handleSubmitLogin}
                    disabled={!isFormValid || loadingSignIn}
                >
                    {loadingSignIn ? <CircularProgress color='primary' size={23} /> : 'Entrar'}
                </Button>

                <Box sx={{ height: 20 }} />

                <Typography align='center' fontSize={12} >
                    Não possui uma conta ? <Link to="/auth/sign/up" > <b>Cadastre-se</b> </Link>
                </Typography>

                <Box sx={{ height: 20 }} />

                <Typography align='center' fontSize={12} fontWeight='bold' >
                    <Link to="/auth/forgot/password" > Esqueceu sua senha ? </Link>
                </Typography>

            </Card>
            <Copyright />

            {responseSignIn != null && (responseSignIn?.status ? <Snackbar
                open={true}
                autoHideDuration={8000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                onClose={() => setResponseSignIn(null)}
            >
                <Alert severity="error" >
                    {responseSignIn.message}
                </Alert>
            </Snackbar> : null
            )}

            {responseSignIn != null && <Snackbar
                open={true}
                autoHideDuration={8000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                onClose={() => setResponseEmailVerification(null)}
            >
                <Alert
                    severity="error"
                    action={!loadingEmailVerification && responseSignIn.code === "EMAIL_NOT_VERIFIED" ? <Button
                        color="error"
                        size="small"
                        onClick={handleEmailVerification}
                    >
                        Get link
                    </Button> : <CircularProgress color='primary' size={23} />
                    }
                >
                    {responseSignIn.message}
                </Alert>
            </Snackbar>}

            {responseEmailVerification != null && <Snackbar
                open={true}
                autoHideDuration={8000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                onClose={() => setResponseEmailVerification(null)}
            >
                <Alert severity={responseEmailVerification.status ? "success" : "error"} >
                    {responseEmailVerification.message}
                </Alert>
            </Snackbar>}

        </Box>
    );
}

export default SignInPage;