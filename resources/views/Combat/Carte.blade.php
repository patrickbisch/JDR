<div class="Carte">
    <img class="Grille" src="../resources/Cartes/Carte04.jpg" alt="Carte">
    @for($x = 0; $x < 24; $x++)
        @for($y = 0; $y < 17; $y++)
            <div id="Zone-{{$x}}-{{$y}}" class="Carre Colonne{{$x}} Ligne{{$y}}">
                {{$x}}-{{$y}}

            </div>
        @endfor
    @endfor
</div>
