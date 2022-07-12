<?php

namespace App\Models\Rencontre;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RencontrePNJ extends Model
{
    use HasFactory;
    protected $table = 'rencontre_pnj';

/*========================================================*/
/*  Retourne un nouveau PNJ pour une rencontre
/*========================================================*/   
    public static function NouveauPNJ()
    {
        $Ptr = new self();
        $Ptr->id_rencontre = 0;
        return($Ptr);
    }
/*========================================================*/
/*  Suppression d'une rencontre
/*========================================================*/   
    public static function Supprimer($IdRencontre)
    {
        self::where('id_rencontre', '=', $IdRencontre)->delete();
    }
/*========================================================*/
/*  Retourne la liste des personnages d'une rencontre
/*      $IdCampagne :
/*              X ==> On retourne toutes les rencontres de la campagne X
/*              0 ==> On retournera toutes les rencontres du JDR si != 0
/*      $IdJDR = permet de retourner toutes les rencontres, si 
/*              $IdCampagne = 0
/*========================================================*/   
    static function Liste($IdRencontre)
    {
        if($IdRencontre != 0)
        {
            return(self::
            where('id_rencontre', '=', $IdRencontre)->
            get());
        }
        else
        {
            return(null);
        }
    }

}
