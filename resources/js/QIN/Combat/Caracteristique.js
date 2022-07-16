class CARAC_Interface  {
    Initialiser(Taille) {CARAC_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(CARAC_DATA, Etat);}
}
var Caracteristique  = new CARAC_Interface ();
class CARAC_Donnee {
    PtrLigne;
    PtrFeu;
    PtrBois;
    PtrTerre;
    PtrMetal;
    PtrEau;
    Etat = false;
}
let CARAC_DATA     = new Array();

function CARAC_Initialiser(Taille)
{
    MSG.Historique("Initialisation des CARACTERISTIQUES.", 1);
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new CARAC_Donnee();
        CARAC_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneTrait-" + x);
        Ptr.PtrFeu = document.querySelector("#Feu-" + x);
        Ptr.PtrBois = document.querySelector("#Bois-" + x);
        Ptr.PtrTerre = document.querySelector("#Terre-" + x);
        Ptr.PtrMetal = document.querySelector("#Metal-" + x);
        Ptr.PtrEau = document.querySelector("#Eau-" + x);
        Ptr.Etat = true;
        CARAC_Feu(x, Perso.Base(x).Feu);
        CARAC_Bois(x, Perso.Base(x).Bois);
        CARAC_Terre(x, Perso.Base(x).Terre);
        CARAC_Metal(x, Perso.Base(x).Metal);
        CARAC_Eau(x, Perso.Base(x).Eau);
    }
    Caracteristique.AfficherListe(false);
}
function CARAC_Feu(Id, NouvelleValeur)
{
    Perso.Base(Id).Feu = NouvelleValeur;
    CARAC_DATA[Id].PtrFeu.innerHTML = NouvelleValeur;
}
function CARAC_Bois(Id, NouvelleValeur)
{
    Perso.Base(Id).Bois = NouvelleValeur;
    CARAC_DATA[Id].PtrBois.innerHTML = NouvelleValeur;
}
function CARAC_Terre(Id, NouvelleValeur)
{
    Perso.Base(Id).Terre = NouvelleValeur;
    CARAC_DATA[Id].PtrTerre.innerHTML = NouvelleValeur;
}
function CARAC_Metal(Id, NouvelleValeur)
{
    Perso.Base(Id).Metal = NouvelleValeur;
    CARAC_DATA[Id].PtrMetal.innerHTML = NouvelleValeur;
}
function CARAC_Eau(Id, NouvelleValeur)
{
    Perso.Base(Id).Eau = NouvelleValeur;
    CARAC_DATA[Id].PtrEau.innerHTML = NouvelleValeur;
}