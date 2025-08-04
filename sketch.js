//link:https://editor.p5js.org/fifi-551/sketches/jv3XwHJsZ
//global
//gra
var stage = 0; //Która funkcja jest najpierw 0,1,2
var pSpeed = 5;
// Weather data
var weatherData;
//gracz
var p1X = 400; //p1 dal gracza 1 
var p1Y = 375;
var pWidth = 115;
var pHeight = 115;

//platformy
var b1X = 200; 
var b1Y = 275;
var b2X = 600; 
var b2Y = 275;
var b3X = 500; 
var b3Y = 150;
var bWidth = 200;
var bHeight = 40;

//do zbierania
var c1X = 600;
var c1Y = 410;
var c2X = 600;
var c2Y = 250;
var c3X = 500;
var c3Y = 125;
var c4X = 200;
var c4Y = 250;
var cWidth = 60;
var cHeight = 30;

//złoczyńcy
var g1X = 200;
var g1Y = 375;
var g2X = 500;
var g2Y = 80;
var gWidth = 90;
var gHeight = 110;
// ruch
var g1Position = 200;/// cetrum
var g2Position = 500;
var gSpeed = 1.25; //szybkość
var g1Direction = -1; // 1 w prawo, a -1 w lewo
var g1Distance = 200; // jak daleko
var g2Direction = 1; // 1 w prawo, a -1 w lewo
var g2Distance = 70; // jak daleko

//liczniki
var score = 0;
var lives = 3;
var totalTime;
var splashTime;
var gameTime;
var timeLimit = 25//////maksymalny


//sciany pod platformami
var w1Y = 295;
var wHeight = 10;

var w2Y = 300;
var wHeight = 10;

var w3Y = 170;
var wHeight = 10;


//grawitacja
var jump = false; //czy skaczemy
var direction = 1; //siła ciężkości w kierunku y
var velocity = 2; //szybkosc gracza
var jumpPower = 15; //siła gracza
var fallingSpeed = 2.5; 
var minHeight = 395; //wysokosc podłogi
var maxHeight = 50; //wysokość nieba
var jumpCounter = 0; //jumpcounter 

//multimedia
var gracz;
var platform;
var landscape;
var jumpSound;
var zwyczajnyFont;
var kanapka;
var kanapkaSound;
var zloczynca;
var lifeSound;
var winSound
var loseSound;

//setup
function setup() {
	createCanvas(800, 500);
	rectMode(CENTER);
	textAlign(CENTER);
	imageMode(CENTER);
// Load weather data
    loadJSON('https://api.open-meteo.com/v1/forecast?latitude=52.2298&longitude=21.0118&current=temperature_2m', gotWeatherData);
}
// Callback function for loading weather data
function gotWeatherData(data) {
    weatherData = data;
}
//draw
function draw() {
//call functions
	keyPressed();
	keyTyped();
	gravity();
    totalTime = millis(); //start timer
	
	if(stage == 0){
		splash();
	}//close = 0
	
	if(stage == 1){
		game();
	}//close = 1
  
    if(stage == 2){
		winScreen();
	}//close = 2
  
    if(stage == 3){
		loseScreen();
	}//close = 3
  
	
	if(mouseIsPressed == true){
		stage = 1;
	}//click starts game

}//close draw

