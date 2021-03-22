//global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//global variables
var pattern = [5, 6, 4, 3, 2, 1, 5, 4, 6, 1];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //0 < volume < 1.0
var guessCounter = 0;
var clueHoldTime; //how long to hold each clue's light/sound
var mistakeCounter; //counter for number of mistakes the player makes
var isRepeat = false; //want same speed if user makes a mistake and the sequence has to repeat

//this function starts the game
function startGame(){
  //initiaize game variables
  progress = 0;
  gamePlaying = true;
  mistakeCounter = 0;
  clueHoldTime = 1000;
  
  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  //show the mistake counter
  document.getElementById("mistakeDisplay").classList.remove("hidden");
  //display current number of mistakes
  document.getElementById("numMistakes").innerHTML = mistakeCounter;
  
  //show progress
  document.getElementById("progress").classList.remove("hidden");
  //display current level
  document.getElementById("progressCounter").innerHTML = progress + 1; //+1 since progress is initialized to 0
  
  randomizePattern();
  playClueSequence();
}//startGame

//this function stops the game
function stopGame(){
  //update gamePlaying
  gamePlaying = false;
  
  //update game buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  
  //hide mistake and progress display
  document.getElementById("mistakeDisplay").classList.add("hidden");
  document.getElementById("progress").classList.add("hidden");
  
  //enable the buttons
  enableButtons();
}//stopGame();

//this function enables buttons 
function enableButtons(){
  for(let i = 1; i <= 6; i++){
    document.getElementById("button"+i).disabled = false;
    console.log(document.getElementById("button"+i));
  }
}//enableButtons

//this function disables buttons (disabled when sequence plays)
function disableButtons(){
  for(let i = 1; i <= 6; i++){
    document.getElementById("button"+i).disabled = true;
    console.log(document.getElementById("button"+i));
  }
}//disableButtons

//this function 'lights' the buttons
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
  //show letter
  document.getElementById(btn).classList.remove("hidden");
}//lightButton

//the function takes away the 'light' of buttons
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
  //remove letter
  document.getElementById(btn).classList.add("hidden");
}//clearButton

//this function randomizes the notes of the sequence
function randomizePattern(){
  for(let i = 0; i < pattern.length; i++){
    //randomize an int between 1 and 6 and set to pattern[i]
    pattern[i] = Math.ceil(Math.random() * 6);
  }   
}//randomizePattern

//this function plays a single clue
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}//playSingleClue

//this function plays the entire current clue sequence
function playClueSequence(){
  //disable buttons when sequence plays
  disableButtons();
  
  //number of guesses the user inputs
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
    if(!isRepeat){ //if need to repeat same sequence after a mistake, do not go faster when repeating
      clueHoldTime -= 15;
    }
  }
  //enable the buttons after the sequence is complete
  setTimeout(enableButtons, delay); 
}//playClueSequence

//this function recieves the button the user guesses
function guess(btn){

  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  // add game logic here
  if(pattern[guessCounter] == btn){ //correct guess
    if(guessCounter == progress){ //if user completed given sequence
      if(progress == pattern.length - 1){ //if the end, game over win
        winGame();
        
      }else{ //if not the end
        //pattern correct, add next
        progress++;
        playClueSequence();
      }
    }else{ //if not completed sequence yet, increment guess counter
      guessCounter++;
    }
  }else{ //guess is incorrect,
    //check mistake counter to determine whether game is lost
    if(mistakeCounter < 2){
      //update mistake counter
      mistakeCounter++;
      //play pattern again to remind player
      isRepeat = true;
      playClueSequence();
      isRepeat = false;
    }
    else{
      loseGame();
    }
  }
  //update onscreen display of mistakes
  document.getElementById("numMistakes").innerHTML = mistakeCounter;
  //update level
  document.getElementById("progressCounter").innerHTML = progress + 1;
}//end guess

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won!");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6, //C
  2: 293.6, //D
  3: 329.6, //E
  4: 349.2, //F
  5: 391.9, //G
  6: 440,   //A
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  //show the letter when tone begins to play (when user clicks button)
  document.getElementById(btn).classList.remove("hidden");
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(btn){
  
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
  
  //when tone stops playing (when user releases button) hide the letter
  document.getElementById(btn).classList.add("hidden");
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
