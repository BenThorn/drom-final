//require johny-five, lable the board, and create a variable defaulting to the board is not firing
var five = require("johny-five");
var board = new five.board();
var hit1 = false;

let keyObject = keyboard(" ");

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

let renderer = PIXI.autoDetectRenderer(width, height - 0, { 
    antialias: true, 
  });

document.body.appendChild(renderer.view);

// var smoothie = new Smoothie({
//   engine: PIXI, 
//   renderer: renderer,
//   root: app.stage,
//   fps: 30,
//   update: update.bind(this)
// });

// var texture = PIXI.Texture.fromVideo("Assets/Video/Comp_1.mp4");
// var videoSprite = new PIXI.Sprite(texture);
// app.stage.addChild(videoSprite);

PIXI.loader
  .add("Assets/Images/Outer_Orange.png")
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
let noteMgrOrange;
let started = false;

function setup() {
  // let background = new PIXI.Sprite(PIXI.loader.resources["Assets/Video/Comp_1.mp4"].texture);
  // app.stage.addChild(background);
  // background.width = window.innerWidth;
  // background.height = window.innerHeight;

  // Create game elements
  noteMgrOrange = new NoteManager();
  playLine = new PlayLine("Assets/Images/Outer_Orange.png", noteMgrOrange);

  update();
};

function update(){
  renderer.render(app.stage);

  if(!started) {
    noteMgrOrange.playNote();
    started = true;
  }
  noteMgrOrange.draw();
  playLine.draw();

  requestAnimationFrame(update);
};

board.on("ready", function() {
	var sensor = new five.Sensor("A0");
	
	sensor.on("change", function() {
		console.log("Drum Fires");
		hit1 = true;
	});
});

/*
Replaced by the above to make an attempt at triggering the boolean
keyObject.press = () => {
  playLine.play();
};
*/

class PlayLine {
  constructor(imgStr, noteMgr) {
    this.glowing = false;
    this.opacity = 0.5;

    this.playLineImg = new PIXI.Sprite(PIXI.loader.resources[imgStr].texture);
  
    app.stage.addChild(this.playLineImg);

    this.playLineImg.width = 400;
    this.playLineImg.height = 400;
    this.playLineImg.x = window.innerWidth/2 - 200;
    this.playLineImg.y = 100;
    this.playLineImg.alpha = this.opacity;

    this.noteMgr = noteMgr;
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

    for(let i=0; i<this.noteMgr.notes.length; i++){
      if(this.noteMgr.notes[i].chance){
        this.noteMgr.notes[i].hit();
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

class NoteManager {
  constructor() {
    this.bpm = 120;
    this.qtrNote = 60 / this.bpm;
    this.staff = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    this.notes = [];

    this.graphics = new PIXI.Graphics();

    app.stage.addChild(this.graphics);

    sched.start(this.keepTime);
    sched.start(metronome);
  }

  draw(){
    this.graphics.clear();
    this.notes.forEach((note) => {
      note.draw();
    });
  }

  keepTime = (e) => {
    const t0 = e.playbackTime;

    let measure = 0.000;
 
    sched.insert(t0 + 0.000, this.playNote);
    sched.insert(t0 + 0.500, this.keepTime);
  }

  nextNote() {
    this.playNote();
  }

  playNote = () => {
  //  console.log(this.staff);

    if(this.staff.length > 0) {
      const timeSig = this.staff.shift();
      const note = new Note(timeSig, this.graphics);
      this.notes.push(note);
    }
  }
}

class Note {
  constructor(timeSig, gfx) {
    this.radius = 1;
    this.stroke = 5;
    this.x = window.innerWidth/2;
    this.y = 300;
    this.rate = 2;
    this.opacity = 0.9;
    this.destroyNextFrame = false;
    this.active = true;
    this.chance = false;
    this.timeSig = timeSig;

    //Make circle
    this.circle = gfx;
    this.circle.beginFill();
    this.circle.fillAlpha = 0;
    this.circle.lineStyle(this.stroke, 0xffffff, this.opacity);
    this.circle.drawCircle(0, 0, this.radius);
    this.circle.position.x = this.x;
    this.circle.position.y = this.y;
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
      this.circle.drawCircle(0, 0, this.radius);
      this.circle.position.x = this.x;
      this.circle.position.y = this.y;
      this.circle.endFill();

      this.radius += this.rate;
      if(this.radius > 180) {
        this.fade();
        this.opacity -= 0.05;
      }

      if(this.radius > 250) {
        this.active = false;
      }

      if(this.radius > 160 && this.radius < 180) {
        this.chance = true;
      } else {
        this.chance = false;
      }
      if(this.radius > 300) {
        this.fade();
      }
    }
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
	
	//reset the bool so that the next note can be detected for hit
	hit1 = false;
}

let masterGain = null;
 
function metronome(e) {
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
 
document.getElementById("start-button").addEventListener("click", () => {
  sched.start(metronome);  
});