//splash
function splash(){
    //timer 
    splashTime = totalTime;
	//wygląd gry
	background(150, 230, 240); //sky blue
	image(landscape, width/2, height/2, width, height);
	
	
	//tytuł
	textFont(zwyczajnyFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(100);
	text('REGULAR GAME', width/2, 120);
	
	    if (weatherData) {
        console.log(weatherData); // Log the entire data object to the console for inspection
        var temperature = Math.round(weatherData.current.temperature_2m); // Zaokrąglenie do liczby jedności
        console.log('Temperature:', temperature); // Log the temperature to the console
        textSize(30);
        text('TEMPERATURE IN REGULAR CITY : ' + temperature + ' DEGREES CELSIUS', width / 2, 180);
    }
	//instrukcja
	text('HOW TO PLAY:', width/2, 240);
	text('USE ARROW KEYS TO MOVE', width/2, 285);
    text('PRESS A TO JUMP', width/2, 330);
	text('BEWARE OF BAD GUYS', width/2, 380);
    text('COLLECT THE DEATH SANDWICHES BEFORE TIME RUNS OUT', width/2, 430);
	
	text('CLICK ON THE SCREEN TO START', width/2, 480);
    	
}


//gra
function game(){
//wygląd gry
	background(150, 230, 240); 
	image(landscape, width/2, height/2, width, height);
//rama
	noFill();
	stroke(0);
	strokeWeight(15);
	rect(width/2, height/2, width, height);
	
//platformy
	stroke(0);
	strokeWeight(5);
	fill(255, 120, 0);
	//(b1X, b1Y, bWidth, bHeight);
	image(platform, b1X, b1Y, bWidth, bHeight);
    image(platform, b2X, b2Y, bWidth, bHeight);
    image(platform, b3X, b3Y, bWidth, bHeight);

//kolizja
  //BOX1
	if(p1X >= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+pHeight/2 >= b1Y-bHeight/2 && p1Y-pHeight/2 <= b1Y+bHeight/2 && jump == false){
		p1Y = b1Y-55;//nie spadnij i pozostań na platformie
		velocity = 0; //0 predkości bo nie spadamy
		jumpCounter = 0;//pozwala skoczyc jeszcze raz
	}
  
  //BOX2
	if(p1X >= b2X-bWidth/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= b2Y-bHeight/2 && p1Y-pHeight/2 <= b2Y+bHeight/2 && jump == false){
		p1Y = b2Y-55;//nie spadnij i pozostań na platformie
		velocity = 0; //0 predkości bo nie spadamy
		jumpCounter = 0;//pozwala skoczyc jeszcze raz
	}//
  
  //BOX3
	if(p1X >= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+pHeight/2 >= b3Y-bHeight/2 && p1Y-pHeight/2 <= b3Y+bHeight/2 && jump == false){
		p1Y = b3Y-55;//nie spadnij i pozostań na platformie
		velocity = 0; //0 predkości bo nie spadamy
		jumpCounter = 0;//pozwala skoczyc jeszcze raz
	}
	
//ściana
 // fill(255,0,0);
  //stroke(255,0,0);
 // (b1X, w1Y, bWidth, wHeight);
 if(p1X >= b1X-bWidth/2 && p1X <= b1X+bWidth/2 && p1Y+pHeight/2 >= w1Y-wHeight/2 && p1Y-pHeight/2 <= w1Y+wHeight/2){
   velocity = fallingSpeed; //uderza w ściane
   p1Y = p1Y+jumpPower; //push back
  }//
  
  //ściana 3
  //fill(255,0,0);
  //stroke(255,0,0);
 // rect(b3X, w3Y, bWidth, wHeight);
 if(p1X >= b3X-bWidth/2 && p1X <= b3X+bWidth/2 && p1Y+pHeight/2 >= w3Y-wHeight/2 && p1Y-pHeight/2 <= w3Y+wHeight/2){
   velocity = fallingSpeed; //uderza w ściane
   p1Y = p1Y+jumpPower; //push back
  }
  
  //ściana 2
  //fill(255,0,0);
  //stroke(255,0,0);
  //rect(b2X, w2Y, bWidth, wHeight);
 if(p1X >= b2X-bWidth/2 && p1X <= b2X+bWidth/2 && p1Y+pHeight/2 >= w2Y-wHeight/2 && p1Y-pHeight/2 <= w2Y+wHeight/2){
   velocity = fallingSpeed; //uderza w ściane
   p1Y = p1Y+jumpPower; //push back
  }
  
  //kanapka 1
  image(kanapka, c1X, c1Y, cWidth, cHeight);  
  if(p1X >= c1X-cWidth/2 && p1X <= c1X+cWidth/2 && p1Y >= c1Y-cHeight/2 && p1Y <= c1Y+cHeight/20){
     //
     score = score + 1;//dodaje jeden
      c1X = -1000;//wyrzuca poza plansze
      kanapkaSound.play();
     }//n
  
  
 //kanapka 2
image(kanapka, c2X, c2Y, cWidth, cHeight);  
if (
  p1X >= c2X - cWidth / 2 &&
  p1X <= c2X + cWidth / 2 &&
  p1Y <= c2Y &&
  p1Y + pHeight / 2 >= c2Y
) {
  score = score + 1; 
  c2X = -1000; 
  kanapkaSound.play();
} 

  //kanapka 3
image(kanapka, c3X, c3Y, cWidth, cHeight);  
if (
  p1X >= c3X - cWidth / 2 &&
  p1X <= c3X + cWidth / 2 &&
  p1Y <= c3Y &&
  p1Y + pHeight / 2 >= c3Y
) {
  // postać je kanapke
  score = score + 1; // dodac 1
  c3X = -1000; // odjac 1
  kanapkaSound.play();
} 

  //kanapka 4
image(kanapka, c4X, c4Y, cWidth, cHeight);  
if (
  p1X >= c4X - cWidth / 2 &&
  p1X <= c4X + cWidth / 2 &&
  p1Y <= c4Y &&
  p1Y + pHeight / 2 >= c4Y
) {
  // postać je kanapkę
  score = score + 1; // dodac 1
  c4X = -1000; // odjac 1
  kanapkaSound.play();
} //  
  
//smierc
  ///smierc 1
  image(zloczynca,g1X, g1Y,gWidth,gHeight);
  if(p1X >= g1X-gWidth/2 && p1X <= g1X+gWidth/2 && p1Y>= g1Y-gHeight/2 && p1Y <= g1Y+gHeight/2){
    //dotyk
    lives = lives-1;
    lifeSound.play();
    p1X = 400;
    p1Y = 375;
  } 
  
  ///smierc 2
  image(zloczynca,g2X, g2Y,gWidth,gHeight);
  if(p1X >= g2X-gWidth/2 && p1X <= g2X+gWidth/2 && p1Y>= g2Y-gHeight/2 && p1Y <= g2Y+gHeight/2){
    //dotyk
    lives = lives-1;
    lifeSound.play();
    p1X = 400;
    p1Y = 375;
  } 
  
  // poruszanie smierc
  ///smierc 1
  g1X = g1X + (gSpeed * g1Direction);
  if(g1X >= g1Position + g1Distance || g1X <= g1Position-g1Distance){
    ///dystans
    g1Direction = g1Direction*-1;
  }
    
  ///smierc 2 
  g2X = g2X + (gSpeed * g2Direction);
  if(g2X >= g2Position + g2Distance || g2X <= g2Position-g2Distance){
    ///dystans
    g2Direction = g2Direction*-1;
  }
 
//draw gracz
	stroke(0);
	strokeWeight(5);
	fill(150, 0, 170);
	//(p1X, p1Y, pWidth, pHeight);
	image(gracz, p1X, p1Y, pWidth, pHeight);
  
  ///wynik
  textFont(zwyczajnyFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(30);
	text('SCORE :', 70, 50);
    text(score, 140, 50);	
  
  ///życia
  textFont(zwyczajnyFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(30);
	text('LIVES :', 220, 50);
    text(lives, 290, 50);	
  
    ///timer
  splashTime = splashTime;
  gameTime = int((totalTime-splashTime)/1000); ///milisekundy na sekundy
  
  textFont(zwyczajnyFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(30);
	text('REMAINING TIME :', 650, 50);
    text(timeLimit-gameTime, 775, 50); ///odliczanie	
  
    // wygrana albo przegrana
    if (score >= 4){ // wygrana
      winSound.play()
      stage = 2;
    }
    
    if(lives <= 0){
      loseSound.play();
      stage = 3;
       }
  
      if(gameTime >= timeLimit){
      loseSound.play();
      stage = 3;
       }
  
}

//WINSCREEN
function winScreen(){
  image(landscape, width/2, height/2, width, height);
    textFont(zwyczajnyFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(200);
	text('YOU WON', width/2, height/2);
}  
//loseScreen
function loseScreen(){
  image(landscape, width/2, height/2, width, height);
    textFont(zwyczajnyFont);
	fill(255);
	stroke(0);
	strokeWeight(10);
	textSize(180);
	text('YOU LOSE', width/2, height/2);
} 
//grawitacja
function gravity(){

	if(p1Y >= minHeight && jump == false){
		//żeby nie spadać
		p1Y = p1Y; //nie spadaj
		jumpCounter = 0;//jumpcounter reset jak spadamy
	}
	else{
		p1Y = p1Y + (direction*velocity); //grawitacja działa
	}//else fall
	
	
	if(jump == true){
		if(p1Y <= maxHeight || jumpCounter >= jumpPower){
			if(p1Y >= minHeight){
				p1Y = minHeight;
			}
			else{
				velocity = fallingSpeed; //spada przy max
			}//close else not at min
		}//close at max
		else{
			jumpSound.play();
			velocity = -jumpPower; //skok
			jumpCounter = jumpCounter+1;//dodaj do jump counter
		}//close else not at max
	}//close jump
	else{
		velocity = fallingSpeed;
	}//close not jumping
	
  
  //bariera
  if(p1X + pWidth/2 >= width){
    p1X = p1X-5;
  }  
  
    if(p1X - pWidth/2 <= 0){
    p1X = p1X+5;
  } 
  
}//close grawitacja

//keypressed
function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    p1X = p1X - pSpeed; //w lewo
  } //close left

  if (keyIsDown(RIGHT_ARROW)) {
    p1X = p1X + pSpeed; //w prawo
  } //close right
} //close keypressed
//keytyped
function keyTyped() {
  if (key === 'a' || key === 'A') {
    jump = true; //skok
  } else {
    jump = false; //nie skacz
  }
} //close keytyped

//preload
function preload(){
	gracz = loadImage('gracz.png');
	platform = loadImage('trawa.jpg');
	landscape = loadImage('dom.png');
	jumpSound = loadSound('hop_5.mp3');
	zwyczajnyFont = loadFont('PartySolid.ttf');
    kanapka = loadImage('sandwich_of_death.webp');
	kanapkaSound = loadSound('col.mp3');
    zloczynca = loadImage ('death.webp');
    lifeSound = loadSound('ouch_2.mp3');
    winSound = loadSound('jeja.mp3');
  loseSound = loadSound('por.mp3');
}






