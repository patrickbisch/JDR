<div class="MenuBas">
    <div class="DefinitionCouleur" hidden>
        <div id="CouleurLigne" class="CouleurLigne">CouleurLigne</div>
        <div id="Info">{{$Carte->id}}/{{$Carte->id_joueur}}/{{$User->id}}/{{$Rencontre->id_rencontre}}</div>
        <div id="MatriceType">{{$Carte->quadrillage}}</div>
        <div id ="PositionPNJ">{{$Rencontre->zone_pnj}}</div>
        <div id ="EntrePJ">{{$Rencontre->zone_pj}}</div>
    </div>

    <div class="Rencontre EcranCellule">{{$Rencontre->rencontre}}</div>

    <button id="Histo-Bas" class="Bouton BoutonHisto" name="Action" value="Histo-Bas" type="submit">
        <img height="28" src="../resources/Images/Bas.png" alt="Historique">
    </button>
    <button id="Histo-Haut" class="Bouton BoutonHisto" name="Action" value="Histo-Haut" type="submit">
        <img height="28" src="../resources/Images/Haut.png" alt="Historique">
    </button>

    <div id="MessageTexte" class="ZoneMessage">Zone Message</div>

    <button id="Journal-Bas" class="Bouton BoutonJournal" name="Action" value="Journal-Bas" type="submit">
        <img height="28" src="../resources/Images/Bas.png" alt="Journal">
    </button>
    <button id="Journal-Haut" class="Bouton BoutonJournal" name="Action" value="Journal-Haut" type="submit">
        <img height="28" src="../resources/Images/Haut.png" alt="Journal">
    </button>

    <div class="Campagne EcranCellule">{{$CampagneTitre}}</div>
    <div id="MatriceTaille" class="EcranCellule MatriceTaille">{{$Carte->nb_ox}}x{{$Carte->nb_oy}}</div>

    <span id="TexteHistorique" class="TexteHisto">
        Bonjour<br>
        C'est l'historique<br>
    </span>
    <span id="TexteJournal" class="TexteJournal">
        Coucou<br>
        C'est le journal<br>GRos bisous
    </span>
</div>
