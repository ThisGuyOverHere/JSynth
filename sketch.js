/*************************************
*  JSynth, a Javascript synthesizer  *
**************************************/

// Initializing notes and keyboard mapping

var notes = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9, 523.2];

var note = {
  frequency: 440;
}

var keysDown = {};
addEventListener("keydown", function(e){
  keysDown[e.keyCode] = true;
  env.triggerAttack();
})
addEventListener("keyup", function(e){
  delete keysDown[e.keyCode];
  if(Object.getOwnPropertyNames(keysDown).length == 0){
    env.triggerRelease();
  }
})

function setNote(){

  if(90 in keysDown){
    note.frequency = notes[0]; // Z = C4
  }
  if(83 in keysDown){
    note.frequency = notes[1]; // S = C#4
  } 
  if(88 in keysDown){
    note.frequency = notes[2]; // X = D4
  } 
  if(68 in keysDown){
    note.frequency = notes[3]; // D = D#4
  } 
  if(67 in keysDown){
    note.frequency = notes[4]; // C = E4
  } 
  if(86 in keysDown){
    note.frequency = notes[5]; // V = F4
  } 
  if(71 in keysDown){
    note.frequency = notes[6]; // G = F#4
  }
  if(66 in keysDown){
    note.frequency = notes[7]; // B = G4
  } 
  if(72 in keysDown){
    note.frequency = notes[8]; // H = G#4
  } 
  if(78 in keysDown){
    note.frequency = notes[9]; // N = A4
  } 
  if(74 in keysDown){
    note.frequency = notes[10];// J = A#4
  } 
  if(77 in keysDown){
    note.frequency = notes[11];// M = B4
  } 
  if(188 in keysDown){
    note.frequency = notes[12];// , = C5
  }
}

//Initializing canvas, oscillators and envelopes

var wave;
var freqSlider;
var ampSlider;
var env;

function setup() {
  createCanvas(200,200);
  env = new p5.Env();
  env.setADSR(0.2,0.8,0.1,0.3);
  env.setRange(0.8,0);
  wave = new p5.Oscillator();
  wave.amp(env);
  wave.start();
  wave.setType('sine');
  freqSlider = createSlider(1000,4400,440);
  ampSlider = createSlider(0,100,10);
}

function draw() {
  background(61);
  wave.freq(note.frequency);
  setNote();

}