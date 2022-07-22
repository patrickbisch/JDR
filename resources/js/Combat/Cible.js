class CIBLE_Interface  {
    Active = -1;
    Initialiser(Taille) {CIBLE_Initialiser(Taille);}
    AfficherListe(Etat) {CIBLE_AfficherListe(Etat);}
}
var Cible = new CIBLE_Interface();
let CIBLE_DATA = new Array();

class CIBLE_Groupe {
    PtrLigne;
    PtrMoins;
    PtrPlus;
    PtrNb;
    PtrPJ;
    Nb=0;
}
class CIBLE_Donnee{
    PtrLigne;
    PtrSelectCible;
    Groupe = false;
    TabGroupe = new Array();
    Libre = 0;
    PtrLibre;
    Mort = 0;
    PtrMort;
}

function CIBLE_Initialiser(Taille)
{
    MSG.Historique("Initialisation des cibles.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new CIBLE_Donnee();
        CIBLE_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneCible-" + x);
        switch(Perso.TypeFonction(x))
        {
            case 4:
            case 5:
            case 6:
                Ptr.Groupe = true;
                Ptr.Libre = Perso.Base(x).NbPNJ;
                Ptr.PtrLibre = document.querySelector("#Libre-" + x);
                Ptr.PtrLibre.innerHTML = Ptr.Libre;
                Ptr.Mort = 0;
                Ptr.PtrMort = document.querySelector("#Mort-" + x);
                Ptr.PtrMort.innerHTML = 0;
                for(let y = 0;y < Perso.IndexPJ.length;y++)
                {
                    let PtrGrp = new CIBLE_Groupe();
                    let Obj = document.querySelector("#LignePV-" + x + "-" + y);
                    PtrGrp.PtrLigne = Obj;

                    Obj = document.querySelector("#PJ-" + x + "-" + y);
                    Obj.innerHTML = Obj.innerHTML + " " + Perso.Nom(Perso.IndexPJ[y]);
                    PtrGrp.PtrPJ = Obj;

                    Obj = document.querySelector("#Nb-" + x + "-" + y);
                    Obj.innerHTML = 0;
                    PtrGrp.PtrNb = Obj;

                    Obj = document.querySelector("#Moins-" + x + "-" + y);
                    Bouton.Activer(Obj, false);
                    Obj.addEventListener('click', function(e){
                        e.preventDefault();
                        CIBLE_GroupeMoins(x, y);
                    });
                    PtrGrp.PtrMoins = Obj;
                
                    Obj = document.querySelector("#Plus-" + x + "-" + y);
                    Bouton.Activer(Obj, true);
                    Obj.addEventListener('click', function(e){
                        e.preventDefault();
                        CIBLE_GroupePlus(x, y);
                    });
                    PtrGrp.PtrPlus = Obj;

                    Ptr.TabGroupe.push(PtrGrp);
                }
                break;
            default:
                let Obj = document.querySelector("#Cible-" + x);
                Obj.addEventListener('change', function(){
                                CIBLE_Nouvelle(Obj, x);    
                });
                Ptr.PtrSelectCible = Obj;
        }
    }
    Cible.AfficherListe(false);
}
function CIBLE_AfficherListe(Etat = false)
{
    for(let x = 0;x < CIBLE_DATA.length;x++)
    {
        let Ptr = CIBLE_DATA[x];
        switch(Perso.TypeFonction(x))
        {
            case 4:
            case 5:
            case 6:
                for(let y = 0;y < Ptr.TabGroupe.length;y++)
                {
                    Objet.Afficher(Ptr.TabGroupe[y].PtrLigne, Etat);
                }
                break;
            default:
                Objet.Afficher(Ptr.PtrLigne, Etat);
        }
    }
}

function CIBLE_Nouvelle(Ptr, Id)
{

}