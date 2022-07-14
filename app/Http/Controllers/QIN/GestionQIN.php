<?php

namespace App\Http\Controllers\QIN;

use App\Models\Gestion\JDR_Campagne;
use App\Models\Rencontre\Rencontre;
use App\Models\Rencontre\RencontrePNJ;

use App\Models\QIN\Arme;
use App\Models\QIN\Armure;
use App\Models\QIN\Bouclier;
use App\Models\QIN\Personnage;
use App\Models\QIN\Manoeuvre;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;

class GestionQIN extends Controller
{
/*========================================================*/
/*  Permer de controler le personnage et de le sauvegarder
/*========================================================*/   
    function Combat($IdCampagne, $IdRencontre)
    {
        $User = session('USER');
        $PtrCampagne = JDR_Campagne::Retourner($IdCampagne);
        $PtrRencontre = Rencontre::Retourner($IdRencontre);
        $DetailPNJ = RencontrePNJ::Liste($IdRencontre);
        $LstPerso = array();
        $NbPJ = 0;
        $NbPNJ = 0;
        foreach($DetailPNJ as $PtrPNJ)
        {
            $Boucle = 1;
            switch($PtrPNJ->id_fonction)
            {
                /* Personnage Sbires */
                case 1;
                case 2;
                case 3;
                    $Boucle = $PtrPNJ->nbpnj;
                    break;
            }

            for($x = 0;$x < $Boucle;$x++)
            {
                $LstPerso[] = Personnage::Retourner($PtrPNJ->id_pnj);
                $LstPerso[$NbPJ+$NbPNJ]->id_fonction = $PtrPNJ->id_fonction;
                $LstPerso[$NbPJ+$NbPNJ]->NbPNJ = $PtrPNJ->nbpnj;
                $LstPerso[$NbPJ+$NbPNJ]->Armes = Arme::Liste($PtrPNJ->id_pnj);
                $LstPerso[$NbPJ+$NbPNJ]->Armures = Armure::Liste($PtrPNJ->id_pnj);
                $LstPerso[$NbPJ+$NbPNJ]->Boucliers = Bouclier::Liste($PtrPNJ->id_pnj);
                $LstPerso[$NbPJ+$NbPNJ]->Manoeuvres = Manoeuvre::Liste($PtrPNJ->id_pnj);


                $LstPerso[$NbPJ+$NbPNJ]->Protection = 0;
                $LstPerso[$NbPJ+$NbPNJ]->ProtectionArmure = 0;
                $LstPerso[$NbPJ+$NbPNJ]->ProtectionBouclier = 0;
                if($PtrPNJ->id_fonction == 0)
                {
                    $LstPerso[$NbPJ+$NbPNJ]->Nom = trim($LstPerso[$NbPJ+$NbPNJ]->personnage);
                    $LstPerso[$NbPJ+$NbPNJ]->Lettre = chr(65+$NbPJ++);
                }
                else
                {
                    $LstPerso[$NbPJ+$NbPNJ]->Nom = trim($LstPerso[$NbPJ+$NbPNJ]->personnage . 
                            ' ' . $LstPerso[$NbPJ+$NbPNJ]->classe . ' ' . $LstPerso[$NbPJ+$NbPNJ]->royaume);
                    $LstPerso[$NbPJ + $NbPNJ]->Lettre = ++$NbPNJ;
                }
            }
        }

        session([
            'LISTE_PERSONNAGE'  => $LstPerso,
        ]);

        return view('QIN.Combat.Ecran', [
            "CampagneTitre"     => $PtrCampagne->campagne,
            "RencontreTitre"    => $PtrRencontre->rencontre,
            "LstPerso"          => $LstPerso,
            "NbPJ"              => $NbPJ,
        ]);

    }
}
