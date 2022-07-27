class BE_Interface  {
    Initialiser() {TE_Initialiser();}
    Ajouter(Id) {return(TE_Ajouter(Id));}
    HeureTermine() {TE_HeureTermine();}
    TourTermine() {TE_TourTermine();}
    PasseArmeTermine() {TE_PasseTermine();}
    ActionTermine() {TE_ActionTermine();}
}
var BonusExceptionnel = new BE_Interface();
let BE_DATA = new Array();

class BE_Donnee{
    IdPerso = 0;
    IdTao = 0;
    NbHeure = 0;
    NbTour = 0;
    NbPasse = 0;
    NbAction = 0;
    Bonus = 0;
}
/**************************************************************************/
/*  Initialisation du module
/**************************************************************************/
function TE_Initialiser()
{
    MSG.Historique("Initialisation des Bonus Exceptionnel.", 1);
    BE_DATA.length = 0;
}
/**************************************************************************/
/*  Ajout d'un nouveau bonus exceptionnel
/**************************************************************************/
function TE_Ajouter(Id)
{
    let Ptr = new BE_Donnee();
    Ptr.IdPerso = Id;
    BE_DATA.push(Ptr);
    return(Ptr);
}
/**************************************************************************/
/*  Traitement des fins de durée
/**************************************************************************/
function TE_HeureTermine()
{
    MSG.Historique("Fin d'une heure.");
    for(let x = BE_DATA.length - 1;x >= 0;x--)
    {
        let Ptr = BE_DATA[x];
        if(Ptr.NbHeure > 0)
        {
            Ptr.NbHeure--;
            if(Ptr.NbHeure == 0)
            {
                if(Ptr.IdTao > 0)
                {
                    Tao.Termine(Ptr.IdPerso, Ptr.IdTao, Ptr.Bonus);
                    BE_DATA.splice(x, 1);
                }
            }
        }
    }
}
function TE_TourTermine()
{
    MSG.Historique("Fin d'un tour.");
    for(let x = BE_DATA.length - 1;x >= 0;x--)
    {
        let Ptr = BE_DATA[x];
        if(Ptr.NbTour > 0)
        {
            Ptr.NbTour--;
            if(Ptr.NbTour == 0)
            {
                if(Ptr.IdTao > 0)
                {
                    Tao.Termine(Ptr.IdPerso, Ptr.IdTao, Ptr.Bonus);
                    BE_DATA.splice(x, 1);
                }
            }
        }
    }
}
function TE_PasseTermine()
{
    MSG.Historique("Fin d'une passe d'arme.");
    for(let x = BE_DATA.length - 1;x >= 0;x--)
    {
        let Ptr = BE_DATA[x];
        if(Ptr.NbPasse > 0)
        {
            Ptr.NbPasse--;
            if(Ptr.NbPasse == 0)
            {
                if(Ptr.IdTao > 0)
                {
                    Tao.Termine(Ptr.IdPerso, Ptr.IdTao, Ptr.Bonus);
                    BE_DATA.splice(x, 1);
                }
            }
        }
    }
}
function TE_ActionTermine()
{
    for(let x = BE_DATA.length - 1;x >= 0;x--)
    {
        let Ptr = BE_DATA[x];
        if(Ptr.NbAction > 0)
        {
            Ptr.NbAction--;
            if(Ptr.NbAction == 0)
            {
                if(Ptr.IdTao > 0)
                {
                    Tao.Termine(Ptr.IdPerso, Ptr.IdTao, Ptr.Bonus);
                    BE_DATA.splice(x, 1);
                }
            }
        }
    }
}