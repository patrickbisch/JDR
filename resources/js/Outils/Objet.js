class OBJET_Interface{
    Afficher(Obj, Etat) {OBJET_Afficher(Obj, Etat);}
    AfficherFamille(Code, Etat) {OBJET_AfficherFamille(Code, Etat);}
    AfficherListe(PtrStructure, Etat) {OBJET_AfficherListe(PtrStructure, Etat);}
    Couleur(Obj, Etat) {OBJET_Couleur(Obj, Etat);}
}
var Objet       = new OBJET_Interface();

function OBJET_Afficher(Ptr, Etat = true)
{
    if(Etat == true)
    {
        Ptr.style.height = "auto";
    }
    else
    {
        Ptr.style.height = "0px";
    }
}
function OBJET_AfficherListe(PtrStructure, Etat = false)
{
    for(let x = 0;x < PtrStructure.length;x++)
    {
        let Ptr = PtrStructure[x];
        Objet.Afficher(Ptr.PtrLigne, Ptr.Etat && Etat);
    }
}
function OBJET_AfficherFamille(Code, Etat = true)
{
    let LstObj = document.querySelectorAll("."+Code);
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = LstObj[x];
        Objet.Afficher(Ptr,Etat);
    }
}
function OBJET_Couleur(Ptr, Etat)
{
    switch(parseInt(Etat))
    {
        case 3:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "cyan";
            Ptr.style.color = "black";
            break;
        case 2:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "red";
            Ptr.style.color = "black";
            break;
        case 1:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "yellow";
            Ptr.style.color = "black";
            break;
        case 0:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = CouleurLigne.style.backgroundColor;
            Ptr.style.color = "black";
            break;
        case -1:
            Ptr.disabled = true;
            Ptr.style.backgroundColor = "darkgray";
            Ptr.style.color = "dimgrey";
            break;
        case -3:
            Ptr.style.backgroundColor = "transparent";
            break;
        case -2:
        default:
            Ptr.disabled = true;
            Ptr.style.backgroundColor = "tomato";
            Ptr.style.color = "black";
    }
}
