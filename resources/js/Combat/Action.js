class ACTION_Interface  {
    Initialiser(Taille) {ACTION_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(ACTION_DATA, Etat);}
}
var Action = new ACTION_Interface();
let ACTION_DATA = new Array();

class ACTION_Donnee{
    PtrLigne;
    PtrSelect;
    Etat = false;
}

function ACTION_Initialiser(Taille)
{
    MSG.Historique("Initialisation des actions.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new ACTION_Donnee();
        ACTION_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneAction-" + x);
        let Obj = document.querySelector("#Action-" + x);
        Obj.addEventListener('change', function(){
                        ACTION_Nouvelle(Obj, x);    
        });
        Ptr.PtrSelect = Obj;
        Ptr.Etat = true;
    }
    Action.AfficherListe(false);
}
function ACTION_Nouvelle(Ptr, Id)
{

}