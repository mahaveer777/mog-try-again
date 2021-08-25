var zombieImage,zombie;
var bg1;
var bg2;
var pg;
var pgborder;
var zombieGroup;
var player;
var pc
var gamestate=0;
var score=0;
var retry;
var rImage;
var sound;
var start;
var sb;

function preload(){
  bg1=loadImage("bg.jpg");
  zombieImage=loadAnimation("npc1.png","npc2.png","npc3.png","npc4.png");
 pc=loadImage("pc.png")
 rImage=loadImage("gameover.png");
 sound=loadSound("spooky sound.mp3")
 sound1=loadSound("laugh.mp3")
 sb=loadImage("startbutton.png")
}

function setup() {
  createCanvas(1366,656);
  pg=createSprite(675,325,625,625);
  pg.shapeColor=("white")
  pgborder1=createSprite(359,325,5,625)
  pgborder1.shapeColor="black";
  pgborder2=createSprite(672,10,632,5);
  pgborder2.shapeColor="black";
  pgborder3=createSprite(985,325,5,625);
  pgborder3.shapeColor="black";
  pgborder4=createSprite(672,640,632,5);
  pgborder4.shapeColor="black";
  zombieGroup=createGroup();
  player=createSprite(650,300,5,5);
  player.scale=0.1;
  player.addImage(pc);
  retry=createSprite(675,330,50,50);
  retry.addImage(rImage);
  retry.scale=2
  start=createSprite(675,300,100,100)
  start.addImage(sb);
  start.scale=2;
 
 
}
function draw() {
  
  background(bg1);  
 
    if(keyDown("s")){
    start.visible=false;
    sound.play();
  }
 
  if(gamestate==0&&start.visible==false){
    zombies();
   sound1.stop();
    retry.visible=false;
     player.visible=true;
  if(zombieGroup.isTouching(pgborder3)){
    zombieGroup[0].destroy();
    score=score+1;
    
  }
 
  if(keyDown(UP_ARROW)){
   // player.velocityY=-10;
    player.y=player.y-10;
    
    
  }
  if(keyDown(DOWN_ARROW)){
   // player.velocityY=+10;
    player.y=player.y+10;
  }
  if(keyDown(RIGHT_ARROW)){
    // player.velocityY=+10;
     player.x=player.x+10;
   }
   if(keyDown(LEFT_ARROW)){
    // player.velocityY=+10;
     player.x=player.x-10;
   }
  
  
  if(player.isTouching(zombieGroup)){
    gamestate=1;
    sound1.play();
  }
  

  }
  else if(gamestate==1){
    zombieGroup.destroyEach();
    zombieGroup.setVelocityXEach(0);
    player.visible=false;
    retry.visible=true;
 
    sound.stop();

    if(keyDown("r")){
      gamestate=0;
      score=0;
      start.visible=true;
      
    }
  }
  
  drawSprites();
  player.debug=false;
  player.setCollider("circle",0,0,150)
  if(gamestate==0&&start.visible==false){
  fill("black")
  textSize(25);
  text("Score="+score,650,50);

  fill("black")
  textSize(25);
  text("One of hardest games.Challenge you too score 50 points.",370,80)
  }
  else if(gamestate==1&&start.visible==false){
    fill("white")
    textSize(25);
    text("Score="+score,650,50);
    if(score<50){
      fill("white");
      textSize(25);
      text("Ha Ha, told you. LOL",370,80);
    }
    else if(score>=50){
      fill("white");
      textSize(25);
      text("Congratultions you are a pro gamer",370,80);
    }
  }
 
}

function zombies(){

  if(frameCount%40===0){

  zombie=createSprite(359,player.y, 50, 50);
  zombie.velocityX=random(4,8)+score/2;
  
  zombie.scale=0.7;
  zombie.addAnimation("zombieImage",zombieImage);
  zombieGroup.add(zombie);
  console.log(zombie.velocityX)
  
  
}

}

