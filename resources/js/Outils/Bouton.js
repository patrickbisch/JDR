class BOUTON_Gestion{
    PtrBouton = new Array();
    Etat = false;
    Valide = true;
}
class BOUTON_VALIDER{
    Module = "";
    Afficher(Etat) {BOUTON_Afficher(PtrBtnValider, Etat);}
    Demarrer(NouveauModule) {BOUTON_VALIDER_Demarrer(NouveauModule);}
    Activer(Etat) {BOUTON_Activer(PtrBtnValider, Etat);}
    Desactiver() {BOUTON_Activer(PtrBtnValider, false);}
}
class BOUTON_Interface{
    Valider = new BOUTON_VALIDER();

    Initialiser() {BOUTON_Initialiser();}
    Afficher(Obj, Etat) {BOUTON_Afficher(Obj, Etat);}
    Activer(Obj, Etat) {BOUTON_Activer(Obj, Etat);}
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
            EQUIP_ValiderDe();
            break;
        case "ACTION":
            ACTION_ValiderDe();
            break;
        case "ATTAQUE":
            ATTAQUE_ValiderDE();
            break;
        default:
            MSG.Erreur("BOUTON_ValiderDe = Phase de tour [" + Bouton.Valider.Module + "] INCONNUE !!");
    }
}
function BOUTON_VALIDER_Demarrer(NouveauModule)
{
    Bouton.Valider.Module = NouveauModule;
    BOUTON_Afficher(PtrBtnValider, true);
    BOUTON_Activer(PtrBtnValider, true);
}
/*******************************************************************/
/*  Gestion pour les boutons
/*******************************************************************/
function BOUTON_Afficher(Obj, Etat = true)
{
    if(Etat)
    {
        Obj.style.display = "block";
    }
    else
    {
        Obj.style.display = "none";
    }
}
function BOUTON_Activer(Obj, Etat = true)
{
    if(Etat)
    {
        Obj.disabled = false;
        Obj.style.opacity = "1";
    }
    else
    {
        Obj.disabled = true;
        Obj.style.opacity = "0.3";
    }
}
