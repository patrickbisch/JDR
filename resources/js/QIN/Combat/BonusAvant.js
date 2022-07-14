class BONUS_Avant_Interface  {
    Initialiser() {BONUSAVANT_Initialiser();}
    Actualiser(Index) {BONUSAVANT_Actualiser(Index);}
    Activer(Index, Etat) {BONUSAVANT_Activer(Index, Etat);}

    AfficherListe(Etat) {BONUSAVANT_AfficherListe(Etat);}
    Utiliser(Index) {BONUSAVANT_UtiliserBonusAvant(Index);}
    Ajouter(Index, Bonus) {BONUSAVANT_Ajouter(Index, Bonus);}
}
var BonusAvant = new BONUS_Avant_Interface ();
class BONUS_AVANT_Donnee {
    PtrLigne;
    PtrLabel;
    PtrSelect;
    Etat = false;
}
var BONUS_AVANT_DATA        = new Array();

function BONUSAVANT_Initialiser()
{
    for(let x = 0; x < PERSO_BASE.length; x++)
    {
        let Ptr = new BONUS_AVANT_Donnee();
        Ptr.PtrLigne = document.querySelector("#LigneChi-" + x);
        Ptr.PtrLabel = document.querySelector("#CHI-" + x);
        let Obj = document.querySelector("#BonusChi-" + x);
        Obj.addEventListener('change', function(){
                        BONUSAVANT_Nouveau(Obj,x);    
        });
        Ptr.PtrSelect = Obj;
        Ptr.Etat = false;
        BONUS_AVANT_DATA.push(Ptr);
    }
    for(let x = 0; x < BONUS_AVANT_DATA.length; x++)
    {
        if(parseInt(PERSO_BASE[x].CHI) > 0)
        {
            PERSO_DATA[x].BA.Maxi = PERSO_BASE[x].CHI;
            PERSO_DATA[x].BA.Valeur = PERSO_BASE[x].CHI;
            BONUS_AVANT_DATA[x].Etat = true;
        }
    }
}
function BONUSAVANT_Ajouter(Index, Bonus)
{
    console.debug("BONUSAVANT_Ajouter (Debut) : ",Index+"/"+PERSO_DATA[Index].BA.Valeur);
    PERSO_DATA[Index].BA.Valeur += parseInt(Bonus);
    console.debug("BONUSAVANT_Ajouter : ",Bonus+"/"+PERSO_DATA[Index].BA.Valeur);
    if(parseInt(PERSO_DATA[Index].BA.Valeur) > parseInt(PERSO_DATA[Index].BA.Maxi))
    {
        console.debug("BONUSAVANT_Ajouter (Maxi): ",PERSO_DATA[Index].BA.Maxi);
        PERSO_DATA[Index].BA.Valeur = PERSO_DATA[Index].BA.Maxi;
    }
    if(parseInt(PERSO_DATA[Index].BA.Valeur) < 0)
    {
        JDR_BlesserPersonnage(Index, Math.abs(PERSO_DATA[Index].BA.Valeur));
        PERSO_DATA[Index].BA.Valeur = 0;
    }
    console.debug("BONUSAVANT_Ajouter (Apres) : ",Bonus+"/"+PERSO_DATA[Index].BA.Valeur);
    BonusAvant.Actualiser(Index);
}
function BONUSAVANT_Nouveau(Obj, Id)
{
    PERSO_DATA[Id].BA.Bonus = Obj.value;
}
function BONUSAVANT_UtiliserBonusAvant(Index)
{
    if(parseInt(PERSO_DATA[Index].BA.Bonus) == 0)
    {
        return(0);
    }
    let Nb = -2 * PERSO_DATA[Index].BA.Bonus;
    MSG.Journal("Utilise <strong>" + Math.abs(Nb) + "</strong> points de <strong>CHI</strong>.", 2);
    BonusAvant.Ajouter(Index, Nb);
    PERSO_DATA[Index].BA.Bonus = 0;
    BONUS_AVANT_DATA[Index].PtrSelect.value = 0;
}
function BONUSAVANT_Activer(Index, Etat = true)
{
    BONUS_AVANT_DATA[Index].PtrSelect.disabled = !Etat;
}
function BONUSAVANT_Actualiser(Index)
{
    let Nb = PERSO_DATA[Index].BA.Valeur;
    BONUS_AVANT_DATA[Index].PtrLabel.innerHTML = Nb;
    console.debug("BONUSAVANT_Actualiser : " + Index +"/"+Nb);
}
function BONUSAVANT_AfficherListe(Etat = true)
{
    for(let x = 0;x < BONUS_AVANT_DATA.length;x++)
    {
        let Ptr = BONUS_AVANT_DATA[x];
        AfficherObjet(Ptr.PtrLigne, Ptr.Etat && Etat);
        PV.Afficher(x, Ptr.Etat && Etat);
    }
}
