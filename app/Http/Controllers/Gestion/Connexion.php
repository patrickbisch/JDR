<?php

namespace App\Http\Controllers\Gestion;

use App\Models\Gestion\Joueur;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Connexion extends Controller
{
/*========================================================*/
/*  Gestion de la deconnection
/*========================================================*/   
    public function Deconnecter()
    {
        if(!is_null(session('USER')))
        {
            $User = new Joueur();
            $User = session('USER');
            $User->nom = "";
            $User->id = 0;
            session(['USER' => $User]);
        }
        //$LstJoueur = JDR_Joueur::Liste("nom ASC, prenom ASC");
        $LstJoueur = ['Patrick','David','Fred','Karine','Fafi','Cyril','Michel'];
        return view('Gestion.Connexion', [
                    "ListeJoueur"   => $LstJoueur,
                    ]);
    }
/*========================================================*/
/*  Gestion de la connection
/*========================================================*/   
    public function Connecter(Request $request)
    {
        $Ptr = new Joueur();
        $Ptr->id = 21;
        $Ptr->nom = 'BISCH';
        $Ptr->prenom = 'Patrick';
        $Ptr->lettre = 'PB';
        $Ptr->jdr = 'QIN';
        $Ptr->campagne = 1;
        $Ptr->rencontre = 1;

        //$User = JDR_Joueur::Rechercher($request->input('ID'));
        session(['USER' => $Ptr]);
        var_dump(session('USER'));
        $NbCarte = 0;
        switch($request->input('ID'))
        {
            case "Patrick":
                $NbCarte = 1;
                break;
            case "David":
                $NbCarte = 2;
                break;
        }

        switch($request->Action)
        {
            case "Combat":
                return redirect("/$Ptr->jdr/Combat/$Ptr->campagne/$Ptr->rencontre");
                break;
            case "Carte":
                return redirect("/Carte/Gestion/$NbCarte/-1");
                break;
            default:
                echo "Gestion des joueurs<br>";
                echo "Action : ". $request->Action ."<br>";
        }

//        if($request->Action == 'QIN')
//        {
//            return redirect('/QIN/Personnage/1/0');
//        }
//        return redirect('/');
    }

}
