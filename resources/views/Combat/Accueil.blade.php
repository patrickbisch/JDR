<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{__('Combat.TitreOnglet')}}</title>
    <base href="{{env('APP_URL')}}">
    <!-- CSS And Javascript -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="{{URL::asset('../resources/css/CharteGraphique.css')}}">
    <link rel="stylesheet" href="{{URL::asset('../resources/css/Combat/CharteGraphique.css')}}">
    <link rel="stylesheet" href="{{URL::asset('../resources/css/Carte/CharteGraphique.css')}}">
    <link rel="shortcut icon" href="{{URL::asset('../resources/Images/Campagne.png') }}">

    @yield('FeuilleStyle')

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>
<body>
    <form action="{{url('Combat/Gestion')}}" method="post">
            {{csrf_field()}}
        <div class="FondPrincipal">
            <div class="MenuHaut"></div>

            <button id="BtnValider" class="Bouton BtnValider Info" name="Action" value="Valider" type="submit">
                <img height="52" src="../resources/Images/Valider.png" alt="Valider">
                <span class="InfoBulle">
                    {{__('Combat.InfoValider')}}
                </span>
            </button>

            <input type="range" class="EcranJauge BtnZoom" id="Zoom" 
                    min="-{{$Rencontre->zoom_mini}}" max="{{$Rencontre->zoom_maxi}}" value="0">


            @yield('MenuHaut')

            @include('Combat.Carte')

            @include('Combat.MenuBas')

        </div>

        @yield('CodeJavaScript')

    </form>
</body>
</html>