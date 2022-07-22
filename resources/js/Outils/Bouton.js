class BOUTON_Gestion{
    PtrBouton = new Array();
    Etat = false;
    Valide = true;
}
class BOUTON_Interface{
    Initialiser() {BOUTON_Initialiser();}
    Afficher(Obj, Etat) {BOUTON_Afficher(Obj, Etat);}
    Activer(Obj, Etat) {BOUTON_Activer(Obj, Etat);}
    Phase(Nouvelle) {return(BOUTON_Phase(Nouvelle));}
}
var Bouton          = new BOUTON_Interface();
var BtnValider;
var BoutonPhase = ""
/*******************************************************************/
/*  Gestion des boutons du formulaire
/*  LancerDe, ouvrir et fermer les listes deroulantes (PNJ, PJ et Init)
/*******************************************************************/
function BOUTON_Initialiser()
{
    BtnValider = document.querySelector("#BtnValider");
    Bouton.Afficher(BtnValider, false);
    BtnValider.addEventListener('click', function(e){
                e.preventDefault();
                BOUTON_ValiderDe();
    });
}
/*******************************************************************/
/*  Gestion pour la validation
/*******************************************************************/
function BOUTON_ValiderDe()
{
    switch(BoutonPhase)
    {
        case "INIT":
            INIT_ValiderDE();
            break;
        case "EQUIP":
        case "EQUIPEMENT":
            EQUIP_ValiderDe();
            break;
        default:
            MSG.Erreur("BOUTON_ValiderDe = Phase de tour [" + BoutonPhase + "] INCONNUE !!");
    }
}
function BOUTON_Phase(Nouvelle = "")
{
    if(Nouvelle != "")
    {
        BoutonPhase = Nouvelle;
    }
    return(BoutonPhase);
}
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
