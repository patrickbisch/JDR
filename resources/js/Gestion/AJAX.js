let PtrDate = setInterval(Horloge, 1000);
let DernierMsg = 0;
let LstPerso = Array();

function Horloge() {
    const Dt = new Date();
    document.getElementById("Montre").innerHTML = Dt.toLocaleTimeString();
    DernierMsg++;
    if(parseInt(DernierMsg) == 9)
    {
        console.log("Recuperer les dernieres commandes");
        document.getElementById("ZoneMsg").innerHTML = "Recup : " + Dt.toLocaleTimeString();
          $.ajax({
            method: "GET",
            url: "Commande/Liste",
            data: { Message: $('#Message').val() }
          }).done(function(text) {
            var jv = JSON.parse(text);
            // $("main").html(jv[2].commande);
          });
        DernierMsg = 0;

        console.log("Lancement de l'ajax");
        $.ajax({
          method: "GET",
          url: "Combat/Liste/Personnage",
          data: { Message: $('#Message').val() }
        }).done(function(text) {
            LstPerso = JSON.parse(text);
        });
        console.log("Recupere la liste des personnages");
        for(let x = 0; x < LstPerso.length; x++)
        {
            console.log("N° "+x+" >> "+LstPerso[x].personnage);
        }
        console.log("Recupere la liste des personnages");
    
    }
}

$(document).ready(function(){
    console.log("Le document est pret !");
    $("#Action").click(function(e){
        // alert("Bouton #Action clické !");
        $.ajax({
            method: "GET",
            url: "Commande/Ajouter",
            data: { Message: $('#Message').val() }
          }).done(function(Retour) {
            $("ZoneMsg").html(Retour);
        });
    });
});

// alert("Chargement d'AJAX.js");
