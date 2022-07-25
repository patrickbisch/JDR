class ACTION_Interface  {
    Initialiser(Taille) {ACTION_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(ACTION_DATA, Etat);}
    Activer(Id) {ACTION_Activer(Id);}
    ActiverSelection(Id, Etat) {ACTION_DATA[Id].PtrSelect.disabled = !Etat;}
    Afficher(Id, Etat) {OBJET_Afficher(ACTION_DATA[Id].PtrLigne, Etat);}
    Termine(Id) {ACTION_Terminer(Id);}
}
var Action = new ACTION_Interface();
let ACTION_DATA = new Array();

class ACTION_Donnee{
    PtrLigne;
    PtrSelect;
    Etat = false;
}

let LstAction = new Array();
class ACTION_Liste{
    constructor(Action, Gratuit = false, Touche = 0, Degat = 0) {
        this.Action = Action;
        this.Gratuit = Gratuit;
        this.Touche = Touche;
        this.Degat = Degat;
    }
}

function ACTION_Initialiser(Taille)
{
    MSG.Historique("Initialisation des actions.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new ACTION_Donnee();
        ACTION_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneAction-" + x);
        let Obj = document.querySelector("#Action-" + x);
        Obj.addEventListener('change', function(){
                        ACTION_Nouvelle(Obj, x);    
        });
        Ptr.PtrSelect = Obj;
        Ptr.Etat = true;
    }
    Action.AfficherListe(false);
}
function ACTION_Activer(Id)
{
    ACTION_InitialiserSelect(Id);
    LstAction = new Array();
    let Ptr = ACTION_DATA[Id];
    Cible.Activer(Id, true);
    Ptr.PtrSelect.disabled = false;
    Ptr.PtrSelect.value = "";
    Objet.Couleur(Ptr.PtrLigne, 2);
    Objet.Afficher(Ptr.PtrLigne, true);
}
function ACTION_InitialiserSelect(Id)
{
    let Ptr = ACTION_DATA[Id].PtrSelect;
    Ptr.options.length = 0;
    let TabAction = new Array();

    Nb = Equipement.ArmeSelectionne(Id);
    if(parseInt(Nb) >= 0)
    {
        let Arme = Perso.Arme(Id, Nb);
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
        if(parseInt(Perso.NombreArme(Id)) > 1)
        {
            TabAction.push(["3", "Changer d'arme"],);
        }
    }
    else
    {
        if(parseInt(Perso.NombreArme(Id)) > 1)
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
    Cible.Recharger(Id);
}
function ACTION_Couleur(Id, Etat = 0)
{
    Objet.Couleur(ACTION_DATA[Id].PtrLigne, Etat);
}
function ACTION_Nouvelle(Obj, Id)
{
    if(Perso.Actif != Id)
    {
        console.warn("Ce n'est pas le personnage actif");
        return(0);
    }
    ACTION_Couleur(Id, 0);
    switch(Obj.value)
    {
        case "3":       // CHANGER D'ARME
            ACTION_Ajouter(3);
            MSG.Message(Perso.Gras(Id) + " peut changer <strong>d'arme</strong> et/ou <strong>de bouclier</strong>, puis valider ...");
            MSG.Historique(Perso.Gras(Id) + " peut changer d'arme et/ou de bouclier.");
            Equipement.CouleurArme(Id, 2);
            Equipement.Activer(Id, true);
            Bouton.Valider.Activer(true);
            break;
        case "4":
            ACTION_Ajouter(4);
            MSG.Journal("Il fait une attaque de <strong>corps à corps</strong>.", 1);
            Attaque.InitialiserManoeuvre(Id, Obj.value);
            ACTION_Attaquer(Id);
            break;
        case "5":
            ACTION_Ajouter(5);
            MSG.Journal("Il <strong>lance</strong> son arme.", 1);
            Attaque.InitialiserManoeuvre(Id, Obj.value);
            ACTION_Attaquer(Id);
            break;
        case "6":
            ACTION_Ajouter(6);
            MSG.Journal("Il <strong>tire</strong> avec son arme à distance.", 1);
            Attaque.InitialiserManoeuvre(Id, Obj.value);
            ACTION_Attaquer(Id);
            break;
        case "7":       // RECHARGER
            ACTION_Ajouter(7);
            MSG.Journal("Il <strong>recharge</strong> son arme.", 1);
            Nb = Equipement.ArmeSelectionne(Id);
            if(parseInt(Nb) >= 0)
            {
                let Arme = Perso.Arme(Id, Nb);
                Arme.Quantite = Arme.QuantiteMaxi;
            }
            Action.Termine(Id);
            break;
        case "8":       // DEGAINER LA SEUL ARME
            ACTION_Ajouter(8);
            Equipement.Activer(Id, true);
            Equipement.ChoisirArmePrincipale(Id);
            if(!EQUIP_ControlerAffectation())
            {
                Action.Termine(Id);
            }
            break;
        case "2":       // SE DEPLACER
            ACTION_Ajouter(2);
            MSG.Journal("Il se <strong>déplace</strong>.", 1);
            Action.Termine(Id);
            break;
        case "1":       // PASSER SON TOUR
            ACTION_Ajouter(1);
            MSG.Journal("Il passe son tour.", 1);
            Action.Termine(Id);
            break;
        default:
            ACTION_Couleur(Id, 2);
            MSG.Erreur("ACTION [" + Obj.value + "] NON GEREE !!");
            Action.Termine(Id);
            break;
    }
}
function ACTION_Ajouter(Action, Gratuit = false, Touche = 0, Degat = 0)
{
    LstAction.push(new ACTION_Liste(Action, Gratuit, Touche, Degat));
}
function ACTION_Attaquer(Id)
{
    if(Id != Perso.Actif)
    {
        return(0);
    }
    switch(ACTION_DATA[Id].PtrSelect.value)
    {
        case "4":
        case "5":
        case "6":
            break;
        default:
            return(0);
    }
    let Nb = Cible.Selectionne(Id);
    console.debug("ACTION_Attaquer : "+Id+"/"+Nb);
    if(Nb == "")
    {
        Cible.Couleur(Id, 2);
        Attaque.Afficher(Id, false);
    }
    else
    {
        Cible.Couleur(Id, 0);
        Attaque.Couleur(Id, 2);
        Attaque.Afficher(Id, true);
    }
}
function ACTION_ValiderDe()
{
    switch(LstAction[0].Action)
    {
        case 3:
        case 8:
            Action.Termine(Perso.Actif);
            break;
        default:
            MSG.Erreur("VALIDATION de l'Action : "+LstAction[0].Action+" NON GEREE");
    }
}
function ACTION_Terminer(Id)
{
    if(LstAction[0].Action == -1)
    {
        ACTION_Ajouter(-1);
        LstAction.splice(0,1);
    }
    if(!LstAction[0].Gratuit)
    {
        Perso.UtiliserAction(Id);
    }
    LstAction.splice(0,1);
    BonusExceptionnel.ActionTermine();
    if(LstAction.length == 0)
    {
        Action.Afficher(Id, false);
        Moteur.LancerModule("Nouveau Personnage");
    }
    else
    {
        switch(parseInt(LstAction[0].Action))
        {
            case -1:
            default:
                LstAction.splice(0,1);
                ACTION_InitialiserSelect(Id);
                Objet.Couleur(ACTION_DATA[Id].PtrLigne, 2);
                break;
        }
    }
}
