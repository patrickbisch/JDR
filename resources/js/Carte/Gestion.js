ListeBtn = new Array();
class PNJ_Donnee{
    PtrLigne;
    Etat = false;
}
ListePNJ = new Array();
class DETAIL_Carte{
    PtrLigne;
    PtrSelectCarte;
    PtrCarte;
    PtrSelectOX;
    PtrSelectOY;
    Etat = false;
}
Detail = new DETAIL_Carte;

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
function CARTE_InitialiserSelect(Ptr, Min, Max)
{
    Ptr.options.length = 0;
    for(let x = Min;x <= Max;x++)
    {
        Opt = document.createElement("option");
        Opt.value = x;
        Opt.text = x;
        Ptr.add(Opt);
    }
}
function InitialiserDetail()
{
    Detail.PtrLigne = document.querySelector("#ZoneDetail");
    Detail.PtrSelectCarte = document.querySelector("#ListeCarte");
    Detail.PtrSelectCarte.addEventListener('change', function(e){
        e.preventDefault();
        CARTE_Nouvelle(Detail.PtrSelectCarte.value);
    });
    Detail.PtrCarte = document.querySelector("#Carte");
    Detail.PtrSelectOX = document.querySelector("#NbOX");
    CARTE_InitialiserSelect(Detail.PtrSelectOX, 10, 50);
    Detail.PtrSelectOY = document.querySelector("#NbOY");
    CARTE_InitialiserSelect(Detail.PtrSelectOY, 10, 50);


    Detail.Etat = true;
}
function InitialiserCarte()
{
    InitialiserListe("Ligne", ListePNJ);
    InitialiserDetail();

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

    CARTE_ChangerEtatListe(0, ListePNJ);
    CARTE_ChangerEtatDetail();
}
function CARTE_Nouvelle(Nom)
{
    Detail.PtrCarte.style.backgroundImage ="url(../resources/Cartes/"+Nom+")";
    console.debug("OX : "+Detail.PtrCarte.clientWidth+" OY : "+Detail.PtrCarte.clientHeight);
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