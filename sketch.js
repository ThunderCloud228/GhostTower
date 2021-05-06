var tower, towerImg;
var door, doorImg, doorG;
var climber, climberImg, climberG;
var ghost, ghostImg;
var block, blockG;
var gameState = "play";
var sound;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  sound.loop();
  
  tower = createSprite(300,0,10,10);
  tower.addImage("tower", towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.35;
  
  doorG = new Group();
  climberG = new Group();
  blockG = new Group();
  
  ghost.setCollider("rectangle",23,15,247,275);
}

function draw() {
  background("black");
  
  if(gameState == "play") {
    if(tower.y>600) {
      tower.y = 0;
    }

    if(keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x-5;
    }

    if(keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x+5;
    }

    if(keyDown("space")) {
      ghost.velocityY = -12;
    }

    ghost.velocityY += 0.75;

    if(climberG.isTouching(ghost)) {
       ghost.velocityY = 0;
    }

    if(blockG.isTouching(ghost) || ghost.y>600) {
      gameState = "end";
      ghost.destroy();
      doorG.destroyEach();
      climberG.destroyEach();
      blockG.destroyEach();
    }

    spawnDoors();

    drawSprites();
  }
  else if (gameState == "end") {
    textSize(50);
    fill("yellow");
    strokeWeight(25);
    stroke("red");
    text("Game Over",170,300);
    
    fill("green");
    textSize(25);
    noStroke();
    text("Press SHIFT to Restart",177,365);
    
    if(keyDown("shift")) {
      reset();
    }
  }
  
}

function spawnDoors() {
  if(frameCount%240 == 0) {
    door = createSprite(Math.round(random(115,400)),-50,10,10);
    door.addImage("door", doorImg);
    door.velocityY = 2;
    door.lifetime = 400;
    doorG.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
    climber = createSprite(door.x,10,10,10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 2;
    climber.lifetime = 400;
    climberG.add(climber);
    
    block = createSprite(door.x,15,(climber.width)-5,2);
    block.visible = false;
    block.velocityY = 2;
    block.lifetime = 400;
    blockG.add(block);
  }
}

function reset() {
  gameState = "play";
  ghost = createSprite(300,300,10,10);
  ghost.addAnimation("ghost", ghostImg);
  ghost.scale = 0.35;
}