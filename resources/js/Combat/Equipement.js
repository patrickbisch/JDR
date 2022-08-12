class EQUIP_Interface  {
    Initialiser(Taille) {EQUIP_Initialiser(Taille);}
    Personnage() {EQUIP_EquiperPersonnage();}
    AfficherListe(Etat) {EQUIP_AfficherListe(Etat);}
    Activer(Index, Etat) {EQUIP_Activer(Index, Etat);}
    AffecterArme(Id, IdArme) {return(EQUIP_Affecter(Id, 0, IdArme));}
    AfficherArmureNaturelle(Id) {EQUIP_ArmureNaturelle(Id);}
    ArmeSelectionne(Index) {return(EQUIP_DATA[Index].Equipement[0].PtrSelect.value);}
    BouclierSelectionne(Index) {return(EQUIP_DATA[Index].Equipement[2].PtrSelect.value);}
    CouleurArme(Index, Couleur) {Objet.Couleur(EQUIP_DATA[Index].Equipement[0].PtrLigne, Couleur);}
    ChoisirArmePrincipale(Index, GererBouton) {return(EQUIP_Affecter(Index, 0, 0, GererBouton));}
    Protection(Index) {return(EQUIP_Protection(Index));}
}
var Equipement = new EQUIP_Interface();
let EQUIP_DATA = new Array();

class EQUIP_Objet{
    PtrLigne;
    PtrLabel;
    PtrSelect;
    Etat = false;
}
class EQUIP_Donnee{
    Equipement = new Array();
}
/*********************************************************************************************/
/*  Lancement de la phase EQUIPEMENT
/*********************************************************************************************/
function EQUIP_EquiperPersonnage()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal();
    MSG.Message("Gestion de l'equipement des personnage.", true);
    MSG.Journal("Gestion de l'equipement.");
    Perso.Actif = -1;
    Init.EtatBouton(false, false);
    Perso.Liste[0].Etat = false;
    Perso.Liste[1].Etat = false;
    Perso.Liste[0].Valide = false;
    Perso.Liste[1].Valide = false;
    JDR_AfficherDE(-1);
    Equipement.AfficherListe(true);
    PERSO_ActualiserListe();
    BonusAvant.AfficherListe(true);
    Tao.AfficherListe("EQUIP");
    Bouton.Valider.Demarrer("EQUIP");
