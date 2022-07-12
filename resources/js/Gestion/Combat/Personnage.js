class PERSO_Interface{
    Actif = -1;
    Taille = 0;
    NbPJ = 0;
    IndexPJ = new Array();
    constructor() {
    }
    Initialiser() {PERSO_Initialiser();}
    NouveauActif() {PERSO_NouveauActif();}
    NombrePJ() {return(Perso.NbPJ);}
    TypeFonction(Index) {return(PERSO_BASE[Index].id_fonction);}

    Nom(Index) {return(PERSO_BASE[Index].Nom);}
    Lettre(Index) {return(PERSO_BASE[Index].Lettre);}
    Gras(Index) {return(this.Lettre(Index) + ". <strong>" + this.Nom(Index) + "</strong>");}
    Mort(Index) {return(PERSO_DATA[Index].Mort);}
    ChangerEtat(Index, Mort) {PERSO_ChangerEtat(Index, Mort);}

    InitialiserNombreAction() {PERSO_InitialiserNombreAction();}
    AffecterNombreAction(Index, NbAction) {PERSO_AffecterAction(Index, NbAction);}
    NbAction(Index) {return(PERSO_DATA[Index].NbAction);}
    NbActionMaxi(Index) {return(PERSO_BASE[Index].NbActionMaxi);}
    UtiliserAction(Index) {PERSO_SupprimerAction(Index);}

    NombreAdversaire(Index) {return(PERSO_NombreAdversaire(Index));}
    Suivant() {return(PERSO_SuivantActif());}

    AffecterBonusAvantMaxi(Index, Bonus) {PERSO_DATA[Index].BonusAvantMaxi = Bonus;}
    BonusAvantMaxi(Index) {return(PERSO_DATA[Index].BonusAvantMaxi);}
    AffecterBonusAvant(Index, Bonus) {PERSO_AffecterBonusAvant(Index, Bonus);}
    BonusAvant(Index) {return(PERSO_DATA[Index].BonusAvantValeur);}

    Arme(Index, Numero) {return(PERSO_BASE[Index].Armes[Numero]);}
    NombreArme(Index) {return(PERSO_BASE[Index].Armes.length);}

    Blesser(Index, NombreBlessures) {PERSO_Blesser(Index, NombreBlessures);}
}
var PERSO_BASE       = new Array();
var PERSO_DATA       = new Array();
var Perso            = new PERSO_Interface();

class PERSO_Donnee{
    //  Definition pour les données complementaires du personnage
    Mort = false;

    //  Definition pour les actions
    NbACtion = 0;
    Action = "";

    // Etat de santé du perosnnage
    MalusPV = 0;

    //  Definition pour le bonus avant (CHI pour QIN, Maitrise pour Prothecy)
    BonusAvantValeur = 0;
    BonusAvantMaxi = 0;
    BonusAvant = 0;

    PtrLigne;
    PtrLigneInit;
    constructor() {
    }
}

