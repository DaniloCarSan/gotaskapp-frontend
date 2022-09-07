
import { emailRegex } from './regexs';

export type validatorType = (value: any) => string | null;

type callbackType = (value: any) => void;

export const validateField = (validate: any, validators: validatorType[], call?: callbackType) => {
    for (const validator of validators) {
        const error = validator(validate);
        if (error) {

            if (call) call(error);

            return error;
        }
    }
    if (call) call(null);

    return null;
}

export const validateEmail: validatorType = (email: string): string | null => {

    if (!email) {
        return 'Email obrigatório';
    }

    if (!emailRegex.test(email)) {
        return 'Email inválido';
    }

    return null;
}

export const validatePassword: validatorType = (password: string): string | null => {


    if (!password) {
        return 'Senha obrigatória';
    }

    if (password.length < 6) {
        return 'Senha deve ter no mínimo 6 caracteres';
    }

    return null;
}
