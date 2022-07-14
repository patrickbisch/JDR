class PV_Interface  {
    Initialiser(Taille) {PV_Initialiser(Taille);}

    Afficher(Index, Etat) {PV_Afficher(Index, Etat);}
    AfficherListe(Etat) {PV_AfficherListe(Etat);}
}
var PV = new PV_Interface ();
class PV_Donnee {
    PtrLigne;
    PtrPV;
    PtrMalus;
    Groupe = new Array();
}
var PV_DATA        = new Array();

/**************************************************************************************/
/* Gestion des zones PV et de leur affichage 
/**************************************************************************************/
function PV_Initialiser(Taille)
{
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new PV_Donnee();
        Ptr.PtrLigne = document.querySelector("#LignePV-" + x);
        switch(parseInt(Perso.TypeFonction(x)))
        {
            case 4:
            case 5:
            case 6:
                for(let y = 0;y < Perso.NombrePJ();y++)
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
                break;
        }
        PV_DATA.push(Ptr);
        PV_Actualiser(x);
    }
}
function PV_Afficher(Index, Etat = true)
{
    AfficherObjet(PV_DATA[Index].PtrLigne, Etat);
    for(let x = 0;x < PV_DATA[Index].Groupe.length;x++)
    {
        AfficherObjet(PV_DATA[Index].Groupe[x].PtrLigne, Etat);
    }
}
function PV_AfficherListe(Etat = true)
{
    for(let x = 0;x < PV_DATA.length;x++)
    {
        PV.Afficher(x, Etat);
        PV_Actualiser(x);
    }
}
function PV_Actualiser(Index)
{
    switch(parseInt(Perso.TypeFonction(Index)))
    {
        case 4:
        case 5:
        case 6:
            for(let x = 0;x < PV_DATA[Index].Groupe.length;x++)
            {
                PV_ActualiserPV(Index, x, PV_DATA[Index].Groupe[x]);
            }
            break;
        default:
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
            Reste =  Math.floor(Blessures / 6) + 1;
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
            Reste =  Math.floor(Blessures / 6) + 1;
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
            Somme = CIBLE_DATA[Id].Libre;
            for(let x = 0;x < CIBLE_DATA[Id].TabGroupe.length;x++)
            {
                Somme += CIBLE_DATA[Id].TabGroupe[x].Nb;
            }
            if(Somme == 0)
            {
                Perso.ChangerEtat(Id, true);
            }
            PERSO_DATA[Id].MalusPV = Malus;
            PV_Actualiser(Id)
            CIBLE_AfficherGroupe(Id);
            break;
        default:
            MSG.Erreur("JDR_BlesserPersonnage = id_fonction : "+PERSO_BASE[Id].id_fonction+" NON GEREE "+Blessures+" Degats");
    }
}
