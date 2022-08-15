class MATRICE_Carre{
    Nouvelle(TailleOx, TailleOy) {return(MC_Initialiser(TailleOx, TailleOy));}
/*********************************************************************/
/*      ACTION SUR LE MASQUE DES FILTRES                                
/*********************************************************************/
    Bloquer(Etat) {MC_TousBloquer(Etat);}
    FiltreBloquer(Ox, Oy, Etat) {return(MC_FiltreBloquer(Ox, Oy, Etat));}
    FiltreBrouillard(Ox, Oy, Etat) {return(MC_FiltreBrouillard(Ox, Oy, Etat));}
    EffacerBrouillard() {MC_EffacerBrouillard();}
    FiltreNoir(Ox, Oy, Etat) {return(MC_FiltreNoir(Ox, Oy, Etat));}
    EffacerNoir() {MC_EffacerNoir();}
    MasqueAjouter(Ox, Oy, Filtre, Valeur) {return(MC_AjouterMasque(Ox, Oy, Filtre, Valeur));}
    MasqueAjouterObjet(PtrObj, Filtre, Valeur) {return(this.MasqueAjouter(PtrObj.Ox, PtrObj.Oy, Filtre, Valeur));}
    MasqueEnlever(Ox, Oy, Filtre, Valeur) {return(MC_EnleverMasque(Ox, Oy, Filtre, Valeur));}
    MasqueEnleverObjet(PtrObj, Filtre, Valeur) {return(this.MasqueEnlever(PtrObj.Ox, PtrObj.Oy, Filtre, Valeur));}
    Masque(Ox, Oy, Filtre) {return(Cellule[Ox][Oy].Masque[Filtre]);}
    MasqueObjet(PtrObj, Filtre) {return(this.Masque(PtrObj.Ox, PtrObj.Oy, Filtre));}
    RetournerFiltre(Filtre, Valeur) {return(MC_RetournerMasqueListe(Filtre, Valeur));}
/*********************************************************************/
/*      GESTION DE LA LEGENDE
/*********************************************************************/
    AfficherLegende(Ox, Oy, Texte, Affectation) {return(MC_AfficherLegende(Ox, Oy, Texte, Affectation));}
    AfficherLegendeObjet(PtrObj, Texte, Affectation) {return(this.AfficherLegende(PtrObj.Ox, PtrObj.Oy, Texte, Affectation));}
    ActiverLegende(Ox, Oy, Etat) {return(MC_ActiverLegende(Ox, Oy, Etat));}
    RetournerFiltreLegende(Valeur) {return(MC_RetournerMasqueListe(3, Valeur));}



    AfficherPosition(PtrPerso, Etat) {return(MC_AfficherPosition(PtrPerso, Etat));}
    EffacerPosition(PtrPerso) {return(MC_EffacerPosition(PtrPerso));}
    Activer(Position, Etat) {return(MC_Activer(Position, Etat));}
    AfficherCellule(Ox, Oy) {MC_AfficherCellule(Ox, Oy);}
    AfficherCelluleObjet(PtrObj) {this.AfficherCellule(PtrObj.Ox, PtrObj.Oy);}
/*********************************************************************/
/*      GESTION DU DISTANCIER
/*********************************************************************/
    InitialiserDistancier() {MC_InitialiserDistancier();}
    AjouterDistance(Ox, Oy, Distance) {MC_AjouterDistance(Ox, Oy, Distance);}
    LancerDistancier(Seuil, SansObstacle) {return(MC_LancerDistancier(Seuil, SansObstacle));}
    Distance(Ox, Oy) {return(Cellule[Ox][Oy].Distance);}
    DistanceObjet(PtrObj) {return(this.Distance(PtrObj.Ox, PtrObj.Oy));}
}

class StructureCarre{
    Ox = -1;
    Oy = -1;
    PtrCellule = new Array(4);
    Masque = [1, 2, 1, 1];
    Distance = -1;
    PremierFois = true;
}
let Cellule = new Array();
LstDistance = new Array();

