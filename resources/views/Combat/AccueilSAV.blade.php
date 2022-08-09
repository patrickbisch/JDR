<body>
    <form action="{{url('Combat/Gestion')}}" method="post">
            {{csrf_field()}}
    <div class="FondPrincipal">

        <button id="BtnValider" class="Bouton BtnValider Info" name="Action" value="Valider" type="submit">
            <img height="52" src="../resources/Images/Valider.png" alt="Valider">
            <span class="InfoBulle">
                {{__('Combat.InfoValider')}}
            </span>
        </button>

    </div>


</form>
</body>
</html>