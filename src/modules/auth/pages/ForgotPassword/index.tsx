import * as React from 'react';
import { Card, Typography, Box, TextField, Button } from '@mui/material';
import { validateField, validateEmail } from '../../../../utils/validators/validators';
import { Link } from 'react-router-dom';
import Copyright from '../../../../utils/components/Copyright';

const ForgotPasswordPage = () => {

    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [isFormValid, setIsFormValid] = React.useState(false);

    React.useEffect(() => {
        setIsFormValid(emailError == null && email !== '');
    }, [email, emailError]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateField(event.target.value, [
            validateEmail
        ], (msg) => setEmailError(msg));
    }

    const handleSubmitForgotPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

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
                    disabled={!isFormValid}
                >
                    Resetar senha
                </Button>

                <Box sx={{ height: 20 }} />

                <Typography align='center' fontSize={12} >
                    <Link to="/auth/sign/in" > Voltar </Link>
                </Typography>

            </Card>
            <Copyright />
        </Box>
    );
}

export default ForgotPasswordPage;