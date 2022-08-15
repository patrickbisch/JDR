class TD_Interface  {
    Initialiser(Taille) {TD_Initialiser(Taille);}
    AfficherListe(Etat) {Objet.AfficherListe(TD_DATA, Etat);}
    NouveauTour() {TD_NouveauTour();}
    Afficher(Id, Etat) {Objet.Afficher(TD_DATA[Id].PtrLigne, Etat);}
    Activer(Id) {TD_Activer(Id);}
    NouvelleDefensePassive(Id) {TD_NouvelleDefensePassive(Id);}
    InitialiserSelection(Id) {TD_InitialiserSelection(Id);}
}
var Defense = new TD_Interface();
let TD_DATA = new Array();

class TD_Donnee{
    PtrLigne;
    PtrSelectTypeDefense;
    PtrSelectJetDefense;
    Etat = false;
    DoubleParade = false;
    DefenseGratuite = false;
    LstDefense = new Array();
}
/*********************************************************************************/
/*      Initialisation du module
/*********************************************************************************/
function TD_Initialiser(Taille)
{
    MSG.Historique("Initialisation de la defense.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new TD_Donnee();
        TD_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneDefendre-" + x);
        Ptr.PtrSelectTypeDefense = document.querySelector("#DefenseContre-" + x);
        Ptr.PtrSelectTypeDefense.addEventListener('change', function(){
                        TD_Nouvelle(Ptr.PtrSelectTypeDefense, x);    
        });

        Ptr.PtrSelectJetDefense = document.querySelector("#JetDefense-" + x);
        Ptr.PtrSelectJetDefense.addEventListener('change', function(){
                        TD_Jet(Ptr.PtrSelectJetDefense, x);    
        });
        JDR_InitialiserSelectJet(Ptr.PtrSelectJetDefense);

        Ptr.Etat = true;
    }
    Defense.AfficherListe(false);
}
function TD_NouveauTour()
{
    for(let x = 0;x < TD_DATA.length;x++)
    {
        TD_DATA[x].DoubleParade = false;
        TD_DATA[x].DefenseGratuite = false;
    }
}
/*********************************************************************************/
/*      Nouvelle selection TypeDefense ou Jet
/*********************************************************************************/
function TD_Nouvelle(Obj, Id)
{
    switch(Obj.value)
    {
        case "A":
            TD_AucuneDefense(Id);
            break;
        case "E":
        case "B":
        case "P":
        case "DP2":
        case "12":
        case "2":
            BonusAvant.Activer(Id, true);
            Obj.disabled = true;
            TD_DATA[Id].PtrSelectJetDefense.disabled = false;
            break;
        default:
            MSG.Erreur("TD_Nouvelle : ["+Obj.value+"] NON GERE");
    }
}
function TD_Jet(Obj, Id)
{
    Obj.disabled = true;
    TD_DATA[Id].PtrSelectTypeDefense.disabled = true;
    if(TD_DATA[Id].PtrSelectTypeDefense.value != "2")
    {
        Tao.Afficher(Id, "DEFENSE");
    }
    else
    {
        Tao.Afficher(Id, "ATTAQUE");
    }
    Objet.Couleur(TD_DATA[Id].PtrLigne, 0);
    BonusAvant.Activer(Id, false);
    if(TD_GererDE(Id, Obj.value) > 0)
    {
        TD_TraiterRetour(Id, TirageDE);
    }
    else
    {
        Bouton.Valider.Demarrer("DEFENSE");
    }
}
/*********************************************************************************/
/*      Gestion des DE et sa selection
/*********************************************************************************/
function TD_GererDE(Id, Chaine)
{
    if(Chaine == "L")
    {
        JDR_ValeurDE(0, 0);
        JDR_AfficherDE(1);
        return(-1);
    }
    JDR_LancerDE(Chaine);
    if(Perso.BonusAvant(Id).Maxi == 0)
    {
        return(1);
    }
    MSG.Message("Valider la défense.");
    return(-1);
}
function DEFENSE_ValiderDE()
{
    if(Cible.Active < 0)
    {
        return(-1);
    }
    TD_TraiterRetour(Cible.Active, TirageDE);
}
function TD_TraiterRetour(Id, DEValide)
{
    JDR_AfficherDE(-1);
    Tao.Afficher(Id, "");
    Bouton.Valider.Activer(false);
    let BoAv  = Perso.BonusAvant(Id).Bonus;
    BonusAvant.Utiliser(Id);

    let Double = 0;
    if(DEValide.Double)
    {
        if(DEValide.Yang == 0)
        {
            BonusAvant.Ajouter(Id, -5);
            MSG.Message("<strong>ECHEC CRITIQUE !!</strong>");
            MSG.Historique("<strong>ECHEC CRITIQUE !!</strong>", 2);
            MSG.Journal("<strong>ECHEC CRITIQUE !!</strong>", 3);
            TD_AucuneDefense(Id);
            return(0);
        }
        else
        {
            BonusAvant.Ajouter(Id, DEValide.Yang);
            Double = DEValide.Yang;
        }
    }

    let Nb = 0;
    let Chaine = "";
    let Gratuit = false;
    switch(TD_DATA[Id].PtrSelectTypeDefense.value)
    {
        case "E":
            Chaine = "Esquive";
            Nb = TD_DATA[Id].LstDefense[TD_DATA[Id].PtrSelectTypeDefense.value];
            break;
        case "B":
            Chaine = "Parade au bouclier";
            Nb = TD_DATA[Id].LstDefense[TD_DATA[Id].PtrSelectTypeDefense.value];
            break;
        case "P":
            Chaine = "Parade";
            Nb = TD_DATA[Id].LstDefense[TD_DATA[Id].PtrSelectTypeDefense.value];
            break;
        case "DP2":
            Gratuit = true;
            Chaine = "Parade";
            TD_DATA[Id].DoubleParade = false;
            Nb = TD_DATA[Id].LstDefense[TD_DATA[Id].PtrSelectTypeDefense.value];
            break;
        case "12":
            Chaine = "Parade";
            TD_DATA[Id].DoubleParade = true;
            Nb = TD_DATA[Id].LstDefense["DP1"];
            break;
        case "2":
            TD_AttaqueSuicide(Id, BoAv);
            return(0);
        default:
            MSG.Erreur("TYPE DE DEFENSE ["+TD_DATA[Id].PtrSelectTypeDefense.value+"] NON GERE");
            return(-1);
    }

    if(!Gratuit)
    {
        Gratuit = TD_DATA[Id].DefenseGratuite;
        TD_DATA[Id].DefenseGratuite = false;
    }
    if(!Gratuit)
    {
        Perso.UtiliserAction(Id);
    }
    if(LstAttaque[0].Double > 0)
    {
        if(Double > LstAttaque[0].Double)
        {
            MSG.Historique("<strong>" + Chaine + " CRITIQUE !!</strong> " + Double + " contre " + LstAttaque[0].Double, 2);
            MSG.Journal("<strong>" + Chaine + " CRITIQUE !!</strong> " + Double + " / " + LstAttaque[0].Double, 3);
            TD_Termine(Id);
        }
        else
        {
            TD_CalculerDegat(Id, Chaine + " Ratée, ");
        }
    }
    else
    {
        if(Double > 0 )
        {
            MSG.Historique("<strong>" + Chaine + " CRITIQUE !!</strong> : " + Double, 2);
            MSG.Journal("<strong>" + Chaine + " CRITIQUE !!</strong> : " + Double, 3);
            TD_Termine(Id);
        }
        else
        {
            if(parseInt(DEValide.Yang) == parseInt(DEValide.Yin))
            {
                Double = DEValide.Yang;
            }
            Nb += parseInt(BoAv) + parseInt(PERSO_DATA[Id].BonusCaracDefense) + 
                    Math.abs(parseInt(DEValide.Yang) - parseInt(DEValide.Yin)) + 
                    parseInt(Double) + parseInt(PERSO_DATA[Id].MalusPV) +
                    parseInt(PERSO_DATA[Id].BonusDefense) 
            if(parseInt(Nb) >= parseInt(LstAttaque[0].Touche))
            {
                MSG.Historique(Chaine + " réussie : " + Nb + " contre " + LstAttaque[0].Touche, 2);
                MSG.Journal(Chaine + " réussie : " + Nb + " / " + LstAttaque[0].Touche, 3);
                TD_Termine(Id);
            }
            else
            {
                MSG.Historique(Chaine + " ratée : " + Nb + " contre " + LstAttaque[0].Touche, 2);
                MSG.Journal(Chaine + " ratée : " + Nb + " / " + LstAttaque[0].Touche, 3);
                TD_CalculerDegat(Id, "");
            }
        }
    }
}
/*********************************************************************************/
/*      Gestion des TAO et des types de defenses
/*********************************************************************************/
function TD_ControlerTaoActif(Id)
{
    let Nb = 0;
    let Ptr = TAO_DATA[Id].PtrSelect;
    for(let x = 0;x < Ptr.options.length;x++)
    {
        switch(parseInt(Ptr.options[x].value))
        {
            case 34:
            case 35:
            case 37:
                Nb++;
                break;
        }
    }
    return(Nb);
}
function TD_InitialiserSelection(Id)
{
    if(CIBLE_DATA[Id].Groupe)
    {
        return(0);
    }

    let Ptr = TD_DATA[Id].PtrSelectTypeDefense;
    Ptr.options.length = 0;

    Opt = document.createElement("option");
    Opt.text = "Défense active";
    Opt.value = "";
    Opt.selected = true;
    Opt.disabled = true;
    Ptr.add(Opt);
    
    Opt = document.createElement("option");
    Opt.text = "Aucune";
    Opt.value = "A";
    Ptr.add(Opt);
    
    if((Perso.NbAction(Id) > 0) || (TD_DATA[Id].DefenseGratuite))
    {
        Opt = document.createElement("option");
        let PE = Perso.Base(Id).Esquive;
        Opt.text = "Esquiver (" + PE + ")";
        Opt.value = "E";
        Ptr.add(Opt);
        TD_DATA[Id].LstDefense["E"] = PE;

        let Nb = Equipement.BouclierSelectionne(Id);
        if(parseInt(Nb) >= 0)
        {
            let Bouclier = Perso.Bouclier(Id, Nb);
            let PB = Bouclier.Bouclier + Bouclier.DefenseActive + Bouclier.Bonus;
            Opt = document.createElement("option");
            Opt.text = "Parade bouclier (" + PB + ")";
            Opt.value = "B";
            Ptr.add(Opt);
            TD_DATA[Id].LstDefense["B"] = PB;
        }

        Nb = Equipement.ArmeSelectionne(Id);
        if(parseInt(Nb) >= 0)
        {
            let Arme = Perso.Arme(Id, Nb);
            let PA = Arme.MaitriseCC + Arme.BonusParade;
            Opt = document.createElement("option");
            Opt.text = "Parer (" + PA + ")";
            Opt.value = "P";
            TD_DATA[Id].LstDefense["P"] = PA;
            let Ajout = true;
            if((!LstAttaque[0].CorpsCorps) && (Arme.MaitriseCC < 3)){Ajout = false;}
            if(Arme.MaitriseCC == 0){Ajout = false;}
            if(Ajout){Ptr.add(Opt);}
            for(let x = 0;x < PERSO_BASE[Id].Manoeuvres.length;x++)
            {
                if((PERSO_BASE[Id].Manoeuvres[x].id_arme == Arme.id_arme) &&
                    (PERSO_BASE[Id].Manoeuvres[x].distance == 0) &&
                    (PERSO_BASE[Id].Manoeuvres[x].type == 2))
                {
                    Opt = document.createElement("option");
                    Opt.text = PERSO_BASE[Id].Manoeuvres[x].nom;
                    Opt.value = PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre;
                    let Ajout = true;
                    if((PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre == 2) && !LstAttaque[0].CorpsCorps)
                    {
                        Ajout = false;
                    }
                    if(PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre == 12)
                    {
                        console.debug("Double parade : "+LstAttaque[0].CorpsCorps+"/"+Arme.MaitriseCC);
                        if(!LstAttaque[0].CorpsCorps && (Arme.MaitriseCC < 3)){Ajout = false;}
                        if(TD_DATA[Id].DoubleParade){Ajout = false;}
                        let Nb  = parseInt(TD_DATA[Id].LstDefense["P"]) - 1;
                        Opt.text += " (" + Nb + ")";
                        TD_DATA[Id].LstDefense["DP1"] = Nb;
                    }
                    if(Ajout){Ptr.add(Opt);}
                }
            }
        }
    }
    if(TD_DATA[Id].DoubleParade)
    {
        Opt = document.createElement("option");
        let PA = TD_DATA[Id].LstDefense["P"] - 2;
        Opt.text = "Parade gratuite (" + PA + ")";
        Opt.value = "DP2";
        Ptr.add(Opt);
        TD_DATA[Id].LstDefense["DP2"] = PA;
    }
    Ptr.disabled = false;
    return(Ptr.options.length);
}
/*********************************************************************************/
/*      Lancement de la defense
/*********************************************************************************/
function TD_Activer(Id)
{
    Defense.Afficher(Id, true);
    Tao.Afficher(Id, "DEFENSE", false);
    TD_DATA[Id].PtrSelectTypeDefense.disabled = false;
    TD_DATA[Id].PtrSelectJetDefense.disabled = true;
    TD_DATA[Id].PtrSelectJetDefense.value = "";
    Objet.Couleur(TD_DATA[Id].PtrLigne, 2);
    let AucuneDefense = false;
    console.debug("TD_Activer : "+Id);
    if(TD_InitialiserSelection(Id) < 3)
    {
        console.debug("  1");
        if(TD_ControlerTaoActif(Id) == 0)
        {
            console.debug("  2");
            AucuneDefense = true;
        }
    }
    console.debug("  3 : " + AucuneDefense);
    if(AucuneDefense)
    {
        TD_AucuneDefense(Id);
    }
}
/*********************************************************************************/
/*      Gestion de la defense
/*********************************************************************************/
function TD_AucuneDefense(Id)
{
    TD_DATA[Id].PtrSelectTypeDefense.disabled = true;
    TD_CalculerDegat(Id, "Aucune défense, ");
}
function TD_CalculerDegat(Id, MsgTexte, Termine = true)
{
    let CA = Equipement.Protection(Id) + LstAttaque[0].Protection;
    if(CA < 0)
    {
        CA = 0;
    }
    let PV = LstAttaque[0].Degat - CA;
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
    JDR_BlesserPersonnage(Id, PV, LstAttaque[0].Cible);
    if(Termine){TD_Termine(Id);}
}
function TD_AttaqueSuicide(Id, BoAv)
{
    let Touche = ATTAQUE_CalculerTouche(Id, true, BoAv, TirageDE);
    let Degat = ATTAQUE_CalculerDegat(Id, TirageDE);
    TD_CalculerDegat(Id, "", false);

    console.debug("Degat : "+Degat);

    let Tab = (LstAttaque[0].Source + "-0").split("-");
    let Nb = Tab[0];
    if((TirageDE.Double) || (Touche >= Perso.Base(Nb).DefensePassive))
    {
        let CA = Equipement.Protection(Nb);
        console.debug("Cible : "+ Nb+" CA : "+CA);
        let PV = Degat - CA;
        console.debug("PV : "+ PV);
        if(PV > 0)
        {
            JDR_BlesserPersonnage(Nb, PV, LstAttaque[0].Source);
            MSG.Journal("Attaque suicide réussie => " + PV + " dégât",3);
            MSG.Historique("Attaque suicide réussi => " + PV + " dégât",2);
        }
        else
        {
            MSG.Journal("Attaque suicide réussie => Aucun dégât",3);
            MSG.Historique("Attaque suicide réussi => Aucun dégât",2);
        }
    }
    else
    {
        MSG.Journal("Attaque suicide ratée",3);
        MSG.Historique("Attaque suicide ratée",2);
    }

    let Gratuit = TD_DATA[Id].DefenseGratuite;
    TD_DATA[Id].DefenseGratuite = false;
    if(!Gratuit)
    {
        Perso.UtiliserAction(Id);
    }
    TD_Termine(Id);
}
function TD_NouvelleDefensePassive(Id)
{
    if(Perso.Base(Id).DefensePassive > LstAttaque[0].Touche)
    {
        MSG.Journal("Le coup a raté",3);
        MSG.Historique("Le coup a raté",2);
        TD_Termine(Id);
    }
}
function TD_Termine(Id)
{
    Objet.Afficher(TD_DATA[Id].PtrLigne, false);
    Tao.Afficher(Id, "");
    Attaque.Termine();
}