/*******************************************************************/
/*  Fonction general pour le JDR QIN
/*******************************************************************/
var DeLabel         = new Array();
var DeSelect        = new Array();

//  Gestion des DE pour QIN
class De {
    constructor() {
      this.Yin = -1;
      this.Yang = -1;
      this.Double = false;
      this.Valeur = -1;
      this.Degat = 0;
    }
  
    static Lancer(Bonus = 0)
    {
        this.Yin = Math.floor(Math.random() * 10);
        this.Yang = Math.floor(Math.random() * 10);
        this.Degat = 0;
        if(this.Yang == this.Yin)
        {
            this.Double = true;
            this.Valeur = this.Yin;
            this.Degat = this.Valeur;
        }
        else
        {
            this.Double = false;
            if(this.Yin > this.Yang)
            {
                this.Valeur = this.Yin - this.Yang;
                this.Degat = this.Valeur;
            }
            else
            {
                this.Valeur = this.Yang - this.Yin;
            }
            this.Valeur += Bonus;
        }
    }
    static Coeficiant()
    {
        if(this.Double)
        {
            if(this.Valeur > 0)
            {
                return(100 + this.Valeur);
            }
            return(0);
        }
        if(this.Valeur < 0)
        {
            return(0);
        }
        return(this.Valeur);
    }
    static Formater()
    {
        if(this.Double)
        {
            if(this.Valeur > 0)
            {
                return(this.Valeur + "x" + this.Valeur);
            }
            return(0);
        }
        if(this.Valeur < 0)
        {
            return("??");
        }
        return(this.Valeur);
    }
}
function JDR_LancerDe(TypeLance = "")
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
            DeLabel[0].innerHTML = Nb;
            DeLabel[1].innerHTML = Nb;
            DeSelect[0].value = Nb;
            DeSelect[1].value = Nb;
            JDR_AfficherDe(true);
            JDR_ActiverDe(true);
            break;
        case "A":
            JDR_AfficherDe(true);
            JDR_ActiverDe(true);
            De.Lancer();
            DeLabel[0].innerHTML = De.Yin;
            DeLabel[1].innerHTML = De.Yang;
            DeSelect[0].value = De.Yin;
            DeSelect[1].value = De.Yang;
            break;
        case "L":
            JDR_AfficherDe(false);
            JDR_ActiverDe(true);
            DeSelect[0].value = "0";
            DeSelect[1].value = "0";
            ActiverBouton("BtnValider", true);
            Retour = 0
            break;
        default:
            MSG.Erreur("JDR_LancerDE : (" + TypeLance + ") => Type de DE INCONNU");
            ActiverBouton("BtnValider", false);
            JDR_AfficherDe(false, false);
            Retour =1
            break;
    }
    return(Retour);
}
function JDR_AfficherDe(Etat, Etat1 = !Etat)
{
    AfficherBouton(DeLabel[0], Etat);
    AfficherBouton(DeLabel[1], Etat);
    AfficherBouton(DeSelect[0], Etat1);
    AfficherBouton(DeSelect[1], Etat1);
}
function JDR_ActiverDe(Etat)
{
    ActiverBouton(DeLabel[0], Etat);
    ActiverBouton(DeLabel[1], Etat);
    ActiverBouton(DeSelect[0], Etat);
    ActiverBouton(DeSelect[1], Etat);
}
function JDR_InitialiserDE()
{
    let Obj = document.querySelector("#De0-0");
    DeLabel.push(Obj);
    AfficherBouton(Obj, false);
    Obj = document.querySelector("#De1-0");
    DeLabel.push(Obj);
    AfficherBouton(Obj, false);

    Obj = document.querySelector("#De0-1");
    DeSelect.push(Obj);
    AfficherBouton(Obj, false);
    Obj = document.querySelector("#De1-1");
    DeSelect.push(Obj);
    AfficherBouton(Obj, false);
}