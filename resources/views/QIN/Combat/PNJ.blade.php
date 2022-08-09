<div class="EcranPNJ">
@foreach($LstPerso as $Cle => $Perso)
    @if($Perso->id_fonction <> 0)
    <div id="Ligne-{{$Cle}}" class="EcranLigne Ligne">
        <div class="NomPNJ EcranLigne">
            <div id="Indice-{{$Cle}}" class="NomLabel Colonne1 Droite Gras Numerique">{{$Perso->Lettre}}</div>
            <div id="Nom-{{$Cle}}" class="NomLabel Colonne2">{{$Perso->Nom}}</div>
            <div id="NbAction-{{$Cle}}" class="NomLabel Colonne3 Gras Centre Numerique">/</div>
        </div>




        <div>Premiere ligne</div>


    </div>
    @endif
@endforeach
</div>
