import * as React from 'react';
import { Card, Typography, Box, TextField, Button } from '@mui/material';
import { validateField, validateEmail, validatePassword } from '../../../../utils/validators/validators';
import { Link } from 'react-router-dom';
import Copyright from '../../../../utils/components/Copyright';

const SignInPage = () => {

    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [isFormValid, setIsFormValid] = React.useState(false);

    React.useEffect(() => {
        setIsFormValid(
            (emailError == null && passwordError == null)
            &&
            (email !== '' && password !== '')
        );
    }, [emailError, passwordError, email, password]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        validateField(event.target.value, [
            validateEmail
        ], (msg) => setEmailError(msg));
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        validateField(event.target.value, [
            validatePassword
        ], (msg) => {
            setPasswordError(msg);
        });
    }

    const handleSubmitLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
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
            <Card elevation={3} sx={{ p: 2, flexDirection: "column", width: 250 }}>

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
                    disabled={!isFormValid}
                >
                    Entrar
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
        </Box>
    );
}

export default SignInPage;