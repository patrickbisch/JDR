<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{__('Carte/Gestion.TitreOnglet')}}</title>
    <base href="{{env('APP_URL')}}">
    <!-- CSS And Javascript -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="shortcut icon" href="{{URL::asset('../resources/Images/Carte.jpg') }}">

    <link rel="stylesheet" href="{{URL::asset('../resources/css/CharteGraphique.css')}}">
    <link rel="stylesheet" href="{{URL::asset('../resources/css/Carte/CharteGraphique.css')}}">

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>
<body>
    <form action="{{url('Carte/Gestion/'.$Carte->id)}}" method="post">
            {{csrf_field()}}
    <div class="FondPrincipal">
        <div class="CarteRef Colonne3">
            <img id="DessinRef" src="" alt="CarteRef">
        </div>

        <div class="MenuHaut">
            @if($Rencontre->id_rencontre == 0)
                <div class="Titre">{{__('Carte/Gestion.TitreFenetre')}}</div>
            @else
                <div class="Titre">{{__('Carte/Gestion.TitreRencontre')}}</div>
            @endif

            <button id="BtnModifier" class="Bouton BtnModifier" name="Action" value="Modifier" type="submit">
                <img height="52" src="../resources/Images/Valider.png" alt="Modifier">
            </button>

            <button id="BtnAnnuler" class="Bouton BtnAnnuler" name="Action" value="Annuler" type="submit">
                <img height="52" src="../resources/Images/Quitter.png" alt="Valider">
            </button>


            <div id="MenuPNJ"  class="MenuPNJ">
                <div class="TitreLabel">{{__("Carte/Gestion.TitrePNJ")}}</div>
                <button id="PNJ-Bas" class="Bouton BtnBas" name="Action" value="Bas" type="submit">
                    <img height="28" src="../resources/Images/Bas.png" alt="Bas">
                </button>

                <button id="PNJ-Haut" class="Bouton BtnHaut" name="Action" value="Haut" type="submit">
                    <img height="28" src="../resources/Images/Haut.png" alt="Haut">
                </button>
            </div>

            <div class="MenuDetail">
                <div class="TitreLabel">{{__("Carte/Gestion.TitreDetail")}}</div>
                <button id="Detail-Bas" class="Bouton BtnBas" name="Action" value="Bas" type="submit">
                    <img height="28" src="../resources/Images/Bas.png" alt="Bas">
                </button>

                <button id="Detail-Haut" class="Bouton BtnHaut" name="Action" value="Haut" type="submit">
                    <img height="28" src="../resources/Images/Haut.png" alt="Haut">
                </button>
            </div>
        </div>

        <div id="ZonePNJ" class="ZonePNJ">
            @foreach($LstPerso as $x => $Perso)
                <div id="PNJ-{{$x}}" class="EcranLigne Ligne">
                    <div id="Lettre-{{$x}}" class="Colonne1 Centre Numerique Gras">{{$Perso->Lettre}}</div>
                    <div class="Colonne2 Gauche">{{$Perso->Nom}}</div>
                    <div id="TF-{{$x}}" class="Colonne2 Droite" hidden>{{$Perso->id_fonction}}</div>
                    <div id="Loca-{{$x}}" class="Colonne3 Centre Numerique Gras"></div>
                </div>
            @endforeach
        </div>

        <div id="ZoneDetail" class="ZoneDetail">
            <div id="Detail-0" class="EcranLigne Detail">
                <input id ="Designation" class="Colonne1-4 EcranSaisie" 
                        value="{{$Carte->designation}}" name="Designation">
            </div>
            <div id="Detail-1" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1 Droite">... :</div>
                <div class="EcranLabel Colonne1 Gauche">{{__("Carte/Gestion.LabelCarte")}}</div>
                <select id="ListeCarte" class="EcranSelect Colonne2-4 Numerique" name="ListeCarte">
                    @foreach($LstCarte as $x => $Nom)
                        @if($Nom == $Carte->carte)
                            <option value="{{$Nom}}" selected>{{$Nom}}</option>
                        @else
                            <option value="{{$Nom}}">{{$Nom}}</option>
                        @endif
                    @endforeach
                    @if($Carte->carte == "")
                        <option value="" selected disabled></option>
                    @endif
                </select>
            </div>
            <div id="Detail-2" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1 Droite">... :</div>
                <div class="EcranLabel Colonne1 Gauche">{{__("Carte/Gestion.LabelTaille")}}</div>
                <div id="Taille" class="EcranCellule Colonne2-4 Numerique Centre"></div>
            </div>
            <div id="Detail-3" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1-2 Droite">... :</div>
                <div class="EcranLabel Colonne1-2 Gauche">{{__("Carte/Gestion.LabelQuadrillage")}}</div>
                <select id="Quadrillage" class="EcranSelect Colonne3-4 Numerique" disabled>
                    <option value="Carre" selected>{{__("Carte/Gestion.QuadrillageCarre")}}</option>
                </select>
            </div>
            <div id="Detail-4" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1-2 Droite">... :</div>
                <div class="EcranLabel Colonne1-2 Gauche">{{__("Carte/Gestion.LabelNbOX")}}</div>
                <select id="NbOX" class="EcranSelect Colonne3 Numerique" name="NbOX">
                    @for($x = 10;$x <= 50;$x++)
                        @if($x == $Carte->nb_ox)
                            <option value="{{$x}}" selected>{{$x}}</option>
                        @else
                            <option value="{{$x}}">{{$x}}</option>
                        @endif
                    @endfor
                    @if($Carte->nb_ox == 0)
                        <option value="0" selected disabled></option>
                    @endif
                </select>
            </div>
            <div id="Detail-5" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1-2 Droite">....... :</div>
                <div class="EcranLabel Colonne1-2 Gauche">{{__("Carte/Gestion.LabelTailleOX")}}</div>
                <div id="TailleOX" class="EcranCellule Colonne3 Numerique Centre"></div>
            </div>
            <div id="Detail-6" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1-2 Droite">....... :</div>
                <div class="EcranLabel Colonne1-2 Gauche">{{__("Carte/Gestion.LabelNbOY")}}</div>
                <select id="NbOY" class="EcranSelect Colonne3 Numerique" name="NbOY">
                    @for($x = 10;$x <= 50;$x++)
                        @if($x == $Carte->nb_oy)
                            <option value="{{$x}}" selected>{{$x}}</option>
                        @else
                            <option value="{{$x}}">{{$x}}</option>
                        @endif
                    @endfor
                    @if($Carte->nb_oy == 0)
                        <option value="0" selected disabled></option>
                    @endif
                </select>
            </div>
            <div id="Detail-7" class="EcranLigne Detail">
                <div class="EcranLabel Colonne1-2 Droite">....... :</div>
                <div class="EcranLabel Colonne1-2 Gauche">{{__("Carte/Gestion.LabelTailleOY")}}</div>
                <div id="TailleOY" class="EcranCellule Colonne3 Numerique Centre"></div>
            </div>
            <div id="Detail-8" class="EcranLigne Detail">
                <div class="EcranLabel Colonne4 Gauche">{{__("Carte/Gestion.LabelZoom")}}</div>
                <input type="range" class="EcranJauge Colonne1-3"
                            id="Zoom" name="Zoom" min="-10" max="10">
            </div>
        </div>

        <div class="FondCarte">
            <div id="Carte" class="Carte">
                <img id="Dessin" class="Grille" src="" alt="Carte">
                @if($Rencontre->id_rencontre > 0)
                    @for($x = 1; $x <= $Carte->nb_ox; $x++)
                        @for($y = 1; $y <= $Carte->nb_oy; $y++)
                            <div id="Cellule-{{$x}}-{{$y}}" class="CelluleCarre Numerique Centre" 
                                style="grid-column:{{$x}};grid-row:{{$y}};">
                            </div>
                        @endfor
                    @endfor
                @else
                @endif
                    @for($x = 1; $x <= 50; $x++)
                        @for($y = 1; $y <= 50; $y++)
                            <div id="Cel-{{$x}}-{{$y}}" class="Carre" 
                                style="grid-column:{{$x}};grid-row:{{$y}};">
                            </div>
                        @endfor
                    @endfor
            </div>
        </div>

        <div class="MenuBas">
            <div id="Info" class="EcranCellule Info Gras Centre">{{$Carte->id}}/{{$Carte->id_joueur}}/{{$User->id}}/{{$Rencontre->id_rencontre}}</div>
            <div id="PositionPNJ" name="PositionPNJ" class="EcranCellule PositionPNJ Numerique">{{$Rencontre->zone_pnj}}</div>
            <div id="EntrePJ" name="EntrePJ" class="EcranCellule EntrePJ Numerique Gauche">{{$Rencontre->zone_pj}}</div>
            @if($Rencontre->id_rencontre > 0)
                <div id="MatriceType" class="EcranLabel MatriceType">{{$Carte->quadrillage}}</div>
                <div id="MatriceTaille" class="EcranCellule MatriceTaille Numerique">{{$Carte->nb_ox}}x{{$Carte->nb_oy}}</div>
            @endif
            <div class="DefinitionCouleur" hidden>
                <div id="CouleurLigne" class="CouleurLigne">CouleurLigne</div>
            </div>
        </div>
    </div>

    <script src="../resources/js/Outils/Objet.js"></script>
    <script src="../resources/js/Outils/Bouton.js"></script>
    <script src="../resources/js/Carte/MatriceCarre.js"></script>
    <script src="../resources/js/Carte/Carte.js"></script>
    <script src="../resources/js/Carte/Gestion.js"></script>
</form>
</body>
</html>