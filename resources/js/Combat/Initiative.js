class INIT_Interface  {
    Actif = -1;
    Liste = new BOUTON_Gestion();

    Initialiser(Taille) {INIT_Initialiser(Taille);}
    NouveauTour() {INIT_NouveauTour();}
    EtatBouton(Etat, Actif) {INIT_ChangerEtatBouton(Etat, Actif);}
    AfficherListe(Etat) {OBJET_AfficherListe(INIT_DATA, Etat);}
    ActualiserListe() {INIT_ActualiserListe();}
}
var Init = new INIT_Interface();
var INIT_DATA = new Array();

class INIT_Donnee{
    PtrLigne;
    PtrSelectInit;
    PtrLigneInit;
    PtrLabelNum;
    PtrLabelNom;
    PtrLabelFormat;
    Valeur = 0;
    Format = "";
    BonusCarac = 0;
    BonusMagie = 0;
    Etat = false;
}
var AncienDE;
var INIT_ORDRE = new Array();
var TOTO = 0;

/***********************************************************************************/
/*  Initialisation du module et lancement de la phase d'initiative
/***********************************************************************************/
function INIT_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'initiative.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new INIT_Donnee();
        INIT_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneInit-" + x);
        Ptr.PtrLigneInit = document.querySelector("#Init-" + x);
        Ptr.PtrLabelNum = document.querySelector("#InitNum-" + x);
        Ptr.PtrLabelNom = document.querySelector("#InitNom-" + x);
        Ptr.PtrLabelFormat = document.querySelector("#InitValeur-" + x);
        let Obj = document.querySelector("#TypeInit-" + x);
        Obj.addEventListener('change', function(){
                    INIT_Nouvelle(Obj, x);
        });

        Ptr.PtrSelectInit = Obj;
        switch(Perso.TypeFonction(x))
        {
            case 0:
            case 7:
                JDR_InitialiserSelectJet(Obj);
                break
            default:
                JDR_InitialiserSelectJet(Obj, 1);
                break;
        }
        Ptr.Etat = true;
        INIT_DATA[x].BonusCarac = 0;
    }

    let Obj = document.querySelector("#Init-Bas");
    Init.Liste.PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        INIT_ChangerEtatListe(Init.Liste);
    });
    Bouton.Activer(Obj, true);

    Obj = document.querySelector("#Init-Haut");
    Init.Liste.PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        INIT_ChangerEtatListe(Init.Liste);
    });
    Bouton.Activer(Obj, true);
    Init.Liste.Etat = false;
    Init.Liste.Valide = true;
    INIT_ActualiserListe();
}
function INIT_NouveauTour()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal();
    MSG.Message("Nouveau tour d'initiative.", true);
    MSG.Journal("Nouveau tour d'initiative.");
    JDR_InitialiserBonusInitiative();
    BonusAvant.AfficherListe(true);
    Caracteristique.AfficherListe(true);
    BonusAvant.Activer(-1, true);
    PV.AfficherListe(true);
    INIT_ORDRE = new Array();
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        PERSO_DATA[x].Bloque = Perso.Mort(x);
        if(PERSO_DATA[x].Bloque)
        {
            INIT_ORDRE.push(x);
            INIT_DATA[x].Format = "Mort";
            INIT_DATA[x].Valeur = -200;
        }
        PERSO_DATA[x].Afficher = !PERSO_DATA[x].Bloque;
        if(Perso.TypeFonction(x) == 0)
        {
            INIT_DATA[x].PtrSelectInit.value = "";
            Objet.Couleur(INIT_DATA[x].PtrLigne, 2);
        }
        INIT_DATA[x].PtrSelectInit.disabled = false;
        INIT_DATA[x].BonusMagie = 0;
        PERSO_DATA[x].NbAction = Perso.NbActionMaxi(x);
        PERSO_AfficherNombreAction(x);
    }
    Init.AfficherListe(true);
    Perso.Actif = -1;
    Cible.Active = -1;
    AncienDE = new RetourDE();
