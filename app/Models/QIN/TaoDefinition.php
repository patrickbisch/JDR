<?php

namespace App\Models\QIN;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaoDefinition extends Model
{
    protected $connection = 'mysql_QIN';

    use HasFactory;
    protected $table = 'tao_definition';
    protected $primaryKey = 'id';

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
        $Retour = self::where('id_perso', '=', $IdJoueur)->get();
        return($Retour);
    }
}
