class ACTION_Interface  {
    Initialiser(Taille) {ACTION_Initialiser(Taille);}
    AfficherListe(Etat) {OBJET_AfficherListe(ACTION_DATA, Etat);}
    Activer(Id) {ACTION_Activer(Id);}
    Afficher(Id, Etat) {OBJET_Afficher(ACTION_DATA[Id].PtrLigne, Etat);}
}
var Action = new ACTION_Interface();
let ACTION_DATA = new Array();
let LstAction = new Array();

class ACTION_Donnee{
    PtrLigne;
    PtrSelect;
    Etat = false;
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
            MSG.Message(Perso.Gras(Id) + " peut changer <strong>d'arme</strong> et/ou <strong>de bouclier</strong>, puis valider ...");
            MSG.Historique(Perso.Gras(Id) + " peut changer d'arme et/ou de bouclier.");
            Equipement.CouleurArme(Id, 2);
            Equipement.Activer(Id, true);
            ActiverBouton("BtnValider", true);
            break;
        case "4OLD":
            MSG.Journal("Il fait une attaque de <strong>corps à corps</strong>.", 1);
            ACTION_Attaquer(Id, "ACTION");
            break;
        case "5OLD":
            MSG.Journal("Il <strong>lance</strong> son arme.", 1);
            ACTION_Attaquer(Id, "ACTION");
            break;
        case "6OLD":
            MSG.Journal("Il <strong>tire</strong> avec son arme à distance.", 1);
            ACTION_Attaquer(Id, "ACTION");
            break;
        case "7":       // RECHARGER
            MSG.Journal("Il <strong>recharge</strong> son arme.", 1);
            Nb = Equipement.ArmeSelectionne(Id);
            if(parseInt(Nb) >= 0)
            {
                let Arme = Perso.Arme(Id, Nb);
                Arme.Quantite = Arme.QuantiteMaxi;
            }
            ACTION_Terminer(Id);
            break;
        case "8":       // DEGAINER LA SEUL ARME
            Equipement.ChoisirArmePrincipale(Id);
            ACTION_Terminer(Id);
            break;
        case "2":       // SE DEPLACER
            MSG.Journal("Il se <strong>déplace</strong>.", 1);
            ACTION_Terminer(Id);
            break;
        case "1":       // PASSER SON TOUR
            MSG.Journal("Il passe son tour.", 1);
            ACTION_Terminer(Id);
            break;
        default:
            MSG.Erreur("ACTION ["+Obj.value+"] NON GEREE !!");
            ACTION_Terminer(Id);
            break;
    }
}
function ACTION_Terminer(Id)
{
    MSG.Erreur("GERE PLUSIEURS ACTION DANS UN  TABLEAU");
    if(LstAction.length == 0)
    {
        Action.Afficher(Id, false);
        Perso.UtiliserAction(Id);
        Moteur.LancerModule("Nouveau Personnage");
    }
    return(0);
    JDR_CacherLigneAttaque(Index);
    Equip.Activer(Index, false);
    ActiverBouton("BtnValider", false);
}
