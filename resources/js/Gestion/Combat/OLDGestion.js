class GESTION_Interface{
    Phase = "DEMARRAGE";
    NouvellePhase(NomPhase) {Gestion.Phase = NomPhase;}
}
/*******************************************************************/
/*  Declaration de toutes les variables de travail
/*******************************************************************/
var Gestion         = new GESTION_Interface();
/*******************************************************************************/
/*  Permet d 'Afficher' un objet
/*******************************************************************************/
function AfficherObjetID(Code, Etat = true)
{
    console.warn("AfficherObjetID : " + Code);
}
/*******************************************************************/
/* Activation d'un objet, Gestion de la couleur en fonction de l'etat
/*******************************************************************/
function CouleurObjetID(Code, Etat = 0)
{
    console.warn("CouleurObjetID : " + Code);
}
function CouleurListeObjetID(Code, Etat = 0)
{
    let LstObj = document.querySelectorAll(Code);
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = LstObj[x];
        Objet.Couleur(Ptr, Etat);
    }
}