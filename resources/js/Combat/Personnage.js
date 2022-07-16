class PERSO_Interface{
    Actif = -1;
    Taille = 0;
    NbPJ = 0;
    IndexPJ = new Array();
    Liste = new Array();
    constructor() {
    }
    AffecterBaseDonnee(PtrDonnee) {PERSO_AffecterBaseDonnee(PtrDonnee);}
    Initialiser() {PERSO_Initialiser();}
    Base(Index) {return(PERSO_BASE[Index]);}
    //NouveauActif() {PERSO_NouveauActif();}
    //NombrePJ() {return(Perso.NbPJ);}
    TypeFonction(Index) {return(PERSO_BASE[Index].id_fonction);}

    Nom(Index) {return(PERSO_BASE[Index].Nom);}
    Lettre(Index) {return(PERSO_BASE[Index].Lettre);}
    Gras(Index) {return(this.Lettre(Index) + ". <strong>" + this.Nom(Index) + "</strong>");}
    Mort(Index) {return(PERSO_DATA[Index].Mort);}
    Bloque(Index) {return(PERSO_DATA[Index].Bloque);}
    //ChangerEtat(Index, Mort) {PERSO_ChangerEtat(Index, Mort);}

    BonusAvant(Index) {return(PERSO_DATA[Index].BonusAvant);}

    //InitialiserNombreAction() {PERSO_InitialiserNombreAction();}
    //AffecterNombreAction(Index, NbAction) {PERSO_AffecterAction(Index, NbAction);}
    //NbAction(Index) {return(PERSO_DATA[Index].NbAction);}
    //NbActionMaxi(Index) {return(PERSO_DATA[Index].NbActionMaxi);}
    //UtiliserAction(Index) {PERSO_SupprimerAction(Index);}

    //NombreAdversaire(Index) {return(PERSO_NombreAdversaire(Index));}
    //Suivant() {return(PERSO_SuivantActif());}

    //Arme(Index, Numero) {return(PERSO_BASE[Index].Armes[Numero]);}
    //NombreArme(Index) {return(PERSO_BASE[Index].Armes.length);}
    //Bouclier(Index, Numero) {return(PERSO_BASE[Index].Boucliers[Numero]);}
}
var Perso            = new PERSO_Interface();

let PERSO_BASE       = new Array();
let PERSO_DATA       = new Array();

class PERSO_Bonus{
    Maxi = 0;
    Valeur = 0;
    Bonus = 0;
}
class PERSO_Donnee{
    //  Definition pour les données complementaires du personnage
    Mort = false;
    Bloque = false;

    //  Definition pour les actions
    NbAction = 0;
    NbActionMaxi = 0;

    // Etat de santé du perosnnage
    TabPV = new Array();
    TabPVMaxi = new Array();
    MalusPV = 0;

    //  Definition pour le bonus avant (CHI pour QIN, Maitrise pour Prothecy)
    BonusAvant = new PERSO_Bonus();

    PtrLigne;
    Afficher = true;
    constructor() {
    }
}

/***************************************************************************************/
/*      INITIALISATION DU PERSONNAGE
/***************************************************************************************/
function PERSO_AffecterBaseDonnee(PtrDonnee)
{
    PERSO_BASE = PtrDonnee;
    Perso.Taille = PERSO_BASE.length;
    Moteur.LancerModule("Initialisation");
}
function PERSO_Initialiser()
{
    Moteur.ArreterModule();
    MSG.Message("Initialisation des personnages.", true);
    MSG.Journal("Initialisation des Objets :");
    for(let Id = 0;Id < Perso.Taille;Id++)
    {
        MSG.Journal( "["+Id+"] " + Perso.Gras(Id), 1);
        let Ptr = new PERSO_Donnee();
        PERSO_DATA.push(Ptr);

        let Obj = document.querySelector("#Ligne-" + Id);
        Ptr.PtrLigne = Obj;


        if(Perso.TypeFonction(Id) == 0)
        {
            Perso.NbPJ++;
            Perso.IndexPJ.push(Id);
        }
    }
    PERSO_InitialiserListe();
    BonusAvant.Initialiser(Perso.Taille);
/***************************************************************************************/
/***************************************************************************************/
/******      MODE DEBUG                                                            *****/
/***************************************************************************************/
/***************************************************************************************/
Perso.Actif = 11;
PERSO_DATA[1].Bloque = true;
PERSO_DATA[2].Mort = true
PERSO_DATA[4].Bloque = true;
PERSO_DATA[4].Afficher = false;
PERSO_ActualiserListe();
/***************************************************************************************/
/***************************************************************************************/
}
function PERSO_InitialiserListe()
{
    Perso.Liste.push(new BOUTON_Gestion());
    Perso.Liste.push(new BOUTON_Gestion());

    let Obj = document.querySelector("#PNJ-Bas");
    Perso.Liste[0].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[0]);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#PNJ-Haut");
    Perso.Liste[0].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[0]);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#PJ-Bas");
    Perso.Liste[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[1]);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#PJ-Haut");
    Perso.Liste[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[1]);
    });
    BOUTON_Activer(Obj, true);

    Perso.Liste[0].Etat = true;
    Perso.Liste[1].Etat = true;
}
/***************************************************************************************/
/***************************************************************************************/
function PERSO_ActualiserListe()
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(Perso.TypeFonction(x) == 0)
        {
            PERSO_Actualiser(x, Perso.Liste[1].Etat);
        }
        else
        {
            PERSO_Actualiser(x, Perso.Liste[0].Etat);
        }
    }
    BOUTON_Activer(Perso.Liste[0].PtrBouton[0], !Perso.Liste[0].Etat);
    BOUTON_Activer(Perso.Liste[0].PtrBouton[1], Perso.Liste[0].Etat);
    BOUTON_Activer(Perso.Liste[1].PtrBouton[0], !Perso.Liste[1].Etat);
    BOUTON_Activer(Perso.Liste[1].PtrBouton[1], Perso.Liste[1].Etat);
}
function PERSO_Actualiser(Id, AfficherLigne)
{
    if(Perso.Actif == Id)
    {
        Objet.Couleur(PERSO_DATA[Id].PtrLigne, 1);
        Objet.Afficher(PERSO_DATA[Id].PtrLigne, true);
        return(0);
    }
    if(Perso.Mort(Id))
    {
        Objet.Couleur(PERSO_DATA[Id].PtrLigne, 2);
    }
    else
    {
        if(Perso.Bloque(Id))
        {
            Objet.Couleur(PERSO_DATA[Id].PtrLigne, -1);
        }
        else
        {
            Objet.Couleur(PERSO_DATA[Id].PtrLigne, 0);
        }
    }
    Objet.Afficher(PERSO_DATA[Id].PtrLigne, PERSO_DATA[Id].Afficher || AfficherLigne);
}
function PERSO_ChangerEtatListe(Ptr)
{
    Ptr.Etat = !Ptr.Etat;
    PERSO_ActualiserListe();
}
/***************************************************************************************/
/***************************************************************************************/
