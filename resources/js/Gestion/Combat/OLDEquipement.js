class EQUIP_Interface  {
    Demarrer() {EQUIP_Demarrer();}
    AfficherListeArme(Etat) {EQUIP_AfficherListe(0, Etat);}
    AfficherListeArmure(Etat) {EQUIP_AfficherListe(1, Etat);}
    AfficherListeBouclier(Etat) {EQUIP_AfficherListe(2, Etat);}
    Activer(Index, Etat) {EQUIP_Activer(Index, Etat);}
    ArmeSelectionne(Index) {return(EQUIP_DATA[Index].Equipement[0].PtrSelect.value);}
    ChoisirArmePrincipale(Index) {EQUIP_SelectionnerObjet(Index, 0, 0)}
    CouleurArme(Index, Couleur) {CouleurObjet(EQUIP_DATA[Index].Equipement[0].PtrLigne, Couleur);}
    BouclierSelectionne(Index) {return(EQUIP_DATA[Index].Equipement[2].PtrSelect.value);}
    Protection(Index) {return(EQUIP_Protection(Index));}
}
var Equip = new EQUIP_Interface();
var EQUIP_DATA = new Array();

class EQUIP_Objet{
    PtrLigne;
    PtrLabel;
    PtrSelect;
    //Indice = -1;
    Etat = false;
}
class EQUIP_Donnee{
    Equipement = new Array();
}

