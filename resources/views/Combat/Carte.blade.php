<div class="FondCarte">
    <div id="Carte" class="Carte">
        <img id="Dessin" class="Grille" src="../resources/Cartes/Carte04.jpg" alt="Carte">
        @for($x = 1; $x <= $Carte->nb_ox; $x++)
            @for($y = 1; $y <= $Carte->nb_oy; $y++)
                <div id="FiltreCellule-{{$x}}-{{$y}}" class="FiltreCellule CelluleCarre Numerique Centre" 
                    style="grid-column:{{$x}};grid-row:{{$y}};">
                </div>
                <div id="FiltreMasque-{{$x}}-{{$y}}" class="FiltreMasque CelluleCarre Numerique Centre" 
                    style="grid-column:{{$x}};grid-row:{{$y}};">
                </div>
                <div id="FiltreOmbre-{{$x}}-{{$y}}" hidden class="FiltreOmbre CelluleCarre Numerique Centre" 
                    style="grid-column:{{$x}};grid-row:{{$y}};">
                </div>
                <div id="FiltreLegende-{{$x}}-{{$y}}" class="FiltreLegende CelluleCarre Numerique Centre" 
                    style="grid-column:{{$x}};grid-row:{{$y}};">
                </div>
            @endfor
        @endfor
    </div>
</div>
