<?php

use App\Http\Controllers\Gestion\Combat;
use App\Http\Controllers\Gestion\Connexion;
use App\Http\Controllers\QIN\GestionQIN;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*========================================================*/
/*  Gestion general du site
/*========================================================*/   
Route::group(['middleware' => 'web'], function (){

    Route::get('/', function () {
        if(is_null(session('USER')))
        {
            return redirect('/Deconnection');
        }
return redirect('/Deconnection');
    });

    Route::get('/Deconnection',
                [Connexion::class, 'Deconnecter']);

    Route::post('/Connecter',
                [Connexion::class, 'Connecter']);

/*========================================================*/
/*  Gestion pour le combat
/*========================================================*/   
    Route::get('/Liste/Personnage', 
        [Combat::class, 'ListePersonnage']);
    Route::get('/Liste/Armure', 
        [Combat::class, 'ListeArmure']);
    Route::get('/Liste/Bouclier', 
        [Combat::class, 'ListeBouclier']);
/*========================================================*/
/*  Gestion pour le JDR QIN
/*========================================================*/   
    Route::get('/QIN/Combat/{id_campagne}/{id_rencontre}', 
                [GestionQIN::class, 'Combat']);

});