function EQUIP_Demarrer()
{
    ArreterModule();
    Gestion.NouvellePhase("EQUIP");
    MSG.Message("Initialisation de l'équipement.", true);
    AfficherBouton("LancerDe", false);
    AfficherBouton("BtnValider", true);
    AfficherListeObjetID(".Ligne", true);
    AfficherListeObjetID(".Initiative", false);
    EQUIP_Initialiser();
    EQUIP_AfficherInventaire();
    EQUIP_TesterObjet(EQUIP_RetournerErreur());
    Perso.InitialiserNombreAction();

    MSG.Message("Définissez le matériel <strong> en main</strong> avant le premièr tour des <strong>PNJ</Strong> et <strong>PJ</strong>, puis validez en cliquant sur le bouton");
    
    console.warn("EQUIP_Demarrer <<ACTIVATION BOUTON>>");
    EQUIP_TesterObjet(0);    
}
function EQUIP_InitialisationTermine()
{
    EQUIP_TesterObjet();
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            if(EQUIP_DATA[x].Equipement[y].PtrSelect.options.length > 0)
            {
                if(EQUIP_DATA[x].Equipement[y].PtrSelect.value == "-2")
                {
                    EQUIP_DATA[x].Equipement[y].PtrSelect.value = "-1";
                }
                EQUIP_DATA[x].Equipement[y].PtrSelect.options.remove(0);
                EQUIP_DATA[x].Equipement[y].PtrSelect.disabled = true;
                CouleurObjet(EQUIP_DATA[x].Equipement[y].PtrLigne, 0);
            }
        }
    }
    LancerModule("Initialisation");
}
function EQUIP_Activer(Index, Etat)
{
    if(EQUIP_DATA[Index].Equipement.length > 0)
    {
        EQUIP_DATA[Index].Equipement[0].PtrSelect.disabled = !Etat;
    }
    if(EQUIP_DATA[Index].Equipement.length > 2)
    {
        EQUIP_DATA[Index].Equipement[2].PtrSelect.disabled = !Etat;
    }
}
function EQUIP_InitialiserObjet(Id, Code)
{
    let Ptr = new EQUIP_Objet();
    Ptr.PtrLigne = document.querySelector("#" + Code[0] + "-" + Id);
    Ptr.PtrLabel = document.querySelector("#" + Code[1] + "-" + Id);
    Ptr.PtrLabel.innerHTML = "";
    Ptr.PtrSelect = document.querySelector("#" + Code[2] + "-" + Id);
    return(Ptr);
}
function EQUIP_Initialiser()
{
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        let Ptr = new EQUIP_Donnee();
        Obj = EQUIP_InitialiserObjet(x, ["LigneArme", "Arme", "TypeArme"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneArmure", "Armure", "TypeArmure"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneBouclier", "Bouclier", "TypeBouclier"]);
        Ptr.Equipement.push(Obj);

        EQUIP_DATA.push(Ptr);
        EQUIP_InitialiserSelect(x, PERSO_BASE[x].Armes, 0);
        EQUIP_InitialiserSelect(x, PERSO_BASE[x].Armures, 1);
        EQUIP_InitialiserSelect(x, PERSO_BASE[x].Boucliers, 2);

        EQUIP_DATA[x].Equipement[0].PtrSelect.addEventListener('change', function(){
            EQUIP_NouveauObjet(EQUIP_DATA[x].Equipement[0].PtrSelect, x, 0);
        });
        EQUIP_DATA[x].Equipement[1].PtrSelect.addEventListener('change', function(){
            EQUIP_NouveauObjet(EQUIP_DATA[x].Equipement[1].PtrSelect, x, 1);
        });
        EQUIP_DATA[x].Equipement[2].PtrSelect.addEventListener('change', function(){
            EQUIP_NouveauObjet(EQUIP_DATA[x].Equipement[2].PtrSelect, x, 2);
        });
    }
}
function EQUIP_InitialiserSelect(x, Tab, Id)
{
    let Ptr = EQUIP_DATA[x].Equipement[Id];
    if(Tab.length > 0)
    {
        var Opt = document.createElement("option");
        switch(parseInt(Id))
        {
            case 2:
                Opt.text = "Aucun";
                break;
            default:
                Opt.text = "Aucune";
        }
        Opt.value = "-2";
        Ptr.PtrSelect.add(Opt);

        for(let y = 0;y < Tab.length;y++)
        {
            Opt = document.createElement("option");
            Opt.text = Tab[y].Nom;
            Opt.value = y;
            Ptr.PtrSelect.add(Opt);
        }
    
        Opt = document.createElement("option");
        Opt.text = "";
        Opt.value = "-1";
        Opt.disabled = true;
        Ptr.PtrSelect.add(Opt);

        Ptr.PtrSelect.value = 0;
        if((parseInt(Id) == 0) && (parseInt(PERSO_BASE[x].id_fonction) == 0))
        {
            Ptr.PtrSelect.value = "-2";
        }
        else
        {
            if(Tab.length > 1)
            {
                Ptr.PtrSelect.value = "-1";
                CouleurObjet(Ptr.PtrLigne,2);
            }
        }
        Ptr.Etat = true;
        EQUIP_NouveauObjet(Ptr.PtrSelect, x, Id);
    }
    else
    {
        Ptr.Etat = false;
    }
}
function EQUIP_AfficherInventaire()
{
    for(let x = 0;x < EQUIP_DATA[0].Equipement.length;x++)
    {
        EQUIP_AfficherListe(x);
    }
}
function EQUIP_AfficherListe(Id, Etat = true)
{
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        let Ptr = EQUIP_DATA[x].Equipement[Id];
        AfficherObjet(Ptr.PtrLigne, Ptr.Etat && Etat);
    }    
}
function EQUIP_SelectionnerObjet(Id, Index, x)
{
    EQUIP_DATA[Id].Equipement[x].PtrSelect.value = Index;
    EQUIP_NouveauObjet(EQUIP_DATA[Id].Equipement[x].PtrSelect, Id, x);
}
function EQUIP_NouveauObjet(Obj, Id, x)
{
    let Nb = Obj.value;
    switch(parseInt(Nb))
    {
        case -1:
            EQUIP_Commentaire(Id, Nb+">"+x+">"+Gestion.Phase);
            CouleurObjet(EQUIP_DATA[Id].Equipement[x].PtrLigne, 2);
            EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = "";
            EQUIP_TesterObjet(1);
            break;
        case -2:
            EQUIP_Commentaire(Id, Nb+">"+x+">"+Gestion.Phase);
            CouleurObjet(EQUIP_DATA[Id].Equipement[x].PtrLigne, 0);
            EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = "";
            EQUIP_TesterObjet(EQUIP_RetournerErreur());
            break;
        default:
            CouleurObjet(EQUIP_DATA[Id].Equipement[x].PtrLigne, 0);
            switch(parseInt(x))
            {
                case 0:
                    switch(Gestion.Phase)
                    {
                        case "EQUIP":
                            MSG.Historique(Perso.Gras(Id) + " change d'arme : <strong>" + 
                                            PERSO_BASE[Id].Armes[Nb].Nom + "</strong>.", 1);
                            break;
                        default:
                            MSG.Journal("Nouvelle arme : <strong>" + 
                                            PERSO_BASE[Id].Armes[Nb].Nom + "</strong>.", 1);
                            break;
                    }
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = PERSO_BASE[Id].Armes[Nb].Degat;
                    if(PERSO_BASE[Id].Armes[Nb].DeuxMains)
                    {
                        if(EQUIP_DATA[Id].Equipement[2].PtrSelect.value != "-2")
                        {
                            EQUIP_DATA[Id].Equipement[2].PtrSelect.value = -1;
                            EQUIP_DATA[Id].Equipement[2].PtrLabel.innerHTML = "";
                            if(Gestion.Phase == "EQUIP")
                            {
                                CouleurObjet(EQUIP_DATA[Id].Equipement[2].PtrLigne, 2);
                            }
                        }
                    }
                    PERSO_BASE[Id].Armes[Nb].Quantite = PERSO_BASE[Id].Armes[Nb].QuantiteMaxi;
                    break;
                case 1:
                    switch(Gestion.Phase)
                    {
                        case "EQUIP":
                            MSG.Historique(Perso.Gras(Id) + " change d'armure : <strong>" + 
                                    PERSO_BASE[Id].Armures[Nb].Nom + "</strong>.", 1);
                            break;
                        default:
                            MSG.Journal("Nouvelle armure : <strong>" + 
                                    PERSO_BASE[Id].Armures[Nb].Nom + "</strong>.", 1);
                            break;
                    }
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = PERSO_BASE[Id].Armures[Nb].Protection;
                    break;
                default:
                    switch(Gestion.Phase)
                    {
                        case "EQUIP":
                            MSG.Historique(Perso.Gras(Id) + " change de bouclier : <strong>" +
                                        PERSO_BASE[Id].Boucliers[Nb].Nom + "</strong>.", 1);
                            break;
                        default:
                            MSG.Journal("Nouveau bouclier : <strong>" +
                                        PERSO_BASE[Id].Boucliers[Nb].Nom + "</strong>.", 1);
                            break;
                    }
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML =  PERSO_BASE[Id].Boucliers[Nb].Protection;
                    Nb = EQUIP_DATA[Id].Equipement[0].PtrSelect.value;
                    if(parseInt(Nb) >= 0)
                    {
                        if(PERSO_BASE[Id].Armes[Nb].DeuxMains)
                        {
                            EQUIP_DATA[Id].Equipement[0].PtrSelect.value = -1;
                            EQUIP_DATA[Id].Equipement[0].PtrLabel.innerHTML = "";
                            CouleurObjet(EQUIP_DATA[Id].Equipement[0].PtrLigne, 2);
                        }
                    }
            }
            EQUIP_TesterObjet(EQUIP_RetournerErreur());
    }
    if(parseInt(x) == 0)
    {
        if(parseInt(Nb) < 0)
        {
            Perso.AffecterNombreAction(Id, PERSO_BASE[Id].Eau + 1);
        }
        else
        {
            if(parseInt(PERSO_BASE[Id].Armes[Nb].MaitriseCC) == 0)
            {
                Perso.AffecterNombreAction(Id, PERSO_BASE[Id].Armes[Nb].MaitriseD + 1);
            }
            else
            {
                Perso.AffecterNombreAction(Id, PERSO_BASE[Id].Armes[Nb].MaitriseCC + 1);
            }
        }
    }
}
function EQUIP_Commentaire(Id, Cmds)
{
    switch(Cmds)
    {
        case "-1>0>EQUIP":
            MSG.Historique(Perso.Gras(Id) + " a retiré son arme.", 1);
            break;
        case "-2>0>EQUIP":
            MSG.Historique(Perso.Gras(Id) + " n'a aucune arme.", 1);
            break;
        case "-1>1>EQUIP":
            MSG.Historique(Perso.Gras(Id) + " a retiré son armure.", 1);
            break;
        case "-2>1>EQUIP":
            MSG.Historique(Perso.Gras(Id) + " n'a aucune armure.", 1);
            break;
        case "-1>2>EQUIP":
            MSG.Historique(Perso.Gras(Id) + " a retiré son bouclier.", 1);
            break;
        case "-2>2>EQUIP":
            MSG.Historique(Perso.Gras(Id) + " n'a aucun bouclier.", 1);
            break;
        default:
            MSG.Erreur("EQUIP_Commentaire = Requete [" + Cmds + "] NON GEREE !");
    }
}
function EQUIP_TesterObjet(Erreur = 1)
{
    if(Gestion.Phase == "EQUIP")
    {
        if(Erreur == 0)
        {
            ActiverBouton("BtnValider", true);
        }
        else
        {
            ActiverBouton("BtnValider", false);
        }
    }
}
function EQUIP_RetournerErreur()
{
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            if((EQUIP_DATA[x].Equipement[y].Etat) && (EQUIP_DATA[x].Equipement[y].PtrSelect.value == "-1"))
            {
                return(1);
            }
        }
    }
    return(0);
}
function EQUIP_Protection(Index)
{
    let Retour = 0;
    let CA = EQUIP_DATA[Index].Equipement[1].PtrLabel.innerHTML;
    if(CA != "")
    {
        Retour += parseInt(CA);
    }
    CA = EQUIP_DATA[Index].Equipement[2].PtrLabel.innerHTML;
    if(CA != "")
    {
        Retour += parseInt(CA);
    }
    return(Retour);
}