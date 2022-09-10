import { auth } from "../entities/auth";
import { Credential } from "../entities/credential";
import IAuthApiDatasource from "../datasources/auth_api_datasource";
import IAuthLocalDatasource from "../datasources/auth_local_datasource";

export default abstract class IAuthRepository<T> {
    abstract apiDataSource: IAuthApiDatasource<T>;
    abstract localDataSource: IAuthLocalDatasource;
    abstract setCredential: (credential: Credential) => void;
    abstract getCredential: () => Credential | null;
    abstract signIn(auth: auth): Promise<Credential>;
}