function PERSO_Initialiser()
{
    Perso.Taille = PERSO_BASE.length;
    for(x = 0;x < PERSO_BASE.length;x++)
    {
        //  Gestion des ACTIONS
        let Ptr = new PERSO_Donnee();
        Ptr.NbAction = Perso.NbActionMaxi(x);
        let Obj = document.querySelector("#Ligne-" + x);
        Ptr.PtrLigne = Obj;
        Obj = document.querySelector("#LigneInit-" + x);
        Ptr.PtrLigneInit = Obj;
        PERSO_DATA.push(Ptr);
        if(PERSO_BASE[x].id_fonction == 0)
        {
            Perso.NbPJ++;
            Perso.IndexPJ.push(x);
        }
        let Nb = PERSO_BASE[x].Manoeuvres.length
        console.debug("Manoeuvres de ("+x+") : " +Nb);
        for(let y = 0;y<PERSO_BASE[x].Manoeuvres.length;y++)
        {
            console.debug(PERSO_BASE[x].Manoeuvres[y]);
        }
    }
}
function PERSO_NouveauActif()
{
    ArreterModule();
    let Index = PERSO_SuivantActif();
    if(parseInt(Index) >= 0)
    {
        var Chaine = Perso.Gras(Index) + " est actif.";
        if(parseInt(PERSO_DATA[Index].MalusPV) != 0)
        {
            Chaine += " Bléssures (<strong>" + PERSO_DATA[Index].MalusPV + "</strong>).";
        }
        MSG.Message(Perso.Gras(Index) + " doit choisir une action ...", true);
        MSG.Journal("");
        MSG.Journal(Chaine);
        ActiverBouton("BtnValider", false);
        INIT_ActualiserListe();
        INIT_VisualiserListe(SavSensFleche[2]);
        Cible.ModifierListe(Index);
        Cible.AffecterNouvelle(Index);
        Cible.Activer(Index, true);
        Action.InitialiserListe(Index);
        Action.AfficherLigne(Index, true);
        Action.Couleur(Index, 2);
        BonusAvant.Activer(Index, true);
        PERSO_VisualiserListe("PNJ", SavSensFleche[0]);
        PERSO_VisualiserListe("PJ", SavSensFleche[1]);
        JDR_AfficherDe(false, false);
        JDR_CacherLigneAttaque(Index);
    }
    else
    {
        MSG.Message("FIN DU TOUR !!!!", 1);
    }
}
function PERSO_NombreAdversaire(Index)
{
    let Nb = 0;
    let Id = PERSO_BASE[Index].id_fonction;
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        if(((Id == 0) && (PERSO_BASE[x].id_fonction != Id)) ||
            ((Id != 0) && (PERSO_BASE[x].id_fonction == 0)))
        {
            if(parseInt(PERSO_BASE[x].Mort) == 0)
            {
                Nb++;
            }
        }
    }
    return(Nb);
}
function PERSO_SuivantActif()
{
    let Index = Init.Suivant(true);
    if(Index != -1)
    {
        return(Index);
    }
    return(Init.Suivant());
}
function PERSO_InitialiserNombreAction()
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        PERSO_DATA[x].NbAction = Perso.NbActionMaxi(x);
        Action.AfficherValeur(x, Perso.NbAction(x)
                             + "/" + Perso.NbActionMaxi(x));
    }
}
function PERSO_AffecterAction(Index, NombreAction)
{
    let Nb = Perso.NbActionMaxi(Index) - Perso.NbAction(Index);
    PERSO_BASE[Index].NbActionMaxi = NombreAction;

    PERSO_DATA[Index].NbAction = Perso.NbActionMaxi(Index) - Nb;
    if(parseInt(Perso.NbAction(Index)) > parseInt(Perso.NbActionMaxi(Index)))
    {
        PERSO_DATA[Index].NbAction = Perso.NbActionMaxi(Index);
    }
    if(parseInt(Perso.NbAction(Index)) < 0)
    {
        PERSO_DATA[Index].NbAction = 0;
    }
    Action.AfficherValeur(Index, Perso.NbAction(Index)
        + "/" + Perso.NbActionMaxi(Index));
}
function PERSO_SupprimerAction(Index)
{
    PERSO_DATA[Index].NbAction--;
    if(Perso.NbAction(Index) < 0)
    {
        PERSO_DATA[Index].NbAction = 0;
    } 
    Action.AfficherValeur(Index, Perso.NbAction(Index) + "/" + Perso.NbActionMaxi(Index));
    LancerModule("NouveauActif");
}
function PERSO_VisualiserListeActif(Bouton, Sens)
{
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        let Index = INIT_DATA[x].Index;
        if(((PERSO_BASE[Index].id_fonction == 0) && (Bouton == "PJ")) || 
            ((PERSO_BASE[Index].id_fonction != 0) && (Bouton == "PNJ")))
        {
            if(Sens == "Haut")
            {
                if(INIT_DATA[x].Valeur != -1)
                {
                    AfficherObjet(PERSO_DATA[Index].PtrLigne, false);
                }
                else
                {
                    AfficherObjet(PERSO_DATA[Index].PtrLigne, true);
                }
            }
            else
            {
                AfficherObjet(PERSO_DATA[Index].PtrLigne, true);
            }
        }
    }
}
function PERSO_VisualiserListe(Bouton,Sens)
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(((parseInt(PERSO_BASE[x].id_fonction) == 0) && (Bouton == "PJ")) || 
            ((parseInt(PERSO_BASE[x].id_fonction) != 0) && (Bouton == "PNJ")))
        {
            if(parseInt(Perso.Actif) == x)
            {
                CouleurObjet(PERSO_DATA[x].PtrLigne, 1);
                AfficherObjet(PERSO_DATA[x].PtrLigne, true);
            }
            else
            {
                if(parseInt(Cible.Active) == x)
                {
                    CouleurObjet(PERSO_DATA[x].PtrLigne, 3);
                    AfficherObjet(PERSO_DATA[x].PtrLigne, true);
                }
                else
                {
                    if(Sens == "Haut")
                    {
                        AfficherObjet(PERSO_DATA[x].PtrLigne, false);
                    }
                    else
                    {
                        if(Perso.Mort(x))
                        {
                            CouleurObjet(PERSO_DATA[x].PtrLigne, 2);
                        }
                        else
                        {
                            if(Perso.NbAction(x) > 0)
                            {
                                CouleurObjet(PERSO_DATA[x].PtrLigne, 0);
                            }
                            else
                            {
                                CouleurObjet(PERSO_DATA[x].PtrLigne, -1);
                            }
                        }
                        AfficherObjet(PERSO_DATA[x].PtrLigne, true);
                    }
                }
            }
        }
    }
}
function PERSO_ChangerEtat(Index, Mort = true)
{
    PERSO_DATA[Index].Mort = Mort;
    CouleurObjet(PERSO_DATA[Index].PtrLigne, 2);
    INIT_VisualiserListe(SavSensFleche[2]);
}
function PERSO_AffecterBonusAvant(Index, Bonus)
{
    PERSO_DATA[Index].BonusAvantValeur += Bonus;
    if(parseInt(PERSO_DATA[Index].BonusAvantValeur) > parseInt(PERSO_DATA[Index].BonusAvantMaxi))
    {
        PERSO_DATA[Index].BonusAvantValeur = PERSO_DATA[Index].BonusAvantMaxi;
    }
    if(parseInt(PERSO_DATA[Index].BonusAvantValeur) < 0)
    {
        Perso.Blesser(Index, -1 * PERSO_DATA[Index].BonusAvantValeur);
        PERSO_DATA[Index].BonusAvantValeur = 0;
    }
    BonusAvant.Actualiser(Index);
}
function PERSO_Blesser(Index, NbBlessures)
{
    JDR_BlesserPersonnage(Index, NbBlessures);
}
