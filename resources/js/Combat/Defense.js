class TD_Interface  {
    Initialiser(Taille) {TD_Initialiser(Taille);}
    AfficherListe(Etat) {Objet.AfficherListe(TD_DATA, Etat);}
    NouveauTour() {TD_NouveauTour();}
    Afficher(Id, Etat) {Objet.Afficher(TD_DATA[Id].PtrLigne, Etat);}
    Activer(Id) {TD_Activer(Id);}
    NouvelleDefensePassive(Id) {TD_NouvelleDefensePassive(Id);}
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
function TD_Nouvelle(Obj, Id)
{
    switch(Obj.value)
    {
        case "A":
            TD_AucuneDefense(Id);
            break;
        default:
            MSG.Erreur("TD_Nouvelle : ["+Obj.value+"] NON GERE");
    }
}
function TD_Jet(Ptr, Id)
{
    TD_DATA[Id].PtrSelectTypeDefense.disabled = true;
    Tao.Afficher(Id, "DEFENSE", true);
}
function TD_ControlerTaoActif(Id)
{
    let Nb = 0;
    let Ptr = TAO_DATA[Id].PtrSelect;
    for(let x = 0;x < Ptr.options.length;x++)
    {
        switch(parseInt(Ptr.value))
        {
            case 34:
            case 35:
            case 37:
                Nb += 1;
                break;
        }
    }
    return(Nb);
}
function TD_Activer(Id)
{
    Defense.Afficher(Id, true);
    Tao.Afficher(Id, "DEFENSE", false);
    TD_DATA[Id].PtrSelectTypeDefense.disabled = false;
    TD_DATA[Id].PtrSelectJetDefense.disabled = true;
    TD_DATA[Id].PtrSelectJetDefense.value = "";
    Objet.Couleur(TD_DATA[Id].PtrLigne, 2);
    let AucuneDefense = false;
    if(TD_InitialiserSelection(Id) < 3)
    {
        if(TD_ControlerTaoActif(Id) == 0)
        {
            AucuneDefense = true;
        }
    }
    if(AucuneDefense)
    {
        TD_AucuneDefense(Id);
    }
}
function TD_InitialiserSelection(Id)
{
    if(CIBLE_DATA[Id].Groupe)
    {
        return(0);
    }

    let LstDefense = new Array();
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
            if((LstAttaque[0].CorpsCorps) || (Arme.MaitriseCC >= 3))
            {
                Ptr.add(Opt);
                TD_DATA[Id].LstDefense["P"] = PA;
            }
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
                    if((PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre == 2) && !LstAttaque[0].CorpsCorps){Ajout = false;}
                    if(Ajout){Ptr.add(Opt);}
                }
            }
        }
    }
    if(TD_DATA[Id].DoubleParade)
    {
        Opt = document.createElement("option");
        let PA = TD_DATA[Id].LstDefense["P"] - 2;
        Opt.text = "Double parade (" + PA + ")";
        Opt.value = "DP";
        Ptr.add(Opt);
        TD_DATA[Id].LstDefense["DP"] = PA;
    }
    return(Ptr.options.length);
}
function TD_AucuneDefense(Id)
{
    TD_DATA[Id].PtrSelectTypeDefense.disabled = true;
    TD_CalculerDegat(Id, "Aucune défense, ");
}
function TD_CalculerDegat(Id, MsgTexte)
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