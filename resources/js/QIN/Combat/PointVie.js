class PV_Interface  {
    Initialiser(Taille) {PV_Initialiser(Taille);}

    Afficher(Index, Etat) {PV_Afficher(Index, Etat);}
    AfficherListe(Etat) {PV_AfficherListe(Etat);}
}
var PV = new PV_Interface ();
class PV_Donnee {
    PtrLigne;
    PtrLigneCible = new Array();
    PtrPV;
    PtrMalus;
}
var PV_DATA        = new Array();

function PV_Initialiser(Taille)
{
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new PV_Donnee();
        Ptr.PtrLigne = document.querySelector("#LignePV-" + x);
        switch(parseInt(Perso.TypeFonction(x)))
        {
            case 1:
            case 2:
            case 3:
                Ptr.PtrPV = document.querySelector("#PV-" + x);
                break;
            case 0:
            case 7:
                Ptr.PtrPV = document.querySelector("#PV-" + x);
                Ptr.PtrMalus = document.querySelector("#Malus-" + x);
                break;
            default:
                for(let y = 0;y < Perso.NombrePJ();y++)
                {
                    Ptr.PtrLigneCible.push(document.querySelector("#LignePV-" + x + "-" + y));
                }
        }
        PV_DATA.push(Ptr);
        PV_Actualiser(x);
    }
}
function PV_Afficher(Index, Etat = true)
{
    AfficherObjet(PV_DATA[Index].PtrLigne, Etat);
    for(let x = 0;x < PV_DATA[Index].PtrLigneCible.length;x++)
    {
        AfficherObjet(PV_DATA[Index].PtrLigneCible[x], Etat);
    }
}
function PV_AfficherListe(Etat = true)
{
    console.debug("PV_AfficherListe : "+Etat);
    for(let x = 0;x < PV_DATA.length;x++)
    {
        PV.Afficher(x, Etat);
        PV_Actualiser(x);
    }
}
function PV_Actualiser(Index)
{
    let Chaine = "";
    for(let x = 0;x < PERSO_BASE[Index].TabPV.length;x++)
    {
        if(x > 0)
        {
            Chaine += " / ";
        }
        Chaine+= PERSO_BASE[Index].TabPV[x];
    }
    switch(parseInt(Perso.TypeFonction(Index)))
    {
        case 0:
        case 7:
            PV_DATA[Index].PtrMalus.innerHTML = PERSO_DATA[Index].MalusPV;
        case 1:
        case 2:
        case 3:
            PV_DATA[Index].PtrPV.innerHTML = Chaine;
            break;
    }
}