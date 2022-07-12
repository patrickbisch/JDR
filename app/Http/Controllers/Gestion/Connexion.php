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
            $User->Nom = "";
            $User->ID = 0;
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
        $Ptr->ID = 21;
        $Ptr->Nom = 'BISCH';
        $Ptr->Prenom = 'Patrick';
        $Ptr->Lettre = 'PB';
        $Ptr->JDR = 'QIN';
        $Ptr->Campagne = 1;
        $Ptr->Rencontre = 1;

        //$User = JDR_Joueur::Rechercher($request->input('ID'));
        session(['USER' => $Ptr]);
        var_dump(session('USER'));

        return redirect("/$Ptr->JDR/Combat/$Ptr->Campagne/$Ptr->Rencontre");

//        if($request->Action == 'QIN')
//        {
//            return redirect('/QIN/Personnage/1/0');
//        }
//        return redirect('/');
    }

}
