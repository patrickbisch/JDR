class BOUTON_Gestion{
    PtrBouton = new Array();
    Etat = false;
}
class BOUTON_Interface{
    Initialiser() {BOUTON_Initialiser();}
    Afficher(Obj, Etat) {BOUTON_Afficher(Obj, Etat);}
    Activer(Obj, Etat) {BOUTON_Activer(Obj, Etat);}
}
var Bouton          = new BOUTON_Interface();
let BoutonListe     = new Array();

/*******************************************************************/
/*  Gestion des boutons du formulaire
/*  LancerDe, ouvrir et fermer les listes deroulantes (PNJ, PJ et Init)
/*******************************************************************/
function BOUTON_Initialiser()
{
    let LstObj = document.querySelectorAll(".Bouton");
    for(let x = 0; x < LstObj.length; x++)
    {
        BOUTON_Ajouter(LstObj[x]);
    }
}
function BOUTON_Ajouter(Ptr)
{
    let Cle = Ptr.id;
    let Tab = Cle.split("-");
    switch(Tab[0])
    {
        case "PNJ":
        case "PJ":
            break;
        case "Init1":
            Ptr.addEventListener('click', function(e){
                e.preventDefault();
                BOUTON_ActiverFleche(Tab[0],Tab[1]);
            });
            BOUTON_Activer(Ptr, false);
            BOUTON_Activer(Ptr, true);
            break;
        case "Histo":
        case "Journal":
        case "Plus":
        case "Moins":
            break;
        default:
            console.info("Bouton [" + Cle + "] NON GERE !");
            return(-1);
    }
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
