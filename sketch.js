var PLAY=1
var END=0
var gameState=1
var knife, knifeImg, knifeSound
var fruit, fruit1, fruit2, fruit3, fruit4
var alien, alienIMG, r
var score = 0
var gameOver, gameOverIMG, gameOverSound

function preload(){
  knifeImg = loadImage("sword.png")
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  alienIMG = loadAnimation("alien1.png","alien2.png")
  gameOverIMG = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSound = loadSound("knifeSwooshSound.mp3")
}

function setup(){
  createCanvas (400,400)
  
  knife = createSprite(200,200,20,20)
  knife.addImage(knifeImg)
  knife.scale = 0.6
  
  gameOver = createSprite(200,200,100,100)
  gameOver.addImage(gameOverIMG)
  gameOver.scale = 1.5
  
  fruitGroup = new Group()
  aliensGroup = new Group()
}

function draw(){
  background ("tomato")
  
  if (gameState === PLAY){
    knife.x = mouseX;
    knife.y = mouseY;
    
    gameOver.visible = false
    
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach()
      knifeSound.play()
      score = score+2
    }
    if(aliensGroup.isTouching(knife)){
      gameState = END
      gameOverSound.play()
    }
  }
  
  if(gameState === END){
    gameOver.visible = true
    
    fruitGroup.setVelocityXEach(0)
    aliensGroup.setVelocityXEach(0)
    
    fruitGroup.destroyEach()
    aliensGroup.destroyEach()
    
    fruitGroup.setLifetimeEach(-1)
    aliensGroup.setLifetimeEach(-1)
    
    if(mousePressedOver(gameOver)){
      reset();
    }
    
  }
  
  drawSprites();
  fruits();
  enemy();
  fill("white")
  textSize(20)
  text("Score: "+ score, 270,30)
  
  
}

function fruits(){
  if(frameCount%80===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale = 0.2
    r = Math.round(random(1,4))
    if (r == 1){
      fruit.addImage(fruit1)
    } else if (r == 2){
      fruit.addImage(fruit2)
    } else if (r == 3){
      fruit.addImage(fruit3)
    } else if (r == 4){
      fruit.addImage(fruit4)
    } 
    position = Math.round(random(1,2))
    if(position == 1){
      fruit.x = 400
      fruit.velocityX = -(7+(score/4))
    }else{
      if(position == 2){
        fruit.x = 0
        fruit.velocityX = (7+(score/4))
      }
    }
    fruit.y = Math.round(random(50,340))
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit)
  }
  
  
}

function enemy(){
  if(frameCount%200 === 0){
    alien=createSprite(400,400,20,20)
    alien.addAnimation("moving",alienIMG)
    alien.y = Math.round(random(100,300))
    alien.velocityX = -(8+(score/10))
    alien.setLifetime = 50
    
    aliensGroup.add(alien)
  }
}

function reset(){
  gameState = PLAY
  score = 0
}





