class MATRICE_Carre{
    Nouvelle(TailleOx, TailleOy) {MC_Initialiser(TailleOx, TailleOy);}
    AfficherPosition(PtrPerso) {return(MC_AfficherPosition(PtrPerso));}
    EffacerPosition(PtrPerso) {return(MC_EffacerPosition(PtrPerso));}
    Activer(Position, Etat) {MC_Activer(Position, Etat);}
}

class StructureCarre{
    PtrCellule;
    Masque = 0;
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
            Ptr.PtrCellule = document.querySelector("#Cellule-" + parseInt(x + 1) +
                                                                 "-" + parseInt(y + 1));
            Ptr.PtrCellule.addEventListener('click', function(e){
                e.preventDefault();
                JDR_CARTE_NouvelleSelection(x, y);
            });
            Cellule[x][y] = Ptr;
        }
    }
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
                TabRet.push(Cellule[x][y].PtrCellule)
            }
        }
    }
    else
    {
        TabRet.push(Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy].PtrCellule)
    }
    return(TabRet);
}
function MC_AfficherPosition(PtrPerso)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}
    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule.innerHTML = PtrPerso.Lettre;
    PtrCel.PtrCellule.disabled = true;
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        Objet.Couleur(TabCel[x], 4);
    }
    return(1);
}
function MC_EffacerPosition(PtrPerso)
{
    if(PtrPerso.Position.Ox < 0 ){return(-1);}
    if(PtrPerso.Position.Oy < 0 ){return(-1);}
    let PtrCel = Cellule[PtrPerso.Position.Ox][PtrPerso.Position.Oy];
    PtrCel.PtrCellule.innerHTML = "";
    PtrCel.PtrCellule.disabled = false;
    let TabCel = MC_ListeObjet(PtrPerso);
    for(let x = 0;x < TabCel.length;x++)
    {
        Objet.Couleur(TabCel[x], 0);
    }
    return(1);
}
function MC_Activer(Position, Etat)
{
    if(Position.Ox < 0 ){return(-1);}
    if(Position.Oy < 0 ){return(-1);}
    let Ptr = Cellule[Position.Ox][Position.Oy].PtrCellule;
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