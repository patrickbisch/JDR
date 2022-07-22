class COMBAT_Interface  {
    Lancer() {COMBAT_Lancer();}
    NouveauPersonnage() {COMBAT_NouveauPersonnage();}
}
var Combat = new COMBAT_Interface();

function COMBAT_Lancer()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal(3);
    MSG.Message("Lancement du combat.", true);
    MSG.Journal("Lancement du combat.");

    Perso.Actif = -1;
    Cible.Actif = -1;
    Initiative.Actif = -1;
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        PERSO_DATA[x].NbAction = PERSO_DATA[x].NbActionMaxi;
        PERSO_DATA[x].Bloque = false;
        PERSO_DATA[x].Afficher = false;
        Perso.AffecterNombreAction(x, PERSO_DATA[x].NbActionMaxi);
    }
    BonusAvant.AfficherListe(true);
    Caracteristique.AfficherListe(true);
    BonusAvant.Activer(-1, true);
    PV.AfficherListe(true);
    DefensePassive.AfficherListe(true);
    Equipement.AfficherListe(true);
    Tao.AfficherListe("COMBAT");
    Perso.Liste[0].Etat = false;
    Perso.Liste[1].Etat = false;
    Perso.Liste[0].Valide = true;
    Perso.Liste[1].Valide = true;
    Bouton.Phase("COMBAT");
    PERSO_ActualiserListe();
    Moteur.LancerModule("Nouveau Personnage");
}
function COMBAT_NouveauPersonnage()
{
    Moteur.ArreterModule();
    if(Perso.Actif >= 0)
    {
        Action.Afficher(Perso.Actif, false);
    }
    Initiative.Actif = COMBAT_PersonnageSuivant(Initiative.Actif + 1);
    if(Initiative.Actif < 0)
    {
        BonusExceptionnel.PasseArmeTermine();
        Initiative.Actif = COMBAT_PersonnageSuivant(0);
    }
    INIT_AfficherListe();
    if(Initiative.Actif < 0)
    {
        Perso.Actif = -1;
        PERSO_ActualiserListe();
        BonusExceptionnel.TourTermine();
        if(Initiative.Actif == -1)
        {
            MSG.Message("Fin du Tour de combat.", true);
            MSG.Erreur("FIN DU TOUR DE COMBAT");
        }
        else
        {
            MSG.Message("Fin du combat.", true);
            MSG.Erreur("FIN DU COMBAT");
        }
    }
    else
    {
        Bouton.Phase("ACTION");
        Perso.Actif = INIT_ORDRE[Initiative.Actif];
        Tao.Afficher(Perso.Actif, "ACTION");
        Action.Activer(Perso.Actif);
        MSG.Historique(Perso.Gras(Perso.Actif) + " est le nouveau personnage actif");
        MSG.Journal("");
        MSG.Journal(Perso.Gras(Perso.Actif) + " est actif");
        MSG.Message(Perso.Gras(Perso.Actif) + " doit choisir une action, puis <strong>Valider</strong>.");
        PERSO_ActualiserListe();
    }
}
function COMBAT_PersonnageSuivant(Debut)
{
    for(let x = Debut;x < INIT_DATA.length;x++)
    {
        let Id = INIT_ORDRE[x];
        if(!Perso.Mort(Id))
        {
            if(Perso.NbAction(Id) > 0)
            {
                if(Perso.NombreAdversaire(Id) > 0)
                {
                    return(x);
                }
                else
                {
                    return(-2);
                }
            }
        }
    }
    return(-1);
}