@extends('Combat.Accueil')

@section('FeuilleStyle')
    <link rel="stylesheet" href="{{URL::asset('../resources/css/QIN/Combat.css')}}">
@endsection

@section('MenuHaut')
    @include('Combat.MenuHaut',
        ["TypeMenu"     => 'PNJ',])
    @include("QIN.Combat.PNJ")

    @include('Combat.MenuHaut',
            ["TypeMenu"     => 'Init',])
    @include("QIN.Combat.Init")

    @include('Combat.MenuHaut',
            ["TypeMenu"     => 'PJ',])
    @include("QIN.Combat.PJ")

    <div id="DeDef" class="DeDef">
        <div id="De0-0" class="Colonne1 BlancNoir Info">8
            <span class="InfoBulle">
                {{__('QIN/Combat.DeYang')}}
            </span>
        </div>

        <select id="De0-1" class="Colonne1 BlancNoir">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>

        <div id="De1-0" class="Colonne2 NoirBlanc Info">8
            <span class="InfoBulle">
                {{__('QIN/Combat.DeYin')}}
            </span>
        </div>

        <select id="De1-1" class="Colonne2 NoirBlanc">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>
    </div>
@endsection

@section('CodeJavaScript')
    <script src="../resources/js/Outils/Objet.js"></script>
    <script src="../resources/js/Outils/Bouton.js"></script>
    <script src="../resources/js/Outils/Message.js"></script>
    <script src="../resources/js/Combat/Personnage.js"></script>
    <script src="../resources/js/Combat/Equipement.js"></script>
    <script src="../resources/js/Combat/Action.js"></script>
    <script src="../resources/js/Combat/Attaque.js"></script>
    <script src="../resources/js/Combat/Defense.js"></script>
    <script src="../resources/js/Combat/Initiative.js"></script>
    <script src="../resources/js/Combat/Cible.js"></script>
    <script src="../resources/js/Combat/BonusExceptionnel.js"></script>
    <script src="../resources/js/Combat/Combat.js"></script>
    <script src="../resources/js/Carte/Carte.js"></script>
    <script src="../resources/js/Carte/MatriceCarre.js"></script>
    <script src="../resources/js/Carte/Combat.js"></script>
    <script src="../resources/js/QIN/Combat/BonusAvant.js"></script>
    <script src="../resources/js/QIN/Combat/Caracteristique.js"></script>
    <script src="../resources/js/QIN/Combat/DefensePassive.js"></script>
    <script src="../resources/js/QIN/Combat/Gestion.js"></script>
    <script src="../resources/js/QIN/Combat/PointVie.js"></script>
    <script src="../resources/js/QIN/Combat/Tao.js"></script>
    <script src="../resources/js/Combat/Demarrage.js"></script>
@endsection
