class BONUS_Avant_Interface  {
    Initialiser() {BONUSAVANT_Initialiser();}
    Actualiser(Index) {BONUSAVANT_Actualiser(Index);}
    Activer(Index, Etat) {BONUSAVANT_Activer(Index, Etat);}

    AfficherListe(Etat) {BONUSAVANT_AfficherListe(Etat);}
    Utiliser(Index) {BONUSAVANT_UtiliserBonusAvant(Index);}
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
            Perso.AffecterBonusAvantMaxi(x, PERSO_BASE[x].CHI);
            Perso.AffecterBonusAvant(x, Perso.BonusAvantMaxi(x));
            BONUS_AVANT_DATA[x].Etat = true;
        }
    }
}
function BONUSAVANT_Nouveau(Obj, Id)
{
    PERSO_DATA[Id].BonusAvant = Obj.value;
}
function BONUSAVANT_Utiliser(Index, Nb, Afficher = true)
{
    if(Nb == 0)
    {
        return(0);
    }
    if(Perso.BonusAvantMaxi(Index) == 0)
    {
        return(0);
    }
    Perso.AffecterBonusAvant(Index, -1 * Nb);
}
function BONUSAVANT_UtiliserBonusAvant(Index)
{
    if(parseInt(PERSO_DATA[Index].BonusAvant) == 0)
    {
        return(0);
    }
    let Nb = -2 * PERSO_DATA[Index].BonusAvant;
    MSG.Journal("Utilise <strong>" + Math.abs(Nb) + "</strong> points de <strong>CHI</strong>.", 2);
    Perso.AffecterBonusAvant(Index, Nb);
    PERSO_DATA[Index].BonusAvant = 0;
    BONUS_AVANT_DATA[Index].PtrSelect.value = 0;
}
function BONUSAVANT_Activer(Index, Etat = true)
{
    BONUS_AVANT_DATA[Index].PtrSelect.disabled = !Etat;
}
function BONUSAVANT_Actualiser(Index)
{
    let Nb = Perso.BonusAvant(Index);
    if(parseInt(Nb) > 0 )
    {
        BONUS_AVANT_DATA[Index].PtrSelect.disabled = false;
    }
    else
    {
        BONUS_AVANT_DATA[Index].PtrSelect.value = 0;
        BONUS_AVANT_DATA[Index].PtrSelect.disabled = true;
    }
    BONUS_AVANT_DATA[Index].PtrLabel.innerHTML = Nb;
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
