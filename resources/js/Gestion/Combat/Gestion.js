class GESTION_Interface{
    Phase = "INIT";
    NouvellePhase(NomPhase) {Gestion.Phase = NomPhase;}
}
class GESTION_DessageDetail{
    PtrLabel;
    Buffer = new Array();
    Taille = 10;
    NombreParagraphe = 0;
    constructor(NombreLigneMaxi) {
        this.Taille = NombreLigneMaxi;
    }
}
class GESTION_Message{
    Initialsier() {MSG_Initialiser();}
    Afficher(Fenetre) {MSG_Afficher(Fenetre);}
    Message(MsgTexte, AjoutHistorique) {MSG_AjouterMessage(MsgTexte, AjoutHistorique);}
    Historique(MsgTexte, NbTabulation) {MSG_Historique(MsgTexte, NbTabulation);}
    Erreur(MsgTexte) {MSG_Erreur(MsgTexte);}
    Journal(MsgTexte, NbTabulation) {MSG_Journal(MsgTexte, NbTabulation);}
    ViderHistorique() {MSG_ViderBuffer(MSG.MsgHisto);}
    ViderJournal(NbParagraphe) {MSG_ViderBuffer(MSG.MsgJournal, NbParagraphe);}

    PtrLableMessage;
    MsgHisto = new GESTION_DessageDetail(36);
    MsgJournal = new GESTION_DessageDetail(20);
}
/*******************************************************************/
/*  Declaration de toutes les variables de travail
/*******************************************************************/
var Gestion         = new GESTION_Interface();
var MSG             = new GESTION_Message();
/*******************************************************************/
/*  Permet d'afficher un message dans le menu bas
/*******************************************************************/
function AjouterJournal(Texte){}
function MSG_AjouterMessage(MsgTexte, AjoutHistorique = false)
{
    MSG.PtrLableMessage.innerHTML = MsgTexte;
    if(AjoutHistorique)
    {
        MSG_Historique(MsgTexte);
    }
}
function MSG_Historique(Texte, Tabulation = 0)
{
    MSG_Ajouter(MSG.MsgHisto, Texte, Tabulation);
}
function MSG_Erreur(MsgTexte)
{
    MSG.MsgHisto.Buffer.push("");
    MSG.MsgHisto.Buffer.push("**************************************************");
    MSG.MsgHisto.Buffer.push("<span class='SpanTabulation1'>ERREUR : " + MsgTexte + "</span>");
    MSG.MsgHisto.Buffer.push("**************************************************");
    MSG_Ajouter(MSG.MsgHisto, "");
    console.error(MsgTexte);
}
function MSG_Journal(Texte, Tabulation = 0)
{
    MSG_Ajouter(MSG.MsgJournal, Texte, Tabulation);
}
function MSG_Ajouter(Ptr, MsgTexte, Tabulation = 0)
{
    let Chaine = "";
    switch(parseInt(Tabulation))
    {
        case 1:
        case 2:
        case 3:
            Chaine = "<span class='SpanTabulation" + Tabulation + "'>" + MsgTexte + "</span>";
            break;
        default:
            Chaine = MsgTexte;
    }
    Ptr.Buffer.push(Chaine);
    for(;Ptr.Buffer.length > Ptr.Taille;)
    {
        Ptr.Buffer.splice(0,1);
    }
    MSG_ControlerPAragraphe(Ptr);
    MSG_AfficherMessage(Ptr);
}
function MSG_ControlerPAragraphe(Ptr)
{
    if(parseInt(Ptr.NombreParagraphe) == 0)
    {
        return(0);
    }
    var NbPara = 0;
    for(let x = Ptr.Buffer.length -1;x > 1;x--)
    {
        if(Ptr.Buffer[x] == "")
        {
            NbPara++;
            if(NbPara == Ptr.NombreParagraphe)
            {
                Ptr.Buffer.splice(0, x);
                return(0);
            }
        }
    }
}
function MSG_AfficherMessage(Ptr)
{
    let Chaine = "";
    for(let x = 0;x < Ptr.Buffer.length;x++)
    {
        if(x > 0)
        {
            Chaine += "<br>";
        }
        Chaine += Ptr.Buffer[x];
    }
    Ptr.PtrLabel.innerHTML = Chaine;
}
function MSG_Initialiser()
{
    MSG.MsgHisto.PtrLabel = document.querySelector("#TexteHistorique");
    MSG.MsgJournal.PtrLabel = document.querySelector("#TexteJournal");
    MSG.PtrLableMessage = document.querySelector("#MessageTexte");
    MSG_Afficher();
    MSG_Afficher();
    MSG_Afficher("Journal");
    MSG_Afficher("Journal");
}
function MSG_Afficher(Fenetre = "Historique")
{
    switch(Fenetre)
    {
        case "Journal":
            Ptr = MSG.MsgJournal.PtrLabel;
            Fleche = ["Journal-Bas", "Journal-Haut",];
            break;
        default:
            Ptr = MSG.MsgHisto.PtrLabel;
            Fleche = ["Histo-Bas", "Histo-Haut",];
            break;
    }
    if(Ptr.style.display == "block")
    {
        Ptr.style.display = "none";
        AfficherBouton(Fleche[0], false);
        AfficherBouton(Fleche[1], true);
    }
    else
    {
        Ptr.style.display = "block";
        AfficherBouton(Fleche[0], true);
        AfficherBouton(Fleche[1], false);
    }
}
function MSG_ViderBuffer(Ptr, NbParagraphe = 0)
{
    Ptr.Buffer.length = 0;
    Ptr.NombreParagraphe = NbParagraphe;
    MSG_AfficherMessage(Ptr);
}
/*******************************************************************************/
/*  Permet d 'Afficher' un objet
/*******************************************************************************/
function AfficherObjet(Ptr, Etat = true)
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
function ObjetAffiche(Ptr)
{
    if(Ptr.style.height == "auto")
    {
        return(true);
    }
    else
    {
        return(false);
    }
}
function AfficherObjetID(Code, Etat = true)
{
    console.warn("AfficherObjetID : " + Code);
    Ptr = document.querySelector("#" + Code);
    if(Ptr != null)
    {
        AfficherObjet(Ptr, Etat);
    }
    return(Ptr);
}
function AfficherListeObjetID(Code, Etat = true)
{
    let LstObj = document.querySelectorAll(Code);
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = LstObj[x];
        AfficherObjet(Ptr,Etat);
    }
}
/*******************************************************************/
/* Activation d'un objet, Gestion de la couleur en fonction de l'etat
/*******************************************************************/
function CouleurObjet(Ptr, Etat)
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
            //Ptr.style.backgroundColor = "transparent";
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
function CouleurObjetID(Code, Etat = 0)
{
    console.warn("CouleurObjetID : " + Code);
    Ptr = document.querySelector("#" + Code);
    if(Ptr != null)
    {
        CouleurObjet(Ptr, Etat);
    }
    return(Ptr);
}
function CouleurListeObjetID(Code, Etat = 0)
{
    let LstObj = document.querySelectorAll(Code);
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = LstObj[x];
        CouleurObjet(Ptr, Etat);
    }
}