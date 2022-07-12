<?php

namespace App\Models\Gestion;

class Joueur 
{
    public $ID;
    public $Nom;
    public $Prenom;
    public $Lettre;
    public $JDR;
    public $Campagne;
    public $Rencontre;

    function __construct()
    {
        $this->ID = 0;
        $this->Nom = "";
        $this->Prenom = "";
        $this->Lettre = "";
        $this->JDR = "";
        $this->Campagne = 0;
        $this->Rencontre = 0;
    }
}
