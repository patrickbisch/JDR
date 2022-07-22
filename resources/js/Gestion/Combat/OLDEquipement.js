class EQUIP_Interface  {
    Demarrer() {EQUIP_Demarrer();}
    AfficherListeArme(Etat) {EQUIP_AfficherListe(0, Etat);}
    AfficherListeArmure(Etat) {EQUIP_AfficherListe(1, Etat);}
    AfficherListeBouclier(Etat) {EQUIP_AfficherListe(2, Etat);}
    ArmeSelectionne(Index) {return(EQUIP_DATA[Index].Equipement[0].PtrSelect.value);}
    CouleurArme(Index, Couleur) {CouleurObjet(EQUIP_DATA[Index].Equipement[0].PtrLigne, Couleur);}
    BouclierSelectionne(Index) {return(EQUIP_DATA[Index].Equipement[2].PtrSelect.value);}
    Protection(Index) {return(EQUIP_Protection(Index));}
}
var Equip1 = new EQUIP_Interface();
var EQUIP_DATA1 = new Array();

class EQUIP_Objet{
    PtrLigne;
    PtrLabel;
    PtrSelect;
    //Indice = -1;
    Etat = false;
}
class EQUIP_Donnee{
    Equipement = new Array();
}

function EQUIP_Demarrer()
{
    ArreterModule();
    Gestion.NouvellePhase("EQUIP");
    MSG.Message("Initialisation de l'équipement.", true);
    AfficherBouton("LancerDe", false);
    AfficherBouton("BtnValider", true);
    AfficherListeObjetID(".Ligne", true);
    AfficherListeObjetID(".Initiative", false);
    EQUIP_Initialiser();
    EQUIP_AfficherInventaire();
    EQUIP_TesterObjet(EQUIP_RetournerErreur());
    Perso.InitialiserNombreAction();

    MSG.Message("Définissez le matériel <strong> en main</strong> avant le premièr tour des <strong>PNJ</Strong> et <strong>PJ</strong>, puis validez en cliquant sur le bouton");
    
    console.warn("EQUIP_Demarrer <<ACTIVATION BOUTON>>");
    EQUIP_TesterObjet(0);    
}
function EQUIP_InitialisationTermine()
{
    EQUIP_TesterObjet();
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            if(EQUIP_DATA[x].Equipement[y].PtrSelect.options.length > 0)
            {
                if(EQUIP_DATA[x].Equipement[y].PtrSelect.value == "-2")
                {
                    EQUIP_DATA[x].Equipement[y].PtrSelect.value = "-1";
                }
                EQUIP_DATA[x].Equipement[y].PtrSelect.options.remove(0);
                EQUIP_DATA[x].Equipement[y].PtrSelect.disabled = true;
                CouleurObjet(EQUIP_DATA[x].Equipement[y].PtrLigne, 0);
            }
        }
    }
    LancerModule("Initialisation");
}
function EQUIP_AfficherInventaire()
{
    for(let x = 0;x < EQUIP_DATA[0].Equipement.length;x++)
    {
        EQUIP_AfficherListe(x);
    }
}
function EQUIP_AfficherListe(Id, Etat = true)
{
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        let Ptr = EQUIP_DATA[x].Equipement[Id];
        AfficherObjet(Ptr.PtrLigne, Ptr.Etat && Etat);
    }    
}
function EQUIP_TesterObjet(Erreur = 1)
{
    if(Gestion.Phase == "EQUIP")
    {
        if(Erreur == 0)
        {
            ActiverBouton("BtnValider", true);
        }
        else
        {
            ActiverBouton("BtnValider", false);
        }
    }
}
function EQUIP_RetournerErreur()
{
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            if((EQUIP_DATA[x].Equipement[y].Etat) && (EQUIP_DATA[x].Equipement[y].PtrSelect.value == "-1"))
            {
                return(1);
            }
        }
    }
    return(0);
}
function EQUIP_Protection(Index)
{
    let Retour = 0;
    let CA = EQUIP_DATA[Index].Equipement[1].PtrLabel.innerHTML;
    if(CA != "")
    {
        Retour += parseInt(CA);
    }
    CA = EQUIP_DATA[Index].Equipement[2].PtrLabel.innerHTML;
    if(CA != "")
    {
        Retour += parseInt(CA);
    }
    return(Retour);
}