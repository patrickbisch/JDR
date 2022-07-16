class BA_Interface  {
    Initialiser(Taille) {BA_Initialiser(Taille);}
    //Actualiser(Index) {BONUSAVANT_Actualiser(Index);}
    Activer(Index, Etat) {BS_Activer(Index, Etat);}

    AfficherListe(Etat) {OBJET_AfficherListe(BA_DATA, Etat);}
    Utiliser(Index) {BA_Utiliser(Index);}
    Ajouter(Index, Bonus) {BA_Ajouter(Index, Bonus);}
}
var BonusAvant  = new BA_Interface ();
class BA_Donnee {
    PtrLigne;
    PtrLabel;
    PtrSelect;
    Etat = false;
}
let BA_DATA     = new Array();

function BA_Initialiser(Taille)
{
    MSG.Historique("Initialisation du CHI.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new BA_Donnee();
        BA_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneChi-" + x);
        Ptr.PtrLabel = document.querySelector("#CHI-" + x);
        let Obj = document.querySelector("#BonusChi-" + x);
        Obj.addEventListener('change', function(){
                        BA_Nouveau(Obj,x);    
        });
        Ptr.PtrSelect = Obj;
        Ptr.Etat = false;

        let Nb = Perso.Base(x).CHI;
        Perso.BonusAvant(x).Maxi = Nb;
        Perso.BonusAvant(x).Valeur = Nb;
        if(parseInt(Nb) > 0 ) {Ptr.Etat = true;}

        BA_Actualiser(x);
        BA_BonusMaxi(x, Perso.Base(x).Terre);
    }
    BonusAvant.AfficherListe(false);
}
function BA_BonusMaxi(Id, Valeur)
{
    let Ptr = BA_DATA[Id].PtrSelect;
    Ptr.options.length = 0;

    let Opt = document.createElement("option");
    Opt.text = "";
    Opt.value = "0";
    Opt.selected = true;
    Ptr.add(Opt);

    for(let x = 1;x <= Valeur;x++)
    {
        Opt = document.createElement("option");
        Opt.text = x;
        Opt.value = x;
        Ptr.add(Opt);
    }
}
function BA_Nouveau(Obj, Id)
{
    Perso.BonusAvant(Id).Bonus = Obj.value;
}
function BA_Actualiser(Id)
{
    let Nb = Perso.BonusAvant(Id).Valeur;
    BA_DATA[Id].PtrLabel.innerHTML = Nb;
}
function BA_Utiliser(Id)
{
    let BA = Perso.BonusAvant(Id);
    if(parseInt(BA.Bonus) == 0)
    {
        return(0);
    }
    let Nb = -2 * BA.Bonus;
    MSG.Journal("Utilise <strong>" + Math.abs(Nb) + "</strong> points de <strong>CHI</strong>.", 2);
    BA_Ajouter(Id, Nb);
    BA.Bonus = 0;
    BA_DATA[Id].PtrSelect.value = 0;
}
function BA_Ajouter(Id, Bonus)
{
    let BA = Perso.BonusAvant(Id);
    BA.Valeur += parseInt(Bonus);
    if(parseInt(BA.Valeur) > parseInt(BA.Maxi))
    {
        BA.Valeur = BA.Maxi;
    }
    if(parseInt(BA.Valeur) < 0)
    {
        JDR_BlesserPersonnage(Id, Math.abs(BA.Valeur));
        BA.Valeur = 0;
    }
    BA_Actualiser(Id);
}
function BS_Activer(Id, Etat = false)
{
    BA_DATA[Id].PtrSelect.disabled = !Etat;
}
