
/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {
    $("#sendLogin").click(function(){
        game.logMeIn($("#login").val());
    })
}