/***********************************************************************************/
/***********************************************************************************/
/****   DEBUG   *****/
INIT_DATA[10].PtrSelectInit.value = "A";
INIT_DATA[11].PtrSelectInit.value = "A";
INIT_DATA[12].PtrSelectInit.value = "A";
INIT_DATA[13].PtrSelectInit.value = "A";
/***********************************************************************************/
/***********************************************************************************/
    Perso.Liste[0].Etat = false;
    Perso.Liste[1].Etat = false;
    Perso.Liste[0].Valide = false;
    Perso.Liste[1].Valide = false;
    Init.Liste.Etat = true;
    Init.Liste.Valide = false;
    JDR_AfficherDE(-1);
    PERSO_ActualiserListe();
    INIT_ActualiserListe();
    Tao.AfficherListe("INIT", false);
    Bouton.Valider.Demarrer("INIT");
    MSG.Message("Selectionnez les initiatives des <strong>PNJ</strong> et <stong>PJ</strong>, puis <strong>validez</strong>.");
}
/***********************************************************************************/
/*  Gestion de l'affichage de la liste d'initiative
/***********************************************************************************/
function INIT_ChangerEtatListe(Ptr)
{
    Ptr.Etat = !Ptr.Etat;
    INIT_ActualiserListe();
}
function INIT_ChangerEtatBouton(Etat, Actif)
{
    Init.Liste.Etat = Etat;
    Init.Liste.Valide = Actif;
    INIT_ActualiserListe();
}
function INIT_ActualiserListe()
{
    let x;
    for(x = 0;x < INIT_ORDRE.length;x++)
    {
        let Id = INIT_ORDRE[x];
        INIT_DATA[x].PtrLabelNum.innerHTML = Perso.Lettre(Id);
        INIT_DATA[x].PtrLabelNom.innerHTML = Perso.Nom(Id);
        INIT_DATA[x].PtrLabelFormat.innerHTML = INIT_DATA[Id].Format;
        if(Id == Perso.Actif)
        {
            Objet.Afficher(INIT_DATA[x].PtrLigneInit, true);
            Objet.Couleur(INIT_DATA[x].PtrLigneInit, 1);
        }
        else
        {
            if(Perso.Mort(Id))
            {
                Objet.Couleur(INIT_DATA[x].PtrLigneInit, 2);
            }
            else
            {
                if(Perso.NbAction(Id) == 0)
                {
                    Objet.Couleur(INIT_DATA[x].PtrLigneInit, -1);
                }
                else
                {
                    Objet.Couleur(INIT_DATA[x].PtrLigneInit, 0);
                }
            }
            Objet.Afficher(INIT_DATA[x].PtrLigneInit, Init.Liste.Etat)
        }
    }
    for(;x < INIT_DATA.length;x++)
    {
        Objet.Afficher(INIT_DATA[x].PtrLigneInit, false)
    }
    INIT_ActualiserBouton();
}
function INIT_ActualiserBouton()
{
    Bouton.Activer(Init.Liste.PtrBouton[0], !Init.Liste.Etat && Init.Liste.Valide);
    Bouton.Activer(Init.Liste.PtrBouton[1], Init.Liste.Etat && Init.Liste.Valide);
}
/***********************************************************************************/
/*  Traitement des differents type d'initiative
/***********************************************************************************/
function INIT_TraiterDE()
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(!PERSO_DATA[x].Bloque)
        {
            if(INIT_DATA[x].PtrSelectInit.value != "")
            {
                if(INIT_GererDE(x) < 0) {return(0);}
            }
        }
    }
}
function INIT_GererDE(x)
{
    let Ptr = INIT_DATA[x].PtrSelectInit;
    if(Ptr.value == "L")
    {
        Tao.Afficher(x, "INIT", true);
        Perso.Actif = x;
        JDR_ValeurDE(0, 0);
        JDR_AfficherDE(1);
        PERSO_ActualiserListe();
        return(-1);
    }
    let InitDE = new RetourDE();
    Objet.Couleur(INIT_DATA[x].PtrLigne, 0);
    if(Ptr.value == "I")
    {
        if(AncienDE.Erreur)
        {
            AncienDE = JDR_LancerDE("A");
            if((AncienDE.Yang == 0) && (AncienDE.Yin == 0))
            {
                AncienDE.Double = false;
            }
        }
        JDR_ValeurDE(AncienDE.Yang, AncienDE.Yin, AncienDE.Double);
        JDR_AfficherDE(0);
        InitDE = AncienDE;
    }
    else
    {
        InitDE = JDR_LancerDE(Ptr.value);
    }

    if(Perso.BonusAvant(x).Maxi == 0)
    {
        INIT_TraiterRetour(x, InitDE);
        return(1);
    }
    Tao.Afficher(x, "INIT", true);
    Perso.Actif = x;
    MSG.Message("Valider l'initiative.");
    return(-1);
}
function INIT_TraiterRetour(x, InitDE)
{
    let Ptr = INIT_DATA[x].PtrSelectInit;
    MSG.Journal(Perso.Gras(x), 1);
    let Bonus = Perso.BonusAvant(x).Bonus;
    BonusAvant.Utiliser(x);
    if(InitDE.Double)
    {
        if(InitDE.Yang != 0)
        {
            MSG.Historique(Perso.Gras(x) + " <strong>DOUBLE "+ InitDE.Yang + "</strong>", 1);
            MSG.Journal("<strong>DOUBLE "+ InitDE.Yang + "</strong>",2);
            INIT_DATA[x].Valeur = parseInt(100) + parseInt(10 * InitDE.Yang) + parseInt(INIT_DATA[x].BonusCarac);
            INIT_DATA[x].Format = InitDE.Yang + "x" + InitDE.Yang;
            BonusAvant.Ajouter(x, InitDE.Yang);
        }
        else
        {
            MSG.Historique(Perso.Gras(x) + " <strong>ECHEC CRITIQUE "+ InitDE.Yang + "</strong>", 1);
            MSG.Journal("<strong>ECHEC CRITIQUE "+ InitDE.Yang + "</strong>",2);
            INIT_DATA[x].Valeur = parseInt(INIT_DATA[x].BonusCarac) - parseInt(100);
            INIT_DATA[x].Format = "0x0";
            BonusAvant.Ajouter(x, -5);
        }
    }
    else
    {
        let Nb = Math.abs(InitDE.Yang - InitDE.Yin) + parseInt(PERSO_DATA[x].MalusPV) +
                    parseInt(INIT_DATA[x].BonusCarac) + parseInt(INIT_DATA[x].BonusMagie) + parseInt(Bonus);
        if(InitDE.Yang == InitDE.Yin)
        {
            Nb += parseInt(InitDE.Yang);
        }
        let Chaine = " Initiative : " + Nb + " (" + InitDE.Yang + "-" + InitDE.Yin +
                        ") + " + INIT_DATA[x].BonusCarac;
        if(INIT_DATA[x].BonusMagie > 0) {Chaine += " + {" + INIT_DATA[x].BonusMagie + "}";}
        Chaine += " + (" + PERSO_DATA[x].MalusPV + ")";
        if(Bonus > 0) {Chaine += " ["+Bonus+"]";}
        MSG.Historique(Perso.Gras(x) + Chaine, 1);
        MSG.Journal("Initiative : "+ Nb, 2);
        INIT_DATA[x].Valeur = parseInt(10 * Nb) + INIT_DATA[x].BonusCarac;
        INIT_DATA[x].Format = Nb;
    }
    INIT_DATA[x].BonusMagie = 0;
    PERSO_DATA[x].Bloque = true;
    PERSO_DATA[x].Afficher = false;
    Ptr.disabled = true;
    INIT_ORDRE.push(x);
}
function INIT_ValiderDE()
{
    if(Perso.Actif >= 0)
    {
        Ptr = INIT_DATA[Perso.Actif].PtrSelectInit;
        if(Ptr.value == "")
        {
            Bouton.Valider.Desactiver();
            JDR_AfficherDE(-1);
            return(0);
        }
        let InitDE = new RetourDE();
        InitDE.Yang = LstDE[0][1].value;
        InitDE.Yin = LstDE[1][1].value;
        InitDE.Double = TirageDE.Double;
        if((InitDE.Yang == InitDE.Yin) && (InitDE.Yang == 0))
        {   
            InitDE.Double = true;
        }
        INIT_TraiterRetour(Perso.Actif, InitDE);
        Perso.Actif = -1;
        JDR_AfficherDE(-1);
        MSG.Message("Selectionnez les initiatives des <strong>PNJ</strong> et <stong>PJ</strong>, puis <strong>validez</strong>.");
    }
    INIT_TraiterDE();
    if(Perso.Actif < 0)
    {
        Bouton.Valider.Desactiver();
    }
    PERSO_ActualiserListe();
    INIT_Trier();
    INIT_ActualiserListe();
    if(INIT_ControlerFin() > 0)
    {
        MSG.Message("Tour d'initialisation terminé.", true);
        Moteur.LancerModule("COMBAT");
    }
}
/***********************************************************************************/
/*  Controle la fin de saisi des initiative
/***********************************************************************************/
function INIT_ControlerFin()
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(!PERSO_DATA[x].Bloque)
        {
            return(0);
        }
    }
    return(1);
}
function INIT_Trier()
{
    let Encore = true;
    for(;Encore;)
    {
        Encore = false;
        for(let x = 1;x < INIT_ORDRE.length;x++)
        {
            if(parseInt(INIT_DATA[INIT_ORDRE[x]].Valeur) > parseInt(INIT_DATA[INIT_ORDRE[x-1]].Valeur))
            {
                let Nb = INIT_ORDRE[x];
                INIT_ORDRE[x] = INIT_ORDRE[x-1];
                INIT_ORDRE[x-1] = Nb;
                Encore = true;
            }
        }
    }
}
/***********************************************************************************/
/*  Selection d'une nouvelle initiative
/***********************************************************************************/
function INIT_Nouvelle(Obj, Id)
{
    Bouton.Activer(BtnValider, true);
    BonusAvant.Activer(Id, false);
    Obj.disabled = true;
    if(Obj.value != "")
    {
        Objet.Couleur(INIT_DATA[Id].PtrLigne, 0);
    }
    if((Perso.Actif < 0) || (Perso.Actif == Id))
    {
        if(INIT_GererDE(Id) > 0)
        {   
            INIT_ValiderDE();
        }
    }
}
