class INIT_Interface  {
    Initialiser(Taille) {INIT_Initialiser(Taille);}
    NouveauTour() {INIT_NouveauTour();}
    AfficherListe(Etat) {OBJET_AfficherListe(INIT_DATA, Etat);}
}
var Initiative = new INIT_Interface();
let INIT_DATA = new Array();

class INIT_Donnee{
    PtrLigne;
    PtrSelectInit;
    Valeur = 0;
    Etat = false;
}
let AncienDE = new Array(2);
var TOTO = 0;

function INIT_Initialiser(Taille)
{
    MSG.Historique("Initialisation de l'initiative.",1)
    for(let x = 0; x < Taille; x++)
    {
        let Ptr = new INIT_Donnee();
        INIT_DATA.push(Ptr);
        Ptr.PtrLigne = document.querySelector("#LigneInit-" + x);
        let Obj = document.querySelector("#TypeInit-" + x);
        Obj.addEventListener('change', function(){
                        INIT_Jet(Obj, x);    
        });
        Ptr.PtrSelectInit = Obj;
        switch(Perso.TypeFonction(x))
        {
            case 0:
            case 7:
                JDR_InitialiserSelectJet(Obj);
                break
            default:
                JDR_InitialiserSelectJet(Obj, 1);
                break;
        }

        Ptr.Etat = true;
    }
    Initiative.AfficherListe(false);
}
function INIT_NouveauTour()
{
    Moteur.ArreterModule();
    MSG.ViderHistorique();
    MSG.ViderJournal();
    MSG.Message("Nouveau tour d'initiative.", true);
    MSG.Journal("Nouveau tour d'initiative.");
    console.debug(AncienDE);
    AncienDE[0] = -1;
    AncienDE[1] = -1;
    console.debug(AncienDE);
    Initiative.AfficherListe(true);
    BonusAvant.AfficherListe(true);
    PV.AfficherListe(true);
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        PERSO_DATA[x].Bloque = PERSO_DATA[x].Mort;
        PERSO_DATA[x].Afficher = !PERSO_DATA[x].Mort;
        if(Perso.TypeFonction(x) == 0)
        {
            INIT_DATA[x].PtrSelectInit.value = "";
        }
        INIT_DATA[x].Valeur = -1;
    }
    Perso.Actif = -1;
    Perso.Liste[0].Etat = false;
    Perso.Liste[1].Etat = false;
    Perso.Liste[0].Valide = false;
    Perso.Liste[1].Valide = false;
    JDR_AfficherDE(-1);
    PERSO_ActualiserListe();
    INIT_TraiterDE(false);
    Bouton.Phase("INIT");
    Bouton.Afficher(BtnValider, true);
    MSG.Message("Selectionnez les initiatives des <strong>PNJ</strong> et <stong>PJ</strong>, puis <strong>validez</strong>.");
//JDR_AfficherDE(0);
}
function INIT_TraiterDE(Executer)
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        if(!PERSO_DATA[x].Bloque)
        {
            if(INIT_DATA[x].PtrSelectInit.value != "")
            {
                if(Executer)
                {
                    INIT_GererDE(x);
                    return(0);
                }
                else
                {
                    MSG.Journal(Perso.Gras(x), 1);
                    MSG.Journal(JDR_TexteValeurDE(INIT_DATA[x].PtrSelectInit.value), 2);
                }
            }
        }
    }
}
function INIT_GererDE(x)
{
    let Nb = 0;
    let Double = false;
    Ptr = INIT_DATA[x].PtrSelectInit;
    if(Ptr.value == "I")
    {
        console.debug(AncienDE);
        if(AncienDE[0] < 0)
        {
            JDR_LancerDE("A");
            AncienDE[0] = LstDE[0][1].value;
            AncienDE[1] = LstDE[1][1].value;
        }
        JDR_ValeurDE(AncienDE[0], AncienDE[1]);
        JDR_AfficherDE(0);
    }
    else
    {
        JDR_LancerDE(Ptr.value);
    }
    PERSO_DATA[x].Bloque = true;
    PERSO_DATA[x].Afficher = false;
    Ptr.disabled = true;

    return(0);
    if(Perso.BonusAvant(x).Maxi == 0)
    {
        MSG.Journal(Perso.Gras(x), 1);
        MSG.Historique(Perso.Gras(x), 1);
        if(Double)
        {
            MSG.Historique("<strong>DOUBLE "+ Nb + "</strong>",2);
            MSG.Journal("<strong>DOUBLE "+ Nb + "</strong>",2);
        }
        else
        {

        }

        PERSO_DATA[x].Bloque = true;
        PERSO_DATA[x].Afficher = false;
        Ptr.disabled = true;
        return(1);
    }
    if(Perso.Actif == x)
    {
        MSG.Historique("Initiative validée", 4);
        PERSO_DATA[x].Bloque = true;
        PERSO_DATA[x].Afficher = false;
        Perso.Actif = -1;
    }
    else
    {
        if(Perso.Actif < 0)
        {
            Perso.Actif = x;
            MSG.Message("Valider l'initiative.");
        }
    }
}
function INIT_ValiderDe()
{
    INIT_TraiterDE(true);
    PERSO_ActualiserListe();
}
function INIT_Jet(Ptr, Id)
{
    return(0);
    TOTO++;
    switch(TOTO)
    {
        case 1:
            JDR_AfficherDE(0);
            break
        case 2:
            JDR_AfficherDE(1);
            break
        case 3:
            JDR_AfficherDE(-1);
            TOTO = 0;
            break
    }
}