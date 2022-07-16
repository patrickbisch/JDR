class MESSAGE_Detail{
    PtrLabel;
    Buffer = new Array();
    Taille = 10;
    NombreParagraphe = 0;
    Bouton = new BOUTON_Gestion();
    constructor(NombreLigneMaxi) {
        this.Taille = NombreLigneMaxi;
    }
}
class OUTIL_Message{
    Initialiser() {MSG_Initialiser();}
    AfficherHistorique(Etat) {MSG_ChangerEtat(MSG.MsgHisto, Etat);}
    AfficherJournal(Etat) {MSG_ChangerEtat(MSG.MsgJournal, Etat);}
    Journal(MsgTexte, NbTabulation) {MSG_Ajouter(MSG.MsgJournal, MsgTexte, NbTabulation);}
    Historique(MsgTexte, NbTabulation) {MSG_Ajouter(MSG.MsgHisto, MsgTexte, NbTabulation);}
    Message(MsgTexte, AjoutHistorique) {MSG_AjouterMessage(MsgTexte, AjoutHistorique);}
    Erreur(MsgTexte) {MSG_Erreur(MsgTexte);}
    ViderHistorique() {MSG_ViderBuffer(MSG.MsgHisto);}
    ViderJournal(NbParagraphe) {MSG_ViderBuffer(MSG.MsgJournal, NbParagraphe);}

    PtrLableMessage;
    MsgHisto    = new MESSAGE_Detail(35);
    MsgJournal  = new MESSAGE_Detail(20);
}
/*******************************************************************/
/*  Declaration de toutes les variables de travail
/*******************************************************************/
var MSG         = new OUTIL_Message();
/*******************************************************************/
/*  Gestion de l'inialisation de la classe
/*******************************************************************/
function MSG_Initialiser()
{
    MSG.MsgHisto.PtrLabel = document.querySelector("#TexteHistorique");
    MSG.MsgJournal.PtrLabel = document.querySelector("#TexteJournal");
    MSG.PtrLableMessage = document.querySelector("#MessageTexte");

    let Ptr = document.querySelector("#Histo-Bas");
    Ptr.addEventListener('click', function(e){
        e.preventDefault();
        MSG_ChangerEtat(MSG.MsgHisto);
    });
    MSG.MsgHisto.Bouton.PtrBouton.push(Ptr);

    Ptr = document.querySelector("#Histo-Haut");
    Ptr.addEventListener('click', function(e){
        e.preventDefault();
        MSG_ChangerEtat(MSG.MsgHisto);
    });
    MSG.MsgHisto.Bouton.PtrBouton.push(Ptr);

    Ptr = document.querySelector("#Journal-Bas");
    Ptr.addEventListener('click', function(e){
        e.preventDefault();
        MSG_ChangerEtat(MSG.MsgJournal);
    });
    MSG.MsgJournal.Bouton.PtrBouton.push(Ptr);

    Ptr = document.querySelector("#Journal-Haut");
    Ptr.addEventListener('click', function(e){
        e.preventDefault();
        MSG_ChangerEtat(MSG.MsgJournal);
    });
    MSG.MsgJournal.Bouton.PtrBouton.push(Ptr);

    MSG_Afficher(MSG.MsgHisto);
    MSG_Afficher(MSG.MsgJournal);
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
function MSG_AjouterMessage(MsgTexte, AjoutHistorique = false)
{
    MSG.PtrLableMessage.innerHTML = MsgTexte;
    if(AjoutHistorique)
    {
        MSG_Ajouter(MSG.MsgHisto, MsgTexte);
    }
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
    MSG_ControlerParagraphe(Ptr);
    MSG_AfficherMessage(Ptr);
}
function MSG_ControlerParagraphe(Ptr)
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
function MSG_ChangerEtat(Ptr)
{
    Ptr.Bouton.Etat = !Ptr.Bouton.Etat;
    MSG_Afficher(Ptr);
}
function MSG_Afficher(Ptr)
{
    if(Ptr.Bouton.Etat)
    {
        Ptr.PtrLabel.style.display = "block";
    }
    else
    {
        Ptr.PtrLabel.style.display = "none";
    }
    Bouton.Afficher(Ptr.Bouton.PtrBouton[0], Ptr.Bouton.Etat);
    Bouton.Afficher(Ptr.Bouton.PtrBouton[1], !Ptr.Bouton.Etat);
}
function MSG_ViderBuffer(Ptr, NbParagraphe = 0)
{
    Ptr.Buffer.length = 0;
    Ptr.NombreParagraphe = NbParagraphe;
    MSG_AfficherMessage(Ptr);
}
