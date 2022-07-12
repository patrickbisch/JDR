<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ecran connexion</title>
    <link rel="shortcut icon" href="{{URL::asset('../resources/Images/Campagne.png') }}">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <script src="../resources/js/Gestion/AJAX.js"></script>

    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">
</head>
<body>
    <label>Heure : </label><label id="Montre" class="Montre"></label>
    <p></p>
    <br>

<form action="{{url('Connecter')}}" method="post" class="form-horizontal">
          {{csrf_field()}}
    <div class="Connexion">
        <label for="User" class="User">Joueur :</label>
        <select id="User" class="User" name="ID">
            @foreach($ListeJoueur as $Joueur)
                <option value={{$Joueur}}>
                {{$Joueur}} 
                </option>
            @endforeach
        </select> 
        <button name="Action" value="Valider" class="btn btn-primary">Valider</button>
        <button name="Action" value="QIN" class="btn btn-secondary">Tester</button>
    </div>
</form>
    <p></p>
    <br>
    <div class="AJAX">
        <input id="Message" class="Saisie p-1" value="" name="Message">
        <button id="Action" name="Action" value="AJAX" class="btn btn-secondary">Envoyer</button>
        <div id="ZoneMsg" class="ZoneMsg">
            <div id="Ligne" class="Ligne"> Message </div>

        </div>
    </div>
    <main>

    </main>
</body>
</html>

