const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var ground1, ground2;
var bat;
var ball, hurler;
var gameState = "INST_1";
var totalScore = 0;
var chances = 5;
var randomScore, randomScoreText;
var score;
var misses = 0;

function setup() {
  var canvas = createCanvas(1200,400);

  engine = Engine.create();
  world = engine.world;

  ground1 = new Ground(600, 10, 1200, 90);
  ground2 = new Ground(600, 400, 1200, 95);
  ground3 = new Ground(1255, 200, 95, 400);

  score = [];

  bat = new Bat(50, 200, 50, 80);
  ball = new Ball(900, 200, 15);

  hurler = new Hurler(ball.body, {x: 900, y: 200});

  var difficulty = window.prompt("Enter the difficulty you need. Valid choices are Easy, Medium and Hard.");
  generateTargetOf(difficulty);

  //console.log(randomScore);
  alert("Controls are:-\nHitsman: mouse pointer, \nSlinger: Arrow keys(except left-arrow)");
}

function draw() {
  Engine.update(engine);

  background("#afeeee");
  
  for(i = 160; i<1200; i = i+80){
    push();
    fill("#8A3C1A");
    rectMode(CENTER);
    rect(i, 309, 40, 40);
    pop();
    fill("black");
    textSize(20);
    textAlign(CENTER);
    textLeading();
    text(i + " ↓", i, 300, 5, 100);
  }

  for(s = 160; s<1200; s = s+80){
    push();
    fill("#8A3C1A");
    rectMode(CENTER);
    rect(s, 90, 40, 30);
    pop();
    fill("black");
    textSize(20);
    textAlign(CENTER);
    textLeading();
    text("↑ " + s, s, 55, 5, 100);
  }

  ground1.display();
  ground2.display();
  ground3.display();
  bat.display();
  ball.display();
  hurler.display();

  if(gameState === "INST_1"){
    textAlign(CENTER);
    fill("white");
    textFont("Impact");
    text("This is 'Many Boundaries', an offline multiplayer game, where it needs two players, one as the hitsman and one as the slinger.", 5, 10, 1200, 50);
    fill("white");
    textFont("Impact");
    text("Press '→' to continue...", 600, 380);
    if(keyWentDown(RIGHT_ARROW) && gameState === "INST_1"){
      gameState = "START";
    }
  }

  if(gameState === "START"){
    push();
    fill("white");
    textFont("Impact");
    randomScoreText = text("Target:"+randomScore, 200, 25);
    pop();
    textAlign(CENTER);
    fill("white");
    textFont("Impact");
    text("Press 'space' to begin game!", 600, 50);
  }

  if(keyWentUp("space") && gameState === "START"){
    gameState = "PLAY";
    Matter.Body.setPosition(ball.body, {x: 700, y: 200});
    hurler.attach(ball.body);
  }

  if(gameState === "PLAY"){
    push();
    fill("white");
    textFont("Impact");
    randomScoreText = text("Target:"+randomScore, 200, 25);
    pop();
    Matter.Body.setStatic(bat.body, false);
    Matter.Body.setStatic(ball.body, false);
    if(mouseX < 80){
      Matter.Body.setPosition(bat.body, {x: mouseX, y: mouseY});
    } else{
      Matter.Body.setPosition(bat.body, {x: 80, y: mouseY});
    }

    if(keyDown(UP_ARROW)){
      Matter.Body.applyForce(ball.body, ball.body.position, {x : 0, y: -20})
    }

    if(keyDown(DOWN_ARROW)){
      Matter.Body.applyForce(ball.body, ball.body.position, {x : 0, y: 20})
    }

    if(keyDown(RIGHT_ARROW)){
      Matter.Body.applyForce(ball.body, ball.body.position, {x : 20, y: 0})
    } else {
      if(keyDown("space")){
        hurler.fly();
        gameState = "Hurled";
      }
    }
  }

  text("Misses:"+misses, 150, 70);

  if(gameState === "Hurled"){
    Matter.Body.setStatic(bat.body, false);
    if(mouseX < 80){
      Matter.Body.setPosition(bat.body, {x: mouseX, y: mouseY});
    } else{
      Matter.Body.setPosition(bat.body, {x: 80, y: mouseY});
    }
    getLiveScores();
  }

  if(ball.body.speed < 0.28 && gameState === "Hurled"){
    gameState = "START";
    Matter.Body.setStatic(bat.body, true);
    Matter.Body.setStatic(ball.body, true);
    if(ball.body.position.x > 80){
      score.push(round(ball.body.position.x));
    } else{
      score.push("miss");
      misses += 1;
    }
      
    chances -= 1;
  }

  //console.log(chances);

  if(chances === 0){
    textAlign(CENTER);
    fill("white");
    textFont("Impact");
    text("Final score:" + (score[0]+score[1]+score[2]+score[3]+score[4]), 200, 50);
  }
}

function generateTargetOf(difficultyLevel){
  if(difficultyLevel === "Easy"){
    randomScore = round(random(640, 1040));
  } else{
    if(difficultyLevel === "Medium"){
      randomScore = round(random(1840, 1920));
    } else{
      if(difficultyLevel === "Hard"){
        randomScore = round(random(2400, 3280));
      } else{
        alert("Invalid input(Case-sensitive). Reload and try again to generate target.");
        alert("Reloading... Click 'OK'")
        location.reload(true);
      }
    }
  }
}

function getLiveScores(){
  textAlign(CENTER);
  fill("white");
  textFont("Impact");
  text("Scores:" + score, 250, 50);
}