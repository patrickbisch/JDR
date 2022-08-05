class CARTE_Interface  {
    AjouterPersonnage(Lettre, TypeFonction, Taille, Allonge) {CARTE_AjouterPerso(Lettre,TypeFonction, Taille, Allonge);}
    InitialiserPosition(Chaine) {CARTE_InitialiserPosition(Chaine);}
    RetournerPosition() {return(CARTE_FormaterPosition());}
    Position(Index) {return(CartePerso[Index].Position);}
    NouvelleMatrice(TailleOx, TailleOy, Quadrillage) {CARTE_NouvelleMatrice(TailleOx, TailleOy, Quadrillage);}
    Activer(Index, Etat) {Matrice.Activer(CartePerso[Index].Position, Etat);}
    ModifierPosition(Index, Ox, Oy) {CARTE_ModifierPosition(Index, Ox, Oy);}
    EffacerPosition(Index) {Matrice.EffacerPosition(CartePerso[Index]);}
}
var Carte = new CARTE_Interface();

class CARTE_Position{
    Ox = -1;
    Oy = -1;
}
class CARTE_Perso{
    Lettre = "";
    Position = new CARTE_Position();
    Masque = 0;
    Taille = [0, 0, 0, 0, 0, 0];
    Allonge = 1;
    Grosse = false;
}
let CartePerso = new Array();
let Matrice;
/*************************************************************************************************/
/*      GESTION DE LA MATRICE
/*************************************************************************************************/
function CARTE_NouvelleMatrice(TailleOx, TailleOy, Quadrillage)
{
    switch(Quadrillage)
    {
        case "Carre":
        default:
            Matrice = new MATRICE_Carre();
    }
    Matrice.Nouvelle(TailleOx, TailleOy);
}
/*************************************************************************************************/
/*      GESTION DES PERSONNAGE ET LEURS POSITIONS
/*************************************************************************************************/
function CARTE_AjouterPerso(Lettre, TypeFonction, Taille = "M", Allonge = 1)
{
    let Ptr = new CARTE_Perso();
    Ptr.Lettre = Lettre;
    Ptr.Allonge = Allonge;
    switch(parseInt(TypeFonction))
    {
        case 4:
        case 5:
        case 6:
            Ptr.Taille = [1, 1, 1, 1, 1, 1];
            Ptr.Grosse = true;
            break;
    }
    let Nb = 1;
    if(CartePerso.length > 0)
    {
        Nb = 2 * CartePerso[CartePerso.length - 1].Masque;
    }
    Ptr.Masque = Nb;
    CartePerso.push(Ptr);
}
function CARTE_InitialiserPosition(Chaine)
{
    let Tab = (Chaine + "------------------------------------------------------------------------------").split("-");
    for(let x = 0;x < CartePerso.length;x++)
    {
        let Tmp = (Tab[x] + "/").split("/");
        if(Tmp[0] != ""){CartePerso[x].Position.Ox = Tmp[0];}
        if(Tmp[1] != ""){CartePerso[x].Position.Oy = Tmp[1];}
        Matrice.AfficherPosition(CartePerso[x]);
    }
}
function CARTE_FormaterPosition()
{
    let Chaine = "";
    for(let x = 0;x < CartePerso.length;x++)
    {
        if(Chaine != ""){Chaine += "-";}
        if((CartePerso[x].Position.Ox < 0) || (CartePerso[x].Position.Oy < 0))
        {
            Chaine += "/";
        }
        else
        {
            Chaine += CartePerso[x].Position.Ox + "/" + CartePerso[x].Position.Oy;
        }
    }
    return(Chaine);
}
function CARTE_ModifierPosition(Index, Ox, Oy)
{
    CartePerso[Index].Position.Ox = Ox;
    CartePerso[Index].Position.Oy = Oy;
    Matrice.AfficherPosition(CartePerso[Index]);
}