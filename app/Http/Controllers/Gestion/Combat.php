<?php

namespace App\Http\Controllers\Gestion;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Combat extends Controller
{
/*========================================================*/
/*  Envoi des personnages et leurs talents pour les combats
/*========================================================*/   
    public function ListePersonnage()
    {
        $Liste = session('LISTE_PERSONNAGE');
        return(json_encode($Liste));
    }
/*========================================================*/
/*  Envoi des personnages et leurs talents pour les combats
/*========================================================*/   
    public function ListeArmure()
    {
        $Liste = session('LISTE_ARMURE');
        return(json_encode($Liste));
    }
/*========================================================*/
/*  Envoi des personnages et leurs talents pour les combats
/*========================================================*/   
    public function ListeBouclier()
    {
        $Liste = session('LISTE_BOUCLIER');
        return(json_encode($Liste));
    }
}