import { AxiosError, AxiosInstance } from "axios";

import IAuthApiDatasource from "../../domain/datasources/auth_api_datasource";
import IAuthRepository from "../../domain/repositories/auth_repository";
import { instance as instanceAuthApiDatasource } from "../datasources/auth_api_datasource";
import { instance as instanceAuthLocalDatasource } from "../datasources/auth_local_datasource";

import { Credential } from "../../domain/entities/credential";
import { auth } from "../../domain/entities/auth";
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

    async signIn(auth: auth): Promise<Credential> {
        var response = await this.apiDataSource.signIn(auth);

        this.setCredential(response);

        return response;
    }
}

export const instance = new AuthRepository(instanceAuthApiDatasource, instanceAuthLocalDatasource);