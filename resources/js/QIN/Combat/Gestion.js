/*******************************************************************/
/*  Fonction general pour le JDR QIN
/*******************************************************************/

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

/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/



/*******************************************************************/
/*  Gestion du CHI
/*******************************************************************/
/*******************************************************************/
/*  Gestion du souffle vital
/*******************************************************************/
function BlesserPersonnage(Id, NbPV)
{
    MSG.Erreur("BlesserPersonnage = " + Perso.Nom(Id) + " recoit : " + NbPV + " blessures");
}
/*******************************************************************/
/*  Gestion du materiel et des protections
/*******************************************************************/
function CalculerProtection(Id)
{
    Lst_Perso[Id].Protection = Lst_Perso[Id].ProtectionArmure + 
                                Lst_Perso[Id].ProtectionBouclier;
}
