let spaceButton = keyboard(" ");
let v = keyboard("v");
let b = keyboard("b");
let s = keyboard("s");

const video = document.querySelector("#v");
let menu = document.querySelector("#menu");


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

function setup() {
  // let background = new PIXI.Sprite(PIXI.loader.resources["Assets/Video/Comp_1.mp4"].texture);
  // app.stage.addChild(background);
  // background.width = window.innerWidth;
  // background.height = window.innerHeight;

  // Create game elements

  conductor = new Conductor();

  update();
};

function update(){
  renderer.render(app.stage);
  video.play();

  if(started) {
    if(video.style.opacity <= 1) {
      console.log(video.style.opacity);
      video.style.opacity = videoOpacity;
      videoOpacity += 0.01;
    }
    menu.style.display = "none";
    conductor.draw();
  }

  requestAnimationFrame(update);
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
  /*Starting video fade out
  if(video.style.opacity>=0)*/
  console.log('s');
  started = true;
  conductor.start();
  video.src = "Assets/Video/Comp_1.mp4";
  video.play();
  PIXI.sound.play('test');
};

class NoteManager {
  constructor(x, imgStr, gfx) {
    this.staff = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
    sched.insert(t0 + 0.500, this.keepTime);

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
    this.opacity = 0.5;

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
    if(this.glowing || this.opacity > 0.5) {
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

class Note {
  constructor(timeSig, gfx, x) {
    this.radius = 1;
    this.stroke = 5;
    this.x = x;
    this.y = 300;
    this.rate = 2;
    this.opacity = 0.9;
    this.destroyNextFrame = false;
    this.active = true;
    this.chance = false;
    this.timeSig = timeSig;
    this.played = false;

    //Make circle
    this.circle = gfx;
    this.circle.beginFill();
    this.circle.fillAlpha = 0;
    this.circle.lineStyle(this.stroke, 0xffffff, this.opacity);
    this.circle.drawCircle(this.x, this.y, this.radius);
    this.circle.endFill();
  }

  draw(){
    if(this.active) {
      // Clear and redraw circle
      this.circle.beginFill();
      this.circle.fillAlpha = 0;
      this.circle.lineStyle(this.stroke, 0xffffff, this.opacity);
      if(this.chance) {
        this.circle.lineStyle(this.stroke, 0xff0000, this.opacity);
      }
      this.circle.drawCircle(this.x, this.y, this.radius);
      this.circle.endFill();

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
  const t0 = e.playbackTime + offset;
 
  sched.insert(t0 + 0.000, ticktack, { frequency: 880, duration: 0.1 });
  sched.insert(t0 + 0.500, ticktack, { frequency: 440, duration: 0.1 });
  sched.insert(t0 + 1.000, ticktack, { frequency: 440, duration: 0.1 });
  sched.insert(t0 + 1.500, ticktack, { frequency: 440, duration: 0.1 });
  sched.insert(t0 + 2.000, metronome);
  offset = 0;
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
 
document.getElementById("start-button").addEventListener("click", () => {
  sched.start(metronome);  
});
