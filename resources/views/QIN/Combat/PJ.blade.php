<div class="EcranPJ">
@foreach($LstPerso as $Cle => $Perso)
    @if($Perso->id_fonction == 0)
    <div id="Ligne-{{$Cle}}" class="EcranLigne Ligne">
        <div class="NomPNJ EcranLigne">
            <div id="Indice-{{$Cle}}" class="NomLabel Colonne1 Droite Gras Numerique">{{$Perso->Lettre}}</div>
            <div id="Nom-{{$Cle}}" class="NomLabel Colonne2">{{$Perso->Nom}}</div>
            <div id="NbAction-{{$Cle}}" class="NomLabel Colonne3 Gras Centre Numerique">/</div>
        </div>

        <div class="EcranSeparateur"></div>
        <div id="LigneTrait-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-7">............ :</div>
            <div class="EcranLabel Colonne2-7">{{__("QIN/Combat.Trait")}}</div>
            <div id="Feu-{{$Cle}}" class="EcranCellule Feu Centre Numerique Colonne8-9" enabled></div>
            <div id="Bois-{{$Cle}}" class="EcranCellule Bois Centre Numerique Colonne10-11" enabled></div>
            <div id="Terre-{{$Cle}}" class="EcranCellule Terre Centre Numerique Colonne12-13" enabled></div>
            <div id="Metal-{{$Cle}}" class="EcranCellule Metal Centre Numerique Colonne14-15" enabled></div>
            <div id="Eau-{{$Cle}}" class="EcranCellule Eau Centre Numerique Colonne16-17" enabled></div>
        </div>

        <div id="LigneChi-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-5">...... :</div>
            <div class="EcranLabel Colonne2-5">{{__("QIN/Combat.CHI")}}</div>
            <div id="CHI-{{$Cle}}" class="EcranCellule Colonne6-7 Centre Numerique" enabled></div>
            <div class="EcranPoint Colonne8-14">.... :</div>
            <div class="EcranLabel Colonne8-14">{{__("QIN/Combat.BonusCHI2")}}</div>
            <select id="BonusChi-{{$Cle}}" class="EcranSelect Colonne15-17 Numerique">
            </select>
        </div>

        <div id="LigneTao-{{$Cle}}" class="EcranLigne PersoDef">
            <select id="Tao-{{$Cle}}" class="EcranSelect Colonne2-14">
            </select>
            <select id="BonusTao-{{$Cle}}" class="EcranSelect Colonne15-17 Numerique">
            </select>
        </div>

        @switch($Perso->id_fonction)
            @case(0)
            @case(7)
                <div id="LignePV-{{$Cle}}" class="EcranLigne PersoDef">
                    <div class="EcranPoint Colonne2-8">....... :</div>
                    <div class="EcranLabel Colonne2-8">{{__("QIN/Combat.PV")}}</div>
                    <div id="PV-{{$Cle}}" class="EcranCellule Colonne9-14 Centre Numerique" enabled>{{$Perso->PV}}</div>
                    <div id="Malus-{{$Cle}}" class="EcranCellule Colonne15-17 Centre Numerique" enabled></div>
                </div>
                @break
        @endswitch

        <div id="LigneDefense-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-8">. :</div>
            <div class="EcranLabel Colonne2-8">{{__("QIN/Combat.DefensePassive")}}</div>
            <div id="DefensePassive-{{$Cle}}" class="EcranCellule Colonne9-10 Centre Numerique" enabled></div>
            <div class="EcranPoint Colonne11-15">. :</div>
            <div class="EcranLabel Colonne11-15">{{__("QIN/Combat.Resistance")}}</div>
            <div id="Resistance-{{$Cle}}" class="EcranCellule Colonne16-17 Centre Numerique" enabled>{{$Perso->Resistance}}</div>
        </div>

        <div id="LigneDefendre-{{$Cle}}" class="EcranLigne PersoDef">
            <select id="DefenseContre-{{$Cle}}" class="EcranSelect Colonne2-10">
            </select>
            <select id="JetDefense-{{$Cle}}" class="EcranSelect Colonne11-17">
            </select>
        </div>

        <div id="LigneArmure-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-6">..... :</div>
            <div class="EcranLabel Colonne2-6">{{__("Combat.Armure")}}</div>
            <div id="Armure-{{$Cle}}" class="EcranCellule Colonne7-8 Centre Numerique" enabled></div>
            <select id="TypeArmure-{{$Cle}}" class="EcranSelect Colonne9-17">
            </select>
        </div>

        <div id="LigneANaturel-{{$Cle}}" class="EcranLigne PersoDef">
            <div id="ANaturel-{{$Cle}}" class="EcranCellule Colonne7-8 Centre Numerique" enabled></div>
            <select id="TypeANaturel-{{$Cle}}" class="EcranSelect Colonne9-17">
            </select>
        </div>

        <div id="LigneBouclier-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-6">..... :</div>
            <div class="EcranLabel Colonne2-6">{{__("Combat.Bouclier")}}</div>
            <div id="Bouclier-{{$Cle}}" class="EcranCellule Colonne7-8 Centre Numerique" enabled></div>
            <select id="TypeBouclier-{{$Cle}}" class="EcranSelect Colonne9-17">
            </select>
        </div>

        <div id="LigneInit-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-8">........... :</div>
            <div class="EcranLabel Colonne2-8">{{__("QIN/Combat.Initiative")}}</div>
            <select id="TypeInit-{{$Cle}}" class="EcranSelect Colonne9-17">
            </select>
        </div>

        <div id="LigneCible-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-6">......... :</div>
            <div class="EcranLabel Colonne2-6">{{__("Combat.Cible")}}</div>
            <select id="Cible-{{$Cle}}" class="EcranSelect Colonne7-17">
            </select>
        </div>

        <div id="LigneAction-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-6">....... :</div>
            <div class="EcranLabel Colonne2-6">{{__("Combat.Action")}}</div>
            <select id="Action-{{$Cle}}" class="EcranSelect Colonne7-17">
            </select>
        </div>

        <div id="LigneTypeAttaque-{{$Cle}}" class="EcranLigne PersoDef">
            <select id="TypeAttaque-{{$Cle}}" class="EcranSelect Colonne2-10">
            </select>
            <select id="JetAttaque-{{$Cle}}" class="EcranSelect Colonne11-17">
            </select>
        </div>

        <div id="LigneArme-{{$Cle}}" class="EcranLigne PersoDef">
            <div class="EcranPoint Colonne2-6">........ :</div>
            <div class="EcranLabel Colonne2-6">{{__("Combat.Arme")}}</div>
            <div id="Arme-{{$Cle}}" class="EcranCellule Colonne7-8 Centre Numerique" enabled></div>
            <select id="TypeArme-{{$Cle}}" class="EcranSelect Colonne9-17">
            </select>
        </div>

        <div class="EcranSeparateur"></div>
    </div>
    @endif
@endforeach
</div>