/******************************************************************************/
/*      INITIALISATION DES OBJETS
/******************************************************************************/
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
        //  0 = En haut
        //  1 = A droite
        //  2 = En bas
        //  3 = A gauche
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
/******************************************************************************/
/*      GESTION SUR LES MASQUES
/******************************************************************************/
function MC_AjouterMasque(Ox, Oy, Filtre, Valeur)
{
    Cellule[Ox][Oy].Masque[Filtre] |= Valeur;
    return(Cellule[Ox][Oy].Masque[Filtre]);
}
function MC_EnleverMasque(Ox, Oy, Filtre, Valeur)
{
    Cellule[Ox][Oy].Masque[Filtre] &= ~Valeur;
    return(Cellule[Ox][Oy].Masque[Filtre]);
}
function MC_RetournerMasqueListe(Indice, Valeur)
{
    let TabObj = new Array();
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[0].length;y++)
        {
            if((Cellule[x][y].Masque[Indice] & Valeur) > 0)
            {
                TabObj.push(Cellule[x][y]);
            }
        }
    }
    return(TabObj);
}
/******************************************************************************/
/*     GESTIO DES FILTRES STANDARDS
/******************************************************************************/
function MC_TousBloquer(Etat = true)
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
    if(Etat)
    {
        MC_AjouterMasque(Ox, Oy, 0, 1);
    }
    else
    {
        MC_EnleverMasque(Ox, Oy, 0, 1);
    }
    MC_AfficherCellule(Ox, Oy);
}
function MC_FiltreBrouillard(Ox, Oy, Etat)
{
    if(Etat)
    {
        MC_AjouterMasque(Ox, Oy, 1, 4);
    }
    else
    {
        MC_EnleverMasque(Ox, Oy, 1, 4);
    }
    MC_AfficherCellule(Ox, Oy);
}
function MC_EffacerBrouillard()
{
    let LstObj = MC_RetournerMasqueListe(1, 4);
    for(let x = 0;x < LstObj.length;x++)
    {
        MC_FiltreBrouillard(LstObj[x].Ox, LstObj[x].Oy, false);
    }
}
function MC_FiltreNoir(Ox, Oy, Etat)
{
    if(Etat)
    {
        MC_AjouterMasque(Ox, Oy, 0, 4);
    }
    else
    {
        MC_EnleverMasque(Ox, Oy, 0, 4);
    }
    MC_AfficherCellule(Ox, Oy);
}
function MC_EffacerNoir()
{
    let LstObj = MC_RetournerMasqueListe(0, 4);
    for(let x = 0;x < LstObj.length;x++)
    {
        MC_FiltreNoir(LstObj[x].Ox, LstObj[x].Oy, false);
    }
}
/**********************************************************************************************************/
/*  GESTION DE L'AFFICHAGE D'UNE CELLULE
/**********************************************************************************************************/
function MC_AfficherCellule(Ox, Oy)
{
    MC_AfficherCelluleObjet(Cellule[Ox][Oy]);
}
function MC_AfficherCelluleObjet(Obj)
{
    //  Gestion du filtre 0 ==> Blocage principal, noir, nuit
    if((Obj.Masque[0] & 8) > 0)
    {
        Objet.Afficher(Obj.PtrCellule[0], false);
    }
    else
    {
        if((Obj.Masque[0] & 7) > 0)
        {
            if((Obj.Masque[0] & 4) > 0)
            {
                Objet.Couleur(Obj.PtrCellule[0], -4);
            }
            else
            {
                Objet.Couleur(Obj.PtrCellule[0], 0);
            }
            Objet.Afficher(Obj.PtrCellule[0], true);
        }
        else
        {
            Objet.Afficher(Obj.PtrCellule[0], false);
        }
    }
    //  Gestion du filtre 1 ==> Hachurage
    if((Obj.Masque[1] & 12) > 0)
    {
        //  Gestion Temporaire (Mouvement, positionnement)
        if((Obj.Masque[1] & 8) > 0)
        {
            Objet.Afficher(Obj.PtrCellule[1], false);
        }
        else
        {
            Objet.Afficher(Obj.PtrCellule[1], true);
        }
    }
    else
    {
        //  Gestion Permanente
        if((Obj.Masque[1] & 3) > 0)
        {
            if((Obj.Masque[1] & 2) > 0)
            {
                Objet.Afficher(Obj.PtrCellule[1], false);
            }
            else
            {
                Objet.Afficher(Obj.PtrCellule[1], true);
            }
            }
    }
    //  Gestion du filtre 2 ==> Personnage, texte
    if((Obj.Masque[2] & 2) > 0)
    {
        Objet.Afficher(Obj.PtrCellule[2], false);
    }
    else
    {
        if((Obj.Masque[2] & 1) > 0)
        {
            if((Obj.Masque[2] & 16) > 0)
            {
                Objet.Couleur(Obj.PtrCellule[2], 1);
            }
            else
            {
                if((Obj.Masque[2] & 8) > 0)
                {
                    Objet.Couleur(Obj.PtrCellule[2], 5);
                }
                else
                {
                    if((Obj.Masque[2] & 4) > 0)
                    {
                        Objet.Couleur(Obj.PtrCellule[2], -2);
                    }
                    else
                    {
                        Objet.Couleur(Obj.PtrCellule[2], 0);
                    }
                }
            }
            Objet.Afficher(Obj.PtrCellule[2], true);
        }
    }
    //  Gestion du filtre 3 ==> Legende, distancier
    if((Obj.Masque[3] & 2) > 0)
    {
        Objet.Afficher(Obj.PtrCellule[3], false);
    }
    else
    {
        if((Obj.Masque[3] & 1) > 0)
        {
            if((Obj.Masque[3] & 4) > 0)
            {
                Objet.Couleur(Obj.PtrCellule[3], 7);
            }
            else
            {
                if(Obj.Masque[3] >= 8)
                {
                    Objet.Couleur(Obj.PtrCellule[3], 4);
                }
                else
                {
                    Objet.Couleur(Obj.PtrCellule[3], 0);
                }
            }
            Objet.Afficher(Obj.PtrCellule[3], true);
        }
    }
}
function MC_AfficherPosition(PtrPerso, Etat = false)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}
    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule[2].innerHTML = PtrPerso.Lettre;
    MC_AjouterMasque(PtrPerso.Position.Ox, PtrPerso.Position.Oy, 0, 2);
    if(PtrPerso.TypeFonction == 0)
    {
        MC_AjouterMasque(PtrPerso.Position.Ox, PtrPerso.Position.Oy, 2, 8);
    }
    else
    {
        MC_AjouterMasque(PtrPerso.Position.Ox, PtrPerso.Position.Oy, 2, 4);
    }
    if(Etat)
    {
        MC_AjouterMasque(PtrPerso.Position.Ox, PtrPerso.Position.Oy, 2, 16);
    }
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        TabCel[x].Masque[3] |= PtrPerso.Masque;
        MC_AfficherCelluleObjet(TabCel[x]);
    }
    return(1);
}
function MC_EffacerPosition(PtrPerso)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}
    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    console.debug(PtrCel);
    PtrCel.PtrCellule[2].innerHTML = "";
    MC_EnleverMasque(PtrPerso.Position.Ox, PtrPerso.Position.Oy, 0, 2);
    MC_EnleverMasque(PtrPerso.Position.Ox, PtrPerso.Position.Oy, 2, 28);
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        TabCel[x].Masque[3] &= ~PtrPerso.Masque;
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
        Ptr.Masque[2] |= 16;
    }
    else
    {
        Ptr.Masque[2] &= ~16;
    }
    MC_AfficherCelluleObjet(Ptr);
    return(1);
}
/****************************************************************************************/
/*  GESTION DU FILTRE LEGENDE
/****************************************************************************************/
function MC_AfficherLegende(Ox, Oy, Texte = "", AffecterMasque = true)
{
    if(Ox < 0 ){return(-1);}
    if(Oy < 0 ){return(-1);}
    if(Ox >= Cellule.length){return(-1);}
    if(Oy >= Cellule[0].length){return(-1);}
    let PtrCel = Cellule[Ox][Oy];
    PtrCel.PtrCellule[3].innerHTML = Texte;
    if(AffecterMasque)
    {
        PtrCel.Masque[3] |= 4;
    }
    MC_AfficherCelluleObjet(PtrCel);
    return(1);
}
function MC_ActiverLegende(Ox, Oy, Etat = 0)
{
    let PtrCel = Cellule[Ox][Oy];
    switch(parseInt(Etat))
    {
        case 1:
            PtrCel.Masque[3] |= 4;
            break;
        case -1:
            PtrCel.Masque[3] &= ~4;
            break;
        default:
            if((PtrCel.Masque[3] & 4) > 0)
            {
                PtrCel.Masque[3] &= ~4;
            }
            else
            {
                PtrCel.Masque[3] |= 4;
            }
            break;
    }
    MC_AfficherCellule(Ox,Oy);
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
            Cellule[x][y].Distance = -1;
            Cellule[x][y].PremierFois = true;
        }
    }
    LstDistance = new Array();
}
function MC_AjouterDistance(Ox, Oy, Distance)
{
    Cellule[Ox][Oy].Distance = Distance;
    LstDistance.push(Cellule[Ox][Oy]);
    console.debug("MC_AjouterDistance : "+Ox+"/"+Oy+" Distance : "+Distance+" Taille : "+LstDistance.length);
}
function MC_LancerDistancier(Seuil = 0, SansObstacle = true)
{
    console.debug("MC_LancerDistancier : "+Seuil+" Sans Obstacle : "+SansObstacle+" Taille : "+LstDistance.length);
    for(;LstDistance.length != 0;)
    {
        MC_CalculerDistance(LstDistance[0], SansObstacle);
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
function MC_CalculerDistance(Obj, SansObstacle)
{
    console.debug("Ox : "+Obj.Ox+" Oy : "+Obj.Oy+" Distance : "+Obj.Distance);
    if(Obj.Distance < 0){return(0);}
    let Distance = Obj.Distance - 1;
    let FiltreObstacle = 28;
    if(Obj.Ox > 0)
    {
        if(Cellule[Obj.Ox-1][Obj.Oy].Distance < Distance)
        {
            console.debug("    MAsque : "+Cellule[Obj.Ox-1][Obj.Oy].Masque[2]);
            if(((Cellule[Obj.Ox-1][Obj.Oy].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox-1][Obj.Oy].Distance = Distance;
                Cellule[Obj.Ox-1][Obj.Oy].PremierFois = Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox-1][Obj.Oy]);
            }
        }
    }
    if(Obj.Ox < Cellule.length - 1)
    {
        if(Cellule[Obj.Ox+1][Obj.Oy].Distance < Distance)
        {
            if(((Cellule[Obj.Ox+1][Obj.Oy].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox+1][Obj.Oy].Distance = Distance;
                Cellule[Obj.Ox+1][Obj.Oy].PremierFois = Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox+1][Obj.Oy]);
            }
        }
    }
    if(Obj.Oy > 0)
    {
        if(Cellule[Obj.Ox][Obj.Oy-1].Distance < Distance)
        {
            if(((Cellule[Obj.Ox][Obj.Oy-1].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox][Obj.Oy-1].Distance = Distance;
                Cellule[Obj.Ox][Obj.Oy-1].PremierFois = Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox][Obj.Oy-1]);
            }
        }
    }
    if(Obj.Oy < Cellule[0].length - 1)
    {
        if(Cellule[Obj.Ox][Obj.Oy+1].Distance < Distance)
        {
            if(((Cellule[Obj.Ox][Obj.Oy+1].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox][Obj.Oy+1].Distance = Distance;
                Cellule[Obj.Ox][Obj.Oy+1].PremierFois = Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox][Obj.Oy+1]);
            }
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
            if(((Cellule[Obj.Ox-1][Obj.Oy-1].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox-1][Obj.Oy-1].Distance = Distance;
                Cellule[Obj.Ox-1][Obj.Oy-1].PremierFois = !Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox-1][Obj.Oy-1]);
            }
        }
    }
    if((Obj.Ox < Cellule.length - 1) && (Obj.Oy > 0))
    {
        if(Cellule[Obj.Ox+1][Obj.Oy-1].Distance < Distance)
        {
            if(((Cellule[Obj.Ox+1][Obj.Oy-1].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox+1][Obj.Oy-1].Distance = Distance;
                Cellule[Obj.Ox+1][Obj.Oy-1].PremierFois = !Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox+1][Obj.Oy-1]);
            }
        }
    }
    if((Obj.Ox > 0) && (Obj.Oy < Cellule[0].length - 1))
    {
        if(Cellule[Obj.Ox-1][Obj.Oy+1].Distance < Distance)
        {
            if(((Cellule[Obj.Ox-1][Obj.Oy+1].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox-1][Obj.Oy+1].Distance = Distance;
                Cellule[Obj.Ox-1][Obj.Oy+1].PremierFois = !Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox-1][Obj.Oy+1]);
            }
        }
    }
    if((Obj.Ox < Cellule.length - 1) && (Obj.Oy < Cellule[0].length - 1))
    {
        if(Cellule[Obj.Ox+1][Obj.Oy+1].Distance < Distance)
        {
            if(((Cellule[Obj.Ox+1][Obj.Oy+1].Masque[2] & FiltreObstacle) == 0) || (SansObstacle))
            {
                Cellule[Obj.Ox+1][Obj.Oy+1].Distance = Distance;
                Cellule[Obj.Ox+1][Obj.Oy+1].PremierFois = !Obj.PremierFois;
                LstDistance.push(Cellule[Obj.Ox+1][Obj.Oy+1]);
            }
        }
    }
}