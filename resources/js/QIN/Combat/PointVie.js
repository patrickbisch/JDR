class PV_Interface  {
    Initialiser(Taille) {PV_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(PV_DATA, Etat);}
}
var PV = new PV_Interface();
let PV_DATA = new Array();

class PV_Donnee{
    PtrLigne;
    PtrSelectTypeDefense;
    PtrSelectJetDefense;
    Etat = false;
}

function PV_Initialiser(Taille)
{
    MSG.Historique("Initialisation des points de vie.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new PV_Donnee();
        PV_DATA.push(Ptr);
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
    PV.AfficherListe(false);
}
function PV_Nouvelle(Ptr, Id)
{

}
function PV_Jet(Ptr, Id)
{

}