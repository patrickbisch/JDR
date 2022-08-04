var SessionUSER;

ListeBtn = new Array();
class PNJ_Donnee{
    PtrLigne;
    Etat = false;
}
ListePNJ = new Array();
ListeCarre = new Array();
class DETAIL_Carte{
    PtrLigne;
    PtrBtnValider;
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

function InitialiserListe(Code, PtrListe)
{
    let LstObj = document.querySelectorAll("." + Code);
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = new PNJ_Donnee();
        Ptr.PtrLigne = LstObj[x];
        Ptr.Etat = true;
        PtrListe.push(Ptr);
    }
}
function InitialiserDetail()
{
    Detail.PtrLigne = document.querySelector("#ZoneDetail");
    Detail.PtrBtnValider = document.querySelector("#BtnValider");
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
        CARTE_ChangerEtatListe(0, ListePNJ);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#PNJ-Haut");
    ListeBtn[0].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatListe(0, ListePNJ);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#Detail-Bas");
    ListeBtn[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatDetail();
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#Detail-Haut");
    ListeBtn[1].PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        CARTE_ChangerEtatDetail();
    });
    ListeBtn[1].Etat = true;
    BOUTON_Activer(Obj, true);
}
function InitialiserCarte()
{
    InitialiserListe("Ligne", ListePNJ);
    InitialiserDetail();
    InitialiserCellule();
    InitialiserBoutonMenu();


    CARTE_ChangerEtatListe(0, ListePNJ);
    CARTE_ChangerEtatDetail();
    CARTE_Nouvelle(Detail.PtrSelectCarte.value);
    console.debug(SessionUSER);

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
    Bouton.Activer(Detail.PtrBtnValider, Etat);
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
    Detail.PtrTaille.innerHTML = Detail.TailleOX + "x" + Detail.TailleOY;
    Detail.PtrTailleOX.innerHTML = parseInt(Detail.TailleOX) / Detail.PtrSelectOX.value+"px";
    Detail.PtrTailleOY.innerHTML = parseInt(Detail.TailleOY) / Detail.PtrSelectOY.value+"px";

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
function CARTE_ChangerEtatListe(Index, PtrListe)
{
    ListeBtn[Index].Etat = !ListeBtn[Index].Etat;
    Bouton.Activer(ListeBtn[Index].PtrBouton[0], ListeBtn[Index].Etat);
    Bouton.Activer(ListeBtn[Index].PtrBouton[1], !ListeBtn[Index].Etat);
    for(let x = 0;x < PtrListe.length;x++)
    {
        Objet.Afficher(PtrListe[x].PtrLigne, PtrListe[x].Etat && !ListeBtn[Index].Etat);
    }
}
function CARTE_ChangerEtatDetail()
{
    ListeBtn[1].Etat = !ListeBtn[1].Etat;
    Bouton.Activer(ListeBtn[1].PtrBouton[0], ListeBtn[1].Etat);
    Bouton.Activer(ListeBtn[1].PtrBouton[1], !ListeBtn[1].Etat);
    Bouton.Afficher(Detail.PtrLigne, Detail.Etat && !ListeBtn[1].Etat);
}







function CARTE_Debug()
{
    console.debug("CARTE Debug");
    let Obj = document.querySelector(".Grille");
    console.debug(Obj);
    console.debug("W : "+Obj.clientWidth+" H : "+Obj.clientHeight);

}

InitialiserCarte();