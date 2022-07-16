var CodeInitDefaut  = "";

function DeInitiative()
{
    let NbErreur = 0;
    MSG.Historique("Calcul des nouvelles initiatives.", 1);
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        if(INIT_DATA[x].Valeur < 0)
        {
            let Index = INIT_DATA[x].Index;
            let NbChi = 0;
            let Bonus = parseInt(PERSO_BASE[Index].Eau) +
                        parseInt(PERSO_DATA[Index].BA.Bonus) +
                        parseInt(PERSO_DATA[Index].MalusPV);
            let Obj = document.querySelector("#TypeInit-" + Index);
            if(Obj.value != "0")
            {
                CouleurObjet(PERSO_DATA[Index].PtrLigne, -1);
                CouleurObjet(PERSO_DATA[Index].PtrLigneInit, -1);
                switch(Obj.value)
                {
                    case "A":
                        MSG.Journal(Perso.Gras(Index) + " : automatique", 1);
                        De.Lancer(Bonus);
                        INIT_DATA[x].Valeur = De.Coeficiant();
                        INIT_DATA[x].Code = De.Formater();
                        break;
                    case "I":
                        if(Init.DeDefaut == -1)
                        {
                            MSG.Journal("Calcul pour les initiatives identiques.", 1);
                            De.Lancer(Bonus);
                            Init.DeDefaut = De.Coeficiant();
                            CodeInitDefaut = De.Formater();
                        }    
                        MSG.Journal(Perso.Gras(Index) + " : Identique", 1);
                        INIT_DATA[x].Valeur = Init.DeDefaut;
                        INIT_DATA[x].Code = CodeInitDefaut;
                        break;
                    case "D0":
                        MSG.Journal(Perso.Gras(Index) + " : Double 0", 1);
                        INIT_DATA[x].Valeur = 0;
                        INIT_DATA[x].Code = "0x0";
                        NbChi = -5;
                        break;
                    case "D9":
                        NbChi++;
                    case "D8":
                        NbChi++;
                    case "D7":
                        NbChi++;
                    case "D6":
                        NbChi++;
                    case "D5":
                        NbChi++;
                    case "D4":
                        NbChi++;
                    case "D3":
                        NbChi++;
                    case "D2":
                        NbChi++;
                    case "D1":
                        NbChi++;
                        MSG.Journal(Perso.Gras(Index) + " : Double " + NbChi, 1);
                        INIT_DATA[x].Valeur = 100 + NbChi;
                        INIT_DATA[x].Code = NbChi + "x" + NbChi;
                        break;
                    case "9":
                        Bonus++;
                    case "8":
                        Bonus++;
                    case "7":
                        Bonus++;
                    case "6":
                        Bonus++;
                    case "5":
                        Bonus++;
                    case "4":
                        Bonus++;
                    case "3":
                        Bonus++;
                    case "2":
                        Bonus++;
                    case "1":
                        Bonus++;
                        MSG.Journal(Perso.Gras(Index) + " : " + Bonus, 1);
                        INIT_DATA[x].Valeur = Bonus;
                        INIT_DATA[x].Code = Bonus;
                        break;
                    default:
                        NbErreur++;
                        MSG.Erreur("DeInitiative = Initiative [" + Obj.value + "] de " + 
                                        PERSO_BASE[Index].Nom + " NON GEREE");
                        CouleurObjet(PERSO_DATA[Index].PtrLigne, -2);
                }
                BonusAvant.Utiliser(Index);
                BonusAvant.Ajouter(Index, NbChi);
            }
            else
            {
                CouleurObjet(PERSO_DATA[Index].PtrLigneInit, 2);
                NbErreur++;
            }
        }
    }
    INIT_TrierListe();
    INIT_AfficherListe();
    INIT_ActualiserListe();
    if(parseInt(NbErreur) == 0)
    {
        LancerModule("Combat");
    }
}
function JDR_ModifierListeInitialisation()
{
    for(let x = 0;x < PERSO_BASE.length;x++)
    {
        Init.CaracteristiquePersonnage(x, PERSO_BASE[x].Eau);
    }
    BonusAvant.Initialiser();
    JDR_InitialiserDE();
    JDR_InitialiserCombat();
}

//JDR_ModifierListeInitialisation();