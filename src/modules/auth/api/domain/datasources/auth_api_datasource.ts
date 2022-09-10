import { auth } from "../entities/auth";
import { Credential } from "../entities/credential";

export default abstract class IAuthApiDatasource<Api> {
    abstract api: Api;
    abstract signIn(auth: auth): Promise<Credential>;
}

