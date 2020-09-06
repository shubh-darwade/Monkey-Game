
var monkey , monkey_running;
var cloudsImg;

var touchBananaSound,dieSound,jumpSound;

var cloudGroup,obstacleGroup,bananaGroup;

var StartPage,StartPageImg,StartIcon,StartIconImg;

var sun,sunImg;

var PLAY=1;
var END=0;
var gameState=END;

var monkey_stopped;

var minustimer=0;

var monkey2;

var timer=0;

var timer2=0;

 var bananaCount=0;

var ground,groundImg,soil;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  cloudsImg= loadImage("cloud.png");
  
  sunImg=loadAnimation("Sun1.png","Sun2.png")
   
  StartPageImg=loadImage("StartPage.png");
  StartIconImg=loadImage("StartIcon.png");

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stopped= loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  touchBananaSound=loadSound("touchBanana.mp3");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
  
}



function setup() {
  
monkey=createSprite(100,350,20,20);
monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  monkey2=createSprite(100,350,20,20);
  monkey2.addAnimation("stopped",monkey_stopped)
  monkey2.scale=0.1;
monkey2.visible=false;
  ground=createSprite(200,382,400,10);
  ground.shapeColor="green";
 
  
  soil=createSprite(200,391,400,18);
  soil.shapeColor="brown";

  sun=createSprite(350,50,20,20);
  sun.addAnimation("moving sun",sunImg);
  sun.scale=0.1;
  
  cloudGroup=createGroup();
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  
  StartPage=createSprite(200,200,400,400);
  StartPage.addImage("start page",StartPageImg);
  StartPage.scale=0.75;
  StartPage.visible=false;
  
  StartIcon=createSprite(200,140,30,30);
  StartIcon.addImage("start icon",StartIconImg);
  StartIcon.scale=0.75;
  StartIcon.visible=false;
}

function draw() {

  background("skyblue");
  
  console.log(Math.ceil(frameCount/frameRate()));
  
  if(gameState==END && monkey.visible==true)
  {
    minustimer=World.seconds;
    StartPage.visible=true;
    StartIcon.visible=true;
    
  }
  
  if(gameState==END && mousePressedOver(StartIcon) && StartIcon.visible==true)
  {
     gameState=PLAY;
    StartPage.visible=false;
    StartIcon.visible=false;
    
  }
  if(gameState==PLAY){
   timer=World.seconds;    
  timer2=World.seconds;
  }
  
  if(gameState==PLAY){
    
    

  SpawnClouds();
  SpawnObstacles();
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      touchBananaSound.play();
      bananaCount=bananaCount+1;
       }
    
  if(keyDown("space") && monkey.y>345)
  {
    monkey.velocityY=-13;  
    jumpSound.play();
  }
  monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(obstacleGroup)){
       monkey.visible=false;
      dieSound.play();
     gameState=END; 
    }
  }
  
  monkey.collide(obstacleGroup);
 monkey.collide(ground);
  
 

    if(gameState==END &&  monkey.visible==false){
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
             
      monkey2.visible=true;
      
      monkey2.x=monkey.x;
      monkey2.y=monkey.y;
      
     bananaGroup.setLifetimeEach(-1); 
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
      monkey.velocityX=0;
      monkey2.velocityY=0;
       }
  
  Spawnbananas();
  drawSprites();
  textSize(20);
  stroke("black");
  fill("black");
  if(gameState==PLAY){


  text("Survival time: "+timer,30,40);
  text("Bananas Collected: "+bananaCount,30,70);
  }
  if (gameState==END && monkey.visible==false){
    text("Game Over",150,170);
    text("Your Survival Time: "+timer,120,200);
    text("Bananas You Collected: "+bananaCount,70,230);
  }

}

function SpawnClouds()
{
  var cloud=createSprite(600,360,30,30);
  cloud.depth=monkey.depth-1;
 if (frameCount % 60 === 0) {

    cloud.y=Math.round(random(100,250));
    cloud.addImage(cloudsImg); 
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
  
 } 
  cloudGroup.add(cloud);
}


function SpawnObstacles()
{
  var obstacle=createSprite(600,360,150,150);
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
 obstacle.debug=false;
  obstacleGroup.add(obstacle);
 if (frameCount % 300 === 0) {

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 250;
   
  } 
  
}

function Spawnbananas()
{
  var banana=createSprite(600,300,30,30);
  bananaGroup.add(banana);
  banana.depth=monkey.depth-1;
  banana.y=Math.round(150,200);
 if (frameCount % 140 === 0) {

    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
   
  } 
  
}