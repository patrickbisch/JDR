class MATRICE_Carre{
    Nouvelle(TailleOx, TailleOy) {return(MC_Initialiser(TailleOx, TailleOy));}
/*********************************************************************/
/*      ACTION SUR LE MASQUE DES FILTRES                                 */
/*********************************************************************/
    Bloquer(Etat) {MC_Bloquer(Etat);}
    FiltreBloquer(Ox, Oy, Etat) {return(MC_FiltreBloquer(Ox, Oy, Etat));}
    FiltreBrouillard(Ox, Oy, Etat) {return(MC_FiltreBrouillard(Ox, Oy, Etat));}
    EffacerBrouillard() {MC_EffacerBrouillard();}
    FiltreNoir(Ox, Oy, Etat) {return(MC_FiltreNoir(Ox, Oy, Etat));}
    EffacerNoir() {MC_EffacerNoir();}

    AfficherLegende(Ox, Oy, Texte) {return(MC_AfficherLegende(Ox, Oy, Texte));}
    ActiverLegende(Ox, Oy) {return(MC_ActiverLegende(Ox, Oy));}
    AfficherPosition(PtrPerso, Etat) {return(MC_AfficherPosition(PtrPerso, Etat));}
    EffacerPosition(PtrPerso) {return(MC_EffacerPosition(PtrPerso));}
    Activer(Position, Etat) {return(MC_Activer(Position, Etat));}
    RetournerFiltre(Filtre, Valeur) {return(MC_RetournerFiltre(Filtre, Valeur));}
    RetournerFiltreLegende(Valeur) {return(MC_RetournerFiltre(3, Valeur));}

/*********************************************************************/
/*      GESTION DU DISTANCIER
/*********************************************************************/
    InitialiserDistancier() {MC_InitialiserDistancier();}
    AjouterDistance(Ox, Oy, Distance) {MC_AjouterDistance(Ox, Oy, Distance);}
    LancerDistancier(Seuil) {return(MC_LancerDistancier(Seuil));}
}

class StructureCarre{
    Ox = -1;
    Oy = -1;
    PtrCellule = new Array(4);
    Masque = [0, 0, 0, 0];
    Distance = -1;
    PremierFois = true;
}
Cellule = new Array();
LstDistance = new Array();

