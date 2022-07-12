class INIT_Interface {
    Actif = -1;
    DeDefaut = -1;

    Initialiser(Taille) {INIT_Initialiser(Taille);}
    Demarrer() {INIT_DemarrerTour();}
    CaracteristiquePersonnage(Index,Carac) {INIT_CaracteristiquePersonnage(Index,Carac);}
    TrierListe() {INIT_TrierListe();}
    Suivant(Ancien) {return(INIT_ProchainActif(Ancien));}
}
var Init            = new INIT_Interface();

class INIT_Donnee {
    constructor(Id) {
        this.Index = Id;
        this.Carac = 0;
        this.Valeur = -1;
        this.Lettre = "";
        this.Nom = "";
        this.Code = "";
    }
}
var INIT_DATA       = new Array();
var INIT_LignePtr   = new Array();

var DeLabel         = new Array();
var DeSelect        = new Array();

function INIT_DemarrerTour()
{
    ArreterModule();
    MSG.ViderJournal();
    MSG.ViderHistorique()
    MSG.Journal("Nouvelle initiative.");
    MSG.Message("Nouvelle initiative ...", true);
    Gestion.Phase = "INIT";
    Init.DeDefaut = -1
    AfficherListeObjetID(".LigneInit",true);
    AfficherListeObjetID(".LigneTrait",true);
    Equip.AfficherListeArme(false);
    Equip.AfficherListeArmure(false);
    Equip.AfficherListeBouclier(false);
    Perso.InitialiserNombreAction();
    BonusAvant.AfficherListe();
    for(let x = 1; x < INIT_DATA.length; x++)
    {
        INIT_DATA[x].Valeur = -1
    }
    INIT_TrierListe();
    INIT_AfficherListe();
    INIT_ActualiserListe();
    ActiverListeBouton();
    ActiverFleche("PNJ", "Bas");
    ActiverFleche("PJ", "Bas");
    AfficherBouton("LancerDe", true);
    AfficherBouton("BtnValider", false);
    ActiverBouton("LancerDe",true);
    MSG.Message("Choisissez les initiatives des <strong>PNJ</strong> et <strong>PJ</strong>, puis <strong>lancez le DE</strong>");
}
function INIT_Initialiser(Taille)
{
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new INIT_Donnee(x);
        Ptr.Lettre = Perso.Lettre(x);
        Ptr.Nom = Perso.Nom(x);
        INIT_DATA.push(Ptr);

        let PtrLigne = document.querySelector("#Init-" + x);
        INIT_LignePtr.push(PtrLigne);
    }
    INIT_AfficherListe();
}
function INIT_CaracteristiquePersonnage(Index,Carac)
{
    INIT_DATA[Index].Carac = Carac;
}
function INIT_TrierListe()
{
    for(let x = 1; x < INIT_DATA.length; x++)
    {
        for(let y = 1; y < INIT_DATA.length; y++)
        {
            if((parseInt(INIT_DATA[y].Valeur) > parseInt(INIT_DATA[y-1].Valeur)) ||
              ((parseInt(INIT_DATA[y].Valeur) == parseInt(INIT_DATA[y-1].Valeur)) &&
              (parseInt(INIT_DATA[y].Carac) > parseInt(INIT_DATA[y-1].Carac))))
            {
                let Ptr = INIT_DATA[y];
                INIT_DATA[y] = INIT_DATA[y-1];
                INIT_DATA[y-1] = Ptr;
            }
        }
    }
}
function INIT_VisualiserListe(Sens = "Haut")
{
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        if(Sens == "Haut")
        {
            if(parseInt(Init.Actif) == x)
            {
                AfficherObjet(INIT_LignePtr[x], true);
            }
            else
            {
                AfficherObjet(INIT_LignePtr[x], false);
            }
        }
        else
        {
            AfficherObjet(INIT_LignePtr[x], true);
        }
    }
}
function INIT_AfficherListe()
{
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        if(INIT_DATA[x].Valeur >= 0 )
        {
            Ptr = document.querySelector("#InitNum-" + x);
            Ptr.innerHTML = INIT_DATA[x].Lettre;
            Ptr = document.querySelector("#InitNom-" + x);
            Ptr.innerHTML = INIT_DATA[x].Nom;
            Ptr = document.querySelector("#InitValeur-" + x);
            Ptr.innerHTML = INIT_DATA[x].Code;
            AfficherObjet(INIT_LignePtr[x], true);
        }
        else
        {
            AfficherObjet(INIT_LignePtr[x], false);
        }
    }
}
function INIT_ActualiserListe()
{
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        if(Perso.Mort(INIT_DATA[x].Index))
        {
            CouleurObjet(INIT_LignePtr[x], -2);
        }
        else
        {
            if(parseInt(Perso.NbAction(INIT_DATA[x].Index)) > 0)
            {
                if(parseInt(Init.Actif) == x)
                {
                    CouleurObjet(INIT_LignePtr[x], 1);
                }
                else
                {
                    CouleurObjet(INIT_LignePtr[x], 0);
                }
            }
            else
            {
                CouleurObjet(INIT_LignePtr[x], -1);
            }
        }
    }
}
function INIT_ProchainActif(Ancien)
{
    let Debut = 0;
    if(Ancien !== undefined)
    {
        Debut = Init.Actif + 1;
    }

    for(let x = Debut;x < INIT_DATA.length;x++)
    {
        let Index = parseInt(INIT_DATA[x].Index);
        if(!Perso.Mort(Index))
        {
            if(parseInt(Perso.NbAction(Index)) > 0)
            {
                if(Perso.NombreAdversaire(Index) > 0)
                {
                    Perso.Actif = Index;
                    Init.Actif = x;
                    return(Index);
                }
                else
                {
                    return(-2);
                }
            }
        }
    }
    return(-1);
}
