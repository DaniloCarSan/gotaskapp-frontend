import { Credential } from "../entities/credential";

export default interface IAuthLocalDatasource {
    setCredential: (credential: Credential) => void;
    getCredential: () => Credential | null;
}