/*********************************************************************************************/
/*********************************************************************************************/
EQUIP_ControlerAffectation();
EQUIP_Affecter(0, 0, 1);
EQUIP_Affecter(0, 1, 0);
EQUIP_Affecter(0, 2, -2);
EQUIP_Affecter(1, 0, 0);
EQUIP_Affecter(3, 0, 0);
EQUIP_Affecter(3, 2, -2);
EQUIP_Affecter(9, 0, 1);
EQUIP_Affecter(9, 1, 0);
EQUIP_Affecter(9, 2, -2);
EQUIP_Affecter(10, 1, 2);
EQUIP_Affecter(13, 1, 1);
EQUIP_Affecter(13, 2, -2);
/*********************************************************************************************/
/*********************************************************************************************/
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        if(PERSO_DATA[x].Vigilant)
        {
            if(parseInt(EQUIP_DATA[x].Equipement[0].PtrSelect.value) < 0)
            {
                EQUIP_Affecter(x, 0, 0);
            }
        }
    }
    EQUIP_ControlerAffectation();
    MSG.Message("Affecter l'equipement, puis <strong>validez</strong>.");
}
/*********************************************************************************************/
/*  Initialisation du module
/*********************************************************************************************/
function EQUIP_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'équipement.", 1);
    Bouton.Valider.Module = "EQUIP";
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new EQUIP_Donnee();
        Obj = EQUIP_InitialiserObjet(x, ["LigneArme", "Arme", "TypeArme"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneArmure", "Armure", "TypeArmure"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneBouclier", "Bouclier", "TypeBouclier"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneANaturel", "ANaturel", "TypeANaturel"]);
        Ptr.Equipement.push(Obj);

        EQUIP_DATA.push(Ptr);
        EQUIP_InitialiserSelect(x, Perso.Base(x).Armes, 0);
        EQUIP_InitialiserSelect(x, Perso.Base(x).Armures, 1);
        EQUIP_InitialiserSelect(x, Perso.Base(x).Boucliers, 2);
        EQUIP_InitialiserArmureNaturelle(x);

        EQUIP_DATA[x].Equipement[0].PtrSelect.addEventListener('change', function(){
            EQUIP_ObjetModifie(EQUIP_DATA[x].Equipement[0].PtrSelect, x, 0);
        });
        EQUIP_DATA[x].Equipement[1].PtrSelect.addEventListener('change', function(){
            EQUIP_ObjetModifie(EQUIP_DATA[x].Equipement[1].PtrSelect, x, 1);
        });
        EQUIP_DATA[x].Equipement[2].PtrSelect.addEventListener('change', function(){
            EQUIP_ObjetModifie(EQUIP_DATA[x].Equipement[2].PtrSelect, x, 2);
        });
    }
    Equipement.AfficherListe(false);
}
function EQUIP_InitialiserObjet(Id, Code)
{
    let Ptr = new EQUIP_Objet();
    Ptr.PtrLigne = document.querySelector("#" + Code[0] + "-" + Id);
    Ptr.PtrLabel = document.querySelector("#" + Code[1] + "-" + Id);
    Ptr.PtrLabel.innerHTML = "";
    Ptr.PtrSelect = document.querySelector("#" + Code[2] + "-" + Id);
    Ptr.Etat = true;
    return(Ptr);
}
/*********************************************************************************************/
/*  Initialisation de l'equipement des personnages
/*********************************************************************************************/
function EQUIP_CreerChoix(Valeur, Id)
{
    let Opt = document.createElement("option");
    Opt.value = Valeur;
    switch(parseInt(Id))
    {
        case 0:
        case 1:
            Opt.text = "Aucune";
            break;
        case 2:
            Opt.text = "Aucun";
            break;
        default:
            Opt.text = "";
            Opt.disabled = true;
    }
    return(Opt);
}
function EQUIP_InitialiserSelect(x, Tab, Id)
{
    let Ptr = EQUIP_DATA[x].Equipement[Id];
    if(Tab.length > 0)
    {

        for(let y = 0;y < Tab.length;y++)
        {
            let Opt = document.createElement("option");
            Opt.text = Tab[y].Nom;
            Opt.value = y;
            Ptr.PtrSelect.add(Opt);
        }

        Ptr.PtrSelect.add(EQUIP_CreerChoix(-2, Id));
        Ptr.PtrSelect.add(EQUIP_CreerChoix(-1, -1));
    
        Ptr.PtrSelect.value = 0;
        if((parseInt(Id) == 0) && (Perso.TypeFonction(x) == 0))
        {
            Ptr.PtrSelect.value = -2;
        }
        else
        {
            if(Tab.length > 1)
            {
                Ptr.PtrSelect.value = -1;
            }
        }
        Ptr.Etat = true;
        EQUIP_NouveauObjet(Ptr.PtrSelect, x, Id);
    }
    else
    {
        Ptr.PtrSelect.value = -1;
        Ptr.Etat = false;
    }
}
function EQUIP_InitialiserArmureNaturelle(Id)
{
    let Ptr = EQUIP_DATA[Id].Equipement[3];
    Ptr.PtrLabel.innerHTML = "0";
    let Opt = document.createElement("option");
    Opt.text = "Armure naturelle";
    Opt.value = 0;
    Opt.disabled = true;
    Opt.selected = true;
    Ptr.PtrSelect.add(Opt);
    Ptr.PtrSelect.disabled = true;
    Ptr.Etat = false;
    EQUIP_ArmureNaturelle(Id);
}
function EQUIP_ArmureNaturelle(Id)
{
    let Ptr = EQUIP_DATA[Id].Equipement[3]
    Ptr.PtrLabel.innerHTML = Perso.Base(Id).ArmureNaturelle;
    if(Perso.Base(Id).ArmureNaturelle == 0)
    {
        Ptr.Etat = false;
        Objet.Afficher(Ptr.PtrLigne, Ptr.Etat);
    }
    else
    {
        Ptr.Etat = true;
        switch(Bouton.Phase)
        {
            case "INIT":
                break;
            default:
                Objet.Afficher(Ptr.PtrLigne, Ptr.Etat);
                break;
        }
    }
}
/**************************************************************************************/
/*  Validation d'un nouveau objet
/**************************************************************************************/
function EQUIP_ObjetModifie(Obj, Id, x)
{
    EQUIP_NouveauObjet(Obj, Id, x)
    EQUIP_ControlerAffectation();
}
function EQUIP_Affecter(Id, Type, Indice, GererBouton)
{
    let Ptr = EQUIP_DATA[Id].Equipement[Type].PtrSelect;
    Ptr.value = Indice;
    EQUIP_NouveauObjet(Ptr, Id, Type);
    return(EQUIP_ControlerAffectation(GererBouton));
}
function EQUIP_NouveauObjet(Obj, Id, x)
{
    let Nb = Obj.value;
    if(Obj.value == ""){Nb = -2;}
    let Mode = Bouton.Valider.Module;
    switch(parseInt(Nb))
    {
        case -1:
            EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = "0";
            break;
        case -2:
            EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = "0";
            EQUIP_Commentaire(Id, Mode + "/" + x + "/-2");
            break;
        default:
            switch(parseInt(x))
            {
                case 0:
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = Perso.Base(Id).Armes[Nb].Degat;
                    EQUIP_Commentaire(Id, Mode + "/" + x, Perso.Base(Id).Armes[Nb].Nom);
                    if(Perso.Base(Id).Armes[Nb].DeuxMains)
                    {
                        if(EQUIP_DATA[Id].Equipement[2].PtrSelect.value != -2)
                        {
                            EQUIP_DATA[Id].Equipement[2].PtrSelect.value = -1;
                            EQUIP_DATA[Id].Equipement[2].PtrLabel.innerHTML = "0";
                        }
                    }
                    Perso.Base(Id).Armes[Nb].Quantite = Perso.Base(Id).Armes[Nb].QuantiteMaxi;
                    break;
                case 1:
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = Perso.Base(Id).Armures[Nb].Protection;
                    EQUIP_Commentaire(Id, Mode + "/" + x, Perso.Base(Id).Armures[Nb].Nom);
                    break;
                case 2:
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML =  Perso.Base(Id).Boucliers[Nb].Protection;
                    EQUIP_Commentaire(Id, Mode + "/" + x, Perso.Base(Id).Boucliers[Nb].Nom);
                    Nb = EQUIP_DATA[Id].Equipement[0].PtrSelect.value;
                    if(parseInt(Nb) >= 0)
                    {
                        if(Perso.Base(Id).Armes[Nb].DeuxMains)
                        {
                            EQUIP_DATA[Id].Equipement[0].PtrSelect.value = -1;
                            EQUIP_DATA[Id].Equipement[0].PtrLabel.innerHTML = "0";
                        }
                    }
                    break;
                default:
                    MSG.Erreur("EQUIPE : " + x + " NON GERE");
                    break;
            }
    }
    if(parseInt(x) == 0)
    {
        if(parseInt(Nb) < 0)
        {
            Perso.AffecterNombreAction(Id, Perso.Base(Id).Eau + 1);
        }
        else
        {
            if(parseInt(Perso.Base(Id).Armes[Nb].MaitriseCC) == 0)
            {
                Perso.AffecterNombreAction(Id, Perso.Base(Id).Armes[Nb].MaitriseD + 1);
            }
            else
            {
                Perso.AffecterNombreAction(Id, Perso.Base(Id).Armes[Nb].MaitriseCC + 1);
            }
        }
    }
}
/**************************************************************************************/
/*  Ajout de commentaire deans le journaux et historique
/**************************************************************************************/
function EQUIP_Commentaire(Id, Cmds, Nom)
{
    switch(Cmds)
    {
        case "EQUIP/0/-2":
        case "INIT/0/-2":
            MSG.Historique(Perso.Gras(Id) + " n'a aucune arme.", 1);
            MSG.Journal(Perso.Gras(Id), 1);
            MSG.Journal("n'a aucune arme.", 2);
            break;
        case "ACTION/0/-2":
            MSG.Historique("n'a aucune arme.", 1);
            MSG.Journal("n'a aucune arme.", 1);
            break;
        case "EQUIP/1/-2":
        case "INIT/1/-2":
            MSG.Historique(Perso.Gras(Id) + " n'a aucune armure.", 1);
            MSG.Journal(Perso.Gras(Id), 1);
            MSG.Journal("n'a aucune armure.", 2);
            break;
        case "ACTION/1/-2":
            MSG.Historique("n'a aucune armure.", 1);
            MSG.Journal("n'a aucune armure.", 1);
            break;
        case "EQUIP/2/-2":
        case "INIT/2/-2":
            MSG.Historique(Perso.Gras(Id) + " n'a aucun bouclier.", 1);
            MSG.Journal(Perso.Gras(Id), 1);
            MSG.Journal("n'a aucun bouclier.", 2);
            break;
        case "ACTION/2/-2":
            MSG.Historique("n'a aucun bouclier.", 1);
            MSG.Journal("n'a aucun bouclier.", 1);
            break;
        case "EQUIP/0":
        case "INIT/0":
            MSG.Historique(Perso.Gras(Id) + " s'equipe avec : <strong>" + Nom + "</strong>", 1);
            MSG.Journal(Perso.Gras(Id), 1);
            MSG.Journal("s'equipe avec : <strong>" + Nom + "</strong>", 2);
            break;
        case "ACTION/0":
            MSG.Historique("s'equipe avec : <strong>" + Nom + "</strong>", 1);
            MSG.Journal("s'equipe avec : <strong>" + Nom + "</strong>", 1);
            break;
        case "EQUIP/1":
        case "INIT/1":
            MSG.Historique(Perso.Gras(Id) + " s'equipe avec : <strong>" + Nom + "</strong>", 1);
            MSG.Journal(Perso.Gras(Id), 1);
            MSG.Journal("s'equipe avec : <strong>" + Nom + "</strong>", 2);
            break;
        case "ACTION/1":
            MSG.Historique("s'equipe avec : <strong>" + Nom + "</strong>", 1);
            MSG.Journal("s'equipe avec : <strong>" + Nom + "</strong>", 1);
            break;
        case "EQUIP/2":
        case "INIT/2":
            MSG.Historique(Perso.Gras(Id) + " s'equipe avec : <strong>" + Nom + "</strong>", 1);
            MSG.Journal(Perso.Gras(Id), 1);
            MSG.Journal("s'equipe avec : <strong>" + Nom + "</strong>", 2);
            break;
        case "ACTION/2":
            MSG.Historique("s'equipe avec : <strong>" + Nom + "</strong>", 1);
            MSG.Journal("s'equipe avec : <strong>" + Nom + "</strong>", 1);
            break;
        default:
            MSG.Erreur("EQUIP_Commentaire = Requete [" + Cmds + "] NON GEREE !");
    }
}
/**************************************************************************************/
/*  Affichage du detail de l'eqsuipement
/**************************************************************************************/
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
function EQUIP_AfficherListe(Etat = false)
{
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            let Ptr = EQUIP_DATA[x].Equipement[y];
            Objet.Afficher(Ptr.PtrLigne, Ptr.Etat && Etat);
            if(Bouton.Valider.Module == "EQUIP")
            {
                Ptr.PtrSelect.disabled = false;
            }
            else
            {
                Ptr.PtrSelect.disabled = true;
            }
        }
    }
}
function EQUIP_ControlerAffectation(GererBouton = true)
{
    let Erreur = false;
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            let Ptr = EQUIP_DATA[x].Equipement[y];
            if(Ptr.PtrSelect.value == "-1")
            {
                Objet.Couleur(Ptr.PtrLigne, 2);
                Erreur = true;
            }
            else
            {
                Objet.Couleur(Ptr.PtrLigne, 0);
            }
        }
    }
    if(GererBouton)
    {
        Bouton.Valider.Activer(!Erreur);
    }
    return(Erreur);
}
function EQUIP_ValiderDE()
{
    Mode = "AUTRE";
    Moteur.LancerModule("CARTOGRAPHIE");
}
function EQUIP_Protection(Id)
{
    let Retour = parseInt(Perso.Base(Id).ArmureNaturelle) + parseInt(PERSO_DATA[Id].BonusProtection);
    let Nb = EQUIP_DATA[Id].Equipement[1].PtrSelect.value;
    if(parseInt(Nb) >= 0)
    {
        let Ptr = Perso.Armure(Id, Nb);
        Retour += parseInt(Ptr.Protection);
    }
    Nb = EQUIP_DATA[Id].Equipement[2].PtrSelect.value;
    if(parseInt(Nb) >= 0)
    {
        let Ptr = Perso.Bouclier(Id, Nb);
        Retour += parseInt(Ptr.Protection);
    }
    return(Retour);
}