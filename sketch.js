let spaceButton = keyboard(" ");
let v = keyboard("v");
let b = keyboard("b");
let s = keyboard("s");
let f = keyboard("f");
let a = keyboard("a");

let gameState;

const GAME_STATE = Object.freeze({ 
  MENU: 1,
  TUTORIAL: 2,
  GAME: 3,
  END: 4
});

const video = document.querySelector("#v");
const menu = document.querySelector("#menu");
let btn = document.querySelector("#btn");
let btnStyle = window.getComputedStyle(btn);

const audioContext = new AudioContext();
const sched = new WebAudioScheduler({ context: audioContext });


//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: true, 
    resolution: 1
  }
);

PIXI.Sprite.prototype.bringToFront = function() {	if (this.parent) {var parent = this.parent;		parent.removeChild(this);		parent.addChild(this);	}}

var width =  window.screen.width;
var height =  window.screen.height;
video.width = window.screen.width;
video.height = window.screen.height;

let renderer = PIXI.autoDetectRenderer(width, height - 0, { 
    antialias: true, 
    transparent: true
  });

document.body.appendChild(renderer.view);

PIXI.loader
  .add("Assets/Images/Outer_Orange.png")
  .add("Assets/Images/Outer_Green.png")
  .add("Assets/Images/Outer_Pink.png")
  .add("Assets/Images/field_static.png")
  .add("Assets/Images/test.png")
  .add("Assets/Video/Comp_1.mp4")
  .add("Assets/Sprites/notering-0.json")
  .add("Assets/Sprites/notering-1.json")
  .add("Assets/Sprites/notering-2.json")
  .add("Assets/Sprites/notering-3.json")
  .add("Assets/Sprites/notering-4.json")
  .add("Assets/Sprites/notering-5.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-0.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-1.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-2.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-3.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-4.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-5.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-6.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-7.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-0.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-1.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-2.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-3.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-4.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-5.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-6.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/orange-exp-7.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-0.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-1.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-2.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-3.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-4.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-5.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-6.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/purple-exp-7.json")
  .add("Assets/Sprites/Finished_Gameplay_Rings-20190424T043036Z-001/blue-dot-0.json")
  .add("Assets/Sprites/Finished_Gameplay_Rings-20190424T043036Z-001/blue-dot-1.json")
  .add("Assets/Sprites/Finished_Gameplay_Rings-20190424T043036Z-001/blue-dot-2.json")
  .load(setup);

PIXI.sound.Sound.from({
  url: 'Assets/Sound/drom_loop.mp3',
  autoPlay: false,
  complete: function() {
      console.log('Sound finished');
  }
});

PIXI.sound.add('drum', 'Assets/Sound/drum_1.wav');
PIXI.sound.add('fail', 'Assets/Sound/fail.wav');
PIXI.sound.add('test', 'Assets/Sound/drom_loop.mp3');
PIXI.sound.add('song', 'Assets/Sound/Main_Theme_Var_1.mp3');

//------------------------------------------------------------
//----------------------------End Setup-----------------------
//------------------------------------------------------------
let playLine;
let playLine2;
let playLine3;
let noteMgrOrange;
let noteMgrGreen;
let noteMgrPink;
let started = false;
let actionable = false;

let conductor;
let videoOpacity = 0;

let noteFrames = []; //for note ring animation
let greenExpFrames = [];
let pinkExpFrames = []; 
let orangeExpFrames = [];


//animation for the button to move after press
function btnJump() {
	var fadeEffect = setInterval(function(){
		console.log("Btn go");
		if(!btn.style.opacity){
			btn.style.opacity = 1;
		}
		if(btnStyle.getPropertyValue('opacity') < 0.1){
			clearInterval(fadeEffect);
		} else {
			btn.style.opacity -= 0.06;
		}
	}, 100);
};

function setup() {
  gameState = GAME_STATE.MENU;

  for (var i = 0; i < 138; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }
      
    noteFrames.push(PIXI.Texture.fromFrame('Gameplay ring (miss) Comp 1_00' + val + '.png'));
  }

  for (var i = 0; i < 54; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }
      
    greenExpFrames.push(PIXI.Texture.fromFrame('Green_Ring_Explosion_Comp 1_00' + val + '.png'));
    orangeExpFrames.push(PIXI.Texture.fromFrame('Orange_Ring_Explosion_Comp 1_00' + val + '.png'));
    pinkExpFrames.push(PIXI.Texture.fromFrame('Purple_Ring_Explosion_Comp 1_00' + val + '.png'));
  }

  // This movie is here because FPS would always tank when the first
  // animation of the scene is played, for some reason. Getting it out of the way here.
  var testOne = new PIXI.extras.AnimatedSprite(noteFrames);
  testOne.position.set(-1000, -500);
  testOne.animationSpeed = 1;
  testOne.loop = false;
  app.stage.addChild(testOne);
  testOne.play();

  var testTwo = new PIXI.extras.AnimatedSprite(orangeExpFrames);
  testTwo.position.set(-1000, -500);
  testTwo.animationSpeed = 1;
  testTwo.width = .1;
  testTwo.height = .1;
  testTwo.loop = false;
  app.stage.addChild(testTwo);
  testTwo.play();

  conductor = new Conductor();

  app.ticker.add(delta => update(delta));
};

