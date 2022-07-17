var LstDE = new Array;
//  Gestion des DE pour QIN
function JDR_LancerDE(TypeLance = "")
{
    let Nb = 0;
    let Retour = 1;
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
            JDR_ValeurDE(Nb, Nb);
            JDR_AfficherDE(0);
            break;
        case "A":
            JDR_ValeurDE(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
            JDR_AfficherDE(0);
            break;
        case "L":
            JDR_ValeurDE(0, 0);
            JDR_AfficherDE(1);
            Bouton.Activer(BtnValider, true);
            Retour = 0
            break;
        default:
            MSG.Erreur("JDR_LancerDE : (" + TypeLance + ") => Type de DE INCONNU");
            Bouton.Activer(BtnValider, false);
            JDR_AfficherDE(-1);
            Retour = 1;
            break;
    }
    return(Retour);
}
function JDR_InitialiserDE()
{
    LstDE = new Array([document.querySelector("#De0-0"), document.querySelector("#De0-1")],
                        [document.querySelector("#De1-0"), document.querySelector("#De1-1")],
                    );
    console.debug (LstDE);
    JDR_AfficherDE(-1);
}
function JDR_ValeurDE(Yang, Yin)
{
    LstDE[0][0].innerHTML = Yang;
    LstDE[0][1].value = Yang;
    LstDE[1][0].innerHTML = Yin;
    LstDE[1][1].value = Yin;
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

JDR_InitialiserDE();