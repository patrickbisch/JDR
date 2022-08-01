class TAO_Interface  {
    Initialiser(Taille) {TAO_Initialiser(Taille);}
    AfficherListe(Module, AvecYinYang) {TAO_AfficherListe(Module, AvecYinYang);}
    Afficher(Id, Module, AvecYinYang) {TAO_Afficher(Id, Module, AvecYinYang);}
    Termine(Id, IdTao, Bonus, AvecYinYang) {TAO_Termine(Id, IdTao, Bonus, AvecYinYang);}
}
var Tao  = new TAO_Interface ();
class TAO_Donnee {
    PtrLigne;
    PtrSelect;
    PtrSelectBonus;
    TabBonus = new Array();
    Etat = false;
}
let TAO_DATA     = new Array();
/******************************************************************************************/
/*  Initialisation du module
/******************************************************************************************/
function TAO_Initialiser(Taille)
{
    MSG.Historique("Initialisation des TAOS.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new TAO_Donnee();
        TAO_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneTao-" + x);

        Ptr.TabBonus = TAO_InitialiserBonusMaxi(x);
        Ptr.PtrSelect = document.querySelector("#Tao-" + x);
        Ptr.PtrSelect.addEventListener('change', function(){
                        TAO_Nouveau(Ptr.PtrSelect, x);    
        });
    
        let Obj = document.querySelector("#BonusTao-" + x);
        Obj.addEventListener('change', function(){
                        TAO_NouveauBonus(Obj, x);    
        });
        Obj.disabled = true;
        Ptr.PtrSelectBonus = Obj;
        if(Perso.Base(x).Taos.length > 0)
        {
            Ptr.Etat = true;
        }
        else
        {
            Ptr.Etat = false;
        }
    }
    TAO_AfficherListe("");
}
function TAO_InitialiserBonusMaxi(Id)
{
    let Tab = new Array();
    for(let x = 0;x < PERSO_BASE[Id].Taos.length;x++)
    {
        let Maxi = PERSO_BASE[Id].Taos[x].cout.split("/");
        if(PERSO_BASE[Id].Taos[x].niveau > 0)
        {
            Maxi.splice(PERSO_BASE[Id].Taos[x].niveau,6);
        }
        Tab.push([PERSO_BASE[Id].Taos[x].id, Maxi]);
    }
    return(Tab);
}
function TAO_InitialiserSelect(Id, Indice, AvecYinYang)
{
    let Ptr = TAO_DATA[Id].PtrSelect;
    Ptr.options.length = 0;
    let Opt = document.createElement("option");
    Opt.text = "TAOS";
    Opt.value = "";
    Opt.disabled = true;
    Ptr.add(Opt);

    let Tab = TAO_ChargerTable(Id, Indice, AvecYinYang);
    TAO_TrierTable(Indice, Tab);
    for(let x = 0;x < Tab.length;x++)
    {
        let Opt = document.createElement("option");
        if(Tab[x].pere == 0)
        {
            Opt.text = Tab[x].nom;
            Opt.disabled = true;
        }
        else
        {
            Opt.text = Tab[x].nom + " (" + TAO_FormaterBonusMaxi(Id, Tab[x].id_tao) + ")";
        }
        Opt.value = Tab[x].id_tao;

        Ptr.add(Opt);
    }
}
/******************************************************************************************/
/*  Outils de formatage et de gestion des taos
/******************************************************************************************/
function TAO_FormaterBonusMaxi(Id, IdTao)
{
    let Chaine = "";
    let Tab = TAO_RetournerBonusMaxi(Id, IdTao);
    for(let y = 0;y < Tab.length;y++)
    {
        if(y > 0) {Chaine += "/";}
        Chaine += Tab[y];
    }
    return(Chaine);
}
function TAO_Retourner(Id, IdTao)
{
    for(let x = 0;x < PERSO_BASE[Id].Taos.length;x++)
    {
        if(PERSO_BASE[Id].Taos[x].id_tao == IdTao)
        {
            return(PERSO_BASE[Id].Taos[x]);
        }
    }
    return(0);
}
function TAO_RetournerBonusMaxi(Id, IdTao)
{
    for(let x = 0;x < TAO_DATA[Id].TabBonus.length;x++)
    {
        if(TAO_DATA[Id].TabBonus[x][0] == IdTao)
        {
            return(TAO_DATA[Id].TabBonus[x][1]);
        }
    }
    return(new Array());
}
function TAO_ChargerTable(Id, Indice, AvecYinYang)
{
    let Tab = new Array();
    for(let x = 0;x < PERSO_BASE[Id].Taos.length;x++)
    {
        if(!PERSO_BASE[Id].Taos[x].actif)
        {
            let Ajout = false;
            switch(Indice)
            {
                case "EQUIP":
                    if(PERSO_BASE[Id].Taos[x].equipement > 0)
                    {
                        Ajout = true;
                    }
                    break;
                case "INIT":
                    if(PERSO_BASE[Id].Taos[x].initiative > 0)
                    {
                        Ajout = true;
                    }
                    break;
                case "COMBAT":
                    if(PERSO_BASE[Id].Taos[x].combat > 0)
                    {
                        switch(PERSO_BASE[Id].Taos[x].id_tao)
                        {
                            case 30:
                                if((INIT_ORDRE[0] != Id) && (Perso.NbAction(INIT_ORDRE[0]) == Perso.NbActionMaxi(INIT_ORDRE[0]))) 
                                {
                                    Ajout = true;
                                    let BE = BonusExceptionnel.Ajouter(Id);
                                    BE.IdTao = 30;
                                    BE.NbAction = 1;
                                    BE.Bonus = Indice;
                                }
                                break;
                            default:
                                Ajout = true;
                        }
                    }
                    break;
                case "ACTION":
                    if(PERSO_BASE[Id].Taos[x].action > 0)
                    {
                        Ajout = true;
                    }
                    break;
                case "ATTAQUE":
                    if(PERSO_BASE[Id].Taos[x].attaque > 0)
                    {
                        Ajout = true;
                    }
                    break;
                case "DEFENSE":
                    if(PERSO_BASE[Id].Taos[x].defense > 0)
                    {
                        Ajout = true;
                    }
                    break;
            }
            if(Ajout)
            {
                switch(PERSO_BASE[Id].Taos[x].id_tao)
                {
                    case 29:
                        if((INIT_ORDRE[0] != Id) || (Perso.NbAction(Id) != Perso.NbActionMaxi(Id))) 
                        {
                            Ajout = false;
                        }
                        break;
                }
            }
            if(Ajout && !AvecYinYang)
            {
                switch(PERSO_BASE[Id].Taos[x].id_tao)
                {
                    case 68:
                    case 69:
                    case 70:
                    case 71:
                    case 72:
                    case 73:
                    case 74:
                        Ajout = false;
                        break;
                }
            }
            if(Ajout)
            {
                Tab.push(PERSO_BASE[Id].Taos[x]);
            }
        }
    }
    return(Tab);
}
function TAO_TrierTable(Indice, Tab)
{
    for(let x = 0;x < Tab.length;x++)
    {
        let Fini = true;
        for(let y = 1;y < Tab.length;y++)
        {
            switch(Indice)
            {
                case "EQUIP":
                    if(Tab[y].equipement < Tab[y-1].equipement)
                    {
                        let Tmp = Tab[y];
                        Tab[y] = Tab[y-1];
                        Tab[y-1] = Tmp;
                        Fini = false;
                    }
                    break;
                case "INIT":
                    if(Tab[y].initiative < Tab[y-1].initiative)
                    {
                        let Tmp = Tab[y];
                        Tab[y] = Tab[y-1];
                        Tab[y-1] = Tmp;
                        Fini = false;
                    }
                    break;
                case "COMBAT":
                    if(Tab[y].combat < Tab[y-1].combat)
                    {
                        let Tmp = Tab[y];
                        Tab[y] = Tab[y-1];
                        Tab[y-1] = Tmp;
                        Fini = false;
                    }
                    break;
                case "ACTION":
                    if(Tab[y].combat < Tab[y-1].combat)
                    {
                        let Tmp = Tab[y];
                        Tab[y] = Tab[y-1];
                        Tab[y-1] = Tmp;
                        Fini = false;
                    }
                    break;
                case "ATTAQUE":
                    if(Tab[y].attaque < Tab[y-1].attaque)
                    {
                        let Tmp = Tab[y];
                        Tab[y] = Tab[y-1];
                        Tab[y-1] = Tmp;
                        Fini = false;
                    }
                    break;
                case "DEFENSE":
                    if(Tab[y].defense < Tab[y-1].defense)
                    {
                        let Tmp = Tab[y];
                        Tab[y] = Tab[y-1];
                        Tab[y-1] = Tmp;
                        Fini = false;
                    }
                    break;
                }
        }
        if(Fini){return(0);}
    }
}
/******************************************************************************************/
/*  Procedures d'affichage
/******************************************************************************************/
function TAO_AfficherListe(Module, AvecYinYang)
{
    for(let x = 0;x < TAO_DATA.length;x++)
    {
        TAO_Afficher(x, Module, AvecYinYang);
    }
}
function TAO_Afficher(Id, Module, AvecYinYang = true)
{
    let Ptr = TAO_DATA[Id];
    let Etat = Ptr.Etat;
    let Tab = new Array();
    if(Etat)
    {
        switch(Module)
        {
            case "":
                Etat = false;
                break;
            case "EQUIP":
            case "INIT":
            case "COMBAT":
            case "ACTION":
            case "ATTAQUE":
            case "DEFENSE":
                Tab = TAO_InitialiserSelect(Id, Module, AvecYinYang);
                break;
            default:
                MSG.Erreur("TAO_Afficher (Module : "+Module+") NON GERE");
                Etat = false;
        }
    }
    if(Etat)
    {
        if(Ptr.PtrSelect.options.length < 2) {Etat = false;}
    }
    if(Etat)
    {
        Ptr.PtrSelect.disabled = false;
        Ptr.PtrSelect.value = "";
        Ptr.PtrSelectBonus.options.length = 0;
    }
    Objet.Afficher(Ptr.PtrLigne, Etat);
}
/***************************************************************************************/
/*  Gestion des selections des TAOS
/***************************************************************************************/
function TAO_Nouveau(Obj, Id)
{
    let Ptr = TAO_DATA[Id]
    let Tab = TAO_RetournerBonusMaxi(Id, Obj.value);
    Ptr.PtrSelectBonus.options.length = 0;
    for(let x = 0;x < Tab.length;x++)
    {
        let Opt = document.createElement("option");
        Opt.text = Tab[x];
        Opt.value =Tab[x];
        Ptr.PtrSelectBonus.add(Opt);
    }
    if(Tab.length == 1)
    {
        TAO_Executer(Id, Obj.value, Tab[0]);
        Obj.value = "";
        Ptr.PtrSelectBonus.options.length = 0;
    }
    else
    {
        let Opt = document.createElement("option");
        Opt.text = "";
        Opt.value = "";
        Opt.disabled = true;
        Opt.selected = true;
        Ptr.PtrSelectBonus.add(Opt);
        Obj.disabled = true;
        Ptr.PtrSelectBonus.disabled = false
    }
}
function TAO_NouveauBonus(Obj, Id)
{
    let Cout = Obj.value;
    Obj.options.length = 0;
    Obj.disabled = true;
    let Ptr = TAO_DATA[Id].PtrSelect;
    let IdTao =  Ptr.value;
    Ptr.value = "";
    Ptr.disabled = false;
    TAO_Executer(Id, IdTao, Cout);
}
function TAO_Executer(Id, IdTao, Cout)
{
    let Commentaire = true;
    switch(parseInt(IdTao))
    {
        case 9:     //  Cuirasse de peau
            TAO_CuirasseDePeau(Id, true, 0);
            break;
        case 13:    //  Brise legere
            TAO_BriseLegere(Id, true, Cout);
            break;
        case 27:    //  Vigilance
            TAO_Vigilant(Id, true);
            break;
        case 28:    //  Rapidité
            INIT_DATA[Id].BonusMagie = Cout;
            break;
        case 29:    //  Vitesse d'execution
            ACTION_Ajouter(-1);
            break;
        case 30:    //  Anticipation
            TAO_PremierPersonnage(Id);
            break;
        case 34:    //  Defense renforcee
            TAO_DefenseRenforce(Id, true, Cout);
            break;
        case 35:    //  Defense CHI
            TAO_DefenseCHI(Id, true, Cout);
            break;
        case 36:    //  Parade renforcee
            TAO_ParadeRenforce(Id, true)
            break;
        case 37:    //  Parade CHI
            TAO_ParadeCHI(Id, true);
            break;
        case 69:    //  Coup de chance
            JDR_AugmenterUnDE();
            break;
        case 70:    //  Controle des energies
            JDR_InverserDE();
            break;
        case 71:    //  Contorle des flux
            JDR_AugmenterDeuxDE();
            break;
        default:
            MSG.Erreur("Le TAO [" + IdTao + "] N'EST PAS GERE.");
            return(-1);
    }
    BonusAvant.Ajouter(Id, -1 * Cout);
    if(Commentaire)
    {
        TAO_Commentaire(Id, IdTao, Cout, true);
    }
    TAO_SupprimerOption(Id, IdTao);
    if(TAO_DATA[Id].PtrSelect.options.length < 2)
    {
        Objet.Afficher(TAO_DATA[Id].PtrLigne, false);
    }
}
function TAO_Termine(Id, IdTao, Bonus)
{
    let Commentaire = true;
    switch(parseInt(IdTao))
    {
        case 9:
            TAO_CuirasseDePeau(Id, false, Bonus);
            break;
        case 13:
            TAO_BriseLegere(Id, false, Bonus);
            Commentaire = false;
            break;
        case 30:
            TAO_Afficher(Id, Bonus);
            Commentaire = false;
            break;
        case 34:
            TAO_DefenseRenforce(Id, false, Bonus);
            Commentaire = false;
            break;
        case 35:
            TAO_DefenseCHI(Id, false, Bonus);
            break;
        case 36:
            TAO_ParadeRenforce(Id, false);
            Commentaire = false;
            break;
        case 37:
            TAO_ParadeCHI(Id, false);
            Commentaire = false;
            break;
        default:
            MSG.Erreur("Le TAO [" + IdTao + "] (terminé) N'EST PAS GERE.");
            return(-1);
    }
    if(Commentaire)
    {
        TAO_Commentaire(Id, IdTao, 0, false);
    }
    let Obj = TAO_Retourner(Id, IdTao);
    Obj.actif = false;
}
function TAO_SupprimerOption(Id, IdTao)
{
    let Ptr = TAO_DATA[Id].PtrSelect;
    for(let x = 0;x < Ptr.options.length;x++)
    {
        if(Ptr.options[x].value == IdTao)
        {
            Ptr.options.remove(x);
            return(0);
        }
    }
}
function TAO_Commentaire(Id, IdTao, Cout, Debut = true)
{
    let Obj = TAO_Retourner(Id, IdTao);
    if(Debut)
    {
        MSG.Historique(Perso.Gras(Id) + " utilise le Tao : <strong>" + Obj.nom + "</strong> (" + Cout + ")", 1);
    }
    else
    {
        MSG.Historique(Perso.Gras(Id) + " le Tao <strong>" + Obj.nom + "</strong> terminé", 1);
    }
    if(Debut)
    {
        switch(Bouton.Valider.Module)
        {
            case "COMBAT":
                MSG.Journal(Perso.Gras(Id) + " Tao : <strong>" + Obj.nom + "</strong> (" + Cout + ")", 2);
                break;
            case "INIT":
            case "EQUIP":
                MSG.Journal(Perso.Gras(Id), 1);
            default:
                MSG.Journal("Tao : <strong>" + Obj.nom + "</strong> (" + Cout + ")", 2);
        }
    }
    else
    {
        MSG.Journal(Perso.Gras(Id), 1);
        MSG.Journal("Tao : <strong>" + Obj.nom + "</strong> terminé", 2);
    }
}
/************************************************************************************/
/*  Traitement des differents TAOS
/************************************************************************************/
function TAO_CuirasseDePeau(Id, Ajout, Bonus)
{
    let Obj = TAO_Retourner(Id, 9);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.Bonus = Perso.Base(Id).Metal;
        Perso.Base(Id).ArmureNaturelle += Ptr.Bonus;
        Ptr.IdTao = 9;
        Ptr.NbTour = Obj.niveau;
        Obj.actif = true;
    }
    else
    {
        Obj.actif = false;
        Perso.Base(Id).ArmureNaturelle -= Bonus;
    }
    Equipement.AfficherArmureNaturelle(Id);
}
function TAO_Vigilant(Id, Ajout)
{
    let Obj = TAO_Retourner(Id, 27);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.IdTao = 27;
        Ptr.NbHeure = Perso.Base(Id).Bois;
        Obj.actif = true;
        PERSO_DATA[Id].Vigilant = true;
        if(EQUIP_DATA[Id].Equipement[0].PtrSelect.value < 0)
        {
            Equipement.AffecterArme(Id, 0);
        }
    }
    else
    {
        Obj.actif = false;
        PERSO_DATA[Id].Vigilant = false;
    }
}
function TAO_PremierPersonnage(Id)
{
    if(Perso.Actif >= 0)
    {
        Action.Afficher(Perso.Actif, false);
    }
    Perso.Actif = -1;
    Cible.Active = -1
    Init.Actif = -1;
    INIT_DATA[Id].Valeur = parseInt(2000);
    INIT_Trier();
    Moteur.LancerModule("Nouveau Personnage");
}
function TAO_DefenseCHI(Id, Ajout, Cout)
{
    let Obj = TAO_Retourner(Id, 35);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.IdTao = 35;
        Ptr.NbPasse = 1;
        Ptr.Bonus = Cout;
        Obj.actif = true;
        DefensePassive.Ajout(Id, Cout);
        if(Id == Cible.Active)
        {
            Defense.NouvelleDefensePassive(Id);
        }
    }
    else
    {
        Obj.actif = false;
        DefensePassive.Ajout(Id, -Cout);
    }
}
function TAO_DefenseRenforce(Id, Ajout, Cout)
{
    let Obj = TAO_Retourner(Id, 34);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.IdTao = 34;
        Ptr.NbAction = 1;
        Ptr.Bonus = Cout;
        Obj.actif = true;
        PERSO_DATA[Id].BonusProtection = Cout;
    }
    else
    {
        Obj.actif = false;
        PERSO_DATA[Id].BonusProtection = 0;
    }
}
function TAO_ParadeRenforce(Id, Ajout)
{
    let Obj = TAO_Retourner(Id, 36);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.IdTao = 36;
        Ptr.NbAction = 1;
        Ptr.Bonus = PERSO_BASE[Id].Bois;
        Obj.actif = true;
        PERSO_DATA[Id].BonusDefense = Ptr.Bonus;
    }
    else
    {
        Obj.actif = false;
        PERSO_DATA[Id].BonusDefense = 0;
    }
}
function TAO_ParadeCHI(Id, Ajout)
{
    let Obj = TAO_Retourner(Id, 37);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.IdTao = 37;
        Ptr.NbAction = 1;
        Obj.actif = true;
        TD_DATA[Id].DefenseGratuite = true;
        Defense.InitialiserSelection(Id);
    }
    else
    {
        Obj.actif = false;
        TD_DATA[Id].DefenseGratuite = false;
    }
}
function TAO_BriseLegere(Id, Ajout, Cout)
{
    let Obj = TAO_Retourner(Id, 13);
    if(Ajout)
    {
        let Ptr = BonusExceptionnel.Ajouter(Id);
        Ptr.IdTao = 13;
        Ptr.NbAction = 1;
        Ptr.Bonus = Cout;
        Obj.actif = true;
        PERSO_DATA[Id].BonusDegat = Cout;
    }
    else
    {
        Obj.actif = false;
        PERSO_DATA[Id].BonusDegat = 0;
    }
}