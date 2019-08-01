function Game() {

    var scene;
    var camera;
    var renderer;
    var axis;

    var client = io();
    client.on("onconnect", function (data) {
        console.log(data.clientName);
        //nickname = data.clientName;
    })

    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany bedzie do określenie pozycji myszy na ekranie

    var sipModel;
    var sipClone;
    var clones = [];

    var Information = {};
    var toPlace = 0;                //  aktualnie stawiany klocek z tablicy
    var tableToPlace = [5,4,3,3,2]; //  tablica klockow do stawienia
    var pDirection = 0;             //  kierunek klocka
    var placingStatus = 0;          //  0 - nie stawiac, 1 - mozna stawiac, 2 - po stawianiu
    var playersTurn = "";

    function initEngine(){

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            50, // kąt patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight, // proporcje widoku
            0.1, // min renderowana odległość
            10000 // max renderowana odległość
        );
        renderer = new THREE.WebGLRenderer();
        axis = new THREE.AxisHelper(1500);
        scene.add(axis);

        renderer.setClearColor(0xffffff);
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function initObjects(){

        document.getElementById("gameZone").appendChild(renderer.domElement);
        camera.position.x = 1000;
        camera.position.y = 600;
        camera.position.z = 250;
        //nakierowanie kamery na punkt (0,0,0) w przestrzeni
        camera.lookAt(new THREE.Vector3(500,0,250));

        var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
       directionalLight.position.set( 200, 500, 200 );
       scene.add( directionalLight );

        createGameZone();
    }

    function initEvents(){
        document.addEventListener("mousedown", onMouseDown, false);
    }

    function animateScene() {
        camera.updateProjectionMatrix();
        requestAnimationFrame(animateScene);
        renderer.render(scene, camera);
        //console.log("działa")
        if( playersTurn == Information.opponent )
        {
            //console.log("3")
            placingStatus = 3;
            if( camera.position.x != 1000 )
            {
                camera.position.x += 5;
            }
        }
        if( playersTurn == Information.nickname)
        {
            //console.log("4")
            placingStatus = 4;
            if( camera.position.x != 300 )
            {
                camera.position.x -= 5;
            }
        }

        if( Information.enemySheepsLeft == 0 )
        {
            alert("Wygrałeś!")
        }
        if( Information.sheepsLeft == 0 )
        {
            alert("Przegrałeś!")
        }
    }

    initEngine();
    initObjects();
    initEvents();
    animateScene();

    function onMouseDown(event) {

        mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {

            // zerowy czyli najbliższy kamery jest tek którego potrzebujemy
            //console.log(intersects[0].object);
            clickedMesh = intersects[0].object;

            if( placingStatus == 1 && clickedMesh.name[0] == "f" )
            {
                var w1 = parseInt(clickedMesh.name.split('_')[1]);
                var w2 = parseInt(clickedMesh.name.split('_')[2]);
                checkPosition(w1,w2);
            }

            if( placingStatus == 4 && clickedMesh.name[0] == "e" )
            {
                var w1 = parseInt(clickedMesh.name.split('_')[1]);
                var w2 = parseInt(clickedMesh.name.split('_')[2]);
                console.log(Information.enTable[w1][w2]);
                net.sendShot(Information.nickname,w1,w2);
                if( Information.enTable[w1][w2] == 0 )
                {
                    var missPawn = new THREE.CubeGeometry(40, 40, 40);

                    var missMesh = new THREE.Mesh(missPawn,Materials.pudlo);

                    var tmppos = scene.getObjectByName("e_"+w1+"_"+w2);
                    missMesh.position.set(tmppos.position.x,tmppos.position.y,tmppos.position.z);
                    scene.add(missMesh);
                }
                if( Information.enTable[w1][w2] == 1 )
                {
                    var hitPawn = new THREE.CubeGeometry(40, 40, 40);

                    var hitMesh = new THREE.Mesh(hitPawn,Materials.redMat);

                    var tmppos = scene.getObjectByName("e_"+w1+"_"+w2);
                    hitMesh.position.set(tmppos.position.x,tmppos.position.y,tmppos.position.z);
                    Information.enemySheepsLeft--;
                    scene.add(hitMesh);
                }
                playersTurn = Information.opponent;
            }

        }
    }

    function createGameZone(){
        var wideplane = new THREE.PlaneBufferGeometry(10000, 10000);

        var planszaMesh = new THREE.Mesh(wideplane, Materials.grass);
        planszaMesh.rotateX(Math.PI / 2);
        planszaMesh.material.map.repeat.set(8, 8); //gęstość powtarzania
        planszaMesh.material.map.wrapS = planszaMesh.material.map.wrapT = THREE.RepeatWrapping; // powtarzanie w obu kierunkach
        planszaMesh.position.set(0,0,0);
        scene.add(planszaMesh);

        var fenceBlock = new THREE.CubeGeometry(10, 50, 10, 2, 2, 2);

        var fieldBlock = new THREE.CubeGeometry(40, 10, 40, 2, 2, 2);

        for( var f = 0; f < 40; f++ )
        {
/*            var tmpmat;

            if( f == 5 )
            tmpmat = Materials.fencewithhole;
            else if( f == 2 || f == 7 )
            tmpmat = Materials.fencewithcrack;
            else
            tmpmat = Materials.fence;
*/
            var fenceMesh = new THREE.Mesh(fenceBlock, Materials.fence);
            fenceMesh.position.set( 0, 25, f*12 );
            scene.add(fenceMesh);
        }


        for( var i = 2; i < 12; i++ )
        {
            for( var j = 9; j >= 0; j-- )
            {
                var fieldMesh = new THREE.Mesh(fieldBlock, Materials.dirt);
                fieldMesh.position.set( i*50, -4, j*50 );
                fieldMesh.name = "f_"+(i-2)+"_"+(9-j);
                scene.add(fieldMesh);
            }
        }

        for( var i = 2; i < 12; i++ )
        {
            for( var j = 0; j < 10; j++ )
            {
                var fieldMesh = new THREE.Mesh(fieldBlock, Materials.dirt);
                fieldMesh.position.set( i*(-50), -4, j*50 );
                fieldMesh.name = "e_"+(i-2)+"_"+(9-(9-j));
                scene.add(fieldMesh);
            }
        }

    }

    this.logMeIn = function(login){
        net.sendLogin(login);
    }

    $(".pDirection").click(function(){
        pDirection = parseInt(this.id.substring(1));
    })

    this.startGame = function(pLogin,pNumber,pRival,recTable){
        $("#loginScreen").css("zIndex","-1");
        Information.nickname = pLogin;
        Information.playerNumber = pNumber;
        Information.opponent = pRival;
        Information.table = JSON.parse(recTable);
        Information.sheepsLeft = 17;
        Information.enemySheepsLeft = 17;
        placingStatus = 1;
        animations.sheepNormalClose();
    }

    function checkPosition(i,j){
        //tableToPlace[toPlace];
        console.log(pDirection + " " + i + " " + j);
        var placeble = true;

        var sheepMat = new THREE.MeshBasicMaterial({
            color: 0xffffff, side: THREE.DoubleSide
        });

        var sheepPawn = new THREE.CubeGeometry(40, 40, 40);

        switch(pDirection){
            case 0: //left

            if( j-tableToPlace[toPlace] >= -1 ){
                for( var tj = j; tj > j-tableToPlace[toPlace]; tj-- ){
                    //console.log( Information.table[i][tj] + " " + i + " " + tj );
                    if( Information.table[i][tj] != 0 )
                    {
                        placeble = false;
                        alert("unplaceable");
                    }
                }

                if( placeble == true )
                for( var tj = j; tj > j-tableToPlace[toPlace]; tj-- ){
                    Information.table[i][tj] = 1;
                    //console.log( Information.table[i][tj] + " " + i + " " + tj );

                    var tmpObject = scene.getObjectByName( "f_" + i + "_" + tj );
                    var sheep = new THREE.Mesh(sheepPawn, sheepMat);
                    sheep.position.set( tmpObject.position.x , 0, tmpObject.position.z  );
                    sheep.name = "s_"+i+"_"+tj;
                    scene.add(sheep);
                }
            }
            else{
                placeble = false;
                alert("unplaceable");
            }

            break;
            case 1: //up
            if( i-tableToPlace[toPlace] >= -1 ){
                for( var ti = i; ti > i-tableToPlace[toPlace]; ti-- ){
                    //console.log( Information.table[ti][j] + " " + ti + " " + j );
                    if( Information.table[ti][j] != 0 )
                    {
                        placeble = false;
                        alert("unplaceable");
                    }
                }

                if( placeble == true )
                for( var ti = i; ti > i-tableToPlace[toPlace]; ti-- ){
                    Information.table[ti][j] = 1;
                    //console.log( Information.table[ti][j] + " " + ti + " " + j );
                    var tmpObject = scene.getObjectByName( "f_" + ti + "_" + j );
                    var sheep = new THREE.Mesh(sheepPawn, sheepMat);
                    sheep.position.set( tmpObject.position.x , 0, tmpObject.position.z  );
                    sheep.name = "s_"+ti+"_"+j;
                    scene.add(sheep);
                }
            }
            else{
                placeble = false;
                alert("unplaceable");
            }
            break;
            case 2: //right
            if( j+tableToPlace[toPlace] <= 10 ){
                for( var tj = j; tj < j+tableToPlace[toPlace]; tj++ ){
                    //console.log( Information.table[i][tj] + " " + i + " " + tj );
                    if( Information.table[i][tj] != 0 )
                    {
                        placeble = false;
                        alert("unplaceable");
                    }
                }

                if( placeble == true )
                for( var tj = j; tj < j+tableToPlace[toPlace]; tj++ ){
                    Information.table[i][tj] = 1;
                    //console.log( Information.table[i][tj] + " " + i + " " + tj );
                    var tmpObject = scene.getObjectByName( "f_" + i + "_" + tj );
                    var sheep = new THREE.Mesh(sheepPawn, sheepMat);
                    sheep.position.set( tmpObject.position.x , 0, tmpObject.position.z  );
                    sheep.name = "s_"+i+"_"+tj;
                    scene.add(sheep);
                }
            }
            else{
                placeble = false;
                alert("unplaceable");
            }
            break;
            case 3: //down
            if( i+tableToPlace[toPlace] <= 10 ){
                for( var ti = i; ti < i+tableToPlace[toPlace]; ti++ ){
                    //console.log( Information.table[ti][j] + " " + ti + " " + j );
                    if( Information.table[ti][j] != 0 )
                    {
                        placeble = false;
                        alert("unplaceable");
                    }
                }

                if( placeble == true )
                for( var ti = i; ti < i+tableToPlace[toPlace]; ti++ ){
                    Information.table[ti][j] = 1;
                    //console.log( Information.table[ti][j] + " " + ti + " " + j );
                    var tmpObject = scene.getObjectByName( "f_" + ti + "_" + j );
                    var sheep = new THREE.Mesh(sheepPawn, sheepMat);
                    sheep.position.set( tmpObject.position.x , 0, tmpObject.position.z  );
                    sheep.name = "s_"+ti+"_"+j;
                    scene.add(sheep);
                }
            }
            else{
                placeble = false;
                alert("unplaceable");
            }
            break;
        }

        if( placeble == true )
        {
            toPlace++;

            if( toPlace == 5 )
            {
                placingStatus = 2;
                net.sendTable(Information.nickname, JSON.stringify(Information.table));
            }
        }
    }

    this.downloadFullInfo = function(player1,player2,table1,table2){
        if( player1 == Information.nickname )
        {
                Information.opponent = player2;
                Information.enTable = JSON.parse(table2);
        }
        if( player2 == Information.nickname )
        {
                Information.opponent = player1;
                Information.enTable = JSON.parse(table1);
        }
    }

    this.downloadFirstTurn = function(firstplayer){
        playersTurn = firstplayer;
    }

    this.receiveShot = function( w1, w2 ){
        console.log(w1 + " " + w2);
        if( Information.table[w1][w2] == 0 )
        {
            var missPawn = new THREE.CubeGeometry(40, 40, 40);

            var missMesh = new THREE.Mesh(missPawn,Materials.pudlo);

            var tmppos = scene.getObjectByName("f_"+w1+"_"+w2);
            missMesh.position.set(tmppos.position.x,tmppos.position.y,tmppos.position.z);
            scene.add(missMesh);

            console.log("MISS");
        }
        if( Information.table[w1][w2] == 1 )
        {
            var hitPawn = new THREE.CubeGeometry(40, 40, 40);

            var hitMesh = new THREE.Mesh(hitPawn,Materials.redMat);

            var killed = scene.getObjectByName("s_"+w1+"_"+w2);
            scene.remove(killed);
            var tmppos = scene.getObjectByName("f_"+w1+"_"+w2);
            hitMesh.position.set(tmppos.position.x,tmppos.position.y,tmppos.position.z);
            Information.sheepsLeft--;
            scene.add(hitMesh);

            console.log("HIT");

            ac.bee();
        }
        playersTurn = Information.nickname;
    }

    ////////////////
}
