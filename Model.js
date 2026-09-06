class Utilisateur {
    constructor(nom,email,motDePasse){
        this.nom=nom;
        this.email=email;
        this.motDePasse=motDePasse;

    }
}

class Simulation{
    constructor(userName,paysName,simulationName,parametre){
        this.userName=userName;
        this.paysName=paysName;
        this.simulationName=simulationName;
        this.parametre=parametre;
       
    }
}

class ResultatJournalier{
    constructor(simulationName,jour,suspect,infecte,retabli){
        this.simulationName;
        this.jour=jour;
        this.suspect=suspect;
        this.infecte=infecte;
        this.retabli=retabli;

    }
}

class Pays {
    constructor(paysName,population){
        this.paysName=paysName;
        this.population=population;

    }
}

class Parametre {
    constructor(simulationName,beta,gamma,duree){
        this.simulationName=simulationName;
        this.beta=beta;
        this.gamma=gamma;
        this.duree=duree;

    }
}

class MethodeNumerique{
    constructor(nomMethode){
        this.nomMethode=nomMethode;

    }
}