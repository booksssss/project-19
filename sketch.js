var ground_image;
var PLAY=1
var END=0
var gameState = PLAY;
var dog, dog_running,dog_collided;
var star_Img;
var rock_Img;
var ground,invisibleGround;
var starsGroup;
var rocksGroup;
var score = 0;
var reset_Img, restart;
var gameover_Img;




function preload(){
dog_running = loadAnimation("corgi_1.png","corgi_2.png");
star_Img = loadImage("star 3.png");
rock_Img = loadImage ("rock.png");
ground_image = loadImage("bg_2.png");
reset_Img = loadImage("reset.png");
dog_collided = loadAnimation("corgi_3.png");
gameover_Img = loadImage("gameover1.png");
//dog_collided = loadImage("corgi_1.png");

}

function setup() {
 createCanvas(windowWidth,windowHeight);
 ground = createSprite(width/2,height-50,width,10);
 ground.scale = 4.5;
 ground.addImage("ground",ground_image);
 ground.x = ground.width/2;
 //ground.velocityX = 6
 

invisibleGround = createSprite(width/2,height-30,width,10);
invisibleGround.visible = false;

 dog = createSprite(200,height-100,20,50);
 dog.addAnimation("running",dog_running);
 dog.addAnimation("collided", dog_collided);
 dog.scale = 0.4;
 //dog.velocityX=1

 starsGroup = createGroup();
 rocksGroup = createGroup();
 //dogsGroup.add(dog);

 restart = createSprite(width/2,height/2);
 restart.addImage(reset_Img);

 gameover = createSprite(width/2, height/2 +150);
 gameover.addImage(gameover_Img);
 gameover.scale = 0.2

 restart.visible = false;


}

function draw() {

 background("white");
 //dog.debug = true;
//  dog.setCollider ("circle",0.2,0.2);
dog.setCollider("circle",0,0,140);
if (gameState = PLAY) {
    if(keyDown("space") && dog.y >= height - 155) { 
        dog.velocityY = -14;
 
        
       } 
dog.velocityY=dog.velocityY+0.8;

gameover.visible = false;

dog.changeAnimation("running");

dog.collide(invisibleGround);
spawn_Stars();
spawn_Rocks()
//console.log(frameCount);

if (ground.x < width){
ground.x = ground.width/2;
 }

 ground.velocityX=-6

 if (starsGroup.isTouching(dog)) {
     score = score + 2
     starsGroup.destroyEach()
 }


 if (rocksGroup.isTouching(dog)) {
  
  gameState = END;
  //rocksGroup.destroyEach()
}
}

 if (gameState === END) {
  //dog.changeAnimation("collided",dog_collided);
  
  gameover.visible = true;
  restart.visible = true;
  
  ground.velocityX = 0;
  dog.velocityY=0;
  
  starsGroup.setVelocityXEach(0);
  rocksGroup.setVelocityXEach(0);
  

  dog.changeAnimation("collided",dog_collided);

  rocksGroup.setLifetimeEach(-1);
  starsGroup.setLifetimeEach(-1);
  //rocksGroup.visible=false;

  //rocksGroup.destroyEach();

  if(mousePressedOver(restart)) {
    reset();
  }
    

  
}



    
      
 drawSprites();
 textSize(20);
  fill("black");
  text("Score: "+ score,150,30);
}

function spawn_Stars() {
    if(frameCount % 310 === 0) {
      var star = createSprite(width/2,height-30,10,40);
      star.addImage("star",star_Img);
      star.scale = 0.1;
      star.velocityX = -7.5
      star.lifetime = 250;

      starsGroup.add(star);
    }
}

function spawn_Rocks() {
  if(frameCount % 150 === 0) {
    var rock = createSprite(width,height-30,10,40);
    rock.addImage("rock",rock_Img);
    rock.scale = 0.1;
    rock.velocityX = -7.5;
    rock.lifetime = 250;

    rocksGroup.add(rock);

    rock.depth = dog.depth;
    dog.depth = dog.depth + 1;


  



  }
}

function reset() {
  gameState = PLAY;
  restart.visible = false;
  gameover.visible = false;
  
  rocksGroup.destroyEach();
  starsGroup.destroyEach();

  //ground.x = ground.width/2;
  //ground.velocityX = 6;

  score=0;
  
}
