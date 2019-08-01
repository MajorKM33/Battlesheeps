function Sip() {

    var innerCont = new THREE.Object3D();
    var outerCont = new THREE.Object3D();

    this.loadGrave = function () {
        var loader = new THREE.ColladaLoader();
        loader.load( "models/sip.xml",
            function (collada) {
                innerCont = collada.scene;
/*
                innerCont.traverse(function (child) {

                    if (child instanceof THREE.Mesh) {
                        //console.log(child)

                        for (i = 0; i < innerCont.children.length; i++) {
                           // console.log(innerCont.children[i].name)
                            //if (innerCont.children[i].name == "fuselage") {
                                innerCont.children[i].material = Materials.blackhawkMaterial;
                            //}
                        }

                    }

                });
                */
               // console.log(innerCont.children)

                outerCont.add(innerCont);

                //wyskaluj model
                //innerCont.rotation.y = Math.PI
                //innerCont.rotation.z = Math.PI;

               // innerCont.rotation.x = Math.PI;
               innerCont.position.set(0,0,0);
               innerCont.scale.set(1,1,1);
            },

            function (e) {

                console.log( e.loaded)
                console.log(e.total)

            }
        );

        return outerCont;
    }

}
