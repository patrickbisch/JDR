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
    <form action="{{url('Carte/Gestion')}}" method="post">
            {{csrf_field()}}
    <div class="FondPrincipal">
        <div class="MenuHaut Titre">{{__('Carte/Gestion.TitreFenetre')}}</div>

        <div class="MenuPNJ">
            <div class="TitreLabel">{{__("Carte/Gestion.TitrePNJ")}}</div>
            <button id="PNJ-Bas" class="Bouton BtnBas" name="Action" value="Bas" type="submit">
                <img height="28" src="../resources/Images/Bas.png" alt="Bas">
            </button>

            <button id="PNJ-Haut" class="Bouton BtnHaut" name="Action" value="Haut" type="submit">
                <img height="28" src="../resources/Images/Haut.png" alt="Haut">
            </button>
        </div>
        <div class="ZonePNJ">
            @for($x = 0; $x < 10; $x++)
                <div id="PNJ-{{$x}}" class="Ligne">{{$x}}
                </div>
            @endfor
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
        <div id="ZoneDetail" class="ZoneDetail">
            <div id="Detail-0" class="Detail">
                <div class="LabelDetail Droite">.... :</div>
                <div class="LabelDetail Gauche">{{__("Carte/Gestion.LabelCarte")}}</div>
                <select id="ListeCarte" class="EcranSelect Colonne2-3">
                    @foreach($LstCarte as $x => $Nom)
                        <option value="{{$Nom}}">{{$Nom}}</option>
                    @endforeach
                </select>
            </div>
            <div id="Detail-1" class="Detail">
                <div class="LabelDetail Droite">... :</div>
                <div class="LabelDetail Gauche">{{__("Carte/Gestion.LabelTaille")}}</div>
                <div id="Taille" class="EcranCellule Colonne2-3 Numerique Centre">1080x765</div>
            </div>
            <div id="Detail-2" class="Detail">
                <div class="LabelDetail Colonne1-2 Droite">... :</div>
                <div class="LabelDetail Colonne1-2 Gauche">{{__("Carte/Gestion.LabelQuadrillage")}}</div>
                <select id="Quadrillage" class="EcranSelect Colonne3">
                    <option value="Carre">{{__("Carte/Gestion.QuadrillageCarre")}}</option>
                </select>
            </div>
            <div id="Detail-3" class="Detail">
                <div class="LabelDetail Colonne1-2 Droite">... :</div>
                <div class="LabelDetail Colonne1-2 Gauche">{{__("Carte/Gestion.LabelNbOX")}}</div>
                <select id="NbOX" class="EcranSelect Colonne3">

                </select>
            </div>
            <div id="Detail-4" class="Detail">
                <div class="LabelDetail Colonne1-2 Droite">....... :</div>
                <div class="LabelDetail Colonne1-2 Gauche">{{__("Carte/Gestion.LabelTailleOX")}}</div>
                <div id="TailleOX" class="EcranCellule Colonne3 Numerique Centre">45px</div>
            </div>
            <div id="Detail-5" class="Detail">
                <div class="LabelDetail Colonne1-2 Droite">........ :</div>
                <div class="LabelDetail Colonne1-2 Gauche">{{__("Carte/Gestion.LabelNbOY")}}</div>
                <select id="NbOY" class="EcranSelect Colonne3">

                </select>
            </div>
            <div id="Detail-6" class="Detail">
                <div class="LabelDetail Colonne1-2 Droite">........ :</div>
                <div class="LabelDetail Colonne1-2 Gauche">{{__("Carte/Gestion.LabelTailleOY")}}</div>
                <div id="TailleOY" class="EcranCellule Colonne3 Numerique Centre">45px</div>
            </div>
        </div>

            <div id="Carte" class="FondCarte Carte" src>
            </div>
            <div class="FondCarte1 ">
        </div>



        <div class="MenuBas">Menu Bas
        </div>
    </div>

    <script src="../resources/js/Outils/Objet.js"></script>
    <script src="../resources/js/Outils/Bouton.js"></script>
    <script src="../resources/js/Carte/Gestion.js"></script>
</form>
</body>
</html>