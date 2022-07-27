class DA_Interface  {
    Initialiser(Taille) {DA_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(DA_DATA, Etat);}
    Ajout(Id, Bonus) {DA_Ajouter(Id, Bonus);}
}
var DefensePassive  = new DA_Interface ();
class DA_Donnee {
    PtrLigne;
    PtrLabel;
    Etat = false;
}
let DA_DATA     = new Array();

function DA_Initialiser(Taille)
{
    MSG.Historique("Initialisation des défenses PASSIF.", 1);
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new DA_Donnee();
        DA_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneDefense-" + x);
        Ptr.PtrLabel = document.querySelector("#DefensePassive-" + x);
        Ptr.Etat = true;
        DA_Modifier(x, Perso.Base(x).DefensePassive);
    }
    DefensePassive.AfficherListe(false);
}
function DA_Modifier(Id, Valeur)
{
    Perso.Base(Id).DefensePassive = Valeur;
    DA_DATA[Id].PtrLabel.innerHTML = Valeur;
}
function DA_Ajouter(Id, Bonus)
{
    DA_Modifier(Id, parseInt(Perso.Base(Id).DefensePassive) + parseInt(Bonus));
}