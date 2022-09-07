import * as React from 'react';
import { Card, Typography, Box, TextField, Button } from '@mui/material';
import { validateField, validateEmail, validatePassword, validateOneWord } from '../../../../utils/validators/validators';
import { Link } from 'react-router-dom';
import Copyright from '../../../../utils/components/Copyright';

const SignUpPage = () => {

    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState<string | null>(null);
    const [lastName, setLastName] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [passwordConfirmError, setPasswordConfirmError] = React.useState<string | null>(null);
    const [isFormValid, setIsFormValid] = React.useState(false);

    React.useEffect(() => {
        setIsFormValid(
            (
                nameError == null &&
                lastNameError == null &&
                emailError == null &&
                passwordError == null && passwordConfirmError == null
            )
            &&
            (
                name !== '' &&
                lastName !== '' &&
                email !== '' &&
                password !== '' &&
                passwordConfirm !== ''
            )
        );
    }, [name, lastName, email, password, passwordConfirm, nameError, lastNameError, emailError, passwordError, passwordConfirmError]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        validateField(event.target.value, [
            validateOneWord
        ], (msg) => setNameError(msg));
    }

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        validateField(event.target.value, [
            validateOneWord
        ], (msg) => setLastNameError(msg));
    }

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

    const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);

        if (event.target.value !== password) {
            setPasswordConfirmError('senhas não coencidem');
        } else {
            setPasswordConfirmError(null);
        }
    }

    const handleSubmitLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

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
                    Resgistrar-se
                </Typography>

                <Box sx={{ height: 15 }} />

                <Typography variant="subtitle2" align='center' >
                    Preencha os dados abaixo para começar.
                </Typography>

                <TextField
                    label="Nome"
                    variant="outlined"
                    size="small"
                    type='text'
                    value={name}
                    required
                    error={nameError !== null}
                    helperText={nameError}
                    onChange={handleNameChange}
                    sx={{ width: '100%', mt: 2 }}
                />

                <TextField
                    label="Sobrenome"
                    variant="outlined"
                    size="small"
                    type='text'
                    value={lastName}
                    required
                    error={lastNameError !== null}
                    helperText={lastNameError}
                    onChange={handleLastNameChange}
                    sx={{ width: '100%', mt: 2 }}
                />

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

                <TextField
                    label="Confirme a senha"
                    type="password"
                    size="small"
                    variant="outlined"
                    value={passwordConfirm}
                    error={passwordConfirmError !== null}
                    helperText={passwordConfirmError}
                    required
                    onChange={handlePasswordConfirmChange}
                    sx={{ width: '100%', mt: 2 }}
                />

                <Button
                    variant="contained"
                    sx={{ width: '100%', mt: 2 }}
                    onClick={handleSubmitLogin}
                    disabled={!isFormValid}
                >
                    Criar conta
                </Button>

                <Box sx={{ height: 20 }} />

                <Typography align='center' fontSize={12} >
                    Já possui uma conta ? <Link to="/auth/sign/in" > Faça login </Link>
                </Typography>

            </Card>

            <Copyright />

        </Box>
    );
}

export default SignUpPage;