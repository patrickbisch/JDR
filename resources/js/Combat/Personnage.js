class PERSO_Interface{
    Actif = -1;
    Taille = 0;
    IndexPJ = new Array();
    Liste = new Array();
    constructor() {
    }
    AffecterBaseDonnee(PtrDonnee) {PERSO_AffecterBaseDonnee(PtrDonnee);}
    Initialiser() {PERSO_Initialiser();}
    Base(Index) {return(PERSO_BASE[Index]);}
    //NouveauActif() {PERSO_NouveauActif();}
    TypeFonction(Index) {return(PERSO_BASE[Index].id_fonction);}

    Nom(Index) {return(PERSO_BASE[Index].Nom);}
    Lettre(Index) {return(PERSO_BASE[Index].Lettre);}
    Gras(Index) {return(this.Lettre(Index) + ". <strong>" + this.Nom(Index) + "</strong>");}
    Mort(Index) {return(PERSO_DATA[Index].Mort);}
    BloquerPNJ(Etat) {PERSO_BloquerPNJ(Etat);}
    Bloque(Index) {return(PERSO_DATA[Index].Bloque);}
    ChangerEtat(Index, Mort) {PERSO_ChangerEtat(Index, Mort);}
    AjouterAttaque(Index, AttaqueCaC) {PERSO_AjouterAttaque(Index, AttaqueCaC);}

    BonusAvant(Index) {return(PERSO_DATA[Index].BonusAvant);}

    //InitialiserNombreAction() {PERSO_InitialiserNombreAction();}
    AffecterNombreAction(Index, NbAction) {PERSO_AffecterAction(Index, NbAction);}
    NbAction(Index) {return(PERSO_DATA[Index].NbAction);}
    NbActionMaxi(Index) {return(PERSO_DATA[Index].NbActionMaxi);}
    UtiliserAction(Index) {PERSO_SupprimerAction(Index);}

    NombreAdversaire(Index) {return(PERSO_NombreAdversaire(Index));}
    //Suivant() {return(PERSO_SuivantActif());}

    Arme(Index, Numero) {return(PERSO_BASE[Index].Armes[Numero]);}
    NombreArme(Index) {return(PERSO_BASE[Index].Armes.length);}
    Bouclier(Index, Numero) {return(PERSO_BASE[Index].Boucliers[Numero]);}
    NombreBouclier(Index) {return(PERSO_BASE[Index].Boucliers.length);}
    Armure(Index, Numero) {return(PERSO_BASE[Index].Armures[Numero]);}
    InitialiserAllonge(Index, AllongeCC, AllongeDis) {PERSO_InitialiserAllonge(Index, AllongeCC, AllongeDis);}
    Allonge(Index, CorpsCorps) {return(PERSO_Allonge(Index, CorpsCorps));}
}
var Perso            = new PERSO_Interface();

let PERSO_BASE       = new Array();
var PERSO_DATA       = new Array();

class PERSO_Bonus{
    Maxi = 0;
    Valeur = 0;
    Bonus = 0;
}
class PERSO_Donnee{
    //  Definition pour les données complementaires du personnage
    Mort = false;
    Bloque = false;

    //  Aptitudes pour le combat
    Vigilant = false;       //  TAG indiquant si le personnage est Vigilant
    BonusProtection = 0;    //  Bonus de protection (TAO Defense renforcee)  
    BonusAttaqueCC = 0;     
    BonusAttaqueD = 0;      
    BonusDefense = 0;       //  Bonus pour la defense (TAO Parade renforcé)
    BonusDegat = 0;         //  Bonus pour les degats (TAO Brise legere)
    CaracAttaqueCC = 0;
    CaracAttaqueD = 0;
    BonusCaracDefense = 0;  //  (EAU) Bonus caracteristique pour la defense

    AttaqueCC = 0;
    AttaqueDis = 0;

    AllongeCC = 1;          //  Distance de touche au Corps a Corps
    AllongeDis = 0;         //  Distance pour les armes de jet

    //  Definition pour les actions
    PtrLabelAction;
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
        Ptr.PtrLigne.addEventListener('click', function(e){
            e.preventDefault();
            PERSO_ActiverPersonnage(Id);
        });

