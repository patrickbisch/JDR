class CARTE_Interface  {
    Bloquer(Etat) {Matrice.Bloquer(Etat);}
    AjouterPersonnage(Lettre, TypeFonction, Taille, Allonge) {CARTE_AjouterPerso(Lettre,TypeFonction, Taille, Allonge);}
    InitialiserPosition(Chaine) {CARTE_InitialiserPosition(Chaine);}
    InitialiserPointEntre(Chaine) {CARTE_InitialiserPointEntre(Chaine);}
    EffacerPointEntree() {CARTE_EffacerPointEntre();}
    InitialiserBrouillard(TailleVision, TailleBrouillard) {CARTE_InitialiserBrouillard(TailleVision, TailleBrouillard);}
    ActiverPointEntre(Ox, Oy) {return(CARTE_ActiverPointEntre(Ox, Oy));}
    RetournerPosition() {return(CARTE_FormaterPosition());}
    Position(Index) {return(CartePerso[Index].Position);}
    NouvelleMatrice(TailleOx, TailleOy, Quadrillage) {CARTE_NouvelleMatrice(TailleOx, TailleOy, Quadrillage);}
    FiltreBloquer(Ox, Oy, Etat) {return(Matrice.FiltreBloquer(Ox, Oy, Etat));}
    FiltreBrouillard(Ox, Oy, Etat) {return(Matrice.FiltreBrouillard(Ox, Oy, Etat));}
    EffacerBrouillard() {Matrice.EffacerBrouillard();}
    FiltreNoir(Ox, Oy, Etat) {return(Matrice.FiltreNoir(Ox, Oy, Etat));}
    EffacerNoir() {Matrice.EffacerNoir();}
    Activer(Index, Etat) {CARTE_Activer(Index, Etat);}
    ModifierPosition(Index, Ox, Oy, Etat) {CARTE_ModifierPosition(Index, Ox, Oy, Etat);}
    EffacerPosition(Index) {Matrice.EffacerPosition(CartePerso[Index]);}
    DistancePersonnage(Index, StructureDistance, SansObstacle) {CARTE_DistancePersonnage(Index, StructureDistance, SansObstacle);}
    DistancePersonnageTermine() {CARTE_DistancePersonnageTermine();}
    DeplacementPossible(Index) {return(CARTE_DeplacementPossible(Index));}
    CiblePersonnage(Index, Allonge) {return(CARTE_CiblePersonnage(Index, Allonge));}
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
    TypeFonction = -1;
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
    CARTE_InitialiserDessin(TailleOx, TailleOy);
    Matrice.Nouvelle(TailleOx, TailleOy);
}
/*************************************************************************************************/
/*      GESTION DU DESSIN
/*************************************************************************************************/
class DESSIN_Definition{
    PtrDessin;
    PtrZoom;
    NbOx = 0;
    NbOy = 0;
    TailleOX = 0;
    TailleOY = 0;
}
let Dessin = new DESSIN_Definition();
function CARTE_InitialiserDessin(Ox, Oy)
{
    Dessin.PtrDessin = document.querySelector("#Dessin");
    Dessin.PtrZoom = document.querySelector("#Zoom");
    Dessin.NbOx = Ox;
    Dessin.NbOy = Oy;
    Dessin.TailleOX = Dessin.PtrDessin.clientWidth;
    Dessin.TailleOY = Dessin.PtrDessin.clientHeight;
    Dessin.PtrZoom.addEventListener('change', function(e){
        e.preventDefault();
        CARTE_NouveauZoom();
    });
}
function CARTE_NouveauZoom()
{
    let Nb = Dessin.PtrZoom.value;
    Dessin.PtrDessin.style.width = (parseInt(Dessin.TailleOX) + 4 * parseInt(Nb) * parseInt(Dessin.NbOx)) + "px";
    Dessin.PtrDessin.style.height = (parseInt(Dessin.TailleOY) + 4 * parseInt(Nb) * parseInt(Dessin.NbOy)) + "px";
}
/*************************************************************************************************/
/*      GESTION DES PERSONNAGE ET LEURS POSITIONS
/*************************************************************************************************/
function CARTE_AjouterPerso(Lettre, TypeFonction, Taille = "M", Allonge = 1)
{
    let Ptr = new CARTE_Perso();
    Ptr.Lettre = Lettre;
    Ptr.TypeFonction = TypeFonction;
    Ptr.Allonge = Allonge;
    switch(parseInt(TypeFonction))
    {
        case 4:
        case 5:
        case 6:
            Ptr.Taille = [1, 1, 1, 1, 1, 1];
            Ptr.Grosse = true;
            break;
        default:
            Ptr.Taille = [0, 0, 0, 0, 0, 0];
            Ptr.Grosse = false;
            break;
    }
    let Nb = 8;
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
        if(Tmp[0] != ""){CartePerso[x].Position.Ox = parseInt(Tmp[0]);}
        if(Tmp[1] != ""){CartePerso[x].Position.Oy = parseInt(Tmp[1]);}
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
function CARTE_InitialiserPointEntre(Chaine)
{
    let Tab = (Chaine + "------------------------------------------------------------------------------").split("-");
    for(let x = 0;x < CartePerso.length;x++)
    {
        let Tmp = (Tab[x] + "/").split("/");
        if((Tmp[0] != "") && (Tmp[1] != ""))
        {
            Matrice.AfficherLegende(parseInt(Tmp[0]), parseInt(Tmp[1]));
        }
    }
}
function CARTE_EffacerPointEntre()
{
    let TabObj = Matrice.RetournerFiltreLegende(4);
    for(let x = 0;x < TabObj.length;x++)
    {
        Matrice.ActiverLegende(TabObj[x].Ox, TabObj[x].Oy);
    }
}
function CARTE_ActiverPointEntre(Ox, Oy)
{
    Matrice.ActiverLegende(Ox, Oy);
    let TabObj = Matrice.RetournerFiltreLegende(1);
    let Chaine = ""
    for(let x = 0;x < TabObj.length;x++)
    {
        if(Chaine != ""){Chaine += "-";}
        Chaine += TabObj[x].Ox + "/" + TabObj[x].Oy
    }
    return(Chaine);
}
function CARTE_InitialiserBrouillard(Vision, Brouillard)
{
    Matrice.InitialiserDistancier();
    let TabObj = Matrice.RetournerFiltreLegende(4);
    for(let x = 0;x < TabObj.length;x++)
    {
        Matrice.AjouterDistance(TabObj[x].Ox, TabObj[x].Oy, Vision + Brouillard);
    }
    TabObj = Matrice.LancerDistancier(-1);
    for(let x = 0;x < TabObj.length;x++)
    {
        if(TabObj[x].Distance < 0)
        {
            Matrice.FiltreNoir(TabObj[x].Ox, TabObj[x].Oy, true);
        }
        else
        {
            if(TabObj[x].Distance < parseInt(Brouillard))
            {
                Matrice.FiltreBrouillard(TabObj[x].Ox, TabObj[x].Oy, true);
            }
            else
            {
                if(TabObj[x].Distance < Vision + Brouillard)
                {
                    Matrice.FiltreBloquer(TabObj[x].Ox, TabObj[x].Oy, true);
                }
            }
        }
    }
}
function CARTE_DistancePersonnage(Index, StrDist, SansObstacle)
{
    let Distance = StrDist.length;
    if(Distance == 0){return(-1);}
    Matrice.InitialiserDistancier();
    Matrice.AjouterDistance(CartePerso[Index].Position.Ox, CartePerso[Index].Position.Oy, Distance);    
    let LstObj = Matrice.LancerDistancier(-1, SansObstacle);
    for(let x = 0;x < LstObj.length;x++)
    {
        if((Matrice.MasqueObjet(LstObj[x], 0) & 2) == 0)
        {
            let Nb = Matrice.DistanceObjet(LstObj[x]);
            if(Nb < 0)
            {
                Matrice.MasqueAjouterObjet(LstObj[x], 1, 4);
            }
            else
            {
                Matrice.MasqueAjouterObjet(LstObj[x], 0, 8);
                Matrice.MasqueAjouterObjet(LstObj[x], 2, 2);
                Matrice.AfficherLegendeObjet(LstObj[x], StrDist[Nb], false);
            }
            Matrice.AfficherCelluleObjet(LstObj[x]);
        }
    }
}
function CARTE_DistancePersonnageTermine()
{
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[0].length;y++)
        {
            if((Matrice.Masque(x, y, 1) & 4) > 0)
            {
                Matrice.MasqueEnlever(x, y, 1, 4);
                Matrice.AfficherCellule(x, y);
            }
            else
            {
                Matrice.AfficherLegende(x, y, "", false);
                Matrice.MasqueEnlever(x, y, 0, 8);
                Matrice.MasqueEnlever(x, y, 2,2);
                Matrice.AfficherCellule(x, y);
           }
        }
    }
}
function CARTE_DeplacementPossible(Index)
{
    let TabObj = Matrice.Surface(CartePerso[Index].Position.Ox, CartePerso[Index].Position.Oy);
    for(let x = 0;x < TabObj.length;x++)
    {
        if((Matrice.MasqueObjet(TabObj[x], 0) & 2) == 0)
        {
            return(true);
        }
    }
    return(false);
}
function CARTE_CiblePersonnage(Index, Allonge = 1)
{
    Matrice.InitialiserDistancier();
    let LstObj = Matrice.SurfacePersonnage(CartePerso[Index]);
    for(let x = 0;x < LstObj.length;x++)
    {
        Matrice.AjouterDistance(LstObj[x].Ox, LstObj[x].Oy, Allonge);    
    }
    LstObj = Matrice.LancerDistancier(0, true);
    let Masque = 0;
    for(let x = 0;x < LstObj.length;x++)
    {
        Masque |= Matrice.MasqueObjet(LstObj[x], 3);
    }
    let LstRetour = new Array();
    for(let x = 0;x < CartePerso.length;x++)
    {
        if((CartePerso[x].Masque & Masque) > 0)
        {
            LstRetour.push([x, Matrice.Distance(CartePerso[x].Position.Ox, CartePerso[x].Position.Oy)])
        }
    }
    return(LstRetour);
}
function CARTE_Activer(Index, Etat = true)
{
    if(Index < 0){return(-1);}
    Matrice.Activer(CartePerso[Index].Position, Etat);
}
function CARTE_ModifierPosition(Index, Ox, Oy, Etat)
{
    CartePerso[Index].Position.Ox = Ox;
    CartePerso[Index].Position.Oy = Oy;
    Matrice.AfficherPosition(CartePerso[Index], Etat);
}
