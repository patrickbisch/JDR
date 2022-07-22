<?php

namespace App\Models\QIN;

use App\Models\QIN\TaoDefinition;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tao extends Model
{
    protected $connection = 'mysql_QIN';

    use HasFactory;
    protected $table = 'tao';

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
        $Retour = self::where('tao.id_perso', '=', $IdJoueur)->
                leftjoin('tao_definition', 'tao.id_tao', '=', 'tao_definition.id')->
                get();
        return($Retour);
    }
}
