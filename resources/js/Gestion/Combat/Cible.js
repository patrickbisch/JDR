class CIBLE_Interface{
    Active = -1;

    Initialiser(Taille) {CIBLE_Initialiser(Taille);}
    Groupe(Index) {return(CIBLE_DATA[Index].Groupe);}
    Cible(Index) {return(CIBLE_Valide(Index));}
    ModifierListe(Index) {CIBLE_ChargerListe(Index);}
    AffecterNouvelle(Index) {CIBLE_AffecterNouvelle(Index);}
    Couleur(Index, Couleur) {CIBLE_Couleur(Index, Couleur);}
    Activer(Index, Etat) {CIBLE_Active(Index, Etat);}
}
var Cible               = new CIBLE_Interface();

class CIBLE_Donnee {
    constructor() {

    }
    Groupe = false;
    PtrLigne;
    PtrSelect;
    Cible = "-1";
    TabGroupe = new Array();
    Libre = 0;
    PtrLibre;
    Mort = 0;
    PtrMort;
}
class CIBLE_Groupe {
    PtrLigne;
    PtrMoins;
    PtrPlus;
    PtrNb;
    PtrPJ;
    Nb=0;
}
var CIBLE_DATA          = new Array();

function CIBLE_Initialiser(Taille)
{
    let PJ_Liste  = new Array();
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        if(PERSO_BASE[x].id_fonction == 0)
        {
            PJ_Liste.push(PERSO_BASE[x].Nom);
        }
    }

    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new CIBLE_Donnee();
        Ptr.Groupe = false;
        Ptr.PtrLigne = document.querySelector("#LigneCible-" + x);

        switch(parseInt(PERSO_BASE[x].id_fonction))
        {
            case 4:
            case 5:
            case 6:
                Ptr.Groupe = true;
                Ptr.Libre = PERSO_BASE[x].NbPNJ;
                Ptr.PtrLibre = document.querySelector("#Libre-" + x);
                Ptr.PtrLibre.innerHTML = Ptr.Libre;
                Ptr.Mort = 0;
                Ptr.PtrMort = document.querySelector("#Mort-" + x);
                Ptr.PtrMort.innerHTML = 0;
                for(let y = 0;y < PJ_Liste.length;y++)
                {
                    let PtrGrp = new CIBLE_Groupe();
                    let Obj = document.querySelector("#LignePV-" + x + "-" + y);
                    PtrGrp.PtrLigne = Obj;

                    Obj = document.querySelector("#PJ-" + x + "-" + y);
                    Obj.innerHTML = Obj.innerHTML + " " + PJ_Liste[y];
                    PtrGrp.PtrPJ = Obj;

                    Obj = document.querySelector("#Nb-" + x + "-" + y);
                    Obj.innerHTML = 0;
                    PtrGrp.PtrNb = Obj;

                    Obj = document.querySelector("#Moins-" + x + "-" + y);
                    ActiverBouton(Obj, false);
                    Obj.addEventListener('click', function(e){
                        e.preventDefault();
                        CIBLE_GroupeMoins(x, y);
                    });
                    PtrGrp.PtrMoins = Obj;
                
                    Obj = document.querySelector("#Plus-" + x + "-" + y);
                    ActiverBouton(Obj, true);
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
                Ptr.PtrSelect = Obj;
        }
        CIBLE_DATA.push(Ptr);
    }
}
function CIBLE_GroupePlus(x, y)
{
    let Reste = CIBLE_DATA[x].Libre;
    let Ptr = CIBLE_DATA[x].TabGroupe[y];
    if(parseInt(Reste) == 0)
    {
        console.warn("Plus aucun PNJ disponible dans le groupe de <" + Perso.Nom(x) + ">");
        ActiverBouton(Ptr.PtrPlus, false);
        return(-1);
    }
    Reste = Ptr.Nb;
    if(parseInt(Reste) == 6)
    {
        console.warn("Le nombre maximum de PNJ pour <" + Ptr.PtrPJ.innerHTML + "> est atteint");
        ActiverBouton(Ptr.PtrPlus, false);
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
        ActiverBouton(Ptr.PtrMoins, false);
        return(-1);
    }
    CIBLE_DATA[x].Libre++;
    Ptr.Nb--;
    CIBLE_ChargerListe(Perso.Actif);
    CIBLE_AfficherGroupe(x);
    return(0);
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
            ActiverBouton(Obj.PtrMoins, false);
        }
        else
        {
            ActiverBouton(Obj.PtrMoins, true);
        }
        if((parseInt(Obj.Nb) == 6) || (parseInt(CIBLE_DATA[Id].Libre) == 0))
        {
            ActiverBouton(Obj.PtrPlus, false);
        }
        else
        {
            ActiverBouton(Obj.PtrPlus, true);
        }
        Somme += Obj.Nb;
    }
    if(parseInt(Somme + Libre) == 0)
    {
        Perso.ChangerEtat(Id, true);
    }
    switch(Gestion.Phase)
    {
        case "ACTION":
        case "COMBAT":
            ACTION_Attaquer(Id, "CIBLE");
            break;
    }
}
function CIBLE_Nouvelle(Ptr, Id)
{
    CIBLE_DATA[Id].Cible = Ptr.value;
    if(Perso.Actif == Id)
    {
        CIBLE_AffecterNouvelle(Id);
        PERSO_VisualiserListe("PNJ", SavSensFleche[0]);
        PERSO_VisualiserListe("PJ", SavSensFleche[1]);
        switch(Gestion.Phase)
        {
            case "COMBAT":
            case "ACTION":
                if(parseInt(Cible.Active) >= 0)
                {
                    MSG.Journal("Nouvelle cible : " + Perso.Gras(Cible.Active), 1);
                }
                else
                {
                    MSG.Journal("Aucune cible.", 1);
                }
                ACTION_Attaquer(Id, "CIBLE");
                break;
            default:
                MSG.Erreur("CIBLE_Nouvelle = Phase [" + Gestion.Phase + "] NON GEREE !");
        }
    }
}
function CIBLE_AffecterNouvelle(Id)
{
    let Chaine = CIBLE_DATA[Id].Cible;
    let Tab = Chaine.split("-");
    Cible.Active = Tab[0];
}
function CIBLE_ChargerListe(Id)
{
    if(Id < 0)
    {
        return(0);
    }
    if(CIBLE_DATA[Id].Groupe)
    {
        for(let x = 0;x < Perso.IndexPJ.length;x++)
        {
            if(Perso.Mort(Perso.IndexPJ[x]))
            {
                AfficherObjet(CIBLE_DATA[Id].TabGroupe[x].PtrLigne, false);
                CIBLE_DATA[Id].Libre += CIBLE_DATA[Id].TabGroupe[x].Nb;
                CIBLE_DATA[Id].TabGroupe[x].Nb = 0;
            }
        }
        CIBLE_AfficherGroupe(Id);
        return(0);
    }

    let IdFonction = PERSO_BASE[Id].id_fonction;
    let Ptr = CIBLE_DATA[Id].PtrSelect;
    Ptr.options.length = 0;
    let AncienCible = CIBLE_DATA[Id].Cible;
    CIBLE_DATA[Id].Cible = "-1";

    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        if(((IdFonction == 0) && (PERSO_BASE[x].id_fonction != 0)) ||
            ((IdFonction != 0) && (PERSO_BASE[x].id_fonction == 0)))
        {
            if(!Perso.Mort(x))
            {
                if(CIBLE_DATA[x].Groupe)
                {
                    let Tous = true;
                    for(let y = 0;y < Perso.NbPJ;y++)
                    {
                        if(CIBLE_DATA[x].TabGroupe[y].Nb > 0)
                        {
                            Tous = false;
                        }
                    }
                    for(let y = 0;y < Perso.NbPJ;y++)
                    {
                        if(Tous || (CIBLE_DATA[x].TabGroupe[y].Nb > 0))
                        {
                            let Opt = document.createElement("option");
                            Opt.value = x + "-" + y;
                            Opt.text = Perso.Lettre(x) + "." + String.fromCharCode(97+y) + " " + Perso.Nom(x);
                            Ptr.add(Opt);
                            if(Opt.value == AncienCible)
                            {
                                CIBLE_DATA[Id].Cible = AncienCible;
                            }
                        }
                    }
                }
                else
                {
                    let Opt = document.createElement("option");
                    Opt.value = x;
                    Opt.text = Perso.Lettre(x) + ". " + Perso.Nom(x);
                    Ptr.add(Opt);
                    if(Opt.value == AncienCible)
                    {
                        CIBLE_DATA[Id].Cible = AncienCible;
                    }
                }
            }
        }
    }

    Opt = document.createElement("option");
    Opt.text = "    ____________";
    Opt.value = "";
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
                if(Opt.value == AncienCible)
                {
                    CIBLE_DATA[Id].Cible = AncienCible;
                }
            }
        }
    }
    Opt = document.createElement("option");
    Opt.value = Id;
    Opt.text = Perso.Lettre(Id) + ". " + Perso.Nom(Id);
    Ptr.add(Opt);
    if(Opt.value == AncienCible)
    {
        CIBLE_DATA[Id].Cible = AncienCible;
    }

    Opt = document.createElement("option");
    Opt.text = "";
    Opt.value = "-1";
    Opt.selected = true;
    Ptr.add(Opt);

    Ptr.value = CIBLE_DATA[Id].Cible;
    if(CIBLE_DATA[Id].Cible != AncienCible)
    {
        ACTION_Attaquer(Id, "CIBLE");
    }
}
function CIBLE_Valide(Index)
{
    if(CIBLE_DATA[Index].Groupe)
    {
        let Nb = -1;
        for(let y = 0;y < CIBLE_DATA[Index].TabGroupe.length;y++)
        {
            Nb += CIBLE_DATA[Index].TabGroupe[y].Nb;
        }
        return(Nb);
    }
    else
    {
        return(CIBLE_DATA[Index].Cible);
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
function CIBLE_Active(Index, Etat = false)
{
    if(!CIBLE_DATA[Index].Groupe)
    {
        CIBLE_DATA[Index].PtrSelect.disabled = !Etat;
    }
}