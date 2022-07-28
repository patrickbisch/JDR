//  Gestion des DE pour QIN
class RetourDE{
    Erreur = true;
    Double = false;
    Yang = 0;
    Yin = 0;
    TirageLibre = false;
}
let LstDE = new Array;
let TirageDE = new RetourDE();
function JDR_LancerDE(TypeLance = "")
{
    let Nb = 0;
    TirageDE.Erreur = false;
    TirageDE.Double = false;
    switch(TypeLance)
    {
        case "D9":
            Nb++;
        case "D8":
            Nb++;
        case "D7":
            Nb++;
        case "D6":
            Nb++;
        case "D5":
            Nb++;
        case "D4":
            Nb++;
        case "D3":
            Nb++;
        case "D2":
            Nb++;
        case "D1":
            Nb++;
        case "D0":
            JDR_ValeurDE(Nb, Nb, true);
            JDR_AfficherDE(0);
            break;
        case "A":
            TirageDE.Yang = Math.floor(Math.random() * 10);
            TirageDE.Yin = Math.floor(Math.random() * 10);
            if(TirageDE.Yang == TirageDE.Yin) {TirageDE.Double = true;}
            JDR_ValeurDE(TirageDE.Yang, TirageDE.Yin, TirageDE.Double);
            JDR_AfficherDE(0);
            break;
        case "L":
            TirageDE.TirageLibre = true;
            JDR_ValeurDE(0, 0);
            JDR_AfficherDE(1);
            Bouton.Activer(BtnValider, true);
        default:
            Bouton.Activer(BtnValider, false);
            JDR_AfficherDE(-1);
            TirageDE.Erreur = true;
    }
    return(TirageDE);
}
function JDR_InitialiserDE()
{
    LstDE = new Array([document.querySelector("#De0-0"), document.querySelector("#De0-1")],
                        [document.querySelector("#De1-0"), document.querySelector("#De1-1")],
                    );
    LstDE[0][1].addEventListener('change', function(){
        NouvelleValeurDE();    
    });
    LstDE[1][1].addEventListener('change', function(){
        NouvelleValeurDE();    
    });

    JDR_AfficherDE(-1);
}
function NouvelleValeurDE()
{
    let Double = false;
    if(LstDE[0][1].value == LstDE[1][1].value) {Double = true;}
    JDR_ValeurDE(parseInt(LstDE[0][1].value), parseInt(LstDE[1][1].value), Double);
}
function JDR_ValeurDE(Yang, Yin, JetDouble = false)
{
    TirageDE.Yang = Yang;
    TirageDE.Yin = Yin;
    TirageDE.Double = JetDouble;
    LstDE[0][0].innerHTML = Yang;
    LstDE[0][1].value = Yang;
    LstDE[1][0].innerHTML = Yin;
    LstDE[1][1].value = Yin;
}
function JDR_InverserDE()
{
    JDR_ValeurDE(TirageDE.Yin, TirageDE.Yang, TirageDE.Double);
}
function JDR_AugmenterUnDE()
{
    let Encore = !TirageDE.Double;
    if((TirageDE.Yang == 0) && (TirageDE.Yin == 0)){return(-1);}
    if(TirageDE.Yang == TirageDE.Yin){return(0);}
    let Delta = Math.abs(TirageDE.Yang - TirageDE.Yin);
    if(Delta == 9){return(0);}
    if(Delta == 1)
    {
        if((TirageDE.Yang > 2) || (TirageDE.Yin > 2))
        {
            if(TirageDE.Yang > TirageDE.Yin)
            {
                TirageDE.Yin++;
            }
            else
            {
                TirageDE.Yang++;
            }
            Encore = false;
        }
    }
    if(Encore && (TirageDE.Yang > TirageDE.Yin) && (TirageDE.Yang < 9))
    {
        TirageDE.Yang++;
        Encore = false;
    }
    if(Encore && (TirageDE.Yang == 9) && (TirageDE.Yin > 0))
    {
        TirageDE.Yin--;
        Encore = false;
    }
    if(Encore && (TirageDE.Yin < 9))
    {
        TirageDE.Yin++;
        Encore = false;
    }
    if(Encore && (TirageDE.Yang > 0))
    {
        TirageDE.Yang--;
        Encore = false;
    }
    JDR_ValeurDE(TirageDE.Yang, TirageDE.Yin, false);
}
function JDR_AugmenterDeuxDE()
{
    let Tab = new Array();
    let Somme = 0;
    let Nb = 0;
    let Calcul;
    if((TirageDE.Yang == 0) && (TirageDE.Yin == 0)){return(-1);}
    for(let x = 0;x < 5;x++)
    {
        Tab.push(new RetourDE());
        switch(x)
        {
            case 0:
                Tab[x].Yang = TirageDE.Yang + 1;
                Tab[x].Yin = TirageDE.Yin - 1;
                break;
            case 1:
                Tab[x].Yang = TirageDE.Yang - 1;
                Tab[x].Yin = TirageDE.Yin + 1;
                break;
            case 2:
                Tab[x].Yang = TirageDE.Yang + 1;
                Tab[x].Yin = TirageDE.Yin + 1;
                break;
            case 3:
                Tab[x].Yang = TirageDE.Yang - 1;
                Tab[x].Yin = TirageDE.Yin - 1;
                break;
            case 4:
                Tab[x].Yang = TirageDE.Yang;
                Tab[x].Yin = TirageDE.Yin;
                break;
            }
        if(Tab[x].Yang < 0) {Tab[x].Yang = 0;}
        if(Tab[x].Yin < 0) {Tab[x].Yin = 0;}
        if(Tab[x].Yang > 9) {Tab[x].Yang = 9;}
        if(Tab[x].Yin > 9) {Tab[x].Yin = 9;}
        if(Tab[x].Yang == Tab[x].Yin)
        {
            Calcul = Tab[x].Yang;
        }
        else
        {
            Calcul = Math.abs(Tab[x].Yang - Tab[x].Yin);
        }
        if(Calcul > Somme)
        {
            Somme = Calcul;
            Nb = x;
        }
    }
    JDR_ValeurDE(Tab[Nb].Yang, Tab[Nb].Yin, false);
}
function JDR_AfficherDE(Indice)
{
    for(let x = 0; x < LstDE.length;x++)
    {
        if(x == Indice)
        {
            Bouton.Afficher(LstDE[0][x], true);
            Bouton.Afficher(LstDE[1][x], true);
        }
        else
        {
            Bouton.Afficher(LstDE[0][x], false);
            Bouton.Afficher(LstDE[1][x], false);
        }
    }
}
function JDR_TexteValeurDE(Code)
{
    TabOpt = new Array(["I", "Identique"], ["A", "Automatique"], ["L", "Libre"],
    ["D1", "Double 1"], ["D2", "Double 2"], ["D3", "Double 3"],
    ["D4", "Double 4"], ["D5", "Double 5"], ["D6", "Double 6"],
    ["D7", "Double 7"], ["D8", "Double 8"], ["D9", "Double 9"],
    ["D0", "Double 0"], ["", ""], 
        );
    for(let x = 0;x < TabOpt.length;x++)
    {
        if(TabOpt[x][0] == Code)
        {
            return(TabOpt[x][1]);
        }
    }
    return("");
}
function JDR_InitialiserSelectJet(PtrSelect, Option = 0)
{
    let TabOpt
    switch(Option)
    {
        case 1:
            TabOpt = new Array(["I", "Identique"], ["A", "Automatique"], ["L", "Libre"],
            ["D1", "Double 1"], ["D2", "Double 2"], ["D3", "Double 3"],
            ["D4", "Double 4"], ["D5", "Double 5"], ["D6", "Double 6"],
            ["D7", "Double 7"], ["D8", "Double 8"], ["D9", "Double 9"],
            ["D0", "Double 0"], ["", ""], 
                );
            break;
        default:
            TabOpt = new Array(["A", "Automatique"], ["L", "Libre"],
            ["D1", "Double 1"], ["D2", "Double 2"], ["D3", "Double 3"],
            ["D4", "Double 4"], ["D5", "Double 5"], ["D6", "Double 6"],
            ["D7", "Double 7"], ["D8", "Double 8"], ["D9", "Double 9"],
            ["D0", "Double 0"], ["", ""], 
                );
            break;
    }

    PtrSelect.options.length = 0;
    for(let y = 0;y < TabOpt.length;y++)
    {
        let Opt = document.createElement("option");
        Opt.text = TabOpt[y][1];
        Opt.value = TabOpt[y][0];
        Opt.disabled = false;
        if(TabOpt[y][0] == "")
        {
            Opt.disabled = true;
        }
        PtrSelect.add(Opt);
    }
}
/************************************************************************************************/
/************************************************************************************************/
/*      INITIALISATION DES CARACTERISTIQUES SPECIFIQUES AU JDR
/************************************************************************************************/
/************************************************************************************************/
function JDR_InitialiserBonusInitiative()
{
    for(let x = 0;x < INIT_DATA.length;x++)
    {
        INIT_DATA[x].BonusCarac = Perso.Base(x).Eau;
    }
}
function JDR_InitialiserBonusPersonnage()
{
    for(let x = 0;x < PERSO_DATA.length;x++)
    {
        PERSO_DATA[x].BonusCaracDefense = Perso.Base(x).Eau;
    }
}

JDR_InitialiserDE();