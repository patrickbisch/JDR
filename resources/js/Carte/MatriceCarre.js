class MATRICE_Carre{
    Nouvelle(TailleOx, TailleOy) {return(MC_Initialiser(TailleOx, TailleOy));}
/*********************************************************************/
/*      ACTION SUR LE MASQUE DES FILTRES                                 */
/*********************************************************************/
    FiltreBloquer(Ox, Oy, Etat) {return(MC_FiltreBloquer(Ox, Oy, Etat));}
    FiltreBrouillard(Ox, Oy, Etat) {return(MC_FiltreBrouillard(Ox, Oy, Etat));}
    FiltreNoir(Ox, Oy, Etat) {return(MC_FiltreNoir(Ox, Oy, Etat));}




/*********************************************************************/
/*********************************************************************/
/*          A REDEFINIR
/*********************************************************************/
/*********************************************************************/
    AfficherPosition(PtrPerso) {return(MC_AfficherPosition(PtrPerso));}
    EffacerPosition(PtrPerso) {return(MC_EffacerPosition(PtrPerso));}
    Activer(Position, Etat) {return(MC_Activer(Position, Etat));}
}

class StructureCarre{
    PtrCellule = new Array(3);
    Masque = [0, 0, 0];
}
Cellule = new Array();

function MC_Initialiser(TailleOx, TailleOy)
{
    Cellule = new Array(parseInt(TailleOx));
    for(let x = 0;x < Cellule.length;x++)
    {
        Cellule[x] = new Array(parseInt(TailleOy));
    }
    for(let x = 0;x < Cellule.length;x++)
    {
        for(let y = 0;y < Cellule[x].length;y++)
        {
            let Ptr = new StructureCarre();
            Ptr.PtrCellule[0] = document.querySelector("#FiltreMasque-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[1] = document.querySelector("#FiltreCellule-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[1].addEventListener('click', function(e){
                e.preventDefault();
                JDR_CARTE_NouvelleSelection(1, x, y);
            });
            Ptr.PtrCellule[2] = document.querySelector("#FiltreLegende-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule[2].addEventListener('click', function(e){
                e.preventDefault();
                JDR_CARTE_NouvelleSelection(2, x, y);
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
function MC_FiltreBloquer(Ox, Oy, Etat)
{
    Cellule[Ox][Oy].Masque[0] = MC_ModifierFiltre(Cellule[Ox][Oy].Masque[0], Etat, 1);
    MC_AfficherCellule(Ox, Oy);
}
function MC_FiltreBrouillard(Ox, Oy, Etat)
{
    Cellule[Ox][Oy].Masque[0] = MC_ModifierFiltre(Cellule[Ox][Oy].Masque[0], Etat, 2);
    MC_AfficherCellule(Ox, Oy);
}
function MC_FiltreNoir(Ox, Oy, Etat)
{
    Cellule[Ox][Oy].Masque[0] = MC_ModifierFiltre(Cellule[Ox][Oy].Masque[0], Etat, 4);
    MC_AfficherCellule(Ox, Oy);
}
function MC_AfficherCellule(Ox, Oy)
{
    Cellule[Ox][Oy].PtrCellule[0].innerHTML = Cellule[Ox][Oy].Masque[0];
    if(Cellule[Ox][Oy].Masque[0] != 0)
    {
        console.debug(Cellule[Ox][Oy].Masque[0]);
        Objet.Afficher(Cellule[Ox][Oy].PtrCellule[0], true);
        if((Cellule[Ox][Oy].Masque[0] & 4) > 0)
        {
            Objet.Couleur(Cellule[Ox][Oy].PtrCellule[0], -4);
        }
        else
        {
            if((Cellule[Ox][Oy].Masque[0] & 2) > 0)
            {
                Objet.Couleur(Cellule[Ox][Oy].PtrCellule[0], -5);
            }
            else
            {
                Objet.Couleur(Cellule[Ox][Oy].PtrCellule[0], 0);
            }
        }
    }
    else
    {
        Objet.Afficher(Cellule[Ox][Oy].PtrCellule[0], false);
    }
}









function MC_AfficherPosition(PtrPerso)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}


    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule[1].innerHTML = PtrPerso.Lettre;
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        Objet.Couleur(TabCel[x].PtrCellule[1], 4);
    }
    return(1);
}
function MC_EffacerPosition(PtrPerso)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}



    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule[1].innerHTML = "";
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        Objet.Couleur(TabCel[x].PtrCellule[1], 0);
    }
    return(1);
}
function MC_Activer(Position, Etat)
{
    if(Position.Ox < 0 ){return(-1);}
    if(Position.Oy < 0 ){return(-1);}



    let Ptr = Cellule[Position.Ox][Position.Oy].PtrCellule[1];
    if(Etat)
    {
        Objet.Couleur(Ptr, 2);
    }
    else
    {
        Objet.Couleur(Ptr, 4);
    }
    return(1);
}