        Obj = document.querySelector("#NbAction-" + Id);
        Ptr.PtrLabelAction = Obj;

        if(Perso.TypeFonction(Id) == 0)
        {
            Perso.IndexPJ.push(Id);
        }
    }
    for(let Id = 0;Id < Perso.Taille;Id++)
    {
        let Boucle = 1;
        switch(Perso.TypeFonction(Id))
        {
            case 4:
            case 5:
            case 6:
                Boucle = Perso.IndexPJ.length;
                break;
        }
        for(let y = 0;y < Boucle;y++)
        {
            PERSO_DATA[Id].TabPV[y] = PERSO_BASE[Id].PV.split("/");
        }
        PERSO_DATA[Id].TabPVMaxi = PERSO_BASE[Id].PV.split("/");
    }
    PERSO_InitialiserListe();
    Cartographie.Initialiser(Perso.Taille);
    BonusExceptionnel.Initialiser();
    Caracteristique.Initialiser(Perso.Taille);
    BonusAvant.Initialiser(Perso.Taille);
    DefensePassive.Initialiser(Perso.Taille);
    Equipement.Initialiser(Perso.Taille);
    Action.Initialiser(Perso.Taille);
    Attaque.Initialiser(Perso.Taille);
    Defense.Initialiser(Perso.Taille);
    Init.Initialiser(Perso.Taille);
    PV.Initialiser(Perso.Taille);
    Cible.Initialiser(Perso.Taille);
    Tao.Initialiser(Perso.Taille);
    JDR_InitialiserBonusPersonnage();
