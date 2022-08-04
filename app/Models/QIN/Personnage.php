<?php

namespace App\Models\QIN;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnage extends Model
{
    protected $connection = 'mysql_QIN';

    use HasFactory;
    protected $table = 'personnage';
    protected $primaryKey = 'id_perso';

/*========================================================*/
/*  Retourne un nouveau personnage
/*========================================================*/   
    public static function Nouveau()
    {
        $Ptr = new self();
        return($Ptr);
    }
/*========================================================*/
/*  Retourne le personnage en fonction de l'identifiant
/*========================================================*/   
    static function Element($IdPerso)
    {
        $Retour = self::find($IdPerso);
        return($Retour);
    }
/*========================================================*/
/*  Retourne les personnages dans un tableau en fonction d'une campagne
/*========================================================*/   
    static function Liste($IdCampagne)
    {
        $Retour = self::where('id_campagne', '=', $IdCampagne)->get();
        return($Retour);
    }
}
