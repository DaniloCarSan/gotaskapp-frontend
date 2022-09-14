import { AxiosInstance } from "axios";

import IAuthApiDatasource from "../../domain/datasources/auth_api_datasource";
import IAuthRepository from "../../domain/repositories/auth_repository";
import { instance as instanceAuthApiDatasource } from "../datasources/auth_api_datasource";
import { instance as instanceAuthLocalDatasource } from "../datasources/auth_local_datasource";

import Credential from "../../domain/entities/credential";
import Auth from "../../domain/entities/auth";
import User from "../../domain/entities/user";
import IAuthLocalDatasource from "../../domain/datasources/auth_local_datasource";

export class AuthRepository implements IAuthRepository<AxiosInstance> {

    apiDataSource: IAuthApiDatasource<AxiosInstance>;

    localDataSource: IAuthLocalDatasource;

    constructor(apiDataSource: IAuthApiDatasource<AxiosInstance>, localDataSource: IAuthLocalDatasource) {
        this.apiDataSource = apiDataSource;
        this.localDataSource = localDataSource;
    }

    setCredential(credential: Credential) {
        this.localDataSource.setCredential(credential);
    }

    getCredential(): Credential | null {
        return this.localDataSource.getCredential();
    }

    async signIn(auth: Auth): Promise<Credential> {
        var response = await this.apiDataSource.signIn(auth);

        this.setCredential(response);

        return response;
    }

    signOut(): void {
        this.localDataSource.signOut();
    }

    async signUp(user: User): Promise<void> {
        return await this.apiDataSource.signUp(user);
    }

    async forgotPassword(email: string): Promise<void> {
        return await this.apiDataSource.forgotPassword(email);
    }

    async emailVerification(email: string): Promise<void> {
        return await this.apiDataSource.emailVerification(email);
    }
}

export const instance = new AuthRepository(instanceAuthApiDatasource, instanceAuthLocalDatasource);