class CIBLE_Interface  {
    Initialiser(Taille) {CIBLE_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(CIBLE_DATA, Etat);}
}
var Cible = new CIBLE_Interface();
let CIBLE_DATA = new Array();

class Cible_Donnee{
    PtrLigne;
    PtrSelectInit;
    Etat = false;
}

function CIBLE_Initialiser(Taille)
{
    MSG.Historique("Initialisation des cibles.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new CIBLE_Donnee();
        CIBLE_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneInit-" + x);
        let Obj = document.querySelector("#TypeInit-" + x);
        Obj.addEventListener('change', function(){
                        INIT_Jet(Obj, x);    
        });
        Ptr.PtrSelectInit = Obj;

        Ptr.Etat = true;
    }
    Cible.AfficherListe(false);
}
function INIT_Jet(Ptr, Id)
{

}