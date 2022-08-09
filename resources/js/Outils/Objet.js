class OBJET_Interface{
    Afficher(Obj, Etat) {OBJET_Afficher(Obj, Etat);}
    Activer(Obj, Etat) {OBJET_Activer(Obj, Etat);}
    AfficherFamille(Code, Etat) {OBJET_AfficherFamille(Code, Etat);}
    AfficherListe(PtrStructure, Etat) {OBJET_AfficherListe(PtrStructure, Etat);}
    Couleur(Obj, Etat) {OBJET_Couleur(Obj, Etat);}
}
var Objet       = new OBJET_Interface();

function OBJET_Afficher(Obj, Etat = true)
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
function OBJET_Activer(Obj, Etat = true)
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
        case 7:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "khaki";
            Ptr.style.color = "black";
            break;
        case 6:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "lightgreen";
            Ptr.style.color = "black";
            break;
        case 5:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "purple";
            Ptr.style.color = "white";
            break;
        case 4:
            Ptr.disabled = false;
            Ptr.style.backgroundColor = "ivory";
            Ptr.style.color = "black";
            break;
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
            Ptr.style.color = CouleurLigne.style.color;
            break;
        case -1:
            Ptr.disabled = true;
            Ptr.style.backgroundColor = "darkgray";
            Ptr.style.color = "dimgrey";
            break;
        case -3:
            Ptr.style.backgroundColor = "transparent";
            break;
        case -4:
            Ptr.style.backgroundColor = "black";
            Ptr.style.color = "black";
            break;
        case -2:
        default:
            Ptr.disabled = true;
            Ptr.style.backgroundColor = "tomato";
            Ptr.style.color = "black";
    }
}
