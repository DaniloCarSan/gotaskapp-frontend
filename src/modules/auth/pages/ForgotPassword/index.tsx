import * as React from 'react';
import { Card, Typography, Box, TextField, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { validateField, validateEmail } from '../../../../utils/validators/validators';
import { Link } from 'react-router-dom';

import Copyright from '../../../../utils/components/Copyright';
import ForgotPasswordDialogSuccess from './Components/FortgotPasswordDialogSuccess';

import { instance as authRepository } from '../../api/infra/repositories/auth_repository';

const ForgotPasswordPage = () => {

    const [isFormValid, setIsFormValid] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    /**
     * Form fields
    */
    const [email, setEmail] = React.useState('');

    /*
    * Form fields errors
    */
    const [emailError, setEmailError] = React.useState<string | null>(null);

    /**
     * Check if form is valid
    */
    React.useEffect(() => {
        setIsFormValid(emailError == null && email !== '');
    }, [email, emailError]);

    /*
    * Set and validate email
    */
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateField(event.target.value, [
            validateEmail
        ], (msg) => setEmailError(msg));
    }
    /*
    * Handle form submit
    */
    const handleSubmitForgotPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setLoading(true);
        authRepository.forgotPassword(email)
            .then(() => {
                setLoading(false);
                setSuccess(true);
                setEmail('');
            })
            .catch((error) => {
                setLoading(false);
                if (error) {
                    setError(error.message);
                } else {
                    setError('Unknown error');
                }
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
                    Esqueci a senha
                </Typography>

                <Box sx={{ height: 15 }} />

                <Typography variant="subtitle2" align='center' >
                    Digite seu e-mail para recuperar sua senha.
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

                <Button
                    variant="contained"
                    sx={{ width: '100%', mt: 2 }}
                    onClick={handleSubmitForgotPassword}
                    disabled={!isFormValid || loading}
                >
                    {loading ? <CircularProgress color='primary' size={23} /> : 'Resetar senha'}
                </Button>

                <Box sx={{ height: 20 }} />

                <Typography align='center' fontSize={12} >
                    <Link to="/auth/sign/in" > Voltar </Link>
                </Typography>

                <Snackbar
                    open={error != null}
                    autoHideDuration={5000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    onClose={() => setError(null)}  >
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Snackbar>

            </Card>

            <Copyright />

            {success && <ForgotPasswordDialogSuccess />}
        </Box>
    );
}

export default ForgotPasswordPage;