class TD_Interface  {
    Initialiser(Taille) {TD_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(TD_DATA, Etat);}
}
var Defense = new TD_Interface();
let TD_DATA = new Array();

class TD_Donnee{
    PtrLigne;
    PtrSelectTypeDefense;
    PtrSelectJetDefense;
    Etat = false;
}

function TD_Initialiser(Taille)
{
    MSG.Historique("Initialisation de la defense.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new TD_Donnee();
        TD_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneDefendre-" + x);
        let Obj = document.querySelector("#DefenseContre-" + x);
        Obj.addEventListener('change', function(){
                        TD_Nouvelle(Obj, x);    
        });
        Ptr.PtrSelectTypeDefense = Obj;

        Obj = document.querySelector("#JetDefense-" + x);
        Obj.addEventListener('change', function(){
                        TD_Jet(Obj, x);    
        });
        Ptr.PtrSelectJetDefense = Obj;
        JDR_InitialiserSelectJet(Obj);

        Ptr.Etat = true;
    }
    Defense.AfficherListe(false);
}
function TD_Nouvelle(Ptr, Id)
{

}
function TD_Jet(Ptr, Id)
{

}