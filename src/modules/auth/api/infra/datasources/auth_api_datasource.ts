import IAuthApiDatasource from "../../domain/datasources/auth_api_datasource";
import Credential from "../../domain/entities/credential";
import Auth from "../../domain/entities/auth";
import User from "../../domain/entities/user";
import { AxiosInstance, AxiosError } from "axios";
import api from "../../../../../utils/helpers/axios";

export class AuthDatasource implements IAuthApiDatasource<AxiosInstance> {

    api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async signIn(auth: Auth): Promise<Credential> {
        try {
            const response = await this.api.post('/auth/sign/in', auth);
            return response.data as Credential;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw e.response?.data;
            }
            throw e;
        }
    }

    async signUp(user: User): Promise<void> {
        try {
            await this.api.post('/auth/sign/up', user);
        } catch (e) {
            if (e instanceof AxiosError) {
                throw e.response?.data;
            }
            throw e;
        }
    }

    async forgotPassword(email: string): Promise<void> {
        try {
            await this.api.post('/auth/send/email/password/reset', { email });
        } catch (e) {
            if (e instanceof AxiosError) {
                throw e.response?.data;
            }
            throw e;
        }
    }
}

export const instance = new AuthDatasource(api);