function update(delta){
  renderer.render(app.stage);

  if(gameState === GAME_STATE.TUTORIAL || gameState === GAME_STATE.GAME) {

    conductor.draw();
  }
};

class Conductor {
  constructor() {
    this.graphics = new PIXI.Graphics();
    app.stage.addChild(this.graphics);
    this.noteMgrOrange = new NoteManager(window.screen.width/4 - 50, "Assets/Images/Outer_Orange.png", this.graphics);
    this.noteMgrGreen = new NoteManager(window.screen.width/2, "Assets/Images/Outer_Green.png", this.graphics);
    this.noteMgrPink = new NoteManager(3*window.screen.width/4 + 50, "Assets/Images/Outer_Pink.png", this.graphics);

    this.managers = [this.noteMgrOrange, this.noteMgrGreen, this.noteMgrPink];
  }

  tutorialStart() {

  }

  start() {
    this.started = true;
    this.noteMgrOrange.start();
    this.noteMgrGreen.start();
    this.noteMgrPink.start();
  }

  draw() {
    this.graphics.clear();
    this.noteMgrOrange.draw();
    this.noteMgrGreen.draw();
    this.noteMgrPink.draw();
  }
}

const changeState = () => {
  console.log(gameState);
  if(gameState === GAME_STATE.MENU) {
    actionable = false;
    let setOpacity = 1;
    let timer = setInterval(() => {
      if(setOpacity <= 0) {
        clearInterval(timer);
        video.volume = 0;
        video.style.display = 'none';
        video.src = 'Assets/Video/Full_Particle_Video.mp4'
        video.currentTime = 0;
        menu.style.display = 'none';
        video.pause();
        beginTutorial();
      } else {
        video.style.opacity = setOpacity;
        video.volume = setOpacity;
        menu.style.opacity = setOpacity;
        setOpacity -= 0.008;
      }
    }, 15);
  } else if(gameState === GAME_STATE.TUTORIAL) {
    actionable = false;
    video.style.display = 'initial';
    let setOpacity = 0;
    let timer = setInterval(() => {
      if(setOpacity >= 1) {
        clearInterval(timer);
        video.volume = 1;
        video.style.opacity = 1;
        beginGame();
      } else if(setOpacity < 1) {
        video.style.opacity = setOpacity;
        video.volume = setOpacity;
        setOpacity += 0.008;
      }
    }, 15);
  }
};

// for changing and transitioning between states
a.press = () => {
  changeState();
};

const beginTutorial = () => {
  gameState = GAME_STATE.TUTORIAL;

  let timer = setInterval(() => {
    conductor.managers.forEach((m) => {
      if(m.playLine.opacity > 0.75) {
        clearInterval(timer);
        m.playLine.opacity = 0.75;
        actionable = true;
      } else {
        m.playLine.opacity += 0.008;
      }

    });
  }, 15);
};

const beginGame = () => {
  gameState = GAME_STATE.GAME;
  actionable = true;

  conductor.start();
};

spaceButton.press = () => {
  if(actionable) {
    conductor.noteMgrOrange.playLine.play();
  }
};

v.press = () => {
  if(actionable) {
    conductor.noteMgrPink.playLine.play();
  }
};

b.press = () => {
  if(actionable){
    conductor.noteMgrGreen.playLine.play();
  }
};

s.press = () => {	
	//time in ms
	var delayForFade = 2000;
	
  //Starting menu screen fade out
	var fadeOutEffect = setInterval(function(){
		//delete this once fade is working
		//turn off menu
		menu.style.display = "none";
		
		//make sure there are numbers for video and menu
		if(!video.style.opacity||!menu.style.opacity){
			video.style.opacity = 1;
			menu.style.opacity = 1;
		}
		if(videoOpacity < 0.1||started){
			console.log("if hit");
			clearInterval(fadeOutEffect);
		} else {
			video.style.opacity += 0.1;
			console.log("Opacity going down");
		}
	}, 2);
	
	setTimeout(function() {	
	//sticking this in here for a second
	//video fade back in
	var fadeUpEffect = setInterval(function(){
		if(video.style.opacity < 1&&started){
			 video.style.opacity += 0.1;
		} else {
			clearInterval(fadeUpEffect);
		}
	}, delayForFade);
		
  	console.log('s');
  	started = true;
  	conductor.start();
  	video.src = "Assets/Video/Comp_1.mp4";
  	video.play();
	}, delayForFade);
};

