<?php

namespace App\Models\Gestion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JDR_Campagne extends Model
{
    use HasFactory;
    protected $table = 'jdr_campagne';
    protected $dates = ['deleted_at'];
    protected $primaryKey = 'id_campagne';

/*========================================================*/
/*  Recherche une campagne en fonction de son identifiant
/*========================================================*/   
    public static function Retourner($IdCampagne)
    {
        return(self::find($IdCampagne));
    }
/*========================================================*/
/*  Retourne une nouvelle campagne
/*========================================================*/   
    public static function Nouvelle()
    {
        $Ptr = new JDR_Campagne();
        $Ptr->id_campagne = 0;
        return($Ptr);
    }
}
