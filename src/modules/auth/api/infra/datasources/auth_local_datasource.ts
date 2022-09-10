import IAuthLocalDatasource from "../../domain/datasources/auth_local_datasource";
import { Credential } from "../../domain/entities/credential";

export class AuthLocalDatasource implements IAuthLocalDatasource {

    getCredential(): Credential | null {

        const credential = localStorage.getItem('credential');

        if (credential) {
            return JSON.parse(credential) as Credential;
        }

        return null;
    }

    setCredential(credential: Credential): void {
        localStorage.setItem('credential', JSON.stringify(credential));
    }

}

export const instance = new AuthLocalDatasource();