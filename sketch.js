var trex,trexAnim,ground,groundAnim,cloudsAnim,cloud,catus,cactus2Anim,cactus3Anim,cactus4Anim,cactus5Anim,cactus6Anim,score,gameState,restart,restartAnim,loss,lossAnim,trexAnim2

function preload()
{
  trexAnim = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundAnim = loadImage("ground2.png");
  cloudsAnim = loadImage("cloud.png");
  cactus1Anim = loadImage("obstacle1.png");
  cactus2Anim = loadImage("obstacle2.png");
  cactus3Anim = loadImage("obstacle3.png");
  cactus4Anim = loadImage("obstacle4.png");
  cactus5Anim = loadImage("obstacle5.png");
  cactus6Anim = loadImage("obstacle6.png");
  restartAnim = loadImage("restart.png");
  lossAnim = loadImage ("gameOver.png");
  trexAnim2 = loadImage ("trex_collided.png");
  
}

function setup() {
  
  cloud = new Group ();
  catus = new Group ();
  trex = createSprite(50,150);
  trex.addAnimation ("trex",trexAnim);
  trex.addAnimation("trexAnim2",trexAnim2);
  trex.scale = 0.5;
  
  ground = createSprite(350,175);
  ground.addImage ("ground",groundAnim);
  
  score = 0;
  
  gameState = "start";
  
  createCanvas (700,200);
  
  
  restart = createSprite (350,150);
  restart.addImage ("restart",restartAnim);
  
  loss = createSprite (350,50);
  loss.addImage ("loss",lossAnim);

}

function draw() {
  
  background("black");
  
  ground.velocityX = -4;
  
  
  if (ground.x <= 200)
    
    {
      
      ground. x = 350;
      
    }
  
  trex.velocityY = trex.velocityY + 1;
  
  
  if (trex.y >= 144 && keyDown("space") && gameState =="start") 
  {
      trex.velocityY = -13
  }
  
  trex.collide(ground)
  
  drawSprites();
  
  if (World.frameCount % 3 == 0 && gameState =="start")
    {
      score = score + 1
    }
  
  
  text(score,650,50)
  console.log (score)
  
  if (trex.isTouching (catus) )
    {
      
      gameState = "end";
      
    }
  
  
  if (gameState == "end")
  {
    
    trex.velocitY = 0;
    catus.setVelocityXEach(0);
    cloud.setVelocityXEach(0);
    ground.velocityX = 0;
    
    catus.setLifetimeEach(-1);
    cloud.setLifetimeEach(-1);
    
       loss.visible = true;
    restart.visible = true;
    
    trex.changeAnimation("trexAnim2",trexAnim2);
  }
  
  if (gameState === "start")
  {
    ground.velocityX = -4;
    catus.setVelocityXEach(-4);
    cloud.setVelocityXEach(-2);
  
    if (World.frameCount%100 == 0)
  {
    spawnClouds();
    spwanEnmy ()
  }
  
    
    loss.visible = false;
    restart.visible = false;
    
    
  }
  
  
  if (mousePressedOver(restart)&&gameState == "end")
  
  {
      
      reload ();
    
      
      }
  
  
  
}
 

function spawnClouds()  
{
  var clouds = createSprite(700,random(5,100),50,50);
  clouds.addImage("cloud",cloudsAnim);
  clouds.velocityX = -2;
  clouds.scale = 0.4;
  clouds.lifetime = 350;
  cloud.add(clouds);
  trex.depth = clouds.depth +1;
}

function spwanEnmy ()
{
  var cactus = createSprite(700,150);
  var rando = Math.round (random(1,6));
  cactus.velocityX = -4;
  cactus.lifetime = 200;
  catus.add(cactus);
  
  switch(rando) 
    {
      case 1:cactus.addImage("cactus1",cactus1Anim);
          cactus.scale = 0.7;
      break
      
      case 2:cactus.addImage("cactus2",cactus2Anim);
        cactus.scale = 0.7;
      break
      
      case 3:cactus.addImage("cactus3",cactus3Anim);
        cactus.scale = 0.7;
      break
      
      case 4:cactus.addImage("cactus4",cactus4Anim);
        cactus.scale = 0.7;
      break
      
      case 5:cactus.addImage("cactus5",cactus5Anim);
        cactus.scale = 0.7;
      break
      
      case 6:cactus.addImage("cactus6",cactus6Anim);
        cactus.scale = 0.7;
      break
        
      default:cactus.addImage("cactus1",cactus1Anim);
        
    }
  
}

function reload () {
  
  gameState = "start";
  score = 0;
  
  catus.destroyEach();
  cloud.destroyEach();
}

