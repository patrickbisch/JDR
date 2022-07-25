class CIBLE_Interface  {
    Active = -1;
    Initialiser(Taille) {CIBLE_Initialiser(Taille);}
    AfficherListe(Etat) {CIBLE_AfficherListe(Etat);}
    Afficher(Id, Etat) {Objet.Afficher(CIBLE_DATA[Id].PtrLigne, Etat);}
    Activer(Id, Etat) {CIBLE_Activer(Id, Etat);}
    Couleur(Id, Code) {Objet.Couleur(CIBLE_DATA[Id].PtrLigne, Code);}
    Selectionne(Id) {return(CIBLE_DATA[Id].PtrSelectCible.value);}
    Recharger(Id) {CIBLE_ChargerListe(Id);}
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
    if(!CIBLE_DATA[Id].Groupe)
    {
        CIBLE_DATA[Id].PtrSelectCible.disabled = !Etat
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
    let AncienCible = Ptr.value;
    Ptr.options.length = 0;

    for(let x = 0;x < PERSO_BASE.length;x++)
    {
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
                            Ptr.add(Opt);
                        }
                    }
                }
                else
                {
                    let Opt = document.createElement("option");
                    Opt.value = x;
                    Opt.text = Perso.Lettre(x) + ". " + Perso.Nom(x);
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

    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(((IdFonction == 0) && (PERSO_BASE[x].id_fonction == 0) && (Id != x)) ||
            ((IdFonction != 0) && (PERSO_BASE[x].id_fonction != 0) && (Id != x)))
        {
            if(!Perso.Mort(x))
            {
                let Opt = document.createElement("option");
                Opt.value = x;
                Opt.text = Perso.Lettre(x) + ". " + Perso.Nom(x);
                Opt.selected = true;
                Ptr.add(Opt);
            }
        }
    }
    Opt = document.createElement("option");
    Opt.value = Id;
    Opt.text = Perso.Lettre(Id) + ". " + Perso.Nom(Id);
    Ptr.add(Opt);

    Opt = document.createElement("option");
    Opt.text = "";
    Opt.value = "-1";
    Opt.selected = true;
    Opt.disabled = true;
    //Ptr.add(Opt);

    Ptr.value = AncienCible;
    if(Ptr.value == "")
    {
        Ptr.value = "-1";
    }
    switch(Bouton.Valider.Module)
    {
        case "ACTION":
            ACTION_Attaquer(Id);
            break;
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
        console.debug("CIBLE_Nouvelle : "+Id+"/"+Bouton.Valider.Module);
        switch(Bouton.Valider.Module)
        {
            case "ACTION":
                ACTION_Attaquer(Id);
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
