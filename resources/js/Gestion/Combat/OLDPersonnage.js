class PERSO_InterfaceOLD{
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
    UtiliserAction(Index) {PERSO_SupprimerAction(Index);}

    NombreAdversaire(Index) {return(PERSO_NombreAdversaire(Index));}
    Suivant() {return(PERSO_SuivantActif());}

    Arme(Index, Numero) {return(PERSO_BASE[Index].Armes[Numero]);}
    NombreArme(Index) {return(PERSO_BASE[Index].Armes.length);}
    Bouclier(Index, Numero) {return(PERSO_BASE[Index].Boucliers[Numero]);}
}
//var PERSO_BASE       = new Array();
//var PERSO_DATA       = new Array();
//var Perso            = new PERSO_Interface();

class PERSO_Donnee{
    //  Definition pour les données complementaires du personnage
    Mort = false;

    //  Definition pour les actions
    NbAction = 0;
    NbActionMaxi = 0;
    Action = "";    // ????????????????????????????????????????????????

    // Etat de santé du perosnnage
    TabPV = new Array();
    TabPVMaxi = new Array();
    MalusPV = 0;

    //  Definition pour le bonus avant (CHI pour QIN, Maitrise pour Prothecy)
    BA = new PERSO_Bonus();

    PtrLigne;
    PtrLigneInit;
    constructor() {
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
function PERSO_SuivantActif()
{
    let Index = Init.Suivant(true);
    if(Index != -1)
    {
        return(Index);
    }
    return(Init.Suivant());
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
