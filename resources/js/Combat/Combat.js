class COMBAT_Interface  {
    Lancer() {COMBAT_Lancer();}
}
var Combat = new COMBAT_Interface();

function COMBAT_Lancer()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal();
    MSG.Message("Lancement du combat.", true);
    MSG.Journal("Lancement du combat.");

    Perso.Actif = -1;
    Cible.Active = -1;
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
/******************************************************************************/
/******************************************************************************/
/*****  DEBUG   ***************************************************************/
PERSO_DATA[8].Afficher = true;
PERSO_DATA[10].Afficher = true;
/******************************************************************************/
/******************************************************************************/

    //    Tao.AfficherListe(true);
    Perso.Liste[0].Etat = false;
    Perso.Liste[1].Etat = false;
    Perso.Liste[0].Valide = true;
    Perso.Liste[1].Valide = true;
    Bouton.Phase("COMBAT");
    PERSO_ActualiserListe();
    
}
