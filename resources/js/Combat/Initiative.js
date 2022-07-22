class INIT_Interface  {
    Liste = new BOUTON_Gestion();

    Initialiser(Taille) {INIT_Initialiser(Taille);}
    NouveauTour() {INIT_NouveauTour();}
    AfficherListe(Etat) {OBJET_AfficherListe(INIT_DATA, Etat);}
    EtatBouton(Etat, Actif) {INIT_ChangerEtatBouton(Etat, Actif);}
}
var Initiative = new INIT_Interface();
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
    Initiative.Liste.PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        INIT_ChangerEtatListe(Initiative.Liste);
    });
    BOUTON_Activer(Obj, true);

    Obj = document.querySelector("#Init-Haut");
    Initiative.Liste.PtrBouton.push(Obj);
    Obj.addEventListener('click', function(e){
        e.preventDefault();
        INIT_ChangerEtatListe(Initiative.Liste);
    });
    BOUTON_Activer(Obj, true);
    Initiative.Liste.Etat = false;
    Initiative.Liste.Valide = true;
    Initiative.AfficherListe(false);
}
function INIT_NouveauTour()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal();
    MSG.Message("Nouveau tour d'initiative.", true);
    MSG.Journal("Nouveau tour d'initiative.");
    JDR_InitialiserBonusInitiative();
    Initiative.AfficherListe(true);
    BonusAvant.AfficherListe(true);
    Caracteristique.AfficherListe(true);
    BonusAvant.Activer(-1, true);
    PV.AfficherListe(true);
    INIT_ORDRE = new Array();
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(PERSO_DATA[x].Mort)
        {
            INIT_ORDRE.push(x);
            INIT_DATA[x].Format = "Mort";
            INIT_DATA[x].Valeur = -66;
        }
        PERSO_DATA[x].Bloque = PERSO_DATA[x].Mort;
        PERSO_DATA[x].Afficher = !PERSO_DATA[x].Mort;
        if(Perso.TypeFonction(x) == 0)
        {
            INIT_DATA[x].PtrSelectInit.value = "";
            Objet.Couleur(INIT_DATA[x].PtrLigne, 2);
        }
        INIT_DATA[x].PtrSelectInit.disabled = false;
        INIT_DATA[x].BonusMagie = 0;
    }
    Perso.Actif = -1;
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
    Initiative.Liste.Etat = false;
    Initiative.Liste.Valide = false;
    Initiative.AfficherListe(true);
    JDR_AfficherDE(-1);
    PERSO_ActualiserListe();
    INIT_ActualiserListe();
    Bouton.Phase("INIT");
    Bouton.Afficher(BtnValider, true);
    INIT_AfficherListe();
    Tao.AfficherListe("INIT");
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
    Initiative.Liste.Etat = Etat;
    Initiative.Liste.Valide = Actif;
    INIT_ActualiserBouton();
}
function INIT_ActualiserListe()
{
    let x;
    for(x = 0;x < INIT_ORDRE.length;x++)
    {
        Objet.Afficher(INIT_DATA[x].PtrLigneInit, true)
    }
    for(;x < INIT_DATA.length;x++)
    {
        Objet.Afficher(INIT_DATA[x].PtrLigneInit, false)
    }
    Initiative.AfficherListe(true);
    INIT_ActualiserBouton();
}
function INIT_ActualiserBouton()
{
    Bouton.Activer(Initiative.Liste.PtrBouton[0], !Initiative.Liste.Etat && Initiative.Liste.Valide);
    Bouton.Activer(Initiative.Liste.PtrBouton[1], Initiative.Liste.Etat && Initiative.Liste.Valide);
}
function INIT_AfficherListe()
{
    let x;
    for(x = 0;x < INIT_ORDRE.length;x++)
    {
        INIT_DATA[x].PtrLabelNum.innerHTML = Perso.Lettre(INIT_ORDRE[x]);
        INIT_DATA[x].PtrLabelNom.innerHTML = Perso.Nom(INIT_ORDRE[x]) +" >> "+INIT_DATA[INIT_ORDRE[x]].Valeur;
        INIT_DATA[x].PtrLabelFormat.innerHTML = INIT_DATA[INIT_ORDRE[x]].Format;
        if(parseInt(INIT_DATA[INIT_ORDRE[x]].Valeur) == -66)
        {
            Objet.Couleur(INIT_DATA[x].PtrLigneInit, 2);
        }
        else
        {
            Objet.Couleur(INIT_DATA[x].PtrLigneInit, 0);
        }
        Objet.Afficher(INIT_DATA[x].PtrLigneInit, true)
    }
    for(;x < INIT_DATA.length;x++)
    {
        Objet.Afficher(INIT_DATA[x].PtrLigneInit, false)
    }
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
            INIT_DATA[x].Valeur = parseInt(100) + parseInt(10 * InitDE.Yang) + INIT_DATA[x].BonusCarac;
            INIT_DATA[x].Format = InitDE.Yang + "x" + InitDE.Yang;
            BonusAvant.Ajouter(x, InitDE.Yang);
        }
        else
        {
            MSG.Historique(Perso.Gras(x) + " <strong>ECHEC CRITIQUE "+ InitDE.Yang + "</strong>", 1);
            MSG.Journal("<strong>ECHEC CRITIQUE "+ InitDE.Yang + "</strong>",2);
            INIT_DATA[x].Valeur = -10 + INIT_DATA[x].Bonus;
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
        INIT_DATA[x].Valeur = Nb + "." + INIT_DATA[x].BonusCarac;
        INIT_DATA[x].Format = Nb;
    }
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
            Bouton.Activer(BtnValider, false);
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
        Bouton.Activer(BtnValider, false);
    }
    PERSO_ActualiserListe();
    INIT_Trier();
    INIT_AfficherListe();
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
function INIT_Nouvelle(Obj, x)
{
    Bouton.Activer(BtnValider, true);
    BonusAvant.Activer(x, false);
    Obj.disabled = true;
    if(Obj.value != "")
    {
        Objet.Couleur(INIT_DATA[x].PtrLigne, 0);
    }
    if((Perso.Actif < 0) || (Perso.Actif == x))
    {
        if(INIT_GererDE(x) > 0)
        {   
            INIT_ValiderDE();
        }
    }
}
