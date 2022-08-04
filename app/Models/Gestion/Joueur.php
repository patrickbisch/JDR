<?php

namespace App\Models\Gestion;

class Joueur 
{
    public $id;
    public $nom;
    public $prenom;
    public $lettre;
    public $jdr;
    public $campagne;
    public $rencontre;

    function __construct()
    {
        $this->id = 0;
        $this->nom = "";
        $this->prenom = "";
        $this->lettre = "";
        $this->jdr = "";
        $this->campagne = 0;
        $this->rencontre = 0;
    }
}
