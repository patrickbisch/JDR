@extends('Combat.Accueil')

@section('FeuilleStyle')
    <link rel="stylesheet" href="{{URL::asset('../resources/css/QIN/Combat.css')}}">
@endsection

@section('MenuHaut')
    @include('Combat.MenuHaut',
        ["TypeMenu"     => 'PNJ',])

    @include('Combat.MenuHaut',
            ["TypeMenu"     => 'Init',])

    @include('Combat.MenuHaut',
            ["TypeMenu"     => 'PJ',])

    @include("QIN.Combat.PNJ")

    @include("QIN.Combat.Init")

    @include("QIN.Combat.PJ")


@endsection
