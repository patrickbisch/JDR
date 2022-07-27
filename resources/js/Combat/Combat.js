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
    Cible.Active = -1;
    Init.Actif = -1;
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        PERSO_DATA[x].NbAction = PERSO_DATA[x].NbActionMaxi;
        PERSO_DATA[x].AttaqueCC = 0;
        PERSO_DATA[x].AttaqueDis = 0;
        PERSO_DATA[x].Bloque = false;
        PERSO_DATA[x].Afficher = false;
        Perso.AffecterNombreAction(x, PERSO_DATA[x].NbActionMaxi);
    }
    BonusAvant.AfficherListe(true);
    Caracteristique.AfficherListe(true);
    BonusAvant.Activer(-1, true);
    Cible.AfficherListe(true);
    PV.AfficherListe(true);
    DefensePassive.AfficherListe(true);
    Equipement.AfficherListe(true);
    Tao.AfficherListe("COMBAT");
    Perso.Liste[0].Etat = false;
    Perso.Liste[1].Etat = false;
    Perso.Liste[0].Valide = true;
    Perso.Liste[1].Valide = true;
    PERSO_ActualiserListe();
    Init.EtatBouton(false, true);
    Moteur.LancerModule("Nouveau Personnage");
}
function COMBAT_NouveauPersonnage()
{
    Moteur.ArreterModule();
    if(Perso.Actif >= 0)
    {
        Tao.Afficher(Perso.Actif, "");
        Action.Afficher(Perso.Actif, false);
    }
    Init.Actif = COMBAT_PersonnageSuivant(Init.Actif + 1);
    if(Init.Actif < 0)
    {
        BonusExceptionnel.PasseArmeTermine();
        Init.Actif = COMBAT_PersonnageSuivant(0);
    }
    if(Init.Actif < 0)
    {
        Perso.Actif = -1;
        Cible.Active = -1;
        PERSO_ActualiserListe();
        Init.EtatBouton(false, false);
        BonusExceptionnel.TourTermine();
        if(COMBAT_Termine())
        {
            MSG.Message("Fin du combat.", true);
            MSG.Erreur("FIN DU COMBAT");
        }
        else
        {
            Moteur.LancerModule("Tour INIT");
        }
    }
    else
    {
        Bouton.Valider.Demarrer("ACTION");
        Bouton.Valider.Desactiver();
        Perso.Actif = INIT_ORDRE[Init.Actif];
        Cible.AffecterDefaut(Perso.Actif);
        Tao.Afficher(Perso.Actif, "ACTION");
        Action.Activer(Perso.Actif);
        MSG.Historique(Perso.Gras(Perso.Actif) + " est le nouveau personnage actif");
        MSG.Journal("");
        MSG.Journal(Perso.Gras(Perso.Actif) + " est actif");
        MSG.Message(Perso.Gras(Perso.Actif) + " doit choisir une action, puis <strong>Valider</strong>.");
        PERSO_ActualiserListe();
        Init.ActualiserListe();
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
function COMBAT_Termine()
{
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        let Id = INIT_ORDRE[x];
        if(!Perso.Mort(Id))
        {
            if(Perso.NombreAdversaire(Id) > 0)
            {
                return(false);
            }
            else
            {
                return(true);
            }
        }
    }
    return(true);
}