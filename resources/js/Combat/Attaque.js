class TA_Interface  {
    Initialiser(Taille) {TA_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(TA_DATA, Etat);}
    InitialiserManoeuvre(Id, TypeAttaque) {TA_InitialiserManoeuvre(Id, TypeAttaque);}
    Afficher(Id, Etat) {Objet.Afficher(TA_DATA[Id].PtrLigne, Etat);}
    Couleur(Id, Code) {Objet.Couleur(TA_DATA[Id].PtrLigne, Code);}
    Gerer() {ATTAQUE_Gerer();}
    Termine() {ATTAQUE_Termine();}
    AutoriserNouveauJet(Id) {ATTAQUE_NouveauJet(Id);}
}
var Attaque = new TA_Interface();
let TA_DATA = new Array();

class TA_Donnee{
    PtrLigne;
    PtrSelectTypeAttaque;
    PtrSelectJetAttaque;
    Etat = false;
}
class ATTAQUE_Liste{
    constructor(Source, Touche, Double, Degat, Cible, TypeAttaque, Protection = 0) {
        this.Source = Source;
        this.Touche = Touche;
        this.Double = Double;
        this.Degat = Degat;
        this.Cible = Cible;
        this.CorpsCorps = TypeAttaque;
        this.Protection = Protection;
    }
}
let LstAttaque = new Array();

function TA_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'attaque.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new TA_Donnee();
        TA_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneTypeAttaque-" + x);
        Ptr.PtrSelectTypeAttaque = document.querySelector("#TypeAttaque-" + x);
        Ptr.PtrSelectTypeAttaque.addEventListener('change', function(){
                        TA_Nouvelle(Ptr.PtrSelectTypeAttaque);    
        });

        Ptr.PtrSelectJetAttaque = document.querySelector("#JetAttaque-" + x);
        Ptr.PtrSelectJetAttaque.addEventListener('change', function(){
                        TA_Jet(Ptr.PtrSelectJetAttaque, x);    
        });
        JDR_InitialiserSelectJet(Ptr.PtrSelectJetAttaque);

        Ptr.Etat = true;
    }
    Attaque.AfficherListe(false);
}
function TA_Nouvelle(Obj)
{
    for(let x = 0;x < Obj.options.length;x++)
    {
        if(Obj.options[x].value == Obj.value)
        {
            MSG.Journal("Il exécute une attaque <strong>" + Obj.options[x].label + "</strong>.", 1);
        }
    }
}
function TA_Jet(Obj, Id)
{
    Obj.disabled = true;
    TA_DATA[Id].PtrSelectTypeAttaque.disabled = true;
    Cible.Activer(Id, false);
    Action.ActiverSelection(Id, false);
    Attaque.Couleur(Id, 0);
    Tao.Afficher(Id, "ATTAQUE");
    BonusAvant.Activer(Id, false);

    if(TA_GererDE(Id, Obj.value) > 0)
    {
        TA_TraiterRetour(Id, TirageDE);
    }
    else
    {
        Bouton.Valider.Demarrer("ATTAQUE");
    }
}
function ATTAQUE_ValiderDE()
{
    if(Perso.Actif == -2){Moteur.LancerModule("Tour INIT");}
    if(Perso.Actif < 0){return(-1);}
    TA_TraiterRetour(Perso.Actif, TirageDE);
}
function ATTAQUE_CalculerTouche(Id, CorpsCorps, BoAv, JetDE)
{
    let Nb = Equipement.ArmeSelectionne(Id);
    if(parseInt(Nb) < 0){return(-1);}
    let Arme = Perso.Arme(Id, Nb);
    let TACO = Arme.Lancer;
    if(CorpsCorps){TACO = Arme.Attaquer;}

    let Touche  = Math.abs(parseInt(JetDE.Yang) - parseInt(JetDE.Yin));
    if(parseInt(Touche) == 0){Touche = parseInt(JetDE.Yang);}
    Touche += parseInt(TACO) +
                parseInt(PERSO_BASE[Id].Metal) +
                parseInt(BoAv) +
                parseInt(PERSO_DATA[Id].MalusPV);
    return(Touche);
}
function ATTAQUE_CalculerDegat(Id, JetDE)
{
    let Nb = Equipement.ArmeSelectionne(Id);
    if(parseInt(Nb) < 0){return(-1);}
    let Arme = Perso.Arme(Id, Nb);

    let Degat = parseInt(JetDE.Yang) - parseInt(JetDE.Yin);
    if(parseInt(Degat) < 0)
    {
        Degat = 0;
    }
    else
    {
        if(Degat == 0)
        {
            Degat = parseInt(JetDE.Yang);
        }
    }
    Degat += parseInt(PERSO_BASE[Id].Metal) + 
                parseInt(Arme.Degat) +
                parseInt(PERSO_DATA[Id].BonusDegat);
    return(Degat);
}
function TA_TraiterRetour(Id, DEValide)
{
    JDR_AfficherDE(-1);
    let Nb = Equipement.ArmeSelectionne(Id);
    if(parseInt(Nb) < 0)
    {
        return(-1);
    }
    Tao.Afficher(Id, "");
    Bouton.Valider.Activer(false);
    let BoAv  = Perso.BonusAvant(Id).Bonus;
    BonusAvant.Utiliser(Id);
    let Arme = Perso.Arme(Id, Nb);
    let TACO = Arme.Attaquer;
    let CorpsCorps = true;
    ACTION_ControlerEnCours();
    switch(parseInt(LstAction[0].Action))
    {
        case 4:
            break;
        case 5:
        case 6:
            CorpsCorps = false;
            Arme.Quantite--;
            TACO = Arme.Lancer;
            break;
        default:
            MSG.Erreur("TYPE D'ACTION ["+LstAction[0].Action+"] NON GERE");
            return(-1);
    }
    Perso.AjouterAttaque(Id, CorpsCorps);
    let Double = 0;
    if(DEValide.Double)
    {
        if(DEValide.Yang == 0)
        {
            BonusAvant.Ajouter(Id, -5);
            MSG.Message("<strong>ECHEC CRITIQUE !!</strong>");
            MSG.Historique("<strong>ECHEC CRITIQUE !!</strong>", 1);
            MSG.Journal("<strong>ECHEC CRITIQUE !!</strong>", 2);
            Action.Termine(Id);
            return(0);
        }
        else
        {
            BonusAvant.Ajouter(Id, DEValide.Yang);
            Double = DEValide.Yang;
        }
    }
    MSG.Journal("DE : (" + DEValide.Yang + " - " + DEValide.Yin + ") Yang - Yin", 3);
    let Touche  = Math.abs(parseInt(DEValide.Yang) - parseInt(DEValide.Yin));
    if(parseInt(DEValide.Yang) == parseInt(DEValide.Yin))
    {
        Touche = parseInt(DEValide.Yang);
    }
    Touche +=parseInt(TACO) +
            parseInt(PERSO_BASE[Id].Metal) +
            parseInt(BoAv) +
            parseInt(PERSO_DATA[Id].MalusPV) +
            parseInt(LstAction[0].Touche);

    let Degat = parseInt(TirageDE.Yang) - parseInt(TirageDE.Yin);
    if(parseInt(Degat) < 0)
    {
        Degat = 0;
    }
    else
    {
        if(Degat == 0)
        {
            Degat = parseInt(TirageDE.Yang);
        }
    }
    Degat += parseInt(PERSO_BASE[Id].Metal) + parseInt(Arme.Degat) +
                parseInt(LstAction[0].Degat) + parseInt(PERSO_DATA[Id].BonusDegat);

    LstAttaque.length = 0;
    var LstCible = new Array();
    if(CIBLE_DATA[Id].Groupe)
    {
        for(let x = 0;x < CIBLE_DATA[Id].TabGroupe.length;x++)
        {
            if(CIBLE_DATA[Id].TabGroupe[x].Nb > 0)
            {
                let y = CIBLE_DATA[Id].TabGroupe[x].Nb;
                Ptr = new ATTAQUE_Liste(Id + "-" + x, Touche + y - 1, 0, Degat + y - 1, Perso.IndexPJ[x] + "-0", CorpsCorps, 0);
                LstCible.push(Ptr);
            }
        }
    }
    else
    {
        Ptr = new ATTAQUE_Liste(Id, Touche, 0, Degat, Cible.Selectionne(Id), CorpsCorps, 0);
        LstCible.push(Ptr);
    }
            
    for(let x = 0;x < LstCible.length;x++)
    {
        let Source = LstCible[x];
        switch(parseInt(TA_DATA[Id].PtrSelectTypeAttaque.value))
        {
            case 0:   // Attaque normale
                Ptr = new ATTAQUE_Liste(Source.Source, Source.Touche, Double, Source.Degat, Source.Cible, CorpsCorps, 0);
                LstAttaque.push(Ptr);
                break;
            case 8:   // Coup double
                Ptr = new ATTAQUE_Liste(Source.Source, Source.Touche-1, Double, Source.Degat-1, Source.Cible, CorpsCorps, 0);
                LstAttaque.push(Ptr);
                if(!LstAction[0].Gratuit)
                {
                    ACTION_Ajouter(LstAction[0].Action, true, -1, -1);
                }
                break;
            case 9:   // Coup precis
            case 24:    //  Coup de maitre
                Ptr = new ATTAQUE_Liste(Source.Source, Source.Touche-1, Double, Source.Degat, Source.Cible, CorpsCorps, -2);
                LstAttaque.push(Ptr);
                break;
            case 27:   // Double trait
                Ptr = new ATTAQUE_Liste(Source.Source, Source.Touche-1, Double, Source.Degat-1, Source.Cible, CorpsCorps, 0);
                LstAttaque.push(Ptr);
                if(!LstAction[0].Gratuit)
                {
                    ACTION_Ajouter(LstAction[0].Action, true, -2, 0);
                }
                break;
            default:
                MSG.Erreur("TA_TraiterRetour = " + Id + "/" + TA_DATA[Id].PtrSelectTypeAttaque.value + " ==> NON GERE");
                Action.Termine(Id);
                return(0);
        }
    }
    Moteur.LancerModule("ATTAQUE");
}
function ATTAQUE_Gerer()
{
    Moteur.ArreterModule();
    console.debug("ATTAQUE_Gerer");
    if(LstAttaque.length > 0)
    {
        let Ptr = LstAttaque[0];
        let Tab = Ptr.Cible.split("-");
        let Id = Tab[0]
        if(Perso.Mort(Id))
        {
            console.debug("  Cible morte");
            ATTAQUE_Termine();
            return(0);
        }
        if(Ptr.Double == "0")
        {
            if(parseInt(Ptr.Touche) >= parseInt(PERSO_BASE[Id].DefensePassive))
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
                ATTAQUE_Termine();
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
            PERSO_ActualiserListe();
        }
        Defense.Activer(Id);
    }
    else
    {
        console.debug("  Action terminée");
        Action.Termine(Perso.Actif);
    }
}
function ATTAQUE_Termine()
{
    console.debug("ATTAQUE_Termine");
    Attaque.Afficher(Perso.Actif, false)
    Tao.Afficher(Perso.Actif, "");
    LstAttaque.splice(0, 1);
    Moteur.LancerModule("ATTAQUE");
}
function TA_GererDE(Id, Chaine)
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
    MSG.Message("Valider l'attaque.");
    return(-1);
}
function TA_InitialiserManoeuvre(Id, TypeAttaque)
{
    let TabOpt = new Array(["0", "Normale"]);
    TA_DATA[Id].PtrSelectJetAttaque.value = "";
    TA_DATA[Id].PtrSelectJetAttaque.disabled = false;
    let Ptr = TA_DATA[Id].PtrSelectTypeAttaque;
    Ptr.options.length = 0;

    Nb = Equipement.ArmeSelectionne(Id);
    if(parseInt(Nb) >= 0)
    {
        let Arme = Perso.Arme(Id, Nb);
        let Distance = -1;
        switch(parseInt(TypeAttaque))
        {
            case 4:
                Distance = 0;
                break;
            case 5:
            case 6:
            default:
                Distance = 1;
        }
        for(let x = 0;x < PERSO_BASE[Id].Manoeuvres.length;x++)
        {
            if((PERSO_BASE[Id].Manoeuvres[x].id_arme == Arme.id_arme) &&
                (PERSO_BASE[Id].Manoeuvres[x].distance == Distance) &&
                (PERSO_BASE[Id].Manoeuvres[x].type == 1))
            {
                let Ajout = true;
                if((PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre == 27) && (Arme.Quantite < 2))
                {
                    Ajout = false;
                }
                if(Ajout)
                {
                    TabOpt.push([PERSO_BASE[Id].Manoeuvres[x].id_manoeuvre, PERSO_BASE[Id].Manoeuvres[x].nom]);
                }
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
function ATTAQUE_NouveauJet(Id)
{
    Attaque.Afficher(Id, true);
    Attaque.Couleur(Id, 2);
    TA_DATA[Id].PtrSelectTypeAttaque.disabled = true;
    TA_DATA[Id].PtrSelectJetAttaque.disabled = false;
    TA_DATA[Id].PtrSelectJetAttaque.value = "";
}