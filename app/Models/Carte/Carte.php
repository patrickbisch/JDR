<?php

namespace App\Models\Carte;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carte extends Model
{
    protected $connection = 'mysql';

    use HasFactory;
    protected $table = 'carte';
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
    static function Liste($IdCarte)
    {
        $Retour = self::where('id', '=', $IdCarte)->get();
        return($Retour);
    }
    static function Element($IdCarte)
    {
        $Retour = self::find($IdCarte);
        return($Retour);
    }
}
