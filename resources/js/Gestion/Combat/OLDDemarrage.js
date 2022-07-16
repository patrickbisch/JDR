let RecupCompteur = 0;
var TimerApplication;

function LancerModule(Commande)
{
    console.warn("Lancement du module <"+Commande+">");
    switch(Commande)
    {
        case "Demarrage":
            console.info("Lancement de l'application");
            MSG.Initialsier();
            AfficherListeObjetID(".DonneeDef", false);
            AfficherListeObjetID(".Ligne", false);
            AfficherListeObjetID(".Initiative", false);
            AfficherBouton("LancerDe", false);
            AfficherBouton("BtnValider", false);
            TimerApplication = setInterval(DemarrageApplication, 100);
            break;
        case "Equipement":
            console.info("Préparation de l'equipement");
            TimerApplication = setInterval(Equip.Demarrer, 500);
            break;
        case "Initialisation":
            console.info("Lancement de l'initialisation");
            TimerApplication = setInterval(Init.Demarrer, 50);
            break;
        case "Combat":
            console.info("Démarrage du combat");
            TimerApplication = setInterval(Combat.Demarrer, 50);
            break;
        case "NouveauActif":
            console.info("Recherche du prochain personnage");
            TimerApplication = setInterval(Perso.NouveauActif, 50);
            break;
        default:
            MSG.Erreur("La commande [" + Commande + "] NON GEREE !");
    }
}

//LancerModule("Demarrage");