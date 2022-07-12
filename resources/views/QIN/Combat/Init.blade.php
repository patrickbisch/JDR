@foreach($LstPerso as $Cle => $Perso)
    <div id="Init-{{$Cle}}" class="Ligne Initiative">
        <div class="TraitSeparateur"></div>
        <div class="NomInit">
            <div id="InitNum-{{$Cle}}" class="Indice Numerique">_</div>
            <div id="InitNom-{{$Cle}}" class="Nom"></div>
            <div id="InitValeur-{{$Cle}}" class="Valeur Numerique"> </div>
        </div>
    </div>
@endforeach
