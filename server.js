var socketio = require("socket.io");
var fs = require("fs");
var qs = require("querystring");
var http = require("http");
var server = http.createServer(function (req, res) {
    console.log("żądany przez przeglądarkę adres: " + req.url)

    switch (req.method) {
        case "GET":

        if (req.url === "/") {
            fs.readFile("index.html", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/styles/global.css") {
            fs.readFile("styles/global.css", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/libs/socket.io-1.4.5.js") {
            fs.readFile("libs/socket.io-1.4.5.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/libs/jquery-1.12.2.js") {
            fs.readFile("libs/jquery-1.12.2.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/libs/three.js") {
            fs.readFile("libs/three.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/ColladaLoader.js") {
            fs.readFile("ColladaLoader.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/models/sip.js") {
            fs.readFile("models/sip.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }



        else if (req.url === "/Animations.js") {
            fs.readFile("Animations.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/AnimationsController.js") {
            fs.readFile("AnimationsController.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/styles/Materials.js") {
            fs.readFile("styles/Materials.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/Ui.js") {
            fs.readFile("Ui.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/Net.js") {
            fs.readFile("Net.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/Game.js") {
            fs.readFile("Game.js", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/paper_box_side.png") {
            fs.readFile("img/paper_box_side.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/paper_box_side2.png") {
            fs.readFile("img/paper_box_side2.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/paper_box_side3.png") {
            fs.readFile("img/paper_box_side3.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/paper_box_top.png") {
            fs.readFile("img/paper_box_top.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/old_tv.png") {
            fs.readFile("img/old_tv.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/wooden_crate.png") {
            fs.readFile("img/wooden_crate.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/crater.png") {
            fs.readFile("img/grass.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/dirt.png") {
            fs.readFile("img/dirt.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/grass.png") {
            fs.readFile("img/grass.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/fence.png") {
            fs.readFile("img/fence.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/fence_with_crack.png") {
            fs.readFile("img/grass.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        else if (req.url === "/img/fence_with_hole.png") {
            fs.readFile("img/grass.png", function (error, data) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            })
        }

        break;

        case "POST":
        break;

    }
})

console.log("Serwer działa.");
server.listen(3000);

var tables = [];

var table00 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
];

var table10 = table00;

tables.push(table00);
tables.push(table10);

var players = [];
var readyPlayers = 0;
var playerTurn = 0;

var io = socketio.listen(server);

io.sockets.on("connection", function (client) {
    console.log("klient sie podłączył"+ client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io

    client.emit("onconnect", {
        clientName:client.id
    })

    client.on("playerLogin", function (data) {
        console.log( data.playerLogin );
        players.push(data.playerLogin);
        if( players.length == 1 )
        {
            var tableToSend = JSON.stringify(table00);
        }
        if( players.length == 2 )
        {
            var tableToSend = JSON.stringify(table10);
        }
        io.sockets.emit("playerAccepted", { playerAccepted: data.playerLogin, playerCount: players.length, table: tableToSend });
    })

    client.on("readyTable", function (data) {
        for( var i = 0; i < players.length; i++ )
        {
            if( data.playerLogin == players[i] )
            {
                tables[i] = JSON.parse(data.playerTable);
                readyPlayers++;
            }
        }

        if( readyPlayers == 2 )
        {
            io.sockets.emit("fullInformation", { player1: players[0], player2: players[1], table1: JSON.stringify(tables[0]), table2: JSON.stringify(tables[1]) });

            io.sockets.emit("startGame", { firstplayer:players[playerTurn] });
        }
    })

    client.on("sendShot", function (data) {
        playerTurn++;
        if( playerTurn == 2 )
        playerTurn = 0;
        client.broadcast.emit("receiveShot", { w1:data.w1, w2:data.w2 });
    })
/*
    client.on("playerConfirm", function (data) {
        console.log( data.playerLogin );
        players.push(data.playerLogin);
        client.broadcast.emit("playerAccepted", { playerAccepted: data.playerLogin, playerCount: players.length });
    })
*/
    client.on("disconnect", function () {
        console.log("klient się rozłącza")
    })

})