/***************************************************************************************/
/***************************************************************************************/
/******      MODE DEBUG                                                            *****/
/***************************************************************************************/
/***************************************************************************************/
//Perso.Actif = 11;
//PERSO_DATA[1].Bloque = true;
//PERSO_DATA[2].Mort = true
//PERSO_DATA[4].Bloque = true;
//PERSO_DATA[4].Afficher = false;
//PERSO_DATA[3].MalusPV = -1;
//PERSO_DATA[5].MalusPV = -3;
//PERSO_DATA[6].MalusPV = -5;
//CARTE_Debug();
/***************************************************************************************/
/***************************************************************************************/
    Moteur.LancerModule("Equipement");
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
    Bouton.Activer(Obj, false);

    Obj = document.querySelector("#PNJ-Haut");
    Perso.Liste[0].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[0]);
    });
    Bouton.Activer(Obj, false);

    Obj = document.querySelector("#PJ-Bas");
    Perso.Liste[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[1]);
    });
    Bouton.Activer(Obj, false);

    Obj = document.querySelector("#PJ-Haut");
    Perso.Liste[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        PERSO_ChangerEtatListe(Perso.Liste[1]);
    });
    Bouton.Activer(Obj, false);

    Perso.Liste[0].Etat = true;
    Perso.Liste[1].Etat = true;
    Perso.Liste[0].Valide = false;
    Perso.Liste[1].Valide = false;
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
    Bouton.Activer(Perso.Liste[0].PtrBouton[0], !Perso.Liste[0].Etat && Perso.Liste[0].Valide);
    Bouton.Activer(Perso.Liste[0].PtrBouton[1], Perso.Liste[0].Etat && Perso.Liste[0].Valide);
    Bouton.Activer(Perso.Liste[1].PtrBouton[0], !Perso.Liste[1].Etat && Perso.Liste[1].Valide);
    Bouton.Activer(Perso.Liste[1].PtrBouton[1], Perso.Liste[1].Etat && Perso.Liste[1].Valide);
}
function PERSO_Actualiser(Id, AfficherLigne)
{
    Objet.Afficher(PERSO_DATA[Id].PtrLigne, true);
    if(Perso.Actif == Id)
    {
        Objet.Couleur(PERSO_DATA[Id].PtrLigne, 1);
        Objet.Afficher(PERSO_DATA[Id].PtrLigne, true);
        return(0);
    }
    if(Cible.Active == Id)
    {
        Objet.Couleur(PERSO_DATA[Id].PtrLigne, 3);
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
function PERSO_AffecterAction(Index, NombreAction)
{
    if(Perso.NbActionMaxi(Index) == NombreAction)
    {
        return(0);
    }
    let Nb = Perso.NbActionMaxi(Index) - Perso.NbAction(Index);
    PERSO_DATA[Index].NbActionMaxi = NombreAction;

    PERSO_DATA[Index].NbAction = Perso.NbActionMaxi(Index) - Nb;
    if(parseInt(Perso.NbAction(Index)) > parseInt(Perso.NbActionMaxi(Index)))
    {
        PERSO_DATA[Index].NbAction = Perso.NbActionMaxi(Index);
    }
    if(parseInt(Perso.NbAction(Index)) < 0)
    {
        PERSO_DATA[Index].NbAction = 0;
    }
    PERSO_AfficherNombreAction(Index);
}
function PERSO_AfficherNombreAction(Index)
{
    PERSO_DATA[Index].PtrLabelAction.innerHTML = Perso.NbAction(Index) +
                                        "/" + Perso.NbActionMaxi(Index);
}
function PERSO_AjouterAttaque(Index, AttaqueCC)
{
    let TypeAtt = PERSO_DATA[Index].AttaqueCC - PERSO_DATA[Index].AttaqueDis;
    if(AttaqueCC)
    {
        PERSO_DATA[Index].AttaqueCC++;
    }
    else
    {
        PERSO_DATA[Index].AttaqueDis++;
    }
    if(TypeAtt == 0)
    {
        let Nb = Equipement.ArmeSelectionne(Index);
        if(Nb >= 0)
        {
            let Arme = Perso.Arme(Index, Nb);
            let Maxi = Arme.MaitriseD + 1
            if(AttaqueCC)
            {
                Maxi = Arme.MaitriseCC + 1;
            }
            if(Perso.NbActionMaxi(Index) != Maxi)
            {
                PERSO_AffecterAction(Index, Maxi);            
            }
        }
    }
}
function PERSO_NombreAdversaire(Index)
{
    let Nb = 0;
    let Id = Perso.TypeFonction(Index);
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        if(((Id == 0) && (Perso.TypeFonction(x) != Id)) ||
            ((Id != 0) && (Perso.TypeFonction(x) == 0)))
        {
            if(!Perso.Mort(x))
            {
                Nb++;
            }
        }
    }
    return(Nb);
}
function PERSO_SupprimerAction(Index)
{
    PERSO_DATA[Index].NbAction--;
    if(Perso.NbAction(Index) < 0)
    {
        PERSO_DATA[Index].NbAction = 0;
    } 
    if(Perso.NbAction(Index) == 0)
    {
        PERSO_DATA[Index].Bloque = true;
    }
    PERSO_AfficherNombreAction(Index);
}
function PERSO_ChangerEtat(Index, Mort = true)
{
    PERSO_DATA[Index].Mort = Mort;
    PERSO_DATA[Index].Bloque = Mort;
    Objet.Couleur(PERSO_DATA[Index].PtrLigne, 2);
    if(Perso.TypeFonction(Index) == 0)
    {
        Cible.ActualiserListeGroupe();
    }
    PERSO_ActualiserListe();
    if(Mort)
    {
        Carte.EffacerPosition(Index);
    }
}
function PERSO_ActiverPersonnage(Index)
{
    switch(Bouton.Valider.Module)
    {
        case "CARTO_PNJ":
        case "CARTO_PJ":
            Cartographie.ActiverPersonnage(Index);
            break;
        case "ATTAQUE":
            break;
        default:
            console.info("PERSO_ActiverPersonnage <"+Bouton.Valider.Module+"> : "+Index);
            break;
    }
}
function PERSO_BloquerPNJ(Etat = true)
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(Perso.TypeFonction(x) != 0)
        {
            PERSO_DATA[x].Bloque = Etat;
        }
    }
    PERSO_ActualiserListe();
}
function PERSO_InitialiserAllonge(Index, AllongeCC, AllongeDis)
{
    PERSO_DATA[Index].AllongeCC = AllongeCC;
    PERSO_DATA[Index].AllongeDis = AllongeDis;
}
function PERSO_Allonge(Index, CorpsCorps = true)
{
    if(CorpsCorps)
    {
        return(PERSO_DATA[Index].AllongeCC);
    }
    return(PERSO_DATA[Index].AllongeDis);
}
/***************************************************************************************/
/***************************************************************************************/
