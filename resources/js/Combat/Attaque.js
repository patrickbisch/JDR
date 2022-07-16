class TA_Interface  {
    Initialiser(Taille) {TA_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(TA_DATA, Etat);}
}
var Attaque = new TA_Interface();
let TA_DATA = new Array();

class TA_Donnee{
    PtrLigne;
    PtrSelectTypeAttaque;
    PtrSelectJetAttaque;
    Etat = false;
}

function TA_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'attaque.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new TA_Donnee();
        TA_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneTypeAttaque-" + x);
        let Obj = document.querySelector("#TypeAttaque-" + x);
        Obj.addEventListener('change', function(){
                        TA_Nouvelle(Obj, x);    
        });
        Ptr.PtrSelectTypeAttaque = Obj;

        Obj = document.querySelector("#JetAttaque-" + x);
        Obj.addEventListener('change', function(){
                        TA_Jet(Obj, x);    
        });
        Ptr.PtrSelectJetAttaque = Obj;
        JDR_InitialiserSelectJet(Obj);

        Ptr.Etat = true;
    }
    Attaque.AfficherListe(false);
}
function TA_Nouvelle(Ptr, Id)
{

}
function TA_Jet(Ptr, Id)
{

}