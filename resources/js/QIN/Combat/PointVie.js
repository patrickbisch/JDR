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
            Chaine += "/";
        }
        Chaine+= PERSO_DATA[Id].TabPV[Ligne][x];
    }
    PtrPV.PtrPV.innerHTML = Chaine;
    PtrPV.PtrMalus.innerHTML = PERSO_DATA[Id].MalusPV;
}
/**************************************************************************************/
/* Gestion des des point de vies (blessures etc .....)
/**************************************************************************************/
function JDR_BlesserPersonnage(Id, Blessures, CibleVeritable)
{
    let TabMalus = [0,0,-1,-3,-5];
    let Malus = 0;
    let Reste = Blessures;
    let Somme = 0;
    switch(parseInt(Perso.TypeFonction(Id)))
    {
        case 1:
        case 2:
        case 3:
            if(Blessures > 0)
            {
                Reste =  Math.floor(Blessures / 6) + 1;
            }
        case 0:
        case 7:
            for(let x = 0;x < PERSO_DATA[Id].TabPV[0].length;x++)
            {
                PERSO_DATA[Id].TabPV[0][x] -= Reste;
                if(PERSO_DATA[Id].TabPV[0][x] < 0)
                {
                    Reste = Math.abs(PERSO_DATA[Id].TabPV[0][x]);
                    PERSO_DATA[Id].TabPV[0][x] = 0;
                }
                else
                {
                    Reste = 0;
                }
                if(PERSO_DATA[Id].TabPV[0][x] != PERSO_DATA[Id].TabPVMaxi[x])
                {
                    Malus = TabMalus[x];
                }
                Somme += PERSO_DATA[Id].TabPV[0][x];
            }
            if(Somme == 0)
            {
                Perso.ChangerEtat(Id, true);
            }
            PERSO_DATA[Id].MalusPV = Malus;
            PV_Actualiser(Id)
            break;
        case 4:
        case 5:
        case 6:
            let Encore = true;
            if(Blessures > 0)
            {
                Reste =  Math.floor(Blessures / 6) + 1;
            }
            if(CibleVeritable !== undefined)
            {
                let Chaine = CibleVeritable + "-0";
                let TabId = Chaine.split("-");
                let Nb = TabId[1];
                if(CIBLE_DATA[Id].TabGroupe[Nb].Nb > 0)
                {
                    for(let x = 0;x < PERSO_DATA[Id].TabPV[Nb].length;x++)
                    {
                        PERSO_DATA[Id].TabPV[Nb][x] -= Reste;
                        if(PERSO_DATA[Id].TabPV[Nb][x] < 0)
                        {
                            Reste = Math.abs(PERSO_DATA[Id].TabPV[Nb][x]);
                            PERSO_DATA[Id].TabPV[Nb][x] = 0;
                        }
                        else
                        {
                            Reste = 0;
                        }
                        if(PERSO_DATA[Id].TabPV[Nb][x] != PERSO_DATA[Id].TabPVMaxi[x])
                        {
                            Malus = TabMalus[x];
                        }
                        Somme += PERSO_DATA[Id].TabPV[Nb][x];
                    }
                    if(Somme == 0)
                    {
                        CIBLE_DATA[Id].TabGroupe[Nb].Nb--;
                        CIBLE_DATA[Id].Mort++;
                        PERSO_DATA[Id].TabPV[Nb] = PERSO_BASE[Id].PV.split("/");
                    }
                    Encore = false;
                }
            }
            if(Encore && (CIBLE_DATA[Id].Libre > 0))
            {
                CIBLE_DATA[Id].Libre--;
                CIBLE_DATA[Id].Mort++;
                Encore = false;
            }
            for(let x = 0;x < CIBLE_DATA[Id].TabGroupe.length;x++)
            {
                if(Encore && (CIBLE_DATA[Id].TabGroupe[x].Nb > 0))
                {
                    CIBLE_DATA[Id].TabGroupe[x].Nb--;
                    CIBLE_DATA[Id].Mort++;
                    Encore = false;
                }
            }
            Somme = parseInt(CIBLE_DATA[Id].Libre);
            for(let x = 0;x < CIBLE_DATA[Id].TabGroupe.length;x++)
            {
                Somme += parseInt(CIBLE_DATA[Id].TabGroupe[x].Nb);
            }
            if(parseInt(Somme) == 0)
            {
                Perso.ChangerEtat(Id, true);
                MSG.Erreur("MORT DE : "+Id);
            }
            PERSO_DATA[Id].MalusPV = Malus;
            PV_Actualiser(Id)
            CIBLE_AfficherGroupe(Id);
            break;
        default:
            MSG.Erreur("JDR_BlesserPersonnage = id_fonction : "+PERSO_BASE[Id].id_fonction+" NON GEREE "+Blessures+" Degats");
    }
}
