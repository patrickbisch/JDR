<?php

namespace App\Models\Rencontre;

use App\Models\Rencontre\RencontrePNJ;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rencontre extends Model
{
    use HasFactory;
    protected $table = 'rencontre';
    protected $primaryKey = 'id_rencontre';

/*========================================================*/
/*  Retourne une nouvelle rencontre
/*========================================================*/   
    public static function Nouvelle()
    {
        $Ptr = new self();
        $Ptr->id_rencontre = 0;
        return($Ptr);
    }
/*========================================================*/
/*  Retourne le personnage
/*========================================================*/   
    static function Retourner($IdRencontre)
    {
        return(self::find($IdRencontre));
    }
/*========================================================*/
/*  Suppression d'une rencontre
/*========================================================*/   
    public static function Supprimer($IdRencontre)
    {
        self::where('id_rencontre', '=', $IdRencontre)->delete();
        RencontrePNJ::Supprimer($IdRencontre);
    }
/*========================================================*/
/*  Retourne la liste des personnages d'une campagne
/*      $IdCampagne :
/*              X ==> On retourne toutes les rencontres de la campagne X
/*              0 ==> On retournera toutes les rencontres du JDR si != 0
/*      $IdJDR = permet de retourner toutes les rencontres, si 
/*              $IdCampagne = 0
/*========================================================*/   
    static function Liste($IdCampagne = 0, $IdJDR = 0, $Tri = 'rencontre')
    {
        if($IdCampagne != 0)
        {
            return(self::orderByRaw($Tri)->
            where('id_campagne', '=', $IdCampagne)->
            get());
        }
        else
        {
            if($IdJDR != 0)
            {
                return(self::orderByRaw($Tri)->
                where('id_jdr', '=', $IdJDR)->
                get());
            }
            else
            {
                return(null);
            }
        }
    }

}
