var TimerQIN;

class QIN_Combat {
    PtrLigneAttaque;
    PtrSelectAttaque;
    PtrSelectAttaqueDe;
    PtrLigneDefense;
    PtrSelectDefense;
    PtrSelectDefenseDe;
    constructor() {
    }
}
var QIN_DATA     = new Array();

class QIN_Attaque{
    constructor(Indice, Touche, Double, Degat, Cible, TypeAttaque, Protection = 0) {
        this.Indice = Indice;
        this.Touche = Touche;
        this.Double = Double;
        this.Degat = Degat;
        this.Cible = Cible;
        this.CorpsCorps = TypeAttaque;
        this.Protection = Protection;
    }
}
var QIN_LstAttaque = new Array();

/*****************************************************************************/
/*  Initialisation des objets, etc pour les comabts
/*****************************************************************************/
function JDR_InitialiserCombat()
{
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        let Ptr = new QIN_Combat();
        Ptr.PtrLigneAttaque = document.querySelector("#LigneTypeAttaque-" + x);
        Ptr.PtrSelectAttaque = document.querySelector("#TypeAttaque-" + x);
        Ptr.PtrSelectAttaque.addEventListener('change', function(){
                            JDR_NouvelleAttaque(Ptr.PtrSelectAttaque, x);    
        });
        Ptr.PtrSelectAttaqueDe = document.querySelector("#JetAttaque-" + x);
        Ptr.PtrSelectAttaqueDe.addEventListener('change', function(){
                            JDR_NouvelleDeAttaque(Ptr.PtrSelectAttaqueDe, x);    
        });

        Ptr.PtrLigneDefense = document.querySelector("#LigneDefendre-" + x);
        Ptr.PtrSelectDefense = document.querySelector("#DefenseContre-" + x);
        Ptr.PtrSelectDefense.addEventListener('change', function(){
                            JDR_NouvelleDefense(Ptr.PtrSelectDefense, x);    
        });
        Ptr.PtrSelectDefenseDe = document.querySelector("#JetDefense-" + x);
        Ptr.PtrSelectDefenseDe.addEventListener('change', function(){
                            JDR_NouvelleDeDefense(Ptr.PtrSelectDefenseDe, x);    
        });

        let TabOpt = new Array(["A", "Automatique"], ["L", "Libre"],
                                ["D1", "Double 1"], ["D2", "Double 2"], ["D3", "Double 3"], ["D4", "Double 4"], ["D5", "Double 5"],
                                ["D6", "Double 6"], ["D7", "Double 7"], ["D8", "Double 8"], ["D9", "Double 9"], ["D0", "Double 0"],
                                ["", ""], 
                                );
        for(let y = 0;y < TabOpt.length;y++)
        {
            var Opt = document.createElement("option");
            Opt.text = TabOpt[y][1];
            Opt.value = TabOpt[y][0];
            Opt.disabled = false;
            if(TabOpt[y][0] == "")
            {
                Opt.disabled = true;
            }
            Ptr.PtrSelectAttaqueDe.add(Opt);
            var Opt = document.createElement("option");
            Opt.text = TabOpt[y][1];
            Opt.value = TabOpt[y][0];
            Opt.disabled = false;
            if(TabOpt[y][0] == "")
            {
                Opt.disabled = true;
            }
            Ptr.PtrSelectDefenseDe.add(Opt);
        }
        QIN_DATA.push(Ptr);
        JDR_AfficherAttaque(x, false);
    }
}
function JDR_InitialiserManoeuvreArme(Id, TypeAttaque)
{
    let TabOpt = new Array(["0", "Normale"]);
    QIN_DATA[Id].PtrSelectAttaqueDe.value = "";
    QIN_DATA[Id].PtrSelectAttaqueDe.disabled = false;
    let Ptr = QIN_DATA[Id].PtrSelectAttaque;
    Ptr.options.length = 0;

    Nb = Equip.ArmeSelectionne(Id);
    if(parseInt(Nb) >= 0)
    {
        let Arme = Perso.Arme(Id, Nb);
        let Distance = 1;
        if(TypeAttaque == "4")
        {
            Distance = 0;
        }
        for(let x = 0;x < PERSO_BASE[Id].Manoeuvres.length;x++)
        {
            if((PERSO_BASE[Id].Manoeuvres[x].id_arme == Arme.id_arme) &&
                (PERSO_BASE[Id].Manoeuvres[x].distance == Distance) &&
                (PERSO_BASE[Id].Manoeuvres[x].type == 1))
            {
                TabOpt.push([PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre, PERSO_BASE[Id].Manoeuvres[x].nom]);
            }
        }
    }

    for(let y = 0;y < TabOpt.length;y++)
    {
        var Opt = document.createElement("option");
        Opt.text = TabOpt[y][1];
        Opt.value = TabOpt[y][0];
        Ptr.add(Opt);
    }
    Ptr.value = "0";
    MSG.Journal("Il exécute une attaque <strong>Normale</strong>.", 1);
    if(TabOpt.length > 1)
    {
        Ptr.disabled = false;
    }
    else
    {
        Ptr.disabled = true;
    }
}
/*****************************************************************************/
/*  Gestion de l'affichage des differents objets
/*****************************************************************************/
function JDR_CacherLigneAttaque(Id)
{
    JDR_AfficherAttaque(Id, false);
    JDR_AfficherAttaque(Id, false);
    JDR_AfficherDefense(Id, false);
    JDR_ActiverDe(false, false);
}
function JDR_AfficherAttaque(Id, Etat = false)
{
    AfficherObjet(QIN_DATA[Id].PtrLigneAttaque, Etat);
}
function JDR_AfficherDefense(Id, Etat = false)
{
    AfficherObjet(QIN_DATA[Id].PtrLigneDefense, Etat);
}
/*****************************************************************************/
/*  Gestion de l'attaque 
/*****************************************************************************/
function JDR_GererAction(Id)
{
    JDR_AfficherAttaque(Id, true);
    if(QIN_DATA[Id].PtrSelectAttaqueDe.value != "")
    {
        ActiverBouton("BtnValider", true);
        JDR_ActiverDe(true, true);
        return(0);
    }
    CouleurObjet(QIN_DATA[Id].PtrLigneAttaque, 2);
}
function JDR_NouvelleAttaque(Obj, Id)
{
    for(let x = 0;x < Obj.options.length;x++)
    {
        if(Obj.options[x].value == Obj.value)
        {
            MSG.Journal("Il exécute une attaque <strong>" + Obj.options[x].label + "</strong>.", 1);
        }
    }
}
function JDR_NouvelleDeAttaque(Obj, Id)
{
    BonusAvant.Activer(Id, false);
    Cible.Activer(Id, false);
    let Ptr = QIN_DATA[Id].PtrLigneAttaque;
    CouleurObjet(Ptr, 0);
    let Nb = 0;
    if(Obj.value == "")
    {
        BonusAvant.Activer(Id, true);
        CouleurObjet(Ptr, 2);
        JDR_AfficherDe(false, false);
        ActiverBouton("BtnValider", false);
        return(0);
    }
    QIN_DATA[Id].PtrSelectAttaque.disabled = true;
    QIN_DATA[Id].PtrSelectAttaqueDe.disabled = true;
    switch(parseInt(JDR_LancerDe(Obj.value)))
    {
        case 1:
            break;
        case 0:
            return(0);
        default:
            CouleurObjet(Ptr, 2);
            return(-1);
    }
    if(parseInt(PERSO_DATA[Id].BA.Maxi) == 0)
    {
        ACTION_Valider();
    }
    else
    {
        ActiverBouton("BtnValider", true);
    }
}
function JDR_GestionAttaque(Id, CorpsCorps = true)
{
    let Nb = Equip.ArmeSelectionne(Id);
    if(parseInt(Nb) < 0)
    {
        return(-1);
    }
    let Double = 0;
    let BoAv  = PERSO_DATA[Id].BA.Bonus;
    BonusAvant.Utiliser(Id);
    let Arme = Perso.Arme(Id, Nb);
    let TACO = Arme.Attaquer;
    if(!CorpsCorps)
    {
        Arme.Quantite--;
        TACO = Arme.Lancer;
    }
    if(DeSelect[0].value == DeSelect[1].value)
    {
        if(DeSelect[0].value == "0")
        {
            BonusAvant.Ajouter(Id, -5);
            MSG.Message("<strong>ECHEC CRITIQUE !!</strong>");
            MSG.Historique("<strong>ECHEC CRITIQUE !!</strong>", 1);
            MSG.Journal("<strong>ECHEC CRITIQUE !!</strong>", 2);
            ACTION_Terminer(Id);
            return(0);
        }
        else
        {
            BonusAvant.Ajouter(Id, DeSelect[0].value);
            Double = DeSelect[0].value;
        }
    }
    let Touche = parseInt(TACO) +
                parseInt(PERSO_BASE[Id].Metal) +
                parseInt(BoAv) +
                parseInt(PERSO_DATA[Id].MalusPV) +
                Math.abs(parseInt(DeSelect[0].value) - parseInt(DeSelect[1].value)) + 
                parseInt(Double);
    let Degat = parseInt(DeSelect[0].value) - parseInt(DeSelect[1].value);
    if(parseInt(Degat) < 0)
    {
        Degat = 0;
    }
    Degat += parseInt(PERSO_BASE[Id].Metal) + parseInt(Arme.Degat) + parseInt(Double);

    QIN_LstAttaque.length = 0;
    var LstCible = new Array();
    if(CIBLE_DATA[Id].Groupe)
    {
        for(let x = 0;x < CIBLE_DATA[Id].TabGroupe.length;x++)
        {
            if(CIBLE_DATA[Id].TabGroupe[x].Nb > 0)
            {
                let y = CIBLE_DATA[Id].TabGroupe[x].Nb;
                Ptr = new QIN_Attaque(0, Touche + y - 1, 0, Degat + y - 1, Perso.IndexPJ[x] + "-0", CorpsCorps, 0);
                LstCible.push(Ptr);
            }
        }
    }
    else
    {
        Ptr = new QIN_Attaque(0, Touche, 0, Degat, CIBLE_DATA[Id].Cible , CorpsCorps, 0);
        LstCible.push(Ptr);
    }
    for(let x = 0;x < LstCible.length;x++)
    {
        let Source = LstCible[x];
        switch(QIN_DATA[Id].PtrSelectAttaque.value)
        {
            case "0":   // Attaque normale
                Ptr = new QIN_Attaque(1, Source.Touche, Double, Source.Degat, Source.Cible, CorpsCorps, 0);
                QIN_LstAttaque.push(Ptr);
                break;
            case "8":   // Coup double
                Ptr = new QIN_Attaque(1, Source.Touche-1, Double, Source.Degat-1, Source.Cible, CorpsCorps, 0);
                QIN_LstAttaque.push(Ptr);
                Ptr = new QIN_Attaque(2, Source.Touche-2, Double, Source.Degat-2, Source.Cible, CorpsCorps, 0);
                QIN_LstAttaque.push(Ptr);
                break;
            case "9":   // Coup precis
                Ptr = new QIN_Attaque(1, Source.Touche-1, Double, Source.Degat, Source.Cible, CorpsCorps, -2);
                QIN_LstAttaque.push(Ptr);
                break;
            default:
                MSG.Erreur("JDR_AttaqueCorpsCorps = " + Id + "/" + QIN_DATA[Id].PtrSelectAttaque.value + " ==> NON GERE");
                ACTION_Terminer(Id);
                return(0);
                break;
        }
    }
    TimerQIN = setInterval(JDR_GererAttaque, 50);
}
function JDR_GererAttaque()
{
    clearInterval(TimerQIN);
    if(QIN_LstAttaque.length > 0)
    {
        Gestion.Phase = "DEFENSE";
        let Ptr = QIN_LstAttaque[0];
        let Tab = Ptr.Cible.split("-");
        let Id = Tab[0]
        if(Perso.Mort(Id))
        {
            JDR_DefenseTermine(Id);
            return(0);
        }
        if(Ptr.Double == "0")
        {
            if(parseInt(Ptr.Touche) > parseInt(PERSO_BASE[Id].DefensePassive))
            {
                MSG.Journal("Touché : "+ Ptr.Touche + " / " + PERSO_BASE[Id].DefensePassive + 
                                " (" + Perso.Lettre(Id) + ". " + Perso.Nom(Id) + ") Dégâts : " + Ptr.Degat, 2);
                MSG.Historique("Touché de "+ Ptr.Touche + " contre " + PERSO_BASE[Id].DefensePassive + 
                                " sur (" + Perso.Lettre(Id) + ". " + Perso.Nom(Id) + ") pour " + Ptr.Degat + " dégâts.", 1);
            }
            else
            {
                MSG.Journal("Raté : "+ Ptr.Touche + " / " + PERSO_BASE[Id].DefensePassive + 
                                " (" + Perso.Lettre(Id) + ". " + Perso.Nom(Id) + ")", 2);
                MSG.Historique("Raté de "+ Ptr.Touche + " contre " + PERSO_BASE[Id].DefensePassive + 
                                " sur (" + Perso.Lettre(Id) + ". " + Perso.Nom(Id) + ")", 1);
                JDR_DefenseTermine(Id);
                return(0);
            }
        }
        else
        {
            MSG.Journal("<strong>Touché critque : "+ Ptr.Double + "</strong> (" +
                                Perso.Lettre(Id) + ". " + Perso.Nom(Id) + ") Dégâts : " + Ptr.Degat, 2);
            MSG.Historique("<strong>Touché critque de "+ Ptr.Double + "</strong> sur (" +
                                Perso.Lettre(Id) + ". " + Perso.Nom(Id) + ") pour " + Ptr.Degat + " dégâts.", 1);
        }

        if(Cible.Active != Id)
        {
            Cible.Active = Id;
            PERSO_VisualiserListe("PNJ", SavSensFleche[0]);
            PERSO_VisualiserListe("PJ", SavSensFleche[1]);
        }
        JDR_InitialiserDefense(Id);
    }
    else
    {
        Gestion.Phase = "ACTION";
        ACTION_Terminer(Perso.Actif);
    }
}
/*****************************************************************************/
/*  Gestion pour la defense
/*****************************************************************************/
function JDR_InitialiserDefense(Id)
{
    let Ptr = QIN_DATA[Id].PtrSelectDefense;
    Ptr.options.length = 0;

    let TabOpt = new Array(["0", "NON"],
                            );
    if(!CIBLE_DATA[Id].Groupe)
    {
        if(Perso.NbAction(Id) > 0)
        {
            TabOpt.push(["1","Esquiver (" + PERSO_BASE[Id].Esquive + ")"],);
        }
    }

    TabOpt.push(["",""],);
    for(let y = 0;y < TabOpt.length;y++)
    {
        var Opt = document.createElement("option");
        Opt.text = TabOpt[y][1];
        Opt.value = TabOpt[y][0];
        Opt.disabled = false;
        if(TabOpt[y][0] == "")
        {
            Opt.disabled = true;
            Opt.selected = true;
        }
        Ptr.add(Opt);
    }
    Ptr.disabled = false;
    QIN_DATA[Id].PtrSelectDefenseDe.value = "";
    QIN_DATA[Id].PtrSelectDefenseDe.disabled = true;
    CouleurObjet(QIN_DATA[Id].PtrLigneDefense, 2);
    JDR_AfficherDefense(Id, true);
    if(Ptr.options.length < 3)
    {
        Ptr.value = "0";
        JDR_NouvelleDefense(Ptr, Id);
    }
}
function JDR_NouvelleDefense(Obj, Id)
{
    Obj.disabled = true;
    switch(Obj.value)
    {
        case "0": //    Aucune defense
            JDR_CalculerBlessure(Id, "Aucune défense, ");
            break;
        case "1": //    Esquive
            QIN_DATA[Id].PtrSelectDefenseDe.value = "";
            QIN_DATA[Id].PtrSelectDefenseDe.disabled = false;
            break;
        default:
            Obj.disabled = false;
            MSG.Erreur("JDR_NouvelleDefense : [" + Obj.value + "] NON GEREE !");
            return(-1);
    }
    BonusAvant.Activer(Id, true);
}
function JDR_NouvelleDeDefense(Obj, Id)
{
    console.debug("JDR_NouvelleDeDefense : "+Obj.value);
    BonusAvant.Activer(Id, false);
    Obj.disabled = true;
    let Ptr = QIN_DATA[Id].PtrLigneDefense;
    CouleurObjet(Ptr, 0);
    switch(parseInt(JDR_LancerDe(Obj.value)))
    {
        case 1:
            break;
        case 0:
            return(0);
        default:
            CouleurObjet(Ptr, 2);
            return(-1);
    }
    if(parseInt(PERSO_DATA[Id].BA.Maxi) == 0)
    {
        JDR_DefenseValider();
    }
    else
    {
        ActiverBouton("BtnValider", true);
    }
}
function JDR_DefenseValider()
{
    let Tab = QIN_LstAttaque[0].Cible.split("-");
    let Id = Tab[0];
    console.debug("JDR_DefenseValider : "+Id);

    let BoAv  = PERSO_DATA[Id].BA.Bonus;
    BonusAvant.Utiliser(Id);
    let Double = 0;
    if(DeSelect[0].value == DeSelect[1].value)
    {
        if(DeSelect[0].value == "0")
        {
            BonusAvant.Ajouter(Id, -5);
            Perso.UtiliserAction(Id);
            JDR_CalculerBlessure(Id, "Défense ratée, ");
            MSG.Message("<strong>ECHEC CRITIQUE !!</strong>");
            MSG.Historique("<strong>ECHEC CRITIQUE !!</strong>", 2);
            MSG.Journal("<strong>ECHEC CRITIQUE !!</strong>", 3);
            return(0);
        }
        else
        {
            BonusAvant.Ajouter(Id, DeSelect[0].value);
            Double = DeSelect[0].value;
        }
    }

    let CA  = 0;
    let Defense = "";
    switch(QIN_DATA[Id].PtrSelectDefense.value)
    {
        case "1":
            CA = parseInt(PERSO_BASE[Id].Esquive) +
            parseInt(PERSO_BASE[Id].Eau) +
            parseInt(BoAv) +
            parseInt(PERSO_DATA[Id].MalusPV) +
            Math.abs(parseInt(DeSelect[0].value) - parseInt(DeSelect[1].value)) + 
            parseInt(Double);
            Defense = "Esquive";
            Perso.UtiliserAction(Id);
            break;
        default:
            MSG.Erreur("TYPE DE DEFENSE NONB GEREE");
            return(0);
    }
/*
    let Nb = Equip.ArmeSelectionne(Id);
    if(parseInt(Nb) < 0)
    {
        return(-1);
    }
    let Arme = Perso.Arme(Id, Nb);
    let TACO = Arme.Attaquer;
*/
    if(parseInt(QIN_LstAttaque[0].Double) > 0)
    {
        if(parseInt(Double) > parseInt(QIN_LstAttaque[0].Double))
        {
            MSG.Historique("<strong>" + Defense + " critique : " + Double + " contre " + QIN_LstAttaque[0].Double + "</strong> => Aucun dégât", 2);
            MSG.Journal("<strong>" + Defense + " critique : " + Double + " / " + QIN_LstAttaque[0].Double + "</strong> => Aucun dégât", 3);
            JDR_DefenseTermine(Id);
        }
        else
        {
            JDR_CalculerBlessure(Id, Defense + " critique ratée : " + Double + " / " + QIN_LstAttaque[0].Double + ", ");
        }
    }
    else
    {
        if(parseInt(Double) > 0)
        {
            MSG.Historique("<strong>" + Defense + " critique : " + Double + "</strong> => Aucun dégât", 2);
            MSG.Journal("<strong>" + Defense + " critique : " + Double + "</strong> => Aucun dégât", 3);
            JDR_DefenseTermine(Id);
        }
        else
        {
            if(parseInt(CA) >= parseInt(QIN_LstAttaque[0].Touche))
            {
                Defense += " réussie : " + CA + " / " + QIN_LstAttaque[0].Touche + " => Aucun dégât";
                MSG.Historique(Defense, 2);
                MSG.Journal(Defense, 3);
                JDR_DefenseTermine(Id);
            }
            else
            {
                JDR_CalculerBlessure(Id, Defense + " ratée : " + CA + " / " + QIN_LstAttaque[0].Touche + ", ");
            }
        }
    }
}
function JDR_DefenseTermine(Id)
{
    JDR_AfficherDefense(Id, false);
    QIN_LstAttaque.splice(0,1);
    TimerQIN = setInterval(JDR_GererAttaque, 50);
}
/***************************************************************************************/
/*      Calcul des PV perdu en fonction de la protection et des dégâts
/***************************************************************************************/
function JDR_CalculerBlessure(Id, MsgTexte)
{
    let CA = Equip.Protection(Id) + QIN_LstAttaque[0].Protection;
    if(CA < 0)
    {
        CA = 0;
    }

    let PV = QIN_LstAttaque[0].Degat - CA;
    if(PV < 0)
    {
        PV = 0;
    }

    if(PV == 0)
    {
        MSG.Journal(MsgTexte + CA + " => Aucun dégât",3);
        MSG.Historique(MsgTexte + " protection : " + CA + " => Aucun dégât",2);
    }
    else
    {
        MSG.Journal(MsgTexte + CA + " => -" + PV + " PV",3);
        MSG.Historique(MsgTexte + " protection : " + CA + " => -" + PV + " PV",2);
    }
    JDR_BlesserPersonnage(Id, PV, QIN_LstAttaque[0].Cible);
    JDR_DefenseTermine(Id);
}
