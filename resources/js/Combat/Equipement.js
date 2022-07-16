class EQUIP_Interface  {
    Initialiser(Taille) {EQUIP_Initialiser(Taille);}
    AfficherListe(Etat) {EQUIP_AfficherListe(Etat);}
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

function EQUIP_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'équipement.", 1);
    for(let x = 0;x < Taille;x++)
    {
        let Ptr = new EQUIP_Donnee();
        Obj = EQUIP_InitialiserObjet(x, ["LigneArme", "Arme", "TypeArme"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneArmure", "Armure", "TypeArmure"]);
        Ptr.Equipement.push(Obj);

        Obj = EQUIP_InitialiserObjet(x, ["LigneBouclier", "Bouclier", "TypeBouclier"]);
        Ptr.Equipement.push(Obj);

        EQUIP_DATA.push(Ptr);
        EQUIP_InitialiserSelect(x, Perso.Base(x).Armes, 0);
        EQUIP_InitialiserSelect(x, Perso.Base(x).Armures, 1);
        EQUIP_InitialiserSelect(x, Perso.Base(x).Boucliers, 2);

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
    EQUIP_AfficherListe(false);
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
function EQUIO_CreerChoix(Valeur, Id)
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

        Ptr.PtrSelect.add(EQUIO_CreerChoix(-2, Id));
        Ptr.PtrSelect.add(EQUIO_CreerChoix(-1, -1));
    
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
function EQUIP_ObjetModifie(Obj, Id, x)
{
    EQUIP_NouveauObjet(Obj, Id, x)
}
function EQUIP_NouveauObjet(Obj, Id, x)
{
    let Nb = Obj.value;
    switch(parseInt(Nb))
    {
        case -1:
            EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = "";
            break;
        case -2:
            EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = "";
            break;
        default:
            switch(parseInt(x))
            {
                case 0:
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = Perso.Base(Id).Armes[Nb].Degat;
                    if(Perso.Base(Id).Armes[Nb].DeuxMains)
                    {
                        if(EQUIP_DATA[Id].Equipement[2].PtrSelect.value != -2)
                        {
                            EQUIP_DATA[Id].Equipement[2].PtrSelect.value = -1;
                            EQUIP_DATA[Id].Equipement[2].PtrLabel.innerHTML = "";
                        }
                    }
                    Perso.Base(Id).Armes[Nb].Quantite = Perso.Base(Id).Armes[Nb].QuantiteMaxi;
                    break;
                case 1:
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML = Perso.Base(Id).Armures[Nb].Protection;
                    break;
                case 2:
                    EQUIP_DATA[Id].Equipement[x].PtrLabel.innerHTML =  Perso.Base(Id).Boucliers[Nb].Protection;
                    Nb = EQUIP_DATA[Id].Equipement[0].PtrSelect.value;
                    if(parseInt(Nb) >= 0)
                    {
                        if(Perso.Base(Id).Armes[Nb].DeuxMains)
                        {
                            EQUIP_DATA[Id].Equipement[0].PtrSelect.value = -1;
                            EQUIP_DATA[Id].Equipement[0].PtrLabel.innerHTML = "";
                        }
                    }
                    break;
                default:
                    MSG.Erreur("EQUIPE : "+x+" NON GERE");
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



function EQUIP_AfficherListe(Etat = false)
{
    for(let x = 0;x < EQUIP_DATA.length;x++)
    {
        for(let y = 0;y < EQUIP_DATA[x].Equipement.length;y++)
        {
            let Ptr = EQUIP_DATA[x].Equipement[y];
            Objet.Afficher(Ptr.PtrLigne, Ptr.Etat && Etat);
        }
    }
}