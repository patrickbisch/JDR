var LstBtn          = new Array();



var SavSensFleche   = ["","",""];
/*******************************************************************/
/*  Gestion pour le lancer de DE
/*******************************************************************/
function LancerDe()
{
    switch(Gestion.Phase)
    {
        case "INIT":
            DeInitiative();
            PERSO_VisualiserListeActif("PNJ",SavSensFleche[0]);
            PERSO_VisualiserListeActif("PJ",SavSensFleche[1]);
            break;
        default:
            MSG.Erreur("LancerDe = Phase de tour [" + Gestion.Phase + "] INCONNUE !!");
    }
}
/*******************************************************************/
/*  Gestion pour la validation
/*******************************************************************/
function ValiderDe()
{
    switch(Gestion.Phase)
    {
        case "EQUIP":
            EQUIP_InitialisationTermine();
            break;
        case "ACTION":
            ACTION_Valider();
            break;
        case "DEFENSE":
            JDR_DefenseValider();
            break;
        default:
            MSG.Erreur("ValiderDe = Phase de tour [" + Gestion.Phase + "] INCONNUE !!");
    }
}
/*******************************************************************/
/*  Gestion des boutons "Fleche"
/*******************************************************************/
function ActiverFleche(Bouton, Sens)
{
    let Ptr = LstBtn[Bouton + "-" + Sens];
    ActiverBouton(Ptr, false);
    if(Sens == "Bas")
    {
        Ptr =  LstBtn[Bouton + "-Haut"];
        ActiverBouton(Ptr , true);
    }
    else
    {
        Ptr =  LstBtn[Bouton + "-Bas"];
        ActiverBouton(Ptr, true);
    }
    switch(Bouton)
    {
        case "PNJ":
            SavSensFleche[0] = Sens;
            break;
        case "PJ":
            SavSensFleche[1] = Sens;
            break;
        case "Init":
            SavSensFleche[2] = Sens;
            break;
    }
    switch(Gestion.Phase)
    {
        case "INIT":
            PERSO_VisualiserListeActif(Bouton,Sens);
            break;
        case "COMBAT":
        case "ACTION":
        case "DEFENSE":
            if(Bouton != "Init")
            {
                PERSO_VisualiserListe(Bouton,Sens);
            }
            else
            {
                INIT_VisualiserListe(Sens);
            }
            break;
        default:
            MSG.Erreur("ActiverFleche = Phase de tour [" + Gestion.Phase + "] INCONNUE !!");
    }
}
function ActiverBoutonID(Code, Etat = true)
{
    console.warn("ActiverBoutonID : " + Code + "/" + Etat);
    let Ptr = document.querySelector("#" + Code);
    ActiverBouton(Ptr, Etat);
    return(Ptr);
}
function ActiverListeBouton(Etat = false)
{
    LstBtn.forEach(function(Ptr) {ActiverBouton(Ptr,Etat);});
}
function InitialiserBoutonMenuHaut()
{
    let Bouton = [  "PNJ-Bas", "PNJ-Haut",
                    "PJ-Bas", "PJ-Haut",
                    "Init-Bas", "Init-Haut",
                    "LancerDe", "BtnValider", 
                    "Histo-Bas", "Histo-Haut",
                    "Journal-Bas", "Journal-Haut",
                    ];

    for(let x = 0;x < Bouton.length;x++)
    {
        InitialiserBouton(Bouton[x]);
    }
}
function InitialiserBouton(Chaine)
{
    let Tab = Chaine.split("-");
    let Ptr = document.querySelector("#" + Chaine);
    switch(Chaine)
    {
        case "LancerDe":
            Ptr.addEventListener('click', function(e){
                e.preventDefault();
                LancerDe();
            });
            ActiverBouton(Ptr, false);
            break;
        case "BtnValider":
            Ptr.addEventListener('click', function(e){
                e.preventDefault();
                ValiderDe();
            });
            ActiverBouton(Ptr, false);
            break;
        default:
            MSG.Erreur("InitialisationBouton = [" + Chaine + "] INCONNU !");
            return(-1);
    }
    AjouterBouton(Chaine, Ptr);
    return(1);
}

//InitialiserBoutonMenuHaut();
