class INIT_Interface  {
    Initialiser(Taille) {INIT_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(INIT_DATA, Etat);}
}
var Initiative = new INIT_Interface();
let INIT_DATA = new Array();

class INIT_Donnee{
    PtrLigne;
    PtrSelectInit;
    Etat = false;
}

function INIT_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'initiative.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new INIT_Donnee();
        INIT_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneInit-" + x);
        let Obj = document.querySelector("#TypeInit-" + x);
        Obj.addEventListener('change', function(){
                        INIT_Jet(Obj, x);    
        });
        Ptr.PtrSelectInit = Obj;
        switch(Perso.TypeFonction(x))
        {
            case 0:
            case 7:
                JDR_InitialiserSelectJet(Obj);
                break
            default:
                JDR_InitialiserSelectJet(Obj, 1);
                break;
        }

        Ptr.Etat = true;
    }
    Initiative.AfficherListe(false);
}
function INIT_Jet(Ptr, Id)
{

}