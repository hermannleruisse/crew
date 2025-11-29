import { Ministere } from "./ministere";

export class Membre {
    id: string;
    nom! : string;
    prenom! : string;
    sexe!: string;
    dateDeNaissance! : string;
    adresse! : string;
    ministere! : string;
    telephone? : string;
    photo? : string;

    constructor(id:string, nom: string, prenom: string, sexe: string, dateDeNaissance: string, adresse: string, telephone: string, ministere: string, photo: string){
        this.id = id;
        this.nom = nom,
        this.prenom = prenom,
        this.sexe = sexe,
        this.dateDeNaissance = dateDeNaissance,
        this.adresse = adresse,
        this.ministere = ministere,
        this.telephone = telephone,
        this.photo = photo
    }
}