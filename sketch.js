let keyObject = keyboard(" ");

//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

PIXI.loader
  .add("Assets/Images/Outer_Orange.png")
  .add("Assets/Images/field_static.png")
  .load(setup);

PIXI.sound.Sound.from({
  url: 'Assets/Sound/Variation_3.mp3',
  autoPlay: false,
  complete: function() {
      console.log('Sound finished');
  }
});

PIXI.sound.add('drum', 'Assets/Sound/drum_1.wav');
PIXI.sound.add('fail', 'Assets/Sound/fail.wav');
PIXI.sound.add('miss', 'Assets/Sound/miss.wav');

//------------------------------------------------------------
//----------------------------End Setup-----------------------
//------------------------------------------------------------
let playLine;
let noteMgr;
let started = false;

function setup() {
  let background = new PIXI.Sprite(PIXI.loader.resources["Assets/Images/field_static.png"].texture);
  app.stage.addChild(background);
  background.width = window.innerWidth;
  background.height = window.innerHeight;

  // Create game elements
  playLine = new PlayLine();
  noteMgr = new NoteManager();

  app.ticker.add(delta => gameLoop(delta));
};

function gameLoop(delta){
  if(!started) {
    noteMgr.playNote();
    started = true;
  }
  noteMgr.draw();
  playLine.draw();
};

keyObject.press = () => {
  playLine.play();
};

class PlayLine {
  constructor() {
    this.glowing = false;
    this.opacity = 0.5;

    this.playLineImg = new PIXI.Sprite(PIXI.loader.resources["Assets/Images/Outer_Orange.png"].texture);
  
    app.stage.addChild(this.playLineImg);

    this.playLineImg.width = 400;
    this.playLineImg.height = 400;
    this.playLineImg.x = window.innerWidth/2 - 200;
    this.playLineImg.y = 100;
    this.playLineImg.alpha = this.opacity;
  }

  draw() {
    if(this.glowing || this.opacity > 0.5) {
      this.opacity -= 0.02;
    }

    this.playLineImg.alpha = this.opacity;
  }

  play() {
    this.glowing = true;
    this.opacity = 1.2;
    let success;

    for(let i=0; i<noteMgr.notes.length; i++){
      if(noteMgr.notes[i].chance){
        noteMgr.notes[i].hit();
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
      PIXI.sound.play('fail');
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
    this.staff = [1, .25, .25, .25, .25, 1, 1];
    this.notes = [];
  }

  draw(){
    this.notes.forEach((note) => {
      note.draw();
    });
  }

  nextNote() {
    this.playNote();
  }

  playNote() {
    console.log(this.staff);

    if(this.staff.length > 0) {
      const timeSig = this.staff.shift();
      const note = new Note();
      this.notes.push(note);
  
      setTimeout(() => {
        this.nextNote();
      }, this.qtrNote * 1000 * timeSig);
    }
  }
}

class Note {
  constructor() {
    this.radius = 1;
    this.stroke = 5;
    this.x = window.innerWidth/2;
    this.y = 300;
    this.rate = 2;
    this.opacity = 0.9;
    this.destroyNextFrame = false;
    this.active = true;
    this.chance = false;

    //Make circle
    this.circle = new PIXI.Graphics();
    this.circle.beginFill();
    this.circle.fillAlpha = 0;
    this.circle.lineStyle(this.stroke, 0xffffff, this.opacity);
    this.circle.drawCircle(0, 0, this.radius);
    this.circle.position.x = this.x;
    this.circle.position.y = this.y;
    this.circle.endFill();
    app.stage.addChild(this.circle);
  }

  draw(){
    if(this.active) {
      // Clear and redraw circle
      this.circle.clear();
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
        this.miss();
        this.opacity -= 0.05;
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
    this.circle.destroy();
    this.active = false;
    this.destroyNextFrame = true;
  }

  hit() {
    this.circle.clear();
    this.active = false;
    this.chance = false;
  }

  miss() {
    if(!this.missed){
      this.missed = true;
      PIXI.sound.play('miss');
    }
  }
}

