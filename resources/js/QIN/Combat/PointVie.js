class PV_Interface  {
    Initialiser(Taille) {PV_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(PV_DATA, Etat);}
}
var PV = new PV_Interface();
let PV_DATA = new Array();

class PV_Donnee {
    PtrLigne;
    PtrPV;
    PtrMalus;
    Groupe = new Array();
    Etat = false;
}

function PV_Initialiser(Taille)
{
    MSG.Historique("Initialisation des points de vie.",1)
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new PV_Donnee();
        PV_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LignePV-" + x);
        switch(parseInt(Perso.TypeFonction(x)))
        {
            case 4:
            case 5:
            case 6:
                for(let y = 0;y < Perso.IndexPJ.length;y++)
                {
                    let Obj = new PV_Donnee();
                    Obj.PtrLigne = document.querySelector("#LignePV-" + x + "-" + y);
                    Obj.PtrPV = document.querySelector("#PV-" + x + "-" + y);
                    Obj.PtrMalus = document.querySelector("#Malus-" + x + "-" + y);
                    Ptr.Groupe.push(Obj);
                }
                break;
            default:
                Ptr.PtrPV = document.querySelector("#PV-" + x);
                Ptr.PtrMalus = document.querySelector("#Malus-" + x);
                Ptr.Etat = true;
                break;
        }
        PV_Actualiser(x);
    }
    PV.AfficherListe(false);
}
function PV_Actualiser(Index)
{
    if(PV_DATA[Index].Groupe.length > 0)
    {
        for(let x = 0;x < PV_DATA[Index].Groupe.length;x++)
        {
            PV_ActualiserPV(Index, x, PV_DATA[Index].Groupe[x]);
        }
    }
    else
    {
        PV_ActualiserPV(Index, 0, PV_DATA[Index]);
    }
}
function PV_ActualiserPV(Id, Ligne, PtrPV)
{
    let Chaine = "";
    for(let x = 0;x < PERSO_DATA[Id].TabPV[Ligne].length;x++)
    {
        if(x > 0)
        {
            Chaine += " / ";
        }
        Chaine+= PERSO_DATA[Id].TabPV[Ligne][x];
    }
    PtrPV.PtrPV.innerHTML = Chaine;
    PtrPV.PtrMalus.innerHTML = PERSO_DATA[Id].MalusPV;
}
