import Auth from "../entities/auth";
import User from "../entities/user";
import Credential from "../entities/credential";

export default abstract class IAuthApiDatasource<Api> {
    abstract api: Api;
    abstract signIn(auth: Auth): Promise<Credential>;
    abstract signUp(user: User): Promise<void>;
    abstract forgotPassword(email: string): Promise<void>;
    abstract emailVerification(email: string): Promise<void>;
}

