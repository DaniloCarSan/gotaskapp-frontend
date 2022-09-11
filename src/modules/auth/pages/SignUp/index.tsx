import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography, Box, TextField, Button } from '@mui/material';

import { validateField, validateEmail, validatePassword, validateOneWord } from '../../../../utils/validators/validators';
import Copyright from '../../../../utils/components/Copyright';

import { instance as authRepository } from '../../api/infra/repositories/auth_repository';

const SignUpPage = () => {

    const navigate = useNavigate();

    const [isFormValid, setIsFormValid] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    /**
     *  Form fields 
    */
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    /**
     *  Form fields errors 
    */
    const [firstNameError, setFirstNameError] = React.useState<string | null>(null);
    const [lastNameError, setLastNameError] = React.useState<string | null>(null);
    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [passwordConfirmError, setPasswordConfirmError] = React.useState<string | null>(null);

    /**
     * Check if form is valid
    */
    React.useEffect(() => {
        setIsFormValid(
            (
                firstNameError == null &&
                lastNameError == null &&
                emailError == null &&
                passwordError == null && passwordConfirmError == null
            )
            &&
            (
                firstName !== '' &&
                lastName !== '' &&
                email !== '' &&
                password !== '' &&
                passwordConfirm !== ''
            )
        );
    }, [firstName, lastName, email, password, passwordConfirm, firstNameError, lastNameError, emailError, passwordError, passwordConfirmError]);

    /*
     * Set and validate first name
    */
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
        validateField(event.target.value, [
            validateOneWord
        ], (msg) => setFirstNameError(msg));
    }

    /*
    * Set and validate last name
    */
    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
        validateField(event.target.value, [
            validateOneWord
        ], (msg) => setLastNameError(msg));
    }

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

    /*
    * Set and validate password confirm
    */
    const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);

        if (event.target.value !== password) {
            setPasswordConfirmError('senhas não coencidem');
        } else {
            setPasswordConfirmError(null);
        }
    }
    /*
    * Handle form submit
    */
    const handleSubmitSignUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        authRepository.signUp({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
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
                    value={firstName}
                    required
                    error={firstNameError !== null}
                    helperText={firstNameError}
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
                    onClick={handleSubmitSignUp}
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