var monkey, monkey_running;
var bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, ground, survival_time = 0;
var banana;
var score;
var   PLAY = 1,END = 0, gameState = PLAY;

function preload() {


  monkey_collide = loadAnimation("sprite_1.png");
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(80, 350, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.16;
  //monkey.debug = true;

  monkey.addAnimation("collided", monkey_collide)

  ground = createSprite(300, 360, 595, 10);

  FoodGroup = createGroup();
  obstacleGroup = createGroup()
  score = 0;
}


function draw() {

  background(255);
  monkey.collide(ground);
  if (gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);
    
    ground.velocityX = -4;
    if (ground.x < ground.width / 2) {
      ground.x = 300;
    }
    survival_time = survival_time + Math.round(getFrameRate()/60);
    //console.log(getFrameRate())
    
    text("survival time : "+survival_time, 400, 50);

    if (keyDown("space") && monkey.y > 290) {
      monkey.velocityY = -20;
    }
    fill(0);
    stroke("orange");
    textSize(24);
    text("Bananas Eaten : " + score, 10, 50);

    monkey.velocityY += 0.8;

    food();

    spawnObstacles();
    //console.log(FoodGroup.setLifetimeEach)
    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score += 1;
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END

    }
  }
  if(gameState === END){
    monkey.changeAnimation("collided", monkey_collide);
    monkey.velocityY = 0;
    ground.velocityX = 0;
    FoodGroup.setLifetimeEach(0);
    obstacleGroup.setVelocityXEach(0);
    textSize(30);
    fill(0)
    stroke("green");
    text("Monkey got injured !", 200, 200);
    textSize(20);
    text("Press R to restart", 200, 300);
    textSize(18);
    text("Total bananas eaten :"+score, 100, 50);
    text("Survival Time : "+survival_time, 300, 50);
    if(keyDown("r")){
      gameState = PLAY;
      score = 0;
      survival_time = 0;
    }
  }
  drawSprites();


}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 330, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 220);
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);

  }
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(500, 0, 10, 10);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -5;
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.15;
    //banana.debug = true;
    banana.setCollider("rectangle", 0, 0, 500, 200);
    banana.depth = monkey.depth;
    banana.lifetime = 100;
    monkey.depth += 1;

    FoodGroup.add(banana);
    //console.log(banana.lifetime)

  }
}