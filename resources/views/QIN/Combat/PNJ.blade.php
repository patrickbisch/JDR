<?php
    $LstInit = [["A", "Automatique", ""],
                ["I", "Identique", ""],
                ["1", "1", ""],
                ["5", "5", ""],
                ["9", "9", ""],
                ["D0", "Double 0", ""],
                ["D1", "Double 1", ""],
                ["D9", "Double 9", ""],
                ];
?>

@foreach($LstPerso as $Cle => $Perso)
    @if($Perso->id_fonction == 0)
        @break
    @endif

    <div id="Ligne-{{$Cle}}" class="Ligne Personnage">
        <div class="TraitSeparateur"></div>
        <div class="NomPNJ">
            <div id="Indice-{{$Cle}}" class="Indice Numerique">{{$Perso->Lettre}}</div>
            <div id="Nom-{{$Cle}}" class="Nom">{{$Perso->Nom}}</div>
            <div id="NbAction-{{$Cle}}" class="NbAction Numerique">/</div>
        </div>

        <div class="LignePerso LigneTrait DonneeDef">
            <div class="Colonne2-3 Droite">................. :</div>
            <div class="DonneeLab">{{__("QIN/Combat.Trait")}}</div>
            <div id="Feu-{{$Cle}}" class="Trait Feu Numerique Colonne4" enabled>{{$Perso->Feu}}</div>
            <div id="Bois-{{$Cle}}" class="Trait Bois Numerique Colonne5" enabled>{{$Perso->Bois}}</div>
            <div id="Terre-{{$Cle}}" class="Trait Terre Numerique Colonne6" enabled>{{$Perso->Terre}}</div>
            <div id="Metal-{{$Cle}}" class="Trait Metal Numerique Colonne7" enabled>{{$Perso->Metal}}</div>
            <div id="Eau-{{$Cle}}" class="Trait Eau Numerique Colonne8" enabled>{{$Perso->Eau}}</div>
        </div>

        <div id="LigneChi-{{$Cle}}" class="LignePerso DonneeDef">
            <div class="Colonne2 Droite">........... :</div>
            <div class="DonneeLab">{{__("QIN/Combat.CHI")}}</div>
            <div id="CHI-{{$Cle}}" class="CHI Trait Colonne3 Numerique" enabled>{{$Perso->CHI}}</div>
            <div class="Colonne4-6 Droite">.... :</div>
            <div class="Colonne4-6">{{__("QIN/Combat.BonusCHI")}}</div>
            <select id="BonusChi-{{$Cle}}" class="Action Colonne7-8 EcranSelect Droite DonneeSelect">
                <option value="0" selected></option>
                @for($x = 1; $x <= $Perso->Terre; $x++)
                    <option value="{{$x}}">{{$x}}</option>
                @endfor
            </select>
        </div>

        @switch($Perso->id_fonction)
            @case(1)
            @case(2)
            @case(3)
                <div id="LignePV-{{$Cle}}" class="LigneCombat LignePerso DonneeDef">
                    <div class="Colonne2-3 Droite">.......... :</div>
                    <div class="DonneeLab">{{__("QIN/Combat.PV")}}</div>
                    <div id="PV-{{$Cle}}" class="Trait Colonne4-6 Numerique" enabled>{{$Perso->PV}}</div>
                </div>
                @break
            @case(0)
            @case(7)
                <div id="LignePV-{{$Cle}}" class="LignePerso DonneeDef">
                    <div class="Colonne2-3 Droite">.......... :</div>
                    <div class="DonneeLab">{{__("QIN/Combat.PV")}}</div>
                    <div id="PV-{{$Cle}}" class="Trait Colonne4-7 Numerique" enabled>{{$Perso->PV}}</div>
                    <div id="Malus-{{$Cle}}" class="Trait Colonne8 Numerique" enabled>{{$Perso->Malus}}</div>
                </div>
                @break
            @default
                @for($x = 0; $x < $NbPJ; $x++)
                    <div id="LignePV-{{$Cle}}-{{$x}}" class="LignePerso DonneeDef">
                        <div id="PJ-{{$Cle}}-{{$x}}" class="Colonne2-3">&#{{97+$x}}.</div>
                        <div id="Nb-{{$Cle}}-{{$x}}" class="Trait Colonne4 EcranSelect Numerique" enabled>Z</div>
                        <button id="Moins-{{$Cle}}-{{$x}}" class="Colonne3 Bouton BtnMoins Droite" name="Action" value="Moins" type="submit">
                            <img height="18" src="../resources/Images/Bas.png" alt="Bas">
                        </button>
                        <button id="Plus-{{$Cle}}-{{$x}}" class="Colonne5 Bouton BtnPlus Gauche" name="Action" value="Plus" type="submit">
                            <img height="18" src="../resources/Images/Haut.png" alt="Plus">
                        </button>
                        <div id="PV-{{$Cle}}-{{$x}}" class="Trait Colonne6-8 Numerique" enabled>{{$Perso->PV}}</div>
                    </div>
                @endfor
                <div id="LignePV-{{$Cle}}" class="LignePerso DonneeDef">
                    <div class="Colonne2-3 Droite">........ :</div>
                    <div class="DonneeLab">{{__("QIN/Combat.Libre")}}</div>
                    <div id="Libre-{{$Cle}}" class="Trait Colonne4 Numerique Centre " enabled>X</div>
                    <div class="Colonne4-6 Droite">{{__("QIN/Combat.Mort")}}</div>
                    <div id="Mort-{{$Cle}}" class="Trait Colonne7 Numerique" enabled>Y</div>
                </div>
        @endswitch

        <div id="LigneDefense-{{$Cle}}" class="LigneCombat LignePerso DonneeDef">
            <div class="Colonne2-3 Droite">. :</div>
            <div class="DonneeLab">{{__("QIN/Combat.DefensePassive")}}</div>
            <div id="DefensePassive-{{$Cle}}" class="Trait Colonne4 Numerique" enabled>{{$Perso->DefensePassive}}</div>
            <div class="Colonne5-7 Droite">..... :</div>
            <div class="Colonne5-7">{{__("QIN/Combat.Resistance")}}</div>
            <div id="Resistance-{{$Cle}}" class="Trait Colonne8 Numerique" enabled>{{$Perso->Resistance}}</div>
        </div>

        <div id="LigneArmure-{{$Cle}}" class="LigneCombat LigneArmure LignePerso DonneeDef">
            <div class="Colonne2-3 Droite">.............. :</div>
            <div class="DonneeLab">{{__("Combat.Armure")}}</div>
            <div id="Armure-{{$Cle}}" class="Numerique Colonne4 Trait"> </div>
            <select id="TypeArmure-{{$Cle}}" class="EcranSelect Colonne5-8">

            </select>
        </div>

        <div id="LigneBouclier-{{$Cle}}" class="LigneCombat LigneBouclier LignePerso DonneeDef">
            <div class="Colonne2-3 Droite">............. :</div>
            <div class="DonneeLab">{{__("Combat.Bouclier")}}</div>
            <div id="Bouclier-{{$Cle}}" class="Numerique Colonne4 Trait"> </div>
            <select id="TypeBouclier-{{$Cle}}" class="EcranSelect Colonne5-8">

            </select>
        </div>

        <?php 
            $LstInit[1][2] = "selected";
            $LstInit[0][2] = ""; 
            if($Perso->id_fonction == 7)
            {
                $LstInit[0][2] = "selected";
                $LstInit[1][2] = "";
            }
        ?>
        <div id="LigneInit-{{$Cle}}" class="LigneInit LignePerso DonneeDef">
            <div class="Colonne2-3 Droite">............ :</div>
            <div class="DonneeLab">{{__("QIN/Combat.Initiative")}}</div>
            <select id="TypeInit-{{$Cle}}" class="EcranSelect DonneeSelect TypeInit">
                @for($y = 0; $y < count($LstInit); $y++)
                    <option value="{{$LstInit[$y][0]}}" {{$LstInit[$y][2]}}>
                        {{$LstInit[$y][1]}}
                    </option>
                @endfor
            </select>
        </div>
        <?php 
            $LstInit[0][2] = ""; 
            $LstInit[1][2] = "";
        ?>

        @switch($Perso->id_fonction)
            @case(4)
            @case(5)
            @case(6)
                @break
            @default
                <div id="LigneCible-{{$Cle}}" class="LigneCombat LignePerso DonneeDef">
                    <div class="Colonne2-3 Droite">.................. :</div>
                    <div class="DonneeLab">{{__("Combat.Cible")}}</div>
                    <select id="Cible-{{$Cle}}" class="Cible EcranSelect DonneeSelect">
                    </select>
                </div>
        @endswitch

        <div id="LigneAction-{{$Cle}}" class="LigneAction LignePerso DonneeDef">
            <div class="Colonne2-3 Droite">................ :</div>
            <div class="DonneeLab">{{__("Combat.Action")}}</div>
            <select id="Action-{{$Cle}}" class="Action EcranSelect DonneeSelect">
                <option value="0" selected></option>
                <option value="1">{{__("Combat.Attaque")}}</option>
                <option value="2">{{__("Combat.Mouvement")}}</option>
                <option value="3">{{__("Combat.Aucune")}}</option>
            </select>
        </div>

        <div id="LigneTypeAttaque-{{$Cle}}" class="LigneTypeAttaque LignePerso DonneeDef">
            <select id="TypeAttaque-{{$Cle}}" class="EcranSelect Colonne2-4">
                
            </select>
            <select id="JetAttaque-{{$Cle}}" class="JetAttaque EcranSelect Colonne5-8">

            </select>
        </div>

        <div id="LigneArme-{{$Cle}}" class="LigneArme LignePerso DonneeDef">
            <div class="Colonne2 Droite">......... :</div>
            <div class="Colonne2">{{__("Combat.Arme")}}</div>
            <div id="Arme-{{$Cle}}" class="Numerique Colonne3 Trait"></div>
            <select id="TypeArme-{{$Cle}}" class="TypeArme EcranSelect DonneeSelect">

            </select>
        </div>

        <div id="LigneDefendre-{{$Cle}}" class="LigneDefendre LignePerso DonneeDef">
            <div class="Colonne2 Droite">.. :</div>
            <div class="Colonne2">{{__("Combat.DefenseContre")}}</div>
            <div class="Colonne3 Trait Numerique"></div>
            <select id="DefenseContre-{{$Cle}}" class="EcranSelect Colonne4-5">
                <option value="" selected disabled></option>
                <option value="0">NON</option>
                <option value="E">{{__("Combat.Esquive")}}</option>
                <option value="P">{{__("Combat.Parade")}}</option>
            </select>
            <select id="JetDefense-{{$Cle}}" class="EcranSelect Colonne6-8">

            </select>
        </div>

    </div>
@endforeach