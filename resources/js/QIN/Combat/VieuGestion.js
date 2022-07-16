function InitialiserLigneAttaque()
{
    ControlerLigneArmure();
    ControlerLigneBouclier();
}

/*******************************************************************/
/*  GESTION DES ARMURES
/*******************************************************************/
function InitialiserLigneArmure()
{
    Message("Initialisation des lignes Armures");
    for(let x = 0; x < Lst_Perso.length; x++)
    {
        let Ptr = Lst_Perso[x];
        let Obj = document.querySelector("#TypeArmure-"+x);
        Obj.addEventListener('change', function(){
                                NouvelleArmure(Obj,x);    
                            });
        switch(Ptr.Armure)
        {
            case 0:
                AfficherObjetID("LigneArmure-" + x,false);
                break;
            case 1:
            case 2:
            case 4:
            case 8:
            case 16:
                Obj.options[1].selected = true;
                NouvelleArmure(Obj,x);
                break;
            default:
                Obj.style.backgroundColor = "red";
        }
    }
}
function ControlerLigneArmure()
{
    for(let x = 0; x < Lst_Perso.length; x++)
    {
        let Ptr = Lst_Perso[x];
        if(Ptr.Armure == 0)
        {
            AfficherObjetID("LigneArmure-" + x,false);
        }
    }
}
function NouvelleArmure(Obj,Id)
{
    for(let x = 0;x < Obj.options.length;x++)
    {
        if(Obj.options[x].selected == true)
        {
            let Chaine = Obj.options[x].innerHTML;
            let Ptr = document.querySelector("#Armure-"+Id);
            let Indice = -1;
            if(x > 0)
            {
                for(let y = 0;y < LstArmure.length;y++)
                {
                    if(LstArmure[y].armure == Chaine)
                    {
                        Indice = LstArmure[y].protection;
                    }
                }
            }
            Obj.style.backgroundColor = "ivory";
            if(Indice >= 0)
            {
                Ptr.innerHTML = Indice;
                Lst_Perso[Id].ProtectionArmure = Indice;
            }
            else
            {
                Ptr.innerHTML = "";
                Lst_Perso[Id].ProtectionArmure = 0;
            }
            CalculerProtection(Id);
        }
    }
}
/*******************************************************************/
/*  GESTION DES BOUCLIER
/*******************************************************************/
function InitialiserLigneBouclier()
{
    for(let x = 0; x < Lst_Perso.length; x++)
    {
        let Ptr = Lst_Perso[x];
        let Obj = document.querySelector("#TypeBouclier-"+x);
        Obj.addEventListener('change', function(){
                                NouveauBouclier(Obj,x);    
                            });
        switch(Ptr.Bouclier)
        {
            case 0:
                AfficherObjetID("LigneBouclier-" + x,false);
                break;
            case 1:
            case 2:
            case 4:
            case 8:
            case 16:
                Obj.options[1].selected = true;
                NouveauBouclier(Obj,x);
                break;
            default:
                Obj.style.backgroundColor = "red";
        }
    }
}
function ControlerLigneBouclier()
{
    for(let x = 0; x < Lst_Perso.length; x++)
    {
        let Ptr = Lst_Perso[x];
        if(Ptr.Bouclier == 0)
        {
            AfficherObjetID("LigneBouclier-" + x,false);
        }
    }
}
function NouveauBouclier(Obj,Id)
{
    for(let x = 0;x < Obj.options.length;x++)
    {
        if(Obj.options[x].selected == true)
        {
            let Chaine = Obj.options[x].innerHTML;
            let Ptr = document.querySelector("#Bouclier-"+Id);
            let Indice = -1;
            if(x > 0)
            {
                for(let y = 0;y < LstBouclier.length;y++)
                {
                    if(LstBouclier[y].bouclier == Chaine)
                    {
                        Indice = LstBouclier[y].protection;
                    }
                }
            }
            if(Indice >= 0)
            {
                Ptr.innerHTML = Indice;
                Lst_Perso[Id].ProtectionBouclier = Indice;
            }
            else
            {
                Ptr.innerHTML = "";
                Lst_Perso[Id].ProtectionBouclier= 0;
            }
            Obj.style.backgroundColor = "ivory";
            CalculerProtection(Id);
        }
    }
}
