class CARTOGRAPHIE_Interface  {
    Initialiser(Taille) {CARTO_Initialiser(Taille);}
    NouveauTour() {CARTO_NouveauTour();}
    AfficherListe(Etat) {OBJET_AfficherListe(CARTO_DATA, Etat);}
    ActiverPersonnage(Index) {CARTO_ActiverPersonnage(Index);}
}
var Cartographie = new CARTOGRAPHIE_Interface();

var CARTO_DATA = new Array();
class CARTO_Donnee{
    PtrLigne;
    PtrPosition;
    Etat = false;
    Erreur = false;
}

var VarCarte = document.querySelector(':root');

function CARTO_Initialiser(Taille)
{
    Carte.Module = "CARTO_PNJ";
    let TM = document.querySelector("#MatriceType").innerHTML;
    let Tab = document.querySelector("#MatriceTaille").innerHTML.split("x");

    VarCarte.style.setProperty('--NbOx', Tab[0]);
    VarCarte.style.setProperty('--NbOy', Tab[1]);
    Carte.NouvelleMatrice(Tab[0], Tab[1], TM);
    Carte.Bloquer();

    for(let x = 0; x < Taille; x++)
    {
        let Obj = new CARTO_Donnee();
        Obj.PtrLigne = document.querySelector("#LignePosition-"+x)
        Obj.PtrPosition = document.querySelector("#Position-"+x)
        Obj.Etat = true;
        Obj.Erreur = true;

        CARTO_DATA.push(Obj);
        Carte.AjouterPersonnage(Perso.Lettre(x), Perso.TypeFonction(x));
    }
    Cartographie.AfficherListe(false);
}
function CARTO_NouveauTour()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal();
    MSG.Message("Initialisation de la cartographie.", true);
    MSG.Journal("Initialisation de la cartographie.");
    Cartographie.AfficherListe(true);
    BonusAvant.AfficherListe(false);
    Tao.AfficherListe("");
    Equipement.AfficherListe(false);
    Carte.Bloquer(false);

    let Chaine = document.querySelector("#PositionPNJ").innerHTML;
    Carte.InitialiserPosition(Chaine);

    for(let x = 0; x < Perso.Taille; x++)
    {
        JDR_NouvellePosition(x);
    }

    Chaine = document.querySelector("#EntrePJ").innerHTML;
    Carte.InitialiserPointEntre(Chaine);

    Bouton.Valider.Demarrer("CARTO_PNJ", false);
    Perso.Liste[0].Etat = true;
    Perso.Liste[0].Valide = true;
    Perso.Liste[1].Etat = false;
    Perso.Liste[1].Valide = false;
    Objet.AfficherFamille("EcranPNJ", true);
    Objet.AfficherFamille("EcranPJ", false);
    PERSO_ActualiserListe();
    MSG.Message("Positionnez tous les <strong>PNJ</strong>, puis validez ...");
    CARTO_ValiderPosition();
}
function CARTO_ValiderPosition()
{
    let Etat = false;
    if(Bouton.Valider.Module == "CARTO_PNJ"){Etat = true;}
    let Nb = CARTO_ErreurPosition(Etat);
    if(Nb < 0)
    {
        Bouton.Valider.Activer(true);
    }
    else
    {
        Bouton.Valider.Activer(false);
        Carte.Activer(Perso.Actif, false);
        Perso.Actif = Nb;
        Carte.Activer(Perso.Actif, true);
    }
    PERSO_ActualiserListe();
}
function CARTO_ValiderDE()
{
    switch(Bouton.Valider.Module)
    {
        case "CARTO_PNJ":
            Bouton.Valider.Demarrer("CARTO_PJ", false);
            Carte.Activer(Perso.Actif, false);
            Perso.Actif = -1
            let Vision = document.querySelector("#Vision").innerHTML;
            let Brouillard = document.querySelector("#Brouillard").innerHTML;
            Carte.InitialiserBrouillard(parseInt(Vision), parseInt(Brouillard));
            Perso.BloquerPNJ(true);
            Objet.AfficherFamille("EcranPJ", true);
            Perso.Liste[0].Etat = false;
            Perso.Liste[1].Etat = true;
            Perso.Liste[1].Valide = true;
            MSG.Message("Positionnez tous les <strong>PJ</strong>, puis validez ...");
            CARTO_ValiderPosition();
            break;
        case "CARTO_PJ":
            Cartographie.AfficherListe(false);
            Carte.Activer(Perso.Actif, false);
            Carte.EffacerPointEntree();
            Carte.EffacerBrouillard();
            Carte.EffacerNoir();
            Carte.Bloquer(true);
            Perso.BloquerPNJ(false);
            Moteur.LancerModule("Tour INIT");
            break;
    }
}
function CARTO_ErreurPosition(TypePNJ = true)
{
    for(let x = 0;x < CARTO_DATA.length;x++)
    {
        if(CARTO_DATA[x].Erreur)
        {
            if(TypePNJ)
            {
                if(Perso.TypeFonction(x) != 0) {return(x);}
            }
            else
            {
                if(Perso.TypeFonction(x) == 0) {return(x);}
            }
        }
    }
    return(-1);
}
function CARTO_ActiverPersonnage(Index)
{
    if(Perso.Bloque(Index)){return(-1);}
    Carte.Activer(Perso.Actif, false);
    Perso.Actif = Index;
    PERSO_ActualiserListe();
    Carte.Activer(Perso.Actif, true);
}
function JDR_CARTE_NouvelleSelection(Indice, Ox, Oy)
{
    if(Perso.Actif < 0){return(0);}
    switch(Bouton.Valider.Module)
    {
        case "CARTO_PNJ":
        case "CARTO_PJ":
            Carte.EffacerPosition(Perso.Actif);
            Carte.ModifierPosition(Perso.Actif, Ox, Oy, true);
            JDR_NouvellePosition(Perso.Actif);
            CARTO_ValiderPosition();
            break;
        case "DEPLACEMENT":
            Carte.EffacerPosition(Perso.Actif);
            Carte.ModifierPosition(Perso.Actif, Ox, Oy, true);
            let Nb = 
            Carte.DistancePersonnageTermine();
            JDR_NouvellePosition(Perso.Actif);

            

            Action.Termine(Perso.Actif);
            break;
        default:
            MSG.Erreur("JDR_CARTE_NouvelleSelection ("+Bouton.Valider.Module+") NON GEREE !!");
            break;
    }
}
function JDR_NouvellePosition(Index)
{
    let Posi = Carte.Position(Index);
    if((Posi.Ox < 0) || (Posi.Oy < 0))
    {
        CARTO_DATA[Index].PtrPosition.innerHTML = " - ";
        CARTO_DATA[Index].Erreur = true;
        Objet.Couleur(CARTO_DATA[Index].PtrPosition, 2);
        PERSO_DATA[Index].Afficher = true;
    }
    else
    {
        CARTO_DATA[Index].PtrPosition.innerHTML = Posi.Ox + " - " + Posi.Oy;
        CARTO_DATA[Index].Erreur = false;
        Objet.Couleur(CARTO_DATA[Index].PtrPosition, 0);
        PERSO_DATA[Index].Afficher = false;
    }
}