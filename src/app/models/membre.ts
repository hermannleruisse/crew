export class Membre {
    
    nom! : string;
    prenom! : string;
    sexe!: string;
    dateDeNaissance! : Date;
    adresse! : string;
    telephone? : string;
    photo? : string

    constructor(nom: string, prenom: string, sexe: string, dateDeNaissance: Date, adresse: string, telephone: string, photo: string){
        this.nom = nom,
        this.prenom = prenom,
        this.sexe = sexe,
        this.dateDeNaissance = dateDeNaissance,
        this.adresse = adresse,
        this.telephone = telephone,
        this.photo = photo
    }
}