function MC_Initialiser(TailleOx, TailleOy)
{
    Cellule = new Array(parseInt(TailleOx));
    for(let x = 0;x < Cellule.length;x++)
    {
        Cellule[x] = new Array(parseInt(TailleOy));
    }
    PtrOmbre = document.querySelector("#CouleurOmbre");
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[x].length;y++)
        {
            let Ptr = new StructureCarre();
            Ptr.Ox = x;
            Ptr.Oy = y;
            Ptr.PtrCellule[0] = document.querySelector("#FiltreMasque-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[1] = document.querySelector("#FiltreOmbre-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[2] = document.querySelector("#FiltreCellule-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[2].addEventListener('click', function(e){
                e.preventDefault();
                JDR_CARTE_NouvelleSelection(2, x, y);
            });
            Ptr.PtrCellule[3] = document.querySelector("#FiltreLegende-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[3].addEventListener('click', function(e){
                e.preventDefault();
                JDR_CARTE_NouvelleSelection(3, x, y);
            });
            Cellule[x][y] = Ptr;
            MC_AfficherCellule(x, y);
        }
    }
    return(1);
}
function MC_ListeObjet(PtrPerso)
{
    let TabRet = new Array();
    if(PtrPerso.Grosse)
    {
        let y1 = PtrPerso.Position.Oy - PtrPerso.Taille[0];
        let y2 = PtrPerso.Position.Oy + PtrPerso.Taille[2];
        let x1 = PtrPerso.Position.Ox - PtrPerso.Taille[3];
        let x2 = PtrPerso.Position.Ox + PtrPerso.Taille[1];
        if(x1 < 0){x1 = 0;}
        if(y1 < 0){y1 = 0;}
        if(x2 >= Cellule.length){x2 = Cellule.length - 1;}
        if(y2 >= Cellule[0].length){y2 = Cellule[0].length - 1;}
        for(let x = x1;x <= x2;x++)
        {
            for(let y = y1;y <= y2;y++)
            {
                TabRet.push(Cellule[x][y])
            }
        }
    }
    else
    {
        TabRet.push(Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy])
    }
    return(TabRet);
}
function MC_ModifierFiltre(Masque, Etat, Filtre)
{
    if(Etat)
    {
        return(parseInt(Masque) | parseInt(Filtre));
    }
    else
    {
        return(parseInt(Masque) & parseInt(~Filtre));
    }
}
function MC_Bloquer(Etat = true)
{
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[0].length;y++)
        {
            MC_FiltreBloquer(x, y, Etat);
        }
    }
}
function MC_FiltreBloquer(Ox, Oy, Etat)
{
    Cellule[Ox][Oy].Masque[0] = MC_ModifierFiltre(Cellule[Ox][Oy].Masque[0], Etat, 1);
    MC_AfficherCellule(Ox, Oy);
}
function MC_FiltreBrouillard(Ox, Oy, Etat)
{
    Cellule[Ox][Oy].Masque[1] = MC_ModifierFiltre(Cellule[Ox][Oy].Masque[1], Etat, 2);
    MC_AfficherCellule(Ox, Oy);
}
function MC_EffacerBrouillard()
{
    let LstObj = MC_RetournerFiltre(1, 2);
    for(let x = 0;x < LstObj.length;x++)
    {
        MC_FiltreBrouillard(LstObj[x].Ox, LstObj[x].Oy, false);
    }
}
function MC_FiltreNoir(Ox, Oy, Etat)
{
    Cellule[Ox][Oy].Masque[0] = MC_ModifierFiltre(Cellule[Ox][Oy].Masque[0], Etat, 4);
    MC_AfficherCellule(Ox, Oy);
}
function MC_EffacerNoir()
{
    let LstObj = MC_RetournerFiltre(0, 4);
    for(let x = 0;x < LstObj.length;x++)
    {
        MC_FiltreNoir(LstObj[x].Ox, LstObj[x].Oy, false);
    }
}
function MC_AfficherCellule(Ox, Oy)
{
    MC_AfficherCelluleObjet(Cellule[Ox][Oy]);
}
function MC_AfficherCelluleObjet(Obj)
{
    for(let x = 0;x < 2;x++)
    {
        if(Obj.Masque[x] != 0)
        {
            Objet.Afficher(Obj.PtrCellule[x], true);
            if((Obj.Masque[x] & 4) > 0)
            {
                Objet.Couleur(Obj.PtrCellule[x], -4);
            }
            else
            {
                if((Obj.Masque[x] & 2) > 0)
                {
                }
                else
                {
                    Objet.Couleur(Obj.PtrCellule[x], 0);
                }
            }
        }
        else
        {
            Objet.Afficher(Obj.PtrCellule[x], false);
        }
    }
    if(Obj.Masque[2]>0)
    {
        console.debug("Masque USER : "+Obj.Masque[2]);
    }
    switch(parseInt(Obj.Masque[2]))
    {
        case 6:
        case 5:
            Objet.Couleur(Obj.PtrCellule[2], 1);
            break;
        case 2:
            Objet.Couleur(Obj.PtrCellule[2], 5);
            break;
        case 1:
            Objet.Couleur(Obj.PtrCellule[2], -2);
            break;
        default:
            Objet.Couleur(Obj.PtrCellule[2], 0);
            break;
    }
    if(Obj.Masque[3] > 0)
    {
        if((Obj.Masque[3] & 1) > 0)
        {
            Objet.Couleur(Obj.PtrCellule[3], 7);
        }
        else
        {
            Objet.Couleur(Obj.PtrCellule[3], 4);
        }
    }
    else
    {
        Objet.Couleur(Obj.PtrCellule[3], 0);
    }
}
function MC_AfficherPosition(PtrPerso, Etat = false)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}
    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule[2].innerHTML = PtrPerso.Lettre;
    MC_FiltreBloquer(PtrPerso.Position.Ox, PtrPerso.Position.Oy, true);
    if(PtrPerso.TypeFonction == 0)
    {
        PtrCel.Masque[2] = 2;
    }
    else
    {
        PtrCel.Masque[2] = 1;
    }
    if(Etat)
    {
        PtrCel.Masque[2] = PtrCel.Masque[2] | 4;
    }
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        TabCel[x].Masque[3] = TabCel[x].Masque[3] | PtrPerso.Masque;
        MC_AfficherCelluleObjet(TabCel[x]);
    }
    return(1);
}
function MC_EffacerPosition(PtrPerso)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}
    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule[2].innerHTML = "";
    PtrCel.Masque[2] = 0;
    MC_FiltreBloquer(PtrPerso.Position.Ox, PtrPerso.Position.Oy, false);
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        TabCel[x].Masque[3] = TabCel[x].Masque[3] & ~PtrPerso.Masque;
        MC_AfficherCelluleObjet(TabCel[x]);
    }
    return(1);
}
function MC_Activer(Position, Etat)
{
    if(Position.Ox < 0 ){return(-1);}
    if(Position.Oy < 0 ){return(-1);}
    let Ptr = Cellule[Position.Ox][Position.Oy];
    if(Etat)
    {
        Ptr.Masque[2] = Ptr.Masque[2] | 4;
    }
    else
    {
        Ptr.Masque[2] = Ptr.Masque[2] & ~4;
    }
    MC_AfficherCelluleObjet(Ptr);
    return(1);
}
/****************************************************************************************/
/*  GESTION DU FILTRE LEGENDE
/****************************************************************************************/
function MC_AfficherLegende(Ox, Oy, Texte = "")
{
    if(Ox < 0 ){return(-1);}
    if(Oy < 0 ){return(-1);}
    if(Ox >= Cellule.length){return(-1);}
    if(Oy >= Cellule[0].length){return(-1);}
    let PtrCel = Cellule[Ox][Oy];
    PtrCel.PtrCellule[3].innerHTML = Texte;
    PtrCel.Masque[3] = PtrCel.Masque[3] | 1;
    MC_AfficherCelluleObjet(PtrCel);
    return(1);
}
function MC_ActiverLegende(Ox, Oy)
{
    let PtrCel = Cellule[Ox][Oy];
    if((PtrCel.Masque[3] & 1) > 0)
    {
        PtrCel.Masque[3] = PtrCel.Masque[3] & ~1;
    }
    else
    {
        PtrCel.Masque[3] = PtrCel.Masque[3] | 1;
    }
    MC_AfficherCellule(Ox,Oy);
}
function MC_RetournerFiltre(Index, Filtre)
{
    let TabObj = new Array();
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[0].length;y++)
        {
            if((Cellule[x][y].Masque[Index] & Filtre) > 0)
            {
                TabObj.push(Cellule[x][y]);
            }
        }
    }
    return(TabObj);
}
/*******************************************************************************************************/
/*      GESTION DU DISTANCIER
/*******************************************************************************************************/
function MC_InitialiserDistancier()
{
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[0].length;y++)
        {
            Cellule[x][y].Distance = 0;
            Cellule[x][y].PremierFois = true;
        }
    }
    LstDistance = new Array();
}
function MC_AjouterDistance(Ox, Oy, Distance)
{
    Cellule[Ox][Oy].Distance = Distance;
    LstDistance.push(Cellule[Ox][Oy]);
}
function MC_LancerDistancier(Seuil = 0)
{
    for(;LstDistance.length != 0;)
    {
        MC_CalculerDistance(LstDistance[0]);
        LstDistance.splice(0,1);
    }
    let LstObj = new Array();
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[0].length;y++)
        {
            if(Cellule[x][y].Distance >= Seuil)
            {
                LstObj.push(Cellule[x][y]);
            }
        }
    }
    return(LstObj);
}
function MC_CalculerDistance(Obj)
{
    if(Obj.Distance < 0){return(0);}
    let Distance = Obj.Distance - 1;
    if(Obj.Ox > 0)
    {
        if(Cellule[Obj.Ox-1][Obj.Oy].Distance < Distance)
        {
            Cellule[Obj.Ox-1][Obj.Oy].Distance = Distance;
            Cellule[Obj.Ox-1][Obj.Oy].PremierFois = Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox-1][Obj.Oy]);
        }
    }
    if(Obj.Ox < Cellule.length - 1)
    {
        if(Cellule[Obj.Ox+1][Obj.Oy].Distance < Distance)
        {
            Cellule[Obj.Ox+1][Obj.Oy].Distance = Distance;
            Cellule[Obj.Ox+1][Obj.Oy].PremierFois = Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox+1][Obj.Oy]);
        }
    }
    if(Obj.Oy > 0)
    {
        if(Cellule[Obj.Ox][Obj.Oy-1].Distance < Distance)
        {
            Cellule[Obj.Ox][Obj.Oy-1].Distance = Distance;
            Cellule[Obj.Ox][Obj.Oy-1].PremierFois = Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox][Obj.Oy-1]);
        }
    }
    if(Obj.Oy < Cellule[0].length - 1)
    {
        if(Cellule[Obj.Ox][Obj.Oy+1].Distance < Distance)
        {
            Cellule[Obj.Ox][Obj.Oy+1].Distance = Distance;
            Cellule[Obj.Ox][Obj.Oy+1].PremierFois = Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox][Obj.Oy+1]);
        }
    }
    if(!Obj.PremierFois)
    {
        Distance -= 1;
    }
    if((Obj.Ox > 0) && (Obj.Oy > 0))
    {
        if(Cellule[Obj.Ox-1][Obj.Oy-1].Distance < Distance)
        {
            Cellule[Obj.Ox-1][Obj.Oy-1].Distance = Distance;
            Cellule[Obj.Ox-1][Obj.Oy-1].PremierFois = !Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox-1][Obj.Oy-1]);
        }
    }
    if((Obj.Ox < Cellule.length - 1) && (Obj.Oy > 0))
    {
        if(Cellule[Obj.Ox+1][Obj.Oy-1].Distance < Distance)
        {
            Cellule[Obj.Ox+1][Obj.Oy-1].Distance = Distance;
            Cellule[Obj.Ox+1][Obj.Oy-1].PremierFois = !Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox+1][Obj.Oy-1]);
        }
    }
    if((Obj.Ox > 0) && (Obj.Oy < Cellule[0].length - 1))
    {
        if(Cellule[Obj.Ox-1][Obj.Oy+1].Distance < Distance)
        {
            Cellule[Obj.Ox-1][Obj.Oy+1].Distance = Distance;
            Cellule[Obj.Ox-1][Obj.Oy+1].PremierFois = !Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox-1][Obj.Oy+1]);
        }
    }
    if((Obj.Ox < Cellule.length - 1) && (Obj.Oy < Cellule[0].length - 1))
    {
        if(Cellule[Obj.Ox+1][Obj.Oy+1].Distance < Distance)
        {
            Cellule[Obj.Ox+1][Obj.Oy+1].Distance = Distance;
            Cellule[Obj.Ox+1][Obj.Oy+1].PremierFois = !Obj.PremierFois;
            LstDistance.push(Cellule[Obj.Ox+1][Obj.Oy+1]);
        }
    }
}