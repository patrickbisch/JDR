class BOUTON_Gestion{
    PtrBouton = new Array();
    Etat = false;
    Valide = true;
}
class BOUTON_VALIDER{
    Module = "";
    Afficher(Etat) {Objet.Afficher(PtrBtnValider, Etat);}
    Demarrer(NouveauModule, Etat) {BOUTON_VALIDER_Demarrer(NouveauModule, Etat);}
    Activer(Etat) {Objet.Activer(PtrBtnValider, Etat);}
    Desactiver() {Objet.Activer(PtrBtnValider, false);}
}
class BOUTON_Interface{
    Valider = new BOUTON_VALIDER();

    Initialiser() {BOUTON_Initialiser();}
    Afficher(Obj, Etat) {Objet.Afficher(Obj, Etat);}
    Activer(Obj, Etat) {Objet.Activer(Obj, Etat);}
}
var Bouton          = new BOUTON_Interface();
let PtrBtnValider;
/*******************************************************************/
/*  Gestion des boutons du formulaire
/*  LancerDe, ouvrir et fermer les listes deroulantes (PNJ, PJ et Init)
/*******************************************************************/
function BOUTON_Initialiser()
{
    PtrBtnValider = document.querySelector("#BtnValider");
    Bouton.Valider.Afficher(false);
    PtrBtnValider.addEventListener('click', function(e){
                e.preventDefault();
                BOUTON_ValiderDe();
    });
}
/*******************************************************************/
/*  Gestion pour la validation
/*******************************************************************/
function BOUTON_ValiderDe()
{
    switch(Bouton.Valider.Module)
    {
        case "INIT":
            INIT_ValiderDE();
            break;
        case "EQUIP":
            EQUIP_ValiderDE();
            break;
        case "ACTION":
            ACTION_ValiderDE();
            break;
        case "ATTAQUE":
            ATTAQUE_ValiderDE();
            break;
        case "DEFENSE":
            DEFENSE_ValiderDE();
            break;
        case "CARTO_PNJ":
        case "CARTO_PJ":
            CARTO_ValiderDE();
            break;
        default:
            MSG.Erreur("BOUTON_ValiderDe = Phase de tour [" + Bouton.Valider.Module + "] INCONNUE !!");
    }
}
function BOUTON_VALIDER_Demarrer(NouveauModule, Etat = true)
{
    Bouton.Valider.Module = NouveauModule;
    Bouton.Afficher(PtrBtnValider, true);
    Bouton.Activer(PtrBtnValider, Etat);
}
