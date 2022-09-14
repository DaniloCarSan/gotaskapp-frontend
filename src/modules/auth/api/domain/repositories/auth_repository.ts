import Auth from "../entities/auth";
import Credential from "../entities/credential";
import User from "../entities/user";
import IAuthApiDatasource from "../datasources/auth_api_datasource";
import IAuthLocalDatasource from "../datasources/auth_local_datasource";

export default abstract class IAuthRepository<T> {
    abstract apiDataSource: IAuthApiDatasource<T>;
    abstract localDataSource: IAuthLocalDatasource;
    abstract setCredential: (credential: Credential) => void;
    abstract getCredential: () => Credential | null;
    abstract signIn(auth: Auth): Promise<Credential>;
    abstract signOut(): void;
    abstract signUp(user: User): Promise<void>;
    abstract forgotPassword(email: string): Promise<void>;
}