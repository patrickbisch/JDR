@extends('Combat.Accueil')

@section('FeuilleStyle')
    <link rel="stylesheet" href="{{URL::asset('../resources/css/QIN/Combat.css')}}">
@endsection

@section('MenuHaut')
    @include('Combat.MenuHaut',
                ["TypeMenu"     => 'PNJ',])
    <div class="EcranPNJ">
        @include("QIN.Combat.PNJ")
    </div>

    @include('Combat.MenuHaut',
                ["TypeMenu"     => 'PJ',])
    <div class="EcranPJ">
        @include("QIN.Combat.PJ")
    </div>

    @include('Combat.MenuHaut',
                ["TypeMenu"     => 'Init',])
    <div id="MenuInit" class="EcranInit">
        @include("QIN.Combat.Init")
    </div>

    <div id="De0-0" class="DeDef De1 BlancNoir Info">8
        <span class="InfoBulle">
            {{__('QIN/Combat.DeYang')}}
        </span>
    </div>
    <select id="De0-1" class="DeDef De1 BlancNoir">
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

    <div id="De1-0" class="DeDef De2 NoirBlanc Info">8
        <span class="InfoBulle">
            {{__('QIN/Combat.DeYin')}}
        </span>
    </div>

    <select id="De1-1" class="DeDef De2 NoirBlanc">
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

@endsection

@section('CodeJavaScript')
    <script src="../resources/js/QIN/Combat/BonusAvant.js"></script>
    <script src="../resources/js/QIN/Combat/Caracteristique.js"></script>
    <script src="../resources/js/QIN/Combat/DefensePassive.js"></script>
    <script src="../resources/js/QIN/Combat/Gestion.js"></script>
    <script src="../resources/js/QIN/Combat/PointVie.js"></script>



    <script src="../resources/js/QIN/Combat/OLDPointVie.js"></script>
    <script src="../resources/js/QIN/Combat/OLDCombat.js"></script>
    <script src="../resources/js/QIN/Combat/OLDGestion.js"></script>
    <script src="../resources/js/QIN/Combat/OLDInitiative.js"></script>
@endsection
