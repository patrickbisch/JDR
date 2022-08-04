<?php

namespace App\Http\Controllers\Carte;

use App\Models\Carte\Carte;
use App\Models\Rencontre\Rencontre;
use App\Models\Rencontre\RencontrePNJ;
use App\Models\QIN\Personnage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;

class GestionCarte extends Controller
{
/*========================================================*/
/*  Permer de controler les cartes
/*========================================================*/   
    public function Gerer(Request $request, $IdCarte = 0)
    {
        switch($request->Action)
        {
            case 'Ajouter';
                return(self::Ajouter($request));
            case 'Modifier';
                if($IdCarte == 0)
                {
                    return(self::Ajouter($request));
                }
                return(self::Modifier($request, $IdCarte));
/*
                case 'Supprimer';
                JDR_Campagne::Supprimer($IdCampagne);
                return redirect('/Gestion/Campagne');
*/
            case 'Annuler':
                return redirect(session('ECRAN'));
            default:
                echo "Gestion des cartes<br>";
                echo "Action : ". $request->Action ."<br>";
                echo "IdCarte : ". $IdCarte."<br>";
                return view('test');
        }
    }
/*========================================================*/
/*  Creation d'une nouvelle campagne
/*========================================================*/   
    private static function Ajouter(Request $request)
    {
        $Carte = Carte::Nouveau();
        return(self::Sauvegarder($request, $Carte));
    }
/*========================================================*/
/*  Modification d'une campagne
/*========================================================*/   
    private static function Modifier(Request $request, $IdCarte)
    {
        $Carte = Carte::Element($IdCarte);
        return(self::Sauvegarder($request, $Carte));
    }
/*========================================================*/
/*  Sauvegarde des modifications pour une campagne
/*========================================================*/   
    private static function Sauvegarder(Request $request, Carte $Carte)
    {
        $User = session('USER');
        $Carte->designation = $request->input('Designation');
        $Carte->carte = $request->input('ListeCarte');
        $Carte->nb_ox = $request->input('NbOX');
        $Carte->nb_oy = $request->input('NbOY');
        if($Carte->id_joueur == 0)
        {
            $Carte->id_joueur = $User->id;
        }
        $Carte->save();
        return redirect('/Deconnection');
    }
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

        $LstPerso = array();
        if($IdRencontre > 0)
        {
            $PtrRencontre = Rencontre::Element($IdRencontre);
            $Carte = Carte::Element($PtrRencontre->id_carte);
            $DetailPNJ = RencontrePNJ::Liste($IdRencontre);
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
                    case 0:     // ON NE GERE PAS LES PJ ICI
                        $Boucle = 0;
                        break;
                }
    
                for($x = 0;$x < $Boucle;$x++)
                {
                    $LstPerso[] = Personnage::Element($PtrPNJ->id_pnj);
                    $LstPerso[$NbPNJ]->id_fonction = $PtrPNJ->id_fonction;
                    $LstPerso[$NbPNJ]->nb_pnj = $PtrPNJ->nbpnj;
                    $LstPerso[$NbPNJ]->Nom = trim($LstPerso[$NbPNJ]->personnage . 
                                            ' ' . $LstPerso[$NbPNJ]->classe .
                                            ' ' . $LstPerso[$NbPNJ]->royaume);
                    $LstPerso[$NbPNJ]->Lettre = $NbPNJ + 1;
                    $NbPNJ++;
                }
            }
        }
        else
        {
            $PtrRencontre = Rencontre::Nouveau();
            if($IdCarte > 0)
            {
                $Carte = Carte::Element($IdCarte);
            }
            else
            {
                $Carte = Carte::Nouveau();
            }
        }
        return view('Carte.Gestion.Ecran', [
            "User"          => $User,
            "LstCarte"      => $LstCarte,
            "Carte"         => $Carte,
            "Rencontre"     => $PtrRencontre,
            "LstPerso"      => $LstPerso,
        ]);
    }
}
