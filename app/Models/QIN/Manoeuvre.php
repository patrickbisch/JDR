<?php

namespace App\Models\QIN;

use App\Models\QIN\ManoeuvreDefinition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manoeuvre extends Model
{
    protected $connection = 'mysql_QIN';

    use HasFactory;
    protected $table = 'manoeuvre';

/*========================================================*/
/*  Retourne un nouveau personnage
/*========================================================*/   
    public static function Nouveau()
    {
        $Ptr = new self();
        return($Ptr);
    }
/*========================================================*/
/*  Retourne les personnages dans un tableau en fonction d'une campagne
/*========================================================*/   
    static function Liste($IdJoueur)
    {
        $Retour = self::where('manoeuvre.id_perso', '=', $IdJoueur)->
                leftjoin('manoeuvre_definition', 'manoeuvre.id_manoeuvre', '=', 'manoeuvre_definition.id')->
                get();
        return($Retour);
    }
}