f.press = () => {
	btnJump();
};

class NoteManager {
  constructor(x, imgStr, gfx) {
    this.staff = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.notes = [];
    this.x = x;

    this.playLine = new PlayLine(imgStr, this.x, this.notes);

    this.graphics = gfx;

    this.offset = 0.250;

    this.imgStr = imgStr;

  }

  start() {
    sched.start(this.keepTime);
  }

  draw(){
    this.playLine.draw();
    this.notes.forEach((note) => {
      note.draw();
    });
  }

  keepTime = (e) => {
    const t0 = e.playbackTime;

    let measure = 0.000;
 
    // 1
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    measure++;

    // 2
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    measure++;

    // 3
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 1.000, this.createNote);
    measure++;

    // 4
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    measure++;

    // 5
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    sched.insert(t0 + measure * 2 + 1.000, this.createNote);
    sched.insert(t0 + measure * 2 + 1.500, this.createNote);
    measure++;

    // 6
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    measure++;

    // 7
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    sched.insert(t0 + measure * 2 + 1.000, this.createNote);
    sched.insert(t0 + measure * 2 + 1.500, this.createNote);
    measure++;
    
    // 8
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    measure++;

    // 9
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    sched.insert(t0 + measure * 2 + 1.000, this.createNote);
    sched.insert(t0 + measure * 2 + 1.500, this.createNote);
    measure++;

    // 10
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    measure++;

    // 11
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    sched.insert(t0 + measure * 2 + 1.000, this.createNote);
    sched.insert(t0 + measure * 2 + 1.500, this.createNote);
    measure++;

    // 12
    sched.insert(t0 + measure * 2 + 0.000, this.createNote);
    sched.insert(t0 + measure * 2 + 0.500, this.createNote);
    measure++;


  //  sched.insert(t0 + 2.000, this.keepTime);

    this.offset = 0;
  }

  createNote = () => {

    if(this.staff.length > 0) {
      const timeSig = this.staff.shift();
      const note = new Note(timeSig, this.graphics, this.x, this.imgStr);
      this.notes.push(note);
    }
  }
}

class PlayLine {
  constructor(imgStr, x, notes) {
    this.glowing = false;
    this.opacity = 0;

    this.playLineImg = new PIXI.Sprite(PIXI.loader.resources[imgStr].texture);
  
    app.stage.addChild(this.playLineImg);

    this.playLineImg.width = 300;
    this.playLineImg.height = 300;
    this.playLineImg.x = x - 175;
    this.playLineImg.y = 250;
    this.playLineImg.alpha = this.opacity;

    this.x = x;

    this.notes = notes;
  }

  draw() {
    this.playLineImg.bringToFront();
    if(this.glowing || this.opacity > 0.75) {
      this.opacity -= 0.02  ;
    }

    this.playLineImg.alpha = this.opacity;
  }

  play() {
    this.glowing = true;
    this.opacity = 1.2;
    let success;
    PIXI.sound.play('fail');

    for(let i=0; i<this.notes.length; i++){
      if(this.notes[i].chance){
        this.notes[i].hit();
        PIXI.sound.play('drum');
        success = true;
        break;
      } else {
        success = false;
      }
    }

    // noteMgr.notes.forEach((note) => {
    //   if(note.chance) {
    //     note.hit();
    //     success = true;
    //     break;
    //   } else {
    //     success = false;
    //   }
    // });

    if(!success) {
    }

    setTimeout(() => {
      this.glowing = false;
    }, 500);
  }
};

let going = false;

