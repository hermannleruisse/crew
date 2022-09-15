import { Ministere } from "./ministere";

export class Membre {
    id: string;
    nom! : string;
    prenom! : string;
    sexe!: string;
    dateDeNaissance! : Date;
    adresse! : string;
    ministere! : Ministere;
    telephone? : string;
    photo? : string

    constructor(id:string, nom: string, prenom: string, sexe: string, dateDeNaissance: Date, adresse: string, telephone: string, ministere: Ministere, photo: string){
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