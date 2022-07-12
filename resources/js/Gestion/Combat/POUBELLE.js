//let PtrDate = setInterval(Horloge, 250);
var LstArmure       = new Array();
var LstBouclier     = new Array();


function RecuperationListeArmure()
{
    console.log("Recuperation de la liste des armures");
    $.ajax({
        method: "GET",
        url: "Liste/Armure",
        data: { Message: $('#Message').val() }
    }).done(function(text) {
        LstArmure = JSON.parse(text);
    });
    if(LstArmure.length > 0)
    {
        LstRecup++;
    }
}
function RecuperationListeBouclier()
{
    console.log("Recuperation de la liste des boucliers");
    $.ajax({
        method: "GET",
        url: "Liste/Bouclier",
        data: { Message: $('#Message').val() }
    }).done(function(text) {
        LstBouclier = JSON.parse(text);
    });
    if(LstBouclier.length > 0)
    {
        LstRecup++;
    }
}
