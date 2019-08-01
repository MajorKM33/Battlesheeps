// animations.sheepNormalOpen
//

function AnimationsController(){

  this.bee = function(){

    animations.sheepNormalOpen();
    setTimeout(function(){
          animations.sheepNormalClose();
    },500)

  }

}
