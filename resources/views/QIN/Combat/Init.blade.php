<div class="EcranInit">
@foreach($LstPerso as $Cle => $Perso)
    <div id="Init-{{$Cle}}" class="EcranLigne Ligne">
        <div class="NomInit EcranLigne">
            <div id="InitNum-{{$Cle}}" class="NomLabel Colonne1 Droite Gras Numerique">{{$Perso->Lettre}}</div>
            <div id="InitNom-{{$Cle}}" class="NomLabel Colonne2">{{$Perso->Nom}}</div>
            <div id="InitValeur-{{$Cle}}" class="NomLabel Colonne3 Centre Numerique">/</div>
        </div>
    </div>
@endforeach
</div>
