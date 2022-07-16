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
            //Objet.AfficherListe("DonneeDef", false);
            //Objet.AfficherListe("Ligne", false);
            //Objet.AfficherListe("Initiative", false);
            TimerMoteur = setInterval(MOTEUR_RecupererBaseDonnee , 500);
/**************************************************************************************/
/**************************************************************************************/
/*****     MODE DEBUG                                                             *****/
/**************************************************************************************/
/**************************************************************************************/
MSG.AfficherHistorique(true);
MSG.AfficherJournal(true);
//TimerMoteur = setInterval(ModeDebugTest , 1000);
/**************************************************************************************/
/**************************************************************************************/
            break;
        case "Initialisation":
            console.info("Lancement de l'initalisation.");
            TimerMoteur = setInterval(Perso.Initialiser , 100);
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