class Note {
  constructor(timeSig, gfx, x, imgStr) {
    this.radius = 1;
    this.stroke = 5;
    this.x = x - 25;
    this.y = 400;
    this.active = true;
    this.chance = false;
    this.timeSig = timeSig;
    this.played = false;

    this.animation = new PIXI.extras.AnimatedSprite(noteFrames);
  
    this.animation.position.set(this.x, this.y);

    this.animation.width = 2;
    this.animation.height = 2;

    this.animation.anchor.set(0.5);
    this.animation.animationSpeed = 1;

    this.animation.loop = false;
  
    app.stage.addChild(this.animation);

    this.animation.play();

    console.log(imgStr);
    if(imgStr.includes('Orange')){
      this.explosion = new PIXI.extras.AnimatedSprite(orangeExpFrames);
    } else if(imgStr.includes('Green')){
      this.explosion = new PIXI.extras.AnimatedSprite(greenExpFrames);
    } else if(imgStr.includes('Pink')){
      this.explosion = new PIXI.extras.AnimatedSprite(pinkExpFrames);      
    }
    this.explosion.anchor.set(0.5);

    this.explosion.position.set(this.x, this.y + 35);
    this.explosion.scale.set(.8, .8);

    this.explosion.animationSpeed = 1;

    this.explosion.loop = false;
  
    app.stage.addChild(this.explosion);

    this.testImg = new PIXI.Sprite(PIXI.loader.resources['Assets/Images/test.png'].texture);

    this.testImg.x = 300;
    this.testImg.y = 200;
    this.testImg.width = 25;
    this.testImg.height = 20;
  
    this.testImg.alpha = 0;
  
    app.stage.addChild(this.testImg);

    this.emitter = new PIXI.particles.Emitter(app.stage, 
      [PIXI.Texture.fromImage('Assets/Images/particle.png')],
      {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.18,
            "end": 0.001,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#9fe6fc",
            "end": "#9fe6fc"
        },
        "speed": {
            "start": 100,
            "end": 0,
            "minimumSpeedMultiplier": 0.96
        },
        "acceleration": {
            "x": -3,
            "y": -3
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 1,
            "max": 1
        },
        "blendMode": "normal",
        "frequency": 0.009,
        "emitterLifetime": 0.8,
        "maxParticles": 25,
        "pos": {
            "x": this.x,
            "y": this.y
        },
        "addAtBack": false,
        "spawnType": "ring",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 100,
            "minR": 100
        }
    });
  }

  draw(){
    if(this.active) {
      if(this.animation.currentFrame === 70) {
        PIXI.sound.play('drum');

        if(!going) {
          video.play();
          video.currentTime = 0;          

          going = true;
        }
      }

      if(this.animation.currentFrame >= 70 && this.animation.currentFrame <= 80) {
        this.testImg.alpha = 1;
        this.chance = true;
      } else {
        this.testImg.alpha = 0;
        this.chance = false;
      }
    }

    if(this.emit) {
      var now = Date.now();
	
      // The emitter requires the elapsed
      // number of seconds since the last update
      this.emitter.update((now - this.elapsed) * 0.001);
      this.elapsed = now;
    }
  }

  play () {
  }

  fade() {
    if(!this.fading){
      this.fading = true;
    }
  }

  hit() {
    this.explosion.play();
    console.log('hitto');
    this.testImg.alpha = 0;
    this.emit = true;
    this.elapsed = Date.now();
    this.emitter.playOnce();
    this.animation.visible = false;
    this.active = false;
    this.chance = false;
  }

  miss() {
    if(!this.missed){
      this.missed = true;
    }
  }
}

let masterGain = null;
let offset = 1.417;

function log() {
  console.log('works');
}
 
function metronome(e) {
    going = true;
    const t0 = e.playbackTime;
 
    sched.insert(t0 + 0.000, ticktack, { frequency: 880, duration: 0.1 });
    sched.insert(t0 + 0.500, ticktack, { frequency: 440, duration: 0.1 });
    sched.insert(t0 + 1.000, ticktack, { frequency: 440, duration: 0.1 });
    sched.insert(t0 + 1.500, ticktack, { frequency: 440, duration: 0.1 });
    sched.insert(t0 + 2.000, metronome);
}
 
function ticktack(e) {
  const t0 = e.playbackTime;
  const t1 = t0 + e.args.duration;
  const osc = audioContext.createOscillator();
  const amp = audioContext.createGain();
 
  osc.frequency.value = e.args.frequency;
  osc.start(t0);
  osc.stop(t1);
  osc.connect(amp);
 
  amp.gain.setValueAtTime(0.5, t0);
  amp.gain.exponentialRampToValueAtTime(1e-6, t1);
  amp.connect(masterGain);
 
  sched.nextTick(t1, () => {
    osc.disconnect();
    amp.disconnect();
  });
}
 
sched.on("start", () => {
  masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
});
 
sched.on("stop", () => {
  masterGain.disconnect();
  masterGain = null;
});
 
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    sched.aheadTime = 0.1;
  } else {
    sched.aheadTime = 1.0;
    sched.process();
  }
});
 
