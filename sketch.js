//showing all game object of game 
var trex,trex_running,trex_collided,ground,img,invisibleground;

var obstaclegroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var
cloudsgroup,cloudimg;

var gameover ,resetbuttun,gameoverimg,resetbuttunimg;

var count=0;

var play=1;

var end=0;

var gameState=play;

function preload()
{
//set animation to trex runner
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
//set animation to trex collided
trex_collided=loadImage("trex_collided.png");

//set image to ground 
img=loadImage("ground2.png");

//set image to obstacle  
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
  
//set image to obstacle
cloudimg=loadImage("cloud.png");
  
//set image to resetbuttun
resetbuttunimg=loadImage("restart.png");
  
//set image to game over
gameoverimg=loadImage("gameOver.png");

}



function setup() 
{
  //create canvas
  createCanvas(600, 200);
  
  //create trex
  trex=createSprite(50,180,20,90);
  
  //set animatuion and scale to trex 
  trex.addAnimation("runner",trex_running);
  trex.scale=0.5;
  
  //create ground,add image and scale 
  ground=createSprite(200,180,400,20);
  ground.addImage("ground",img);
  
  
  //create invisible ground 
  invisibleground=createSprite(200,190,400,10);
  invisibleground.visible=false;
  
       
  obstaclegroup = new Group();
  cloudsgroup =  new Group();
  
  
  gameover=createSprite(300,100);
  gameover.addImage("lul",gameoverimg);
  gameover.scale=0.5;
  gameover.visible=false;
  
  
  resetbuttun=createSprite(300,140);
  resetbuttun.addImage("sft",resetbuttunimg);
  resetbuttun.scale=0.5;
  resetbuttun.visible=false;
  //trex.debug=true;
  
  trex.setCollider("circle",0,0,20);
}


function draw ()
{
  //clear background 
  background(180);
  
   text("score:" + count,500,50);
  
 if(gameState===play)
 {
   
   count =count+Math.round(getFrameRate()/60);
   
   
   ground.velocityX = -(6 + 3*count/100);
  //reset the ground
  if(ground.x<0)
  {
     ground.x=ground.width/2; 
  }
  
  //make trex jump when space is pressed
  if(keyDown("SPACE") )
  {
    trex.velocityY = -12; 
    

  }
   //make gravity
  trex.velocityY = trex.velocityY+0.8 ;
   
 
  
  spawnObstacles();
  
  spawnClouds();
   
   if(trex.isTouching(obstaclegroup))
   {
      gameState=end;
   }
 }
  else if(gameState===end)
  {
    ground.velocityX=0;
    gameover.visible=true;
    resetbuttun.visible=true;
    obstaclegroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
     //set lifetime of the game objects so that they are never destroyed
      obstaclegroup.setLifetimeEach(-1);
      cloudsgroup.setLifetimeEach(-1);
    trex.changeImage("trex_collided",trex_collided);
    trex.velocityX=0;
    trex.velocityY=0;   
  }
  
   if(mousePressedOver(resetbuttun)|| keyDown("space") && gameState===end)
        {
          gameover.visible=false;
    resetbuttun.visible=false;
          reset();
          gameState=play;
        }
trex.collide(obstaclegroup);

  
  //draw srpites
  drawSprites();
  
  //make trex collide invisible ground 
  trex.collide(invisibleground);
  

}


function spawnObstacles() {
  if(frameCount % 60 === 0) 
  {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = -(6 + 3*count/100); 
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
     switch(rand)
     {
       case 1: obstacle.addImage(obstacle1);
         break;
         
         case 2: obstacle.addImage(obstacle2);
         break;
         
         case 3: obstacle.addImage(obstacle3);
         break;
         
         case 4: obstacle.addImage(obstacle4);
         break;
         
         case 5: obstacle.addImage(obstacle5);
         break;
         
         case 6: obstacle.addImage(obstacle6);
         break;
         
     
         default: break;
     
     
     }
       
       
       
       
       
       
       
       
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
    //obstacle.debug=true;
  }
}

function spawnClouds() 
{
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(280,320);
    cloud.addImage("cloud",cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 240;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsgroup.add(cloud);
  }
  
}

  function reset()
{
    count=0;
    
    trex.addAnimation("trex_running",trex_running);
    obstaclegroup.destroyEach();
    cloudsgroup.destroyEach();
}
