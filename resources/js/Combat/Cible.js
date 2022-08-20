class CIBLE_Interface  {
    Active = -1;
    Initialiser(Taille) {CIBLE_Initialiser(Taille);}
    AfficherListe(Etat) {CIBLE_AfficherListe(Etat);}
    Afficher(Id, Etat) {Objet.Afficher(CIBLE_DATA[Id].PtrLigne, Etat);}
    Activer(Id, Etat) {CIBLE_Activer(Id, Etat);}
    Couleur(Id, Code) {CIBLE_Couleur(Id, Code);}
    Recharger(Id) {CIBLE_ChargerListe(Id);}
    ActualiserListeGroupe() {CIBLE_ActualiserListeGroupe();}
    Selectionne(Id) {return(CIBLE_Selectionne(Id));}
    AffecterDefaut(Id) {CIBLE_Defaut(Id);}
}
var Cible = new CIBLE_Interface();
let CIBLE_DATA = new Array();

class CIBLE_Groupe {
    PtrLigne;
    PtrMoins;
    PtrPlus;
    PtrNb;
    PtrPJ;
    Nb=0;
}
class CIBLE_Donnee{
    PtrLigne;
    PtrSelectCible;
    Groupe = false;
    TabGroupe = new Array();
    Libre = 0;
    PtrLibre;
    Mort = 0;
    PtrMort;
    Ancienne;
}
/*********************************************************************************/
/*  Initialisation du module
/*********************************************************************************/
function CIBLE_Initialiser(Taille)
{
    MSG.Historique("Initialisation des cibles.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new CIBLE_Donnee();
        CIBLE_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneCible-" + x);
        switch(Perso.TypeFonction(x))
        {
            case 4:
            case 5:
            case 6:
                Ptr.Groupe = true;
                Ptr.Libre = Perso.Base(x).NbPNJ;
                Ptr.PtrLibre = document.querySelector("#Libre-" + x);
                Ptr.PtrLibre.innerHTML = Ptr.Libre;
                Ptr.Mort = 0;
                Ptr.PtrMort = document.querySelector("#Mort-" + x);
                Ptr.PtrMort.innerHTML = 0;
                for(let y = 0;y < Perso.IndexPJ.length;y++)
                {
                    let PtrGrp = new CIBLE_Groupe();
                    let Obj = document.querySelector("#LignePV-" + x + "-" + y);
                    PtrGrp.PtrLigne = Obj;

                    Obj = document.querySelector("#PJ-" + x + "-" + y);
                    Obj.innerHTML = Obj.innerHTML + " " + Perso.Nom(Perso.IndexPJ[y]);
                    PtrGrp.PtrPJ = Obj;

                    Obj = document.querySelector("#Nb-" + x + "-" + y);
                    Obj.innerHTML = 0;
                    PtrGrp.PtrNb = Obj;

                    Obj = document.querySelector("#Moins-" + x + "-" + y);
                    Bouton.Activer(Obj, false);
                    Obj.addEventListener('click', function(e){
                        e.preventDefault();
                        CIBLE_GroupeMoins(x, y);
                    });
                    PtrGrp.PtrMoins = Obj;
                
                    Obj = document.querySelector("#Plus-" + x + "-" + y);
                    Bouton.Activer(Obj, true);
                    Obj.addEventListener('click', function(e){
                        e.preventDefault();
                        CIBLE_GroupePlus(x, y);
                    });
                    PtrGrp.PtrPlus = Obj;

                    Ptr.TabGroupe.push(PtrGrp);
                }
                break;
            default:
                let Obj = document.querySelector("#Cible-" + x);
                Obj.addEventListener('change', function(){
                                CIBLE_Nouvelle(Obj, x);    
                });
                Ptr.PtrSelectCible = Obj;
        }
    }
    Cible.AfficherListe(false);
}
function CIBLE_Activer(Id, Etat)
{
    if(Id == ""){return(-1);}
    if(parseInt(Id) < 0){return(-1);}
    if(CIBLE_DATA[Id].Groupe)
    {
        for(let y = 0;y < CIBLE_DATA[Id].TabGroupe.length;y++)
        {
            let OK = Etat;
            if(Etat && (CIBLE_DATA[Id].TabGroupe[y].Nb == 0))
            {
                OK = false;
            }
            Bouton.Activer(CIBLE_DATA[Id].TabGroupe[y].PtrMoins, OK);
        }
    }
    else
    {
        CIBLE_DATA[Id].PtrSelectCible.disabled = !Etat;
    }
    if(Id == Perso.Actif)
    {
        let Tab = (Cible.Active + "-0").split("-");
        CIBLE_Activer(Tab[0], Etat);
    }
}
function CIBLE_Couleur(Index, Couleur)
{
    if(CIBLE_DATA[Index].Groupe)
    {
        for(let y = 0;y < CIBLE_DATA[Index].TabGroupe.length;y++)
        {
            CouleurObjet(CIBLE_DATA[Index].TabGroupe[y].PtrNb, Couleur);
        }
        return(Nb);
    }
    else
    {
        CouleurObjet(CIBLE_DATA[Index].PtrLigne, Couleur);
    }
}
function CIBLE_Couleur(Id, Couleur)
{
    if(CIBLE_DATA[Id].Groupe)
    {
        for(let y = 0;y < CIBLE_DATA[Id].TabGroupe.length;y++)
        {
            Objet.Couleur(CIBLE_DATA[Id].TabGroupe[y].PtrNb, Couleur);
        }
    }
    else
    {
        Objet.Couleur(CIBLE_DATA[Id].PtrLigne, Couleur);
    }
}
/*********************************************************************************/
/*  Chargement de la listes des cibles
/*********************************************************************************/
function CIBLE_ChargerListe(Id)
{
    if(CIBLE_DATA[Id].Groupe)
    {   
        CIBLE_ChargerListeGroupe(Id);
    }
    else
    {
        CIBLE_ChargerListeSeul(Id);
    }
}
function CIBLE_ActualiserListeGroupe()
{
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        if(CIBLE_DATA[x].Groupe)
        {   
            CIBLE_ChargerListeGroupe(x);
        }
    }
}
function CIBLE_ChargerListeGroupe(Id)
{
    for(let x = 0;x < Perso.IndexPJ.length;x++)
    {
        if(Perso.Mort(Perso.IndexPJ[x]))
        {
            Objet.Afficher(CIBLE_DATA[Id].TabGroupe[x].PtrLigne, false);
            CIBLE_DATA[Id].Libre += CIBLE_DATA[Id].TabGroupe[x].Nb;
            CIBLE_DATA[Id].TabGroupe[x].Nb = 0;
        }
    }
    CIBLE_AfficherGroupe(Id);
}
function CIBLE_ChargerListeSeul(Id)
{
    let IdFonction = Perso.TypeFonction(Id);
    let Ptr = CIBLE_DATA[Id].PtrSelectCible;
    let AncienneCible = CIBLE_DATA[Id].Ancienne;
    Ptr.options.length = 0;

    let Chaine = Perso.Allonge(Id, !Action.Distance(Id));
    let Tab = (Chaine + "-").split("-");
    let Distance = Tab[Tab.length-2];
    let LstPerso = Carte.CiblePersonnage(Id, Distance);

    for(let y = 0;y < LstPerso.length;y++)
    {
        x = LstPerso[y][0];
        if(((IdFonction == 0) && (Perso.TypeFonction(x) != 0)) ||
            ((IdFonction != 0) && (Perso.TypeFonction(x) == 0)))
        {
            if(!Perso.Mort(x))
            {
                if(CIBLE_DATA[x].Groupe)
                {
                    let Tous = true;
                    for(let y = 0;y < Perso.IndexPJ.length;y++)
                    {
                        if(CIBLE_DATA[x].TabGroupe[y].Nb > 0)
                        {
                            Tous = false;
                        }
                    }
                    for(let y = 0;y < Perso.IndexPJ.length;y++)
                    {
                        if(Tous || (CIBLE_DATA[x].TabGroupe[y].Nb > 0))
                        {
                            let Opt = document.createElement("option");
                            Opt.value = x + "-" + y;
                            Opt.text = Perso.Lettre(x) + "." + String.fromCharCode(97+y) + " " + Perso.Nom(x);
                            if(Opt.value == AncienneCible)
                            {
                                Opt.selected = true;
                            }
                            Ptr.add(Opt);
                        }
                    }
                }
                else
                {
                    let Opt = document.createElement("option");
                    Opt.value = x;
                    Opt.text = Perso.Lettre(x) + ". " + Perso.Nom(x);
                    if(Opt.value == AncienneCible)
                    {
                        Opt.selected = true;
                    }
                    Ptr.add(Opt);
                }
            }
        }
    }

    Opt = document.createElement("option");
    Opt.text = "    ____________";
    Opt.value = "_";
    Opt.disabled = true;
    Ptr.add(Opt);

    for(let y = 0;y < LstPerso.length;y++)
    {
        x = LstPerso[y][0];
        if(((IdFonction == 0) && (PERSO_BASE[x].id_fonction == 0) && (Id != x)) ||
            ((IdFonction != 0) && (PERSO_BASE[x].id_fonction != 0) && (Id != x)))
        {
            if(!Perso.Mort(x))
            {
                let Opt = document.createElement("option");
                Opt.value = x;
                Opt.text = Perso.Lettre(x) + ". " + Perso.Nom(x);
                if(Opt.value == AncienneCible)
                {
                    Opt.selected = true;
                }
                Ptr.add(Opt);
            }
        }
    }
    Opt = document.createElement("option");
    Opt.value = Id;
    Opt.text = Perso.Lettre(Id) + ". " + Perso.Nom(Id);
    Ptr.add(Opt);

    if(Ptr.value != AncienneCible)
    {
        Ptr.value = "";
    }
    switch(Bouton.Valider.Module)
    {
        case "ACTION":
            ACTION_Attaquer(Id);
            break;
        default:
    }
}
/***********************************************************************************/
/*  Gestion de l'affichage
/***********************************************************************************/
function CIBLE_AfficherListe(Etat = false)
{
    for(let x = 0;x < CIBLE_DATA.length;x++)
    {
        let Ptr = CIBLE_DATA[x];
        switch(Perso.TypeFonction(x))
        {
            case 4:
            case 5:
            case 6:
                for(let y = 0;y < Ptr.TabGroupe.length;y++)
                {
                    Objet.Afficher(Ptr.TabGroupe[y].PtrLigne, Etat);
                }
            default:
                Objet.Afficher(Ptr.PtrLigne, Etat);
        }
    }
}
function CIBLE_AfficherGroupe(Id)
{
    let Somme = 0;
    let Libre = CIBLE_DATA[Id].Libre;
    CIBLE_DATA[Id].PtrLibre.innerHTML = Libre;
    CIBLE_DATA[Id].PtrMort.innerHTML = CIBLE_DATA[Id].Mort;
    for(let x = 0; x < CIBLE_DATA[Id].TabGroupe.length;x++)
    {
        let Obj = CIBLE_DATA[Id].TabGroupe[x]
        Obj.PtrNb.innerHTML = Obj.Nb;
        if(parseInt(Obj.Nb) == 0)
        {
            Bouton.Activer(Obj.PtrMoins, false);
        }
        else
        {
            Bouton.Activer(Obj.PtrMoins, true);
        }
        if((parseInt(Obj.Nb) == 6) || (parseInt(CIBLE_DATA[Id].Libre) == 0))
        {
            Bouton.Activer(Obj.PtrPlus, false);
        }
        else
        {
            Bouton.Activer(Obj.PtrPlus, true);
        }
        Somme += Obj.Nb;
    }
    if(parseInt(Somme + Libre) == 0)
    {
        Perso.ChangerEtat(Id, true);
    }
    switch(Bouton.Valider.Module)
    {
        case "ACTION":
        case "COMBAT":
            ACTION_Attaquer(Id);
            break;
    }
}
/*******************************************************************************************/
/*  Traitement des differentes selections
/*******************************************************************************************/
function CIBLE_Nouvelle(Obj, Id)
{
    if(Obj.value != "-1")
    {
        CIBLE_DATA[Id].Ancienne = Obj.value;
    }
    if(Perso.Actif == Id)
    {
        if(Obj.value != "-1")
        {
            let Tab = Obj.value.split("-");
            Cible.Active = Tab[0];
            Cible.Couleur(Id, 0);
        }
        else
        {
            Cible.Active = -1;
            Cible.Couleur(Id, 2);
        }
        PERSO_ActualiserListe();
        switch(Bouton.Valider.Module)
        {
            case "ACTION":
            case "ATTAQUE":
                ACTION_Attaquer(Id);
                break;
            default:
                console.info("CIBLE_Nouvelle <"+Bouton.Valider.Module+"> : "+Id);
                break;
            }
    }
}
function CIBLE_GroupePlus(x, y)
{
    let Reste = CIBLE_DATA[x].Libre;
    let Ptr = CIBLE_DATA[x].TabGroupe[y];
    if(parseInt(Reste) == 0)
    {
        console.warn("Plus aucun PNJ disponible dans le groupe de <" + Perso.Nom(x) + ">");
        Bouton.Activer(Ptr.PtrPlus, false);
        return(-1);
    }
    Reste = Ptr.Nb;
    if(parseInt(Reste) == 6)
    {
        console.warn("Le nombre maximum de PNJ pour <" + Ptr.PtrPJ.innerHTML + "> est atteint");
        Bouton.Activer(Ptr.PtrPlus, false);
        return(-1);
    }
    CIBLE_DATA[x].Libre--;
    Ptr.Nb++;
    CIBLE_ChargerListe(Perso.Actif);
    CIBLE_AfficherGroupe(x);
    return(0);
}
function CIBLE_GroupeMoins(x, y)
{
    let Reste = CIBLE_DATA[x].Libre;
    let Ptr = CIBLE_DATA[x].TabGroupe[y];
    Reste = Ptr.Nb;
    if(parseInt(Reste) == 0)
    {
        console.warn("Le nombre minimum de PNJ pour <" + Ptr.PtrPJ.innerHTML + "> est atteint");
        Bouton.Activer(Ptr.PtrMoins, false);
        return(-1);
    }
    CIBLE_DATA[x].Libre++;
    Ptr.Nb--;
    CIBLE_ChargerListe(Perso.Actif);
    CIBLE_AfficherGroupe(x);
    return(0);
}
function CIBLE_Defaut(Id)
{
    Cible.Active = -1;
    if(CIBLE_DATA[Id].Groupe){return(0);}
    if(CIBLE_DATA[Id].PtrSelectCible.length > 0)
    {
        let Retour = CIBLE_DATA[Id].PtrSelectCible.value + "-x";
        let Tab = Retour.split("-");
        if(Tab[0] != "")
        {
            if(parseInt(Tab[0]) >= 0)
            {
                Cible.Active = Tab[0];
            }
        }
    }
}
function CIBLE_Selectionne(Id)
{
    if(CIBLE_DATA[Id].Groupe)
    {
        for(let y = 0;y < CIBLE_DATA[Id].TabGroupe.length;y++)
        {
            if(CIBLE_DATA[Id].TabGroupe[y].Nb > 0)
            {
                return(Perso.IndexPJ[y]);
            }
        }
        return("");
    }
    return(CIBLE_DATA[Id].PtrSelectCible.value);
}
