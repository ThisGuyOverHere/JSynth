/*************************************
*  JSynth, a Javascript synthesizer  *
**************************************/

// Initializing notes and keyboard mapping and oscillator type

var notes = { '90':261.6, '83':277.2, '88':293.7, '68':311.1, '67':329.6, '86':349.2,
              '71':370.0, '66':392.0, '72':415.3, '78':440.0, '74':466.2, '77':493.9,
              '188':523.2 };

var osc = ["sine","square","sawtooth","triangle"];

var fired = {};

addEventListener("keydown", function(e){

  var key = e.keyCode;

  if(fired[key] == null || !fired[key]){
    //Avoids same button trigger
    fired[key]    = true;
    
    var attack  = aSlidr.value()/100;
    var decay   = dSlidr.value()/100;
    var sustain = sSlidr.value()/400;
    var release = rSlidr.value()/100;

    env[key] = (new p5.Env());
    env[key].setADSR(attack,decay,sustain,release);
    env[key].setRange(0.3,0);
    
    wave[key] = new p5.Oscillator();
    wave[key].amp(env[key]);
    wave[key].start();
    wave[key].setType(osc[oscSlidr.value()]);
    wave[key].freq(2);
    
    env[key].triggerAttack();
  
    setNote(key);
  }
  
})


addEventListener("keyup", function(e){
  env[e.keyCode].triggerRelease();
  fired[e.keyCode] = false;
})

function setNote(i){

  wave[i].freq(notes[i.toString()]);

  if(wave[i].freq == 2){
    wave[i].amp(0);
  }
}

//Initializing canvas, oscillators and envelopes

var wave = {};
var env = {};
var note = {};
var aSlidr, dSlidr, sSlidr, rSlidr;
var oscSlidr;

function setup() {
  aSlidr = createSlider(1,100,1);
  aSlidr.parent('#attack');
  dSlidr = createSlider(1,100,1);
  dSlidr.parent('#decay');
  sSlidr = createSlider(1,100,100);
  sSlidr.parent('#sustain');
  rSlidr = createSlider(1,100,1);
  rSlidr.parent('#release');
  oscSlidr = createSlider(0,3,0);
  oscSlidr.parent('#osc')
}

function draw() {

}
