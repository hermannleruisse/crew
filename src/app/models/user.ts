import { Profile } from "./profile";

export class User {
    id: string;
    nom: string;
    prenom: string;
    username: string;
    password: string;
    profile: Profile;

    constructor(id:string, nom:string, prenom: string, username:string, password:string, profile:Profile){
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username
        this.password = password;
        this.profile = profile
    }
}