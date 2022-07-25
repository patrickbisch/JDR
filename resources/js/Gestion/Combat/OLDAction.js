class ACTION_Interface2 {
    Initialiser(Taille) {ACTION_Initialiser(Taille);}
    AfficherLigne(Index, Visible) {ACTION_AfficherLigne(Index, Visible);}
    AfficherListe(Visible) {ACTION_AfficherListe(Visible);}
    Couleur(Index, Etat) {ACTION_Couleur(Index, Etat);}
    InitialiserListe(Index) {ACTION_InitialiserListe(Index);}
}
var Action2          = new ACTION_Interface2();

class ACTION_Donnee {
    PtrLigne;
    PtrLabel;
    PtrSelect;
    AfficherHistorique;
    constructor() {
    }
}
var ACTION_DATA2     = new Array();

function ACTION_Initialiser(Taille)
{
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new ACTION_Donnee();
        Ptr.PtrLabel = document.querySelector("#NbAction-" + x);
        Ptr.PtrLigne = document.querySelector("#LigneAction-" + x);
        let Obj = document.querySelector("#Action-" + x);
        Obj.addEventListener('change', function(){
                ACTION_NouvelleAction(Obj, x);    
        });
        Ptr.PtrSelect = Obj;
        ACTION_DATA.push(Ptr);
    }
    Perso.InitialiserNombreAction();
}
function ACTION_InitialiserListe(Index)
{
    ACTION_Couleur(Index, 2);
    PERSO_DATA[Index].Action = "0";
    let Ptr = ACTION_DATA[Index].PtrSelect;
    Ptr.disabled = false;
    Ptr.options.length = 0;
    let TabAction = new Array();

    Nb = Equip.ArmeSelectionne(Index);
    if(parseInt(Nb) >= 0)
    {
        let Arme = Perso.Arme(Index, Nb);
        if((Arme.Attaquer > 0) && (Arme.Quantite > 0))
        {
            TabAction.push(["4", "Attaquer (" + Arme.Attaquer + ")"]);
        }
        if(Arme.Lancer > 0)
        {
            if(Arme.Quantite > 0)
            {
                if(Arme.Attaquer > 0)
                {
                    TabAction.push(["5", "Lancer (" + Arme.Lancer + ") [" + Arme.Quantite + "]"]);
                }
                else
                {
                    TabAction.push(["6", "Tirer (" + Arme.Lancer + ") [" + Arme.Quantite + "]"]);
                }
            }
            else
            {
                TabAction.push(["7", "Recharger"]);
            }
        }
        if(parseInt(Perso.NombreArme(Index)) > 1)
        {
            TabAction.push(["3", "Changer d'arme"],);
        }
    }
    else
    {
        if(parseInt(Perso.NombreArme(Index)) > 1)
        {
            TabAction.push(["3", "Dégainer une arme"],);
        }
        else
        {
            TabAction.push(["8", "Dégainer l'arme"],);
        }
    }
    TabAction.push(["2", "Se déplacer"],
                    ["1", "Passer son tour"],
                    ["0", ""],);

    for(let x = 0;x < TabAction.length;x++)
    {
        var Opt = document.createElement("option");
        Opt.text = TabAction[x][1];
        Opt.value = TabAction[x][0];
        Opt.disabled = false;
        if(TabAction[x][0] == "0")
        {
            Opt.disabled = true;
            Opt.selected = true;
        }
        Ptr.add(Opt);
    }
}
function ACTION_Valider()
{
    let Id = Perso.Actif;
    ActiverBouton("BtnValider", false);
    JDR_AfficherDe(false, false);
    switch(PERSO_DATA[Perso.Actif].Action)
    {
        case "3":
            Equip.CouleurArme(Id, 0);
            Action.Termine(Id);
            break;
        case "4":
            JDR_GestionAttaque(Id, true);
            break;
        case "5":
        case "6":
            JDR_GestionAttaque(Id, false);
            break;
        default:
            MSG.Erreur("ACTION_Valider = Action [" + PERSO_DATA[Perso.Actif].Action + "] NON GEREE !");
    }
}
function ACTION_NouvelleAction(Obj, Id)
{
    if(Perso.Actif == Id)
    {
        Gestion.Phase = "ACTION";
        PERSO_DATA[Perso.Actif].Action = Obj.value;
        ACTION_DATA[Id].PtrSelect.disabled = true;
        ACTION_Couleur(Id, 0);
        switch(Obj.value)
        {
            case "3":       // CHANGER D'ARME
                MSG.Message(Perso.Gras(Id) + " peut changer <strong>d'arme</strong> et/ou <strong>de bouclier</strong>, puis valider ...");
                MSG.Historique(Perso.Gras(Id) + " peut changer d'arme et/ou de bouclier.");
                Equip.CouleurArme(Id, 2);
                Equip.Activer(Id, true);
                ActiverBouton("BtnValider", true);
                break;
            case "4":
                MSG.Journal("Il fait une attaque de <strong>corps à corps</strong>.", 1);
                ACTION_Attaquer(Id, "ACTION");
                break;
            case "5":
                MSG.Journal("Il <strong>lance</strong> son arme.", 1);
                ACTION_Attaquer(Id, "ACTION");
                break;
            case "6":
                MSG.Journal("Il <strong>tire</strong> avec son arme à distance.", 1);
                ACTION_Attaquer(Id, "ACTION");
                break;
            case "7":       // RECHARGER
                MSG.Journal("Il <strong>recharge</strong> son arme.", 1);
                Nb = Equip.ArmeSelectionne(Id);
                if(parseInt(Nb) >= 0)
                {
                    let Arme = Perso.Arme(Id, Nb);
                    Arme.Quantite = Arme.QuantiteMaxi;
                }
                Action.Termine(Id);
                break;
            case "8":       // DEGAINER LA SEUL ARME
                Equip.ChoisirArmePrincipale(Id);
                Action.Termine(Id);
                break;
            case "2":       // SE DEPLACER
                MSG.Journal("Il se <strong>déplace</strong>.", 1);
                Action.Termine(Id);
                break;
            case "1":       // PASSER SON TOUR
                MSG.Journal("Il passe son tour.", 1);
                Action.Termine(Id);
                break;
            default:
                MSG.Erreur("ACTION ["+Obj.value+"] NON GEREE !!");
                Action.Termine(Id);
                break;
        }
    }
    else
    {
        console.warn("Ce n'est pas le personnage actif");
    }
}
function ACTION_Terminer(Index)
{
    JDR_CacherLigneAttaque(Index);
    Equip.Activer(Index, false);
    ActiverBouton("BtnValider", false);
    ACTION_AfficherLigne(Index, false);
    Perso.UtiliserAction(Index);
    LancerModule("NouveauActif");
}
function ACTION_AfficherListe(Visible = true)
{
    for(let x = 0;x < ACTION_DATA.length;x++)
    {
        ACTION_AfficherLigne(x, Visible);
    }
}
function ACTION_AfficherLigne(Index, Visible = true)
{
    AfficherObjet(ACTION_DATA[Index].PtrLigne, Visible);
}
function ACTION_Couleur(Index, Etat = 0)
{
    CouleurObjet(ACTION_DATA[Index].PtrLigne, Etat);
    if(Etat == 2)
    {
        JDR_AfficherAttaque(Index, false);
        JDR_AfficherDefense(Index, false);
    }
}
function ACTION_Attaquer(Id, Source)
{
    if(Id != Perso.Actif)
    {
        return(0);
    }
    let Nb = Cible.Cible(Id);
    ActiverBouton("BtnValider", false);
    if(Source == "ACTION")
    {
        JDR_InitialiserManoeuvreArme(Id, PERSO_DATA[Id].Action);
    }
    if(Nb == "-1")
    {
        if(ACTION_DATA[Id].PtrSelect.value != "0")
        {
            MSG.Message(Perso.Gras(Id) + " doit choisir une cible.", true);
            Cible.Couleur(Id, 2);
            JDR_CacherLigneAttaque(Id);
            ACTION_DATA[Id].AfficherHistorique = true;
        }
    }
    else
    {
        Cible.Couleur(Id, 0);
        if(ACTION_DATA[Id].PtrSelect.value != "0")
        {
            if(ACTION_DATA[Id].AfficherHistorique)
            {
                MSG.Message(Perso.Gras(Id) + " doit choisir le <strong>type d'attaque</strong>, le <strong>lancé de De</strong>, puis valider ...");
                MSG.Historique(Perso.Gras(Id) + " doit choisir le type d'attaque et le lancé de De.");
                ACTION_DATA[Id].AfficherHistorique = false;
            }
            JDR_GererAction(Id);
        }
        else
        {
            JDR_CacherLigneAttaque(Id);
        }
    }
}
