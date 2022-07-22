function INIT_ProchainActif(Ancien)
{
    let Debut = 0;
    if(Ancien !== undefined)
    {
        Debut = Init.Actif + 1;
    }

    for(let x = Debut;x < INIT_DATA.length;x++)
    {
        let Index = parseInt(INIT_DATA[x].Index);
        if(!Perso.Mort(Index))
        {
            if(parseInt(Perso.NbAction(Index)) > 0)
            {
                if(Perso.NombreAdversaire(Index) > 0)
                {
                    Perso.Actif = Index;
                    Init.Actif = x;
                    return(Index);
                }
                else
                {
                    return(-2);
                }
            }
        }
    }
    return(-1);
}
