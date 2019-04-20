let spaceButton = keyboard(" ");
let v = keyboard("v");
let b = keyboard("b");
let s = keyboard("s");
let f = keyboard("f");

let gameState;

const GAME_STATE = Object.freeze({ 
  MENU: 1,
  TUTOIAL: 2,
  GAME: 3,
  END: 4
});

const video = document.querySelector("#v");
const menu = document.querySelector("#menu");
let btn = document.querySelector("#btn");

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
  .add("Assets/Video/Comp_1.mp4")
  .add("Assets/Sprites/notering-0.json")
  .add("Assets/Sprites/notering-1.json")
  .add("Assets/Sprites/notering-2.json")
  .add("Assets/Sprites/notering-3.json")
  .add("Assets/Sprites/notering-4.json")
  .add("Assets/Sprites/notering-5.json")
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

let conductor;
let videoOpacity = 0;

let noteFrames = []; //for note ring animation


//animation for the button to move after press
function btnJump() {
	console.log("Jump called");
	console.log("Opacity is a "+ typeof btn.style.opacity);
	console.log("Btn Opacity: "+parseInt(btn.style.opacity));
	var fadeEffect = setInterval(function(){
		if(btn.style.opacity < 0.1){
			clearInterval(fadeEffect);
			console.log("If hit");
		} else {
			btn.style.opacity -= 0.1;
			console.log("Fading down");
		}
	}, 200);
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
      
    // magically works since the spritesheet was loaded with the pixi loader
    noteFrames.push(PIXI.Texture.fromFrame('Gameplay ring (miss) Comp 1_00' + val + '.png'));
  }

  var movie = new PIXI.extras.AnimatedSprite(noteFrames);
  
  /*
   * A MovieClip inherits all the properties of a PIXI sprite
   * so you can change its position, its anchor, mask it, etc
   */

  movie.position.set(-1000, -500);

  movie.anchor.set(0.5);
  movie.animationSpeed = 1;

  movie.loop = false;

  app.stage.addChild(movie);

  movie.play();

  conductor = new Conductor();

  app.ticker.add(delta => update(delta));
};

function update(delta){
  renderer.render(app.stage);

  if(started) {
    if(video.style.opacity <= 1) {
      video.style.opacity = videoOpacity;
      videoOpacity += 0.01;
    }
    menu.style.display = "none";
    conductor.draw();
  }
};

class Conductor {
  constructor() {
    this.graphics = new PIXI.Graphics();
    app.stage.addChild(this.graphics);

    this.started = false;
  }

  start() {
    if(!this.started) {
		this.noteMgrOrange = new NoteManager(300, "Assets/Images/Outer_Orange.png", this.graphics);
    this.noteMgrGreen = new NoteManager(700, "Assets/Images/Outer_Green.png", this.graphics);
    this.noteMgrPink = new NoteManager(1100, "Assets/Images/Outer_Pink.png", this.graphics);
      this.started = true;
      this.noteMgrOrange.start();
      this.noteMgrGreen.start();
      this.noteMgrPink.start();
    }
  }

  draw() {
    if(this.started) {
      this.graphics.clear();
      this.noteMgrOrange.draw();
      this.noteMgrGreen.draw();
      this.noteMgrPink.draw();
    }
  }
}

spaceButton.press = () => {
  conductor.noteMgrOrange.playLine.play();
};

v.press = () => {
  conductor.noteMgrPink.playLine.play();
};

b.press = () => {
  conductor.noteMgrGreen.playLine.play();
};

s.press = () => {
  //Starting video fade out
  while(video.style.opacity>=0){
		video.style.opacity -= 0.01;
	}
	//Could accomplish something with setTimeout(function, milliseconds)
	
	//btn anim
	//btnJump();
  console.log('s');
  started = true;
  conductor.start();
  video.src = "Assets/Video/Comp_1.mp4";
  video.play();
};

f.press = () => {
	btnJump();
};

class NoteManager {
  constructor(x, imgStr, gfx) {
    this.staff = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.notes = [];
    this.x = x;

    this.playLine = new PlayLine(imgStr, this.x, this.notes);

    this.graphics = gfx;

    this.offset = 0.250;

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
    const t0 = e.playbackTime + this.offset;

    let measure = 0.000;
 
    sched.insert(t0 + 0.000, this.createNote);
    sched.insert(t0 + 0.500, this.createNote);
    sched.insert(t0 + 1.000, this.createNote);
    sched.insert(t0 + 2.000, this.keepTime);

    this.offset = 0;
  }

  createNote = () => {

    if(this.staff.length > 0) {
      const timeSig = this.staff.shift();
      const note = new Note(timeSig, this.graphics, this.x);
      this.notes.push(note);
    }
  }
}

class PlayLine {
  constructor(imgStr, x, notes) {
    this.glowing = false;
    this.opacity = 0.9;

    this.playLineImg = new PIXI.Sprite(PIXI.loader.resources[imgStr].texture);
  
    app.stage.addChild(this.playLineImg);

    this.playLineImg.width = 400;
    this.playLineImg.height = 400;
    this.playLineImg.x = x - 200;
    this.playLineImg.y = 100;
    this.playLineImg.alpha = this.opacity;

    this.x = x;

    this.notes = notes;
  }

  draw() {
    if(this.glowing || this.opacity > 0.9) {
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
  constructor(timeSig, gfx, x) {
    this.radius = 1;
    this.stroke = 5;
    this.x = x;
    this.y = 300;
    this.active = true;
    this.chance = false;
    this.timeSig = timeSig;
    this.played = false;

    this.animation = new PIXI.extras.AnimatedSprite(noteFrames);
  
    /*
     * A MovieClip inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
  
    this.animation.position.set(this.x, this.y);

    this.animation.anchor.set(0.5);
    this.animation.animationSpeed = 1;

    this.animation.loop = false;
  
    app.stage.addChild(this.animation);

    this.animation.play();

    this.animation.onComplete = () => {
      PIXI.sound.play('drum');
      if(!going) {
        sched.start(metronome);
      }
    };
  }

  draw(){
    if(this.active) {
      // Clear and redraw circle

      this.radius += this.rate;
      if(this.radius > 180) {
        this.fade();
        this.opacity -= 0.05;
      }

      if(this.radius > 205) {
        this.active = false;
      }

      if(this.radius > 160 && this.radius < 187) {
        if(!this.played) {
          this.play();
          this.played = true;
        }
        this.chance = true;
      } else {
        this.chance = false;
      }
      if(this.radius > 300) {
        this.fade();
      }
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
    this.circle.clear();
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
 
