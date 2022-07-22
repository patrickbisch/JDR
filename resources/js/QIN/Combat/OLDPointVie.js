function PV_Afficher(Index, Etat = true)
{
    AfficherObjet(PV_DATA[Index].PtrLigne, Etat);
    for(let x = 0;x < PV_DATA[Index].Groupe.length;x++)
    {
        AfficherObjet(PV_DATA[Index].Groupe[x].PtrLigne, Etat);
    }
}
function PV_AfficherListe(Etat = true)
{
    for(let x = 0;x < PV_DATA.length;x++)
    {
        PV.Afficher(x, Etat);
        PV_Actualiser(x);
    }
}
