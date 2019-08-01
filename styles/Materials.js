function Materials(){}

Materials.greenMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00, side: THREE.DoubleSide
});

Materials.planszaText = new THREE.MeshBasicMaterial({
    color: 0x00ff00, side: THREE.DoubleSide
});

Materials.darkGreenMat = new THREE.MeshBasicMaterial({
    color: 0x005500, side: THREE.DoubleSide
});

Materials.brownMat = new THREE.MeshBasicMaterial({
    color: 0x523b33, side: THREE.DoubleSide
});

Materials.blueMat = new THREE.MeshBasicMaterial({
    color: 0x0000ff, side: THREE.DoubleSide
});

Materials.redMat = new THREE.MeshBasicMaterial({
    color: 0xff0000, side: THREE.DoubleSide
});

var cardboard = [];

cardboard.push(new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/paper_box_side.png') }));
cardboard.push(new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/paper_box_side2.png') }));
cardboard.push(new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/paper_box_top.png') }));
cardboard.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/paper_box_top.png') }));
cardboard.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/paper_box_side3.png') }));
cardboard.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/paper_box_side3.png') }));


Materials.pudlo = new THREE.MeshFaceMaterial(cardboard);
Materials.grass = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/grass.png') })
Materials.dirt = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/dirt.png') })
Materials.fence = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/fence.png') })
Materials.fencewithhole = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/fence_with_hole.png') })
Materials.fencewithcrack = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture('img/fence_with_crack.png') })
