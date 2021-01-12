var gameState, PLAY = 1, END = 0;

var sword, swordImg;

var fruit, fruitGroup, fruitArr, fruit1, fruit2, fruit3, fruit4;

var score = 0;

var alien, alienArr, alien1, alien2, alienGroup;

var gameOverImg, gameOverSound, fruitDestroySound;

function preload(){
  swordImg = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  
  gameOverImg = loadImage("gameover.png");
  
  gameOverSound = loadSound("mixkit-arcade-retro-game-over.wav");
  fruitDestroySound = loadSound("Knife-Stab-A1-outside-www.fesliyanstudios.com.mp3");
}

function setup(){
  createCanvas(600,400);
  
  gameState = PLAY;
  
  fruitGroup = createGroup();
  alienGroup = createGroup();
  
  sword = createSprite(300,200,15,15);
  sword.addImage("sword",swordImg);
  sword.scale = 0.4;
  
  fruitArr = [fruit1, fruit2, fruit3, fruit4];
  alienArr = [alien1, alien2];
}

function draw(){
  background("lightBlue");
  
  strokeWeight(6);
  stroke("gold");
  fill("black");
  textSize(20);
  text("Score: " + score,50,20);
  
  if(gameState === PLAY){
    sword.x = mouseX;
    sword.y = mouseY;
    
    drawFruits();
    drawAliens();
    
    handleSwordTouchFruits();
    handleSwordTouchAliens();
  } else if(gameState === END){
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      
      sword.addImage("sword",gameOverImg);
      sword.scale = 2;
      sword.x = 300;
      sword.y = 200;
    
  }
  drawSprites();
}

function drawFruits(){
  if(frameCount % 30 === 0){
    fruit = createSprite(0,Math.round(random(20,380)),30,30);
    fruit.velocityX = 2 * (score + 2);
    fruit.lifetime = 150;
    fruitGroup.add(fruit);
    
    var rand = Math.round(random(0,3));
    fruit.addImage("fruit",fruitArr[rand]);
    fruit.scale = 0.25;
  }
}

function drawAliens(){
  if(frameCount % 100 === 0){
    alien = createSprite(0,Math.round(random(20,380)),30,30);
    alien.velocityX = 2 * (score + 2);
    alien.lifetime = 75;
    alienGroup.add(alien);
    
    var rand1 = Math.round(random(0,1));
    alien.addImage("alien",alienArr[rand1]);
    //alien.scale = 0.25;
  }
}

function handleSwordTouchFruits(){
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score++;
    fruitDestroySound.play();
  }
}

function handleSwordTouchAliens(){
  if(alienGroup != null && alienGroup.isTouching(sword)){
    gameState = END;
    gameOverSound.play();
  }
}