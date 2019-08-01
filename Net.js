function Net() {

    var client = io();

    var nickname;
    var number;
    var rival;

    this.sendLogin = function(login){
        nickname = login;
        client.emit("playerLogin", { playerLogin:login });
    }

    this.sendTable = function(login, table){
        client.emit("readyTable", { playerLogin:login, playerTable:table });
    }

    this.sendShot = function(login,w1,w2){
        client.emit("sendShot", { player:login, w1:w1, w2:w2 });
    }

    client.on("fullInformation",function(data){
        game.downloadFullInfo(data.player1,data.player2,data.table1,data.table2);
    })

    client.on("startGame",function(data){
        game.downloadFirstTurn(data.firstplayer);
    })

    client.on("receiveShot",function(data){
        game.receiveShot(data.w1, data.w2);
    })

    client.on("playerAccepted", function (data) {
        console.log( data.playerAccepted );
        if( data.playerAccepted == nickname )
        {
            number = data.playerCount;
            if( number == 2 )
            {
                rival = "Joe";
                game.startGame(nickname,number,rival,data.table);
            }

        }
        else
        {
            rival = data.playerAccepted;
            if( data.playerCount == 2 )
            {
                game.startGame(nickname,number,rival,data.table);
            }
        }

    })
}
