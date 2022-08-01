<?php

namespace App\Http\Controllers\Carte;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;

class GestionCarte extends Controller
{
/*========================================================*/
/*  Permer de controler les cartes
/*========================================================*/   
    function Carte($IdCarte, $IdRencontre)
    {
        $User = session('USER');
        
        $Requete = scandir("../resources/Cartes");
        $LstCarte = [];
        foreach($Requete as $Fichier)
        {
            if(preg_match("#\.(jpg|jpeg|png|webp|gif|bmp|tif)$#",strtolower($Fichier)))
            {
                $LstCarte[] = $Fichier;
            }
        }
        return view('Carte.Gestion.Ecran', [
            "LstCarte"      => $LstCarte,
        ]);
    }
}
