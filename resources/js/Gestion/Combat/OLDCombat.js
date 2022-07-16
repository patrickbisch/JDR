class COMBAT_Interface{
    constructor() {
    }
    Initialiser(Taille) {COMBAT_Initialiser(Taille);}
    Demarrer() {COMBAT_DemarrerTour();}

}
var COMBAT_DATA1     = new Array();
var Combat1          = new COMBAT_Interface();

class COMBAT_Donnee{

    constructor() {
    }
}

function COMBAT_Initialiser(Taille)
{
    for(x = 0;x < Taille;x++)
    {
        let Ptr = new COMBAT_Donnee();

        COMBAT_DATA.push(Ptr);
    }
}
function COMBAT_DemarrerTour()
{
    ArreterModule();
    MSG.Message("Debut du tour de combat ...", true);
    MSG.ViderJournal(3);
    Gestion.Phase = "COMBAT";
    AfficherListeObjetID(".LigneInit",false);
    AfficherListeObjetID(".LigneCombat",true);
    AfficherListeObjetID(".LigneDefense", false);
    Equip.AfficherListeArme(true);
    Equip.AfficherListeArmure(true);
    Equip.AfficherListeBouclier(true);
    PV.AfficherListe(true);
    ActiverBouton("BtnValider", false);
    AfficherBouton("LancerDe", false);
    ActiverFleche("PNJ", "Haut");
    ActiverFleche("PJ","Haut");
    ActiverBouton("Init-Haut",true);
    AfficherBouton("BtnValider", true);
    LancerModule("NouveauActif");
}
