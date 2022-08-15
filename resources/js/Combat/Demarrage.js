class MOTEUR_Interface{
    LancerModule(NomModule) {MOTEUR_LancerModule(NomModule);}
    ArreterModule() {MOTEUR_ArreterModule();}
}
var Moteur      = new MOTEUR_Interface();
let TimerMoteur;
let CompteurMoteur = 0;
let PtrData = new Array();

function MOTEUR_LancerModule(NomModule, NomProcedure)
{
    console.warn("Lancement du module <" + NomModule + ">");
    switch(NomModule)
    {
        case "Demarrage":
            console.info("Lancement de l'application");
            Bouton.Initialiser();
            MSG.Initialiser();
            MSG.Message("Lancement de l'application.", true);
            Objet.AfficherFamille("EcranPNJ", false);
            Objet.AfficherFamille("EcranPJ", false);
            Objet.AfficherFamille("EcranInit", false);
            Bouton.Valider.Afficher(false);
            TimerMoteur = setInterval(MOTEUR_RecupererBaseDonnee, 500);
/**************************************************************************************/
/**************************************************************************************/
/*****     MODE DEBUG                                                             *****/
/**************************************************************************************/
/**************************************************************************************/
//MSG.AfficherHistorique(true);
//MSG.AfficherJournal(true);
//TimerMoteur = setInterval(ModeDebugTest , 1000);
/**************************************************************************************/
/**************************************************************************************/
            break;
        case "Initialisation":
            console.info("Lancement de l'initalisation.");
            TimerMoteur = setInterval(Perso.Initialiser, 50);
            break;
        case "Equipement":
            console.info("Lancement de l'equipement des personnages");
            Objet.AfficherFamille("EcranPNJ", true);
            Objet.AfficherFamille("EcranPJ", true);
            TimerMoteur = setInterval(Equipement.Personnage, 50);
            break;
        case "CARTOGRAPHIE":
            console.info("Lancement de la cartographie.");
            TimerMoteur = setInterval(Cartographie.NouveauTour, 50);
            break;
        case "Tour INIT":
            console.info("Lancement d'un tour d'initialisation.");
            TimerMoteur = setInterval(Init.NouveauTour, 50);
            break;
        case "COMBAT":
            console.info("Lancement du combat");
            TimerMoteur = setInterval(Combat.Lancer, 50);
            break;
        case "Nouveau Personnage":
            console.info("Nouveau personnage");
            TimerMoteur = setInterval(Combat.NouveauPersonnage, 50);
            break;
        case "ATTAQUE":
            console.info("Nouvelle attaque");
            TimerMoteur = setInterval(Attaque.Gerer, 50);
            break;
        default:
            console.error("MOTEUR_LancerModule : Module [" + NomModule + "] NON GERE !")
    }
}
function MOTEUR_ArreterModule()
{
    clearInterval(TimerMoteur);
}
function MOTEUR_RecupererBaseDonnee()
{
    switch(parseInt(CompteurMoteur))
    {
        case 0:
            MOTEUR_RecupererListePErsonnage();
            break;
        default:
            MSG.Message("Preparation de l'écran de combat.", true);
            Moteur.ArreterModule()
            Perso.AffecterBaseDonnee(PtrData);
            //Init.Initialiser(Perso.Taille);
            //Cible.Initialiser(Perso.Taille);
            //Action.Initialiser(Perso.Taille);
            //Combat.Initialiser(Perso.Taille);
            //PV.Initialiser(Perso.Taille);
            //JDR_ModifierListeInitialisation();

            //LancerModule("Equipement");
    }
}
function MOTEUR_RecupererListePErsonnage()
{
    console.info("Recuperation de la liste des personnages");
    $.ajax({
        method: "GET",
        url: "Liste/Personnage",
        data: { Message: $('#Message').val() }
    }).done(function(text) {
        PtrData = JSON.parse(text);
    });
    if(PtrData.length > 0)
    {
        CompteurMoteur++;
    }
}

/****************************************************************************************/
/****************************************************************************************/
/****************************************************************************************/
/****************************************************************************************/
function ModeDebugTest()
{
    var Dt = new Date;
    MSG.Historique(" Date : " + Dt.getDay("DD")+"/"+Dt.getMonth()+"/"+Dt.getFullYear()+ " "+
                            Dt.getHours()+":"+Dt.getMinutes()+":"+Dt.getSeconds(), 1);
}
/****************************************************************************************/
/****************************************************************************************/
/****************************************************************************************/
/****************************************************************************************/

Moteur.LancerModule("Demarrage");