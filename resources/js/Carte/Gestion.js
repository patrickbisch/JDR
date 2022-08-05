var SessionUSER;

ListeBtn = new Array();
class PNJ_Donnee{
    PtrLigne;
    PtrLoca;
    Erreur = true;
    Actif = false;
}
ListePNJ = new Array();
var PNJ_Actif = -1;
ListeCarre = new Array();
class DETAIL_Carte{
    PtrPositionPNJ;
    PtrEntrePJ;





    PtrLigne;
    PtrLignePNJ;
    PtrBtnModifier;
    PtrLstLigne = new Array();
    PtrDesignation;
    PtrSelectCarte;
    PtrCarte;
    PtrDessin;
    PtrDessinRef;
    PtrSelectOX;
    PtrSelectOY;
    PtrTaille;
    PtrTailleOX;
    PtrTailleOY;
    PtrZoom;
    TailleOX = 0;
    TailleOY = 0;
    Etat = false;
}
Detail = new DETAIL_Carte;
var VarCarte = document.querySelector(':root');
let TimerCarte;
var LstInfo = new Array();

/*****************************************************************************************/
/*      GESTION DE LA LISTE DES PNJ
/*****************************************************************************************/
function InitialiserListePNJ()
{
    Carte.Module = "CREATION";
    let TM = document.querySelector("#MatriceType").innerHTML;
    let Tab = document.querySelector("#MatriceTaille").innerHTML.split("x");
    Carte.NouvelleMatrice(Tab[0], Tab[1], TM);

    Detail.PtrPositionPNJ = document.querySelector("#PositionPNJ");
    Detail.PtrEntrePJ = document.querySelector("#EntrePJ");
    let LstObj = document.querySelectorAll(".Ligne");
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = new PNJ_Donnee();
        Ptr.PtrLigne = LstObj[x];
        Ptr.PtrLigne.addEventListener('click', function(e){
            e.preventDefault();
            ActiverPNJ(x);
        });
    
        Ptr.PtrLoca = document.querySelector("#Loca-" + x);
        ListePNJ.push(Ptr);
        let Lettre = document.querySelector("#Lettre-"+x).innerHTML;
        let TF = document.querySelector("#TF-"+x).innerHTML;
        Carte.AjouterPersonnage(Lettre, TF);
    }
    Carte.InitialiserPosition(Detail.PtrPositionPNJ.innerHTML);
    for(let x = 0; x < ListePNJ.length; x++)
    {
        JDR_NouvellePosition(x);
    }
    Detail.PtrPositionPNJ.innerHTML = Carte.RetournerPosition();
}
function JDR_NouvellePosition(Index)
{
    let Posi = Carte.Position(Index);
    ListePNJ[Index].Erreur = false;
    if(Posi.Ox < 0){ListePNJ[Index].Erreur = true;}
    if(Posi.Oy < 0){ListePNJ[Index].Erreur = true;}
    if(ListePNJ[Index].Erreur)
    {
        ListePNJ[Index].PtrLoca.innerHTML = "";
    }
    else
    {
        ListePNJ[Index].PtrLoca.innerHTML = Posi.Ox + "-" + Posi.Oy;
    }
}
function ActiverPNJ(Index)
{
    console.debug("PNJ_Actif : "+Index);
    if(Index == PNJ_Actif)
    {
        ListePNJ[PNJ_Actif].Actif = false;
        Objet.Couleur(ListePNJ[PNJ_Actif].PtrLigne, 0);
        Carte.Activer(PNJ_Actif, false);
        PNJ_Actif = -1;
    }
    else
    {
        if(PNJ_Actif != -1)
        {
            ListePNJ[PNJ_Actif].Actif = false;
            Objet.Couleur(ListePNJ[PNJ_Actif].PtrLigne, 0);
            Carte.Activer(PNJ_Actif, false);
        }
        PNJ_Actif = Index;
        ListePNJ[PNJ_Actif].Actif = true;
        Objet.Couleur(ListePNJ[PNJ_Actif].PtrLigne, 2);
        Carte.Activer(PNJ_Actif, true);
    }
}
function JDR_CARTE_NouvelleSelection(Ox, Oy)
{
    if(PNJ_Actif >= 0)
    {
        Carte.EffacerPosition(PNJ_Actif);
        Carte.ModifierPosition(PNJ_Actif, Ox, Oy);
        Carte.Activer(PNJ_Actif, true);
        JDR_NouvellePosition(PNJ_Actif);
        Detail.PtrPositionPNJ.innerHTML = Carte.RetournerPosition();
    }
}
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
function InitialiserDetail()
{
    Detail.PtrLigne = document.querySelector("#ZoneDetail");
    Detail.PtrLignePNJ = document.querySelector("#ZonePNJ");
    Detail.PtrBtnModifier = document.querySelector("#BtnModifier");
    Detail.PtrLstLigne.push(document.querySelector("#Detail-0"));
    Detail.PtrLstLigne.push(document.querySelector("#Detail-1"));
    Detail.PtrLstLigne.push(document.querySelector("#Detail-4"));
    Detail.PtrLstLigne.push(document.querySelector("#Detail-6"));
    Detail.PtrDesignation = document.querySelector("#Designation");
    Detail.PtrDesignation.addEventListener('focusout', function(e){
        e.preventDefault();
        ControlerDetail();
    });
    Detail.PtrSelectCarte = document.querySelector("#ListeCarte");
    Detail.PtrSelectCarte.addEventListener('change', function(e){
        e.preventDefault();
        CARTE_Nouvelle(Detail.PtrSelectCarte.value);
    });
    Detail.PtrCarte = document.querySelector("#Carte");
    Detail.PtrDessin = document.querySelector("#Dessin");
    Detail.PtrDessinRef = document.querySelector("#DessinRef");
    Detail.PtrTaille = document.querySelector("#Taille");
    Detail.PtrSelectOX = document.querySelector("#NbOX");
    Detail.PtrSelectOX.addEventListener('change', function(e){
        e.preventDefault();
        CARTE_NouvelleDefinition();
    });
    Detail.PtrSelectOY = document.querySelector("#NbOY");
    Detail.PtrSelectOY.addEventListener('change', function(e){
        e.preventDefault();
        CARTE_NouvelleDefinition();
    });
    Detail.PtrTailleOX = document.querySelector("#TailleOX");
    Detail.PtrTailleOY = document.querySelector("#TailleOY");
    Detail.PtrZoom = document.querySelector("#Zoom");
    Detail.PtrZoom.addEventListener('change', function(e){
        e.preventDefault();
        CARTE_NouveauZoom();
    });

    Detail.Etat = true;
    ControlerDetail();
}
function InitialiserCellule()
{
    let LstObj = document.querySelectorAll(".Carre");
    let Nb = Math.sqrt(LstObj.length);
    ListeCarre = new Array(Nb);
    for(let x = 0; x < Nb; x++)
    {
        ListeCarre[x] = new Array(Nb);
    }
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = LstObj[x];
        let Tab = Ptr.id.split("-");
        let Ox = parseInt(Tab[1])-1;
        let Oy = parseInt(Tab[2])-1;
        if((Ox == 0) && (Oy == 0))
        {
            Ptr.innerHTML = Ox+"x"+Oy;
        }
        else
        {
            if(Ox == 0){Ptr.innerHTML = Oy;}
            if(Oy == 0){Ptr.innerHTML = Ox;}
        }
        ListeCarre[Ox][Oy] = Ptr;
    }
    let Obj = document.querySelector("#LocaPJ");

    AfficherCellule();
}
function AfficherCellule(Ox = 0, Oy = 0, Etat = false)
{
    for(let x = 0;x < ListeCarre[0].length;x++)
    {
        for(let y = 0;y < ListeCarre.length;y++)
        {
            let Afficher = Etat;
            if(x >= Ox) {Afficher = false;}
            if(y >= Oy) {Afficher = false;}
            Bouton.Afficher(ListeCarre[x][y], Afficher);
        }
    }
}
function InitialiserBoutonMenu()
{
    ListeBtn.push(new BOUTON_Gestion());
    ListeBtn.push(new BOUTON_Gestion());

    let Obj = document.querySelector("#PNJ-Bas");
    ListeBtn[0].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatListe(0);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#PNJ-Haut");
    ListeBtn[0].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatListe(0);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#Detail-Bas");
    ListeBtn[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatListe(1);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#Detail-Haut");
    ListeBtn[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatListe(1);
    });
    ListeBtn[1].Etat = true;
    BOUTON_Activer(Obj, true);
}
function InitialiserCarte()
{
    LstInfo = document.querySelector("#Info").innerHTML.split("/");
    if(LstInfo[3] > 0)
    {
        InitialiserListePNJ();
    }

    InitialiserDetail();
    InitialiserCellule();
    InitialiserBoutonMenu();

    let Bloque = true;
    if(LstInfo[1] == ""){Bloque = false;}
    if(LstInfo[1] == LstInfo[2]){Bloque = false;}
    if(LstInfo[3] > 0){Bloque = true;}

    Detail.PtrSelectCarte.disabled = Bloque;
    Detail.PtrSelectOX.disabled = Bloque;
    Detail.PtrSelectOY.disabled = Bloque;
    Detail.PtrDesignation.disabled = Bloque;
    Bouton.Afficher(Detail.PtrBtnModifier, !Bloque);

    if(LstInfo[3] == 0)
    {
        let Obj = document.querySelector("#MenuPNJ")
        Bouton.Afficher(Obj, false);
    }
    else
    {
        CARTE_ChangerEtatListe(0);
        CARTE_ChangerEtatListe(1);
    }

    CARTE_ChangerEtatListe(0);
    CARTE_ChangerEtatListe(1);
    CARTE_Nouvelle(Detail.PtrSelectCarte.value);
}
function ControlerDetail()
{
    let Etat = true;
    if(Detail.PtrDesignation.value == "")
    {
        Objet.Couleur(Detail.PtrLstLigne[0], 2);
        Etat = false;
    }
    else
    {
        Objet.Couleur(Detail.PtrLstLigne[0], -3);
    }
    if(Detail.PtrSelectCarte.value == "")
    {
        Objet.Couleur(Detail.PtrLstLigne[1], 2);
        Etat = false;
    }
    else
    {
        Objet.Couleur(Detail.PtrLstLigne[1], -3);
    }
    if(Detail.PtrSelectOX.value == 0)
    {
        Objet.Couleur(Detail.PtrLstLigne[2], 2);
        Etat = false;
    }
    else
    {
        Objet.Couleur(Detail.PtrLstLigne[2], -3);
    }
    if(Detail.PtrSelectOY.value == 0)
    {
        Objet.Couleur(Detail.PtrLstLigne[3], 2);
        Etat = false;
    }
    else
    {
        Objet.Couleur(Detail.PtrLstLigne[3], -3);
    }
    Bouton.Activer(Detail.PtrBtnModifier, Etat);
}
function CARTE_Nouvelle(Nom)
{
    Detail.PtrDessinRef.src = "../resources/Cartes/"+Nom;
    Detail.PtrDessin.src = "../resources/Cartes/"+Nom;
    TimerCarte = setInterval(CARTE_Modifie, 100);
    ControlerDetail();
}
function CARTE_Modifie()
{
    clearInterval(TimerCarte);
    Detail.PtrZoom.value = 0;
    Detail.TailleOX = Detail.PtrDessinRef.clientWidth;
    Detail.TailleOY = Detail.PtrDessinRef.clientHeight;
    if(Detail.PtrSelectCarte.value != "")
    {
        Detail.PtrTaille.innerHTML = Detail.TailleOX + "x" + Detail.TailleOY;
    }
    else
    {
        Detail.PtrTaille.innerHTML = "";
    }
    if(Detail.PtrSelectOX.value > 0)
    {
        Detail.PtrTailleOX.innerHTML = parseInt(Detail.TailleOX) / Detail.PtrSelectOX.value+"px";
    }
    else
    {
        Detail.PtrTailleOX.innerHTML = "";
    }
    if(Detail.PtrSelectOY.value > 0)
    {
        Detail.PtrTailleOY.innerHTML = parseInt(Detail.TailleOY) / Detail.PtrSelectOY.value+"px";
    }
    else
    {
        Detail.PtrTailleOY.innerHTML = "";
    }

    Detail.PtrDessin.style.width = Detail.TailleOX;
    Detail.PtrDessin.style.height = Detail.TailleOY;
    Detail.PtrDessin.clientWidth = Detail.TailleOX;
    Detail.PtrDessin.clientHeight = Detail.TailleOY;

    Detail.PtrCarte.style.clientWidth = Detail.TailleOX;
    Detail.PtrCarte.style.clientHeight = Detail.TailleOY;

    VarCarte.style.setProperty('--NbOx', Detail.PtrSelectOX.value);
    VarCarte.style.setProperty('--NbOy', Detail.PtrSelectOY.value);

    AfficherCellule(parseInt(Detail.PtrSelectOX.value),
                    parseInt(Detail.PtrSelectOY.value), true);
    CARTE_NouveauZoom();
}
function CARTE_NouvelleDefinition()
{
    VarCarte.style.setProperty('--NbOx', Detail.PtrSelectOX.value);
    VarCarte.style.setProperty('--NbOy', Detail.PtrSelectOY.value);
    Detail.PtrTailleOX.innerHTML = parseInt(Detail.PtrDessin.clientWidth) / Detail.PtrSelectOX.value+"px";
    Detail.PtrTailleOY.innerHTML = parseInt(Detail.PtrDessin.clientHeight) / Detail.PtrSelectOY.value+"px";
    AfficherCellule(parseInt(Detail.PtrSelectOX.value),
                    parseInt(Detail.PtrSelectOY.value), true);
    ControlerDetail();
}
function CARTE_NouveauZoom()
{
    let Nb = Detail.PtrZoom.value;
    Detail.PtrDessin.style.width = (parseInt(Detail.TailleOX) + 4 * parseInt(Nb) * parseInt(Detail.PtrSelectOX.value)) + "px";
    Detail.PtrDessin.style.height = (parseInt(Detail.TailleOY) + 4 * parseInt(Nb) * parseInt(Detail.PtrSelectOY.value)) + "px";
}
function CARTE_ChangerEtatListe(Index)
{
    ListeBtn[Index].Etat = !ListeBtn[Index].Etat;
    Bouton.Activer(ListeBtn[Index].PtrBouton[0], ListeBtn[Index].Etat);
    Bouton.Activer(ListeBtn[Index].PtrBouton[1], !ListeBtn[Index].Etat);
    if(Index == 0)
    {
        Bouton.Afficher(Detail.PtrLignePNJ, !ListeBtn[Index].Etat);
    }
    else
    {
        Bouton.Afficher(Detail.PtrLigne, Detail.Etat && !ListeBtn[Index].Etat);
    }
}






function CARTE_Debug()
{
    console.debug("CARTE Debug");
    let Obj = document.querySelector(".Grille");
    console.debug(Obj);
    console.debug("W : "+Obj.clientWidth+" H : "+Obj.clientHeight);

}

InitialiserCarte();