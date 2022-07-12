







/*******************************************************************************/
/*  Affiche le nombre d'action d'un personnage
/*******************************************************************************/
function AfficherEtatPersonnage(Index)
{
    let Etat = 0;
    if(LstPerso[Index].Mort == 1)
    {
        Etat = -2;
    }
    else
    {
        if(LstPerso[Index].NbAction == 0)
        {
            Etat = -1;
        }
        else
        {
            if(parseInt(InitActive) >= 0)
            {
                if(LstInit[InitActive].Index == Index)
                {
                    Etat = 1;
                }
            }
        }
    }
    ActiverObjet(LstPerso[Index].PtrLigne, Etat);
    return(Etat);
}
/*******************************************************************************/
/*  Affiche le nombre d'action d'un personnage
/*******************************************************************************/
function AfficherNombreAction(Index)
{
    let Ptr = document.querySelector("#NbAction-" + Index);
    Ptr.innerHTML = LstPerso[Index].NbAction + "/" + LstPerso[Index].NbActionMaxi;
    AfficherEtatPersonnage(Index);
}
function AfficherCHI(Index, Bonus = 0)
{
    let Ptr = document.querySelector("#CHI-" + Index);
    LstPerso[Index].Chi += Bonus;
    if(parseInt(LstPerso[Index].Chi) > parseInt(LstTalent[Index]["CHI"].Valeur))
    {
        LstPerso[Index].Chi = LstTalent[Index]["CHI"].Valeur;
    }
    Ptr.innerHTML = LstPerso[Index].Chi;
    if(LstPerso[Index].Chi == "0")
    {
        Ptr.style.backgroundColor = "tomato";
    }
    else
    {
        Ptr.style.backgroundColor = "transparent";
    }
}
/*******************************************************************/
/*  Gestion des boutons du formulaire
/*  LancerDe, ouvrir et fermer les listes deroulantes (PNJ, PJ et Init)
/*******************************************************************/
function ActiverBoutonPtr(Ptr, Etat)
{
    if(Etat)
    {
        Ptr.disabled = false;
        Ptr.style.opacity = "1";
    }
    else
    {
        Ptr.disabled = true;
        Ptr.style.opacity = "0.3";
    }
}
function ActiverBoutonID(Code, Etat)
{
    let Ptr = document.querySelector("#" + Code);
    if(Ptr != null)
    {
        ActiverBoutonPtr(Ptr, Etat);
    }
}
/*******************************************************************************/
/*  Initialise l'etat de tous les boutons
/*******************************************************************************/
function InitialiserEtatBouton()
{
    let LstObj = document.querySelectorAll(".Bouton");
    for(let x = 0; x < LstObj.length; x++)
    {
        let Ptr = LstObj[x];
        ActiverBoutonPtr(Ptr, false);
        switch(Ptr.id)
        {
            case 'LancerDe':
                Ptr.addEventListener('click', function(e){
                    e.preventDefault();
                    LancerDe();
                });
                break;
            case 'PNJ-Bas':
            case 'PNJ-Haut':
            case 'PJ-Bas':
            case 'PJ-Haut':
            case 'Init-Bas':
            case 'Init-Haut':
                Ptr.addEventListener('click', function(e){
                    e.preventDefault();
                    ChangerEtatListe(Ptr.id);
                });
                break;
        }
    }
}
/*******************************************************************************/
/*  Traitement du lancer de dé
/*******************************************************************************/
function LancerDe()
{
    switch(PhaseActive)
    {
        case "PhaseInit":
            LancerTouteInitiative();
            break;
        case "PhaseCombat":
            NouveauPersonnageActif();
            break;
        case "PhaseTouche":
            ExecuterTouche(LstInit[InitActive].Index, "A");
            break;
        default:
            console.log("LancerDe : "+PhaseActive);
        }
}
/*******************************************************************************/
/*  Traitement des boutons des listes (PNJ, PJ et INIT)
/*******************************************************************************/
function ChangerEtatListe(Code)
{
    let Tab = Code.split("-");
    var x;
    switch(Tab[0])
    {
        case "PNJ":
            x = 0;
            break;
        case "PJ":
            x = 1;
            break;
        case "Init":
            x = 2;
            break;
        default:
            return(-1);
    }
    FlecheHaute[x] = !FlecheHaute[x];
    ActiverBoutonID(Tab[0] + "-Bas", !FlecheHaute[x]);
    ActiverBoutonID(Tab[0] + "-Haut", FlecheHaute[x]);
    switch(Tab[0])
    {
        case "PNJ":
        case "PJ":
            AfficherListePersonnage();
            break;
        case "Init":
            AfficherListeInitiative();
            break;
    }
}
function AfficherListePersonnage()
{
    let Etat = [false, false, false, false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, false, false, false];
    var Nb = -1;
    if(InitActive >= 0)
    {
        Nb = LstInit[InitActive].Index;
    }
    if(Nb >= 0)
    {
        Etat[Nb] = true;
        if(LstPerso[Nb].Cible == "-2")
        {
            for(let y = PremierPJ; y < LstPerso.length; y++)
            {
                let Ptr = document.querySelector("#Nb-" + Nb + "-" + (y - PremierPJ));
                if(Ptr.innerHTML != "0")
                {
                    Etat[y] = true;
                }
            }
        }
        else
        {
            if(LstPerso[Nb].Cible != "-1")
            {
                let Tab = LstPerso[Nb].Cible.split("-");
                Etat[Tab[0]] = true;
            }
        }
    }
    for(let x = 0; x < LstPerso.length; x++)
    {
        LstPerso[x].Etat = AfficherEtatPersonnage(x);
        if(x < PremierPJ)
        {
            AfficherObjet(LstPerso[x].PtrLigne, (Etat[x] || FlecheHaute[0]));
        }
        else
        {
            AfficherObjet(LstPerso[x].PtrLigne, (Etat[x] || FlecheHaute[1]));
        }
    }
}
function AfficherListeInitiative()
{
    for(let x = 0; x < LstInit.length; x++)
    {
        let Ptr = document.querySelector("#Init-" + x);
        ActiverObjet(Ptr, LstPerso[LstInit[x].Index].Etat);
        if(x == InitActive)
        {
            AfficherObjet(Ptr);
        }
        else
        {
            AfficherObjet(Ptr, FlecheHaute[2]);
        }
    }
}
function NouveauPersonnageActif()
{
    if(InitActive >= 0)
    {
        let Nb = LstInit[InitActive].Index;
        AfficherNombreAction(Nb);
        AfficherLigneAttaque(Nb);
    }
    InitActive = PersonnageActif(InitActive);
    AfficherListePersonnage();
    AfficherListeInitiative();
    if(InitActive >= 0)
    {
        let Nb = LstInit[InitActive].Index
        AfficherLigneAttaque(Nb, 1);
    }
}
function PersonnageActif(Index)
{
    for(let x = Index+1; x < LstInit.length; x++)
    {
        if(LstPerso[LstInit[x].Index].Etat >= 0)
        {
            return(x);
        }
    }
    for(let x = 0; x < LstInit.length; x++)
    {
        if(LstPerso[LstInit[x].Index].Etat >= 0)
        {
            return(x);
        }
    }
    return(-1);
}
function AfficherLigneAttaque(Index, Phase = 0)
{
    switch(parseInt(Phase))
    {
        case 1:
            PhaseActive = "PhaseAction";
            document.querySelector("#Action-" + Index).value = "";
            AfficherObjetID("LigneAction-" + Index, true);
            AfficherObjetID("LigneDefense-" + Index, false);
            ActiverBoutonID("LancerDe", false);
            break;
        case 2:
            PhaseActive = "PhaseTouche";
            AfficherObjetID("LigneArme-" + Index, true);
            AfficherObjetID("LigneTypeAttaque-" + Index, true);
            AfficherObjetID("LigneAction-" + Index, false);
            let Jet = document.querySelector("#JetAttaque-" + Index)
            if(Index < PremierPJ)
            {
                Jet.value = "A";
            }
            else
            {
                Jet.value = "";
            }
            let Ptr = document.querySelector("#Cible-" + Index);
            if(Ptr != null)
            {
                if(Ptr.value == "")
                {
                    Jet.disabled = true;
                    Ptr.style.backgroundColor = "tomato";
                }
            }
            if(Jet.value == "A")
            {
                ActiverBoutonID("LancerDe", !Jet.disabled);
            }
            break;
        case 3 :


            break;
        default:
            AfficherObjetID("LigneAction-" + Index, false);
            AfficherObjetID("LigneArme-" + Index, false);
            AfficherObjetID("LigneTypeAttaque-" + Index, false);
            AfficherObjetID("LigneDefense-" + Index, true);
    }
}

InitialiserEtatBouton();
