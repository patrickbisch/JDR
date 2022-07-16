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
