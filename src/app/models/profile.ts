export class Profile {
    id?: string;
    code!: string;
    libelle!: string;
    description?: string;

    constructor(code: string, libelle: string, description: string, id?: string){
        this.code = code;
        this.libelle = libelle;
        this.description = description
        this.id = id;
    }
}