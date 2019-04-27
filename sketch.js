let spaceButton = keyboard(" ");
let v = keyboard("v");
let b = keyboard("b");
let s = keyboard("s");
let f = keyboard("f");
let a = keyboard("a");

//variables for start menu check
let playerRdyOne = false;
let playerRdyTwo = false;
let playerRdyThree = false;
let orgCircle;
let grnCircle;
let pnkCircle;
const orgCirclex = 0;
const orgCircley = 0;
const grnCirclex = 0;
const grnCircley = 0;
const pnkCirclex = 0;
const pnkCircley = 0;
const circleSize = 20; 

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
  .add("Assets/Sprites/notering-0.json")
  .add("Assets/Sprites/notering-1.json")
  .add("Assets/Sprites/notering-2.json")
  .add("Assets/Sprites/notering-3.json")
  .add("Assets/Sprites/notering-4.json")
  .add("Assets/Sprites/notering-5.json")
  .add("Assets/Sprites/Ring_Explosion-20190424T063018Z-001/Ring_Explosion/green-exp-0.json") // Ring explosions
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
  .add("Assets/Sprites/New Rings/ring sprite exports/blue-dot.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/green-dot.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/orange-dot.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/pink-dot.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/blue-solid.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/green-solid.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/orange-solid.json")
  .add("Assets/Sprites/New Rings/ring sprite exports/pink-solid.json")
  .add("Assets/Sprites/Success_Feedback_Text/awesome-0.json")
  .add("Assets/Sprites/Success_Feedback_Text/awesome-1.json")
  .add("Assets/Sprites/Success_Feedback_Text/nice-0.json")
  .add("Assets/Sprites/Success_Feedback_Text/good-0.json")
  .add("Assets/Sprites/Success_Feedback_Text/good-1.json")
  .add("Assets/Sprites/Ring Feedback/green-ring-3-0.json")
  .add("Assets/Sprites/Ring Feedback/green-ring-3-1.json")
  .add("Assets/Sprites/Ring Feedback/green-ring-3-2.json")
  .add("Assets/Sprites/Ring Feedback/orange-ring-3-0.json")
  .add("Assets/Sprites/Ring Feedback/orange-ring-3-1.json")
  .add("Assets/Sprites/Ring Feedback/orange-ring-3-2.json")
  .add("Assets/Sprites/Ring Feedback/pink-ring-3-0.json")
  .add("Assets/Sprites/Ring Feedback/pink-ring-3-1.json")
  .add("Assets/Sprites/Ring Feedback/pink-ring-3-2.json")
  .add("Assets/Images/final results.png")
  .add("Assets/Images/guide.png")
  .load(setup);

// PIXI.sound.Sound.from({
//   url: 'Assets/Sound/drom_loop.mp3',
//   autoPlay: false,
//   complete: function() {
//       console.log('Sound finished');
//   }
// });

//------------------------------------------------------------
//----------------------------End Setup-----------------------
//------------------------------------------------------------

let started = false;
let actionable = false;

let conductor;
let videoOpacity = 0;

let blueDotFrames = [];
let greenDotFrames = [];
let purpleDotFrames = [];
let orangeDotFrames = [];

let blueRingFrames = [];
let greenRingFrames = [];
let purpleRingFrames = [];
let orangeRingFrames = [];

let greenExpFrames = [];
let pinkExpFrames = []; 
let orangeExpFrames = [];

let orangeFeedbackFrames = [];
let greenFeedbackFrames = [];
let pinkFeedbackFrames = [];

let awesomeFrames = [];
let niceFrames = [];
let goodFrames = [];

let orangeTutorialHit = false;
let pinkTutorialHit = false;
let greenTutorialHit = false;

let scores = [];

function setup() {
  for (var i = 0; i < 138; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }
      
    blueDotFrames.push(PIXI.Texture.fromFrame('bluedotring_00' + val + '.png'));
    greenDotFrames.push(PIXI.Texture.fromFrame('greendotring_00' + val + '.png'));
    purpleDotFrames.push(PIXI.Texture.fromFrame('pinkdotring_00' + val + '.png'));
    orangeDotFrames.push(PIXI.Texture.fromFrame('orangedotring_00' + val + '.png'));

    blueRingFrames.push(PIXI.Texture.fromFrame('bluesolidring_00' + val + '.png'));
    greenRingFrames.push(PIXI.Texture.fromFrame('greensolidring_00' + val + '.png'));
    purpleRingFrames.push(PIXI.Texture.fromFrame('pinksolidring_00' + val + '.png'));
    orangeRingFrames.push(PIXI.Texture.fromFrame('orangesolidring_00' + val + '.png'));
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

  for (var i = 123; i < 165; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }

    orangeFeedbackFrames.push(PIXI.Texture.fromFrame('Orange Ring 3_00' + val + '.png'));
  }

  for (var i = 143; i < 185; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }

    greenFeedbackFrames.push(PIXI.Texture.fromFrame('Green Ring 3_00' + val + '.png'));
  }

  for (var i = 190; i < 229; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }

    pinkFeedbackFrames.push(PIXI.Texture.fromFrame('Pink Ring 3_00' + val + '.png'));
  }

  for (let i = 421; i < 517; i++) {
    let val;
    if(i >= 100) {
      val = i;
    } else if (i < 100 && i >= 10) {
      val = '0' + i;
    } else if (i < 10) {
      val = '00' + i;
    }

    goodFrames.push(PIXI.Texture.fromFrame('Purple_Success_Feedback Text_00' + val + '.png'));
    niceFrames.push(PIXI.Texture.fromFrame('Green_Success_Feedback Text_00' + val + '.png'));
    awesomeFrames.push(PIXI.Texture.fromFrame('Orange_Success_Feedback_Text_00' + val + '.png'));
  }

  // Load object into GPU
  app.renderer.plugins.prepare
  .add(new PIXI.extras.AnimatedSprite(orangeExpFrames))
  .add(new PIXI.extras.AnimatedSprite(greenExpFrames))
  .add(new PIXI.extras.AnimatedSprite(pinkExpFrames))
  .add(new PIXI.extras.AnimatedSprite(blueDotFrames))
  .add(new PIXI.extras.AnimatedSprite(greenDotFrames))
  .add(new PIXI.extras.AnimatedSprite(purpleDotFrames))
  .add(new PIXI.extras.AnimatedSprite(orangeDotFrames))
  .add(new PIXI.extras.AnimatedSprite(blueRingFrames))
  .add(new PIXI.extras.AnimatedSprite(greenRingFrames))
  .add(new PIXI.extras.AnimatedSprite(orangeRingFrames))
  .add(new PIXI.extras.AnimatedSprite(orangeFeedbackFrames))
  .add(new PIXI.extras.AnimatedSprite(greenFeedbackFrames))
  .add(new PIXI.extras.AnimatedSprite(pinkFeedbackFrames))
  .add(new PIXI.extras.AnimatedSprite(goodFrames))
  .add(new PIXI.extras.AnimatedSprite(niceFrames))
  .add(new PIXI.extras.AnimatedSprite(awesomeFrames))
  .upload(() => {
    let testAnims = [];
    testAnims.push(new PIXI.extras.AnimatedSprite(blueDotFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(blueRingFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(greenDotFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(greenRingFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(purpleDotFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(purpleRingFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(orangeDotFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(orangeRingFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(orangeExpFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(greenExpFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(pinkExpFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(orangeFeedbackFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(greenFeedbackFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(pinkFeedbackFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(awesomeFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(niceFrames));
    testAnims.push(new PIXI.extras.AnimatedSprite(goodFrames));

    start();

    let numPlayed = 0;

    for(let i = 0; i < testAnims.length; i++) {
      testAnims[i].position.set(0, 0);
      testAnims[i].scale.set(.5);
      testAnims[i].animationSpeed = 1;
      testAnims[i].anchor.set(.5);
      testAnims[i].loop = false;

      app.stage.addChild(testAnims[i]);
    }

    testAnims.forEach((test) => {
      test.onComplete = function (){
        numPlayed++;
        console.log('anim complete');
        app.stage.removeChild(test);

        if(numPlayed === 17) {
          video.play();
        }
      }
      test.play();
    });

  });


};

function start() {
  gameState = GAME_STATE.MENU;

  conductor = new Conductor();
  app.ticker.add(delta => update(delta));
}

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

    this.outerBar = new PIXI.Graphics();
    this.outerBar.beginFill(0xffffff, .1);
    // outerBar.lineStyle(0, 0xffffff, .4);
    // outerBar.alpha = .4;
    this.outerBar.drawRoundedRect(0, 0, window.screen.width/2, 15, 10)
    this.outerBar.endFill();
    this.outerBar.x = window.screen.width/4;
    this.outerBar.y = 90;
    app.stage.addChild(this.outerBar);

    this.progressBar = new PIXI.Graphics();
    this.progressBar.beginFill(0xffffff);
    this.progressBar.drawRoundedRect(0, 0, window.screen.width/2, 15, 10)
    this.progressBar.endFill();
    this.progressBar.scale.set(0, 1);
    this.progressBar.x = window.screen.width/4;
    this.progressBar.y = 90;
    app.stage.addChild(this.progressBar);

    this.progressBar.alpha = 0;
    this.outerBar.alpha = 0;

    this.tutorialEnded = false;

    this.guideImage = new PIXI.Sprite(
      PIXI.loader.resources["Assets/Images/guide.png"].texture
    );

    this.guideImage.position.set(-200, -10);

    this.guideImage.alpha = 0;

    app.stage.addChild(this.guideImage);
  }

  tutorialStart() {
    this.noteMgrOrange.tutorialStart();
    this.noteMgrGreen.tutorialStart();
    this.noteMgrPink.tutorialStart();
  }

  tutorialEnd() {
    this.noteMgrOrange.tutorialEnd();
    this.noteMgrGreen.tutorialEnd();
    this.noteMgrPink.tutorialEnd();
  }

  start() {
    this.noteMgrOrange.start();
    this.noteMgrGreen.start();
    this.noteMgrPink.start();
  }

  draw() {
    
    if(gameState === GAME_STATE.TUTORIAL || gameState === GAME_STATE.GAME){
      this.graphics.clear();
      this.noteMgrOrange.draw();
      this.noteMgrGreen.draw();
      this.noteMgrPink.draw();
    }

    if(gameState === GAME_STATE.TUTORIAL) {

      if(this.managers[0].tutorialHit === true && this.managers[1].tutorialHit === true && this.managers[2].tutorialHit === true && this.tutorialEnded === false) {
        this.tutorialEnded = true;
        changeState();
      }
    }

    if(gameState === GAME_STATE.GAME) {
      this.progressBar.scale.set((video.currentTime/video.duration), 1);
    }
  }

  end() {
    this.managers.forEach((manager) => {
      app.stage.removeChild(manager.playLine.playLineImg);
    });
  }
}

const changeState = () => {
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
    sched.removeAll();
    conductor.tutorialEnd();
    video.style.display = 'initial';
    let setOpacity = 0;
    let timer = setInterval(() => {
      if(setOpacity >= 1) {
        clearInterval(timer);
        video.volume = 1;
        video.loop = false;
        video.style.opacity = 1;
        beginGame();
      } else if(setOpacity < 1) {
        video.style.opacity = setOpacity;
        conductor.progressBar.alpha = setOpacity;
        conductor.outerBar.alpha = setOpacity * .4;
        conductor.guideImage.alpha -= 0.008;
        video.volume = setOpacity;
        setOpacity += 0.008;
      }
    }, 15);
  } else if(gameState === GAME_STATE.GAME) {
      endGame();
  } else if(gameState === GAME_STATE.END) {
    video.style.display = 'initial';
    menu.style.display = 'initial';
    scores.forEach((s) => {
      document.querySelector('body').removeChild(s);
    });
    while(app.stage.children.length > 0) {
      app.stage.removeChild(app.stage.children[0]);
    }
    let setOpacity = 0;
    let timer = setInterval(() => {
      if(setOpacity >= 1) {
        clearInterval(timer);
        video.volume = 1;
        video.style.opacity = 1;
        menu.style.opacity = 1;
        restartDrom();
      } else if(setOpacity < 1) {
        video.style.opacity = setOpacity;
        video.volume = setOpacity;
        menu.style.opacity = setOpacity;
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
        m.tutorialStart();
        actionable = true;
      } else {
        m.playLine.opacity += 0.008;
        conductor.guideImage.alpha = m.playLine.opacity * 1.3333;
      }

    });
  }, 15);
};

const beginGame = () => {
  gameState = GAME_STATE.GAME;
  actionable = true;

  conductor.start();
};

const endGame = () => {
  gameState = GAME_STATE.END;
  sched.stop();
  sched.removeAll();

  actionable = false;
  let setOpacity = 1;
  conductor.managers.forEach((m) => {
    m.playLine.text.remove();
  });
  let timer = setInterval(() => {
    if(setOpacity <= 0) {
      clearInterval(timer);
      conductor.end();
      video.volume = 0;
      video.style.display = 'none';
      video.currentTime = 0;
      menu.style.display = 'none';
      video.src = "Assets/Video/MenuParticles.mp4";
      video.pause();
      showResults(
        conductor.noteMgrOrange.playLine.totalHit,
        conductor.noteMgrOrange.playLine.highestStreak,
        conductor.noteMgrGreen.playLine.totalHit,
        conductor.noteMgrGreen.playLine.highestStreak,
        conductor.noteMgrPink.playLine.totalHit,
        conductor.noteMgrPink.playLine.highestStreak,
        );
      conductor = null;
    } else {
      video.style.opacity = setOpacity;
      conductor.managers.forEach((m) => {
        m.playLine.playLineImg.alpha = setOpacity;
        m.playLine.circle.alpha = setOpacity / 5;
      }); 
      conductor.progressBar.alpha = setOpacity;
      conductor.outerBar.alpha = setOpacity * .4;
      video.volume = setOpacity;
      setOpacity -= 0.008;
    }
  }, 15);
};

const showResults = (orangeNumHit, orangeHighStreak, greenNumHit, greenHighStreak, pinkNumHit, pinkHighStreak) => {
  let background = new PIXI.Sprite(
    PIXI.loader.resources["Assets/Images/final results.png"].texture
  );

  console.log(orangeNumHit);

  let player1Score = Math.trunc(orangeNumHit/115 * 100);
  let player2Score = Math.trunc(greenNumHit/110 * 100);
  let player3Score = Math.trunc(pinkNumHit/110 * 100);

  console.log(player1Score, player2Score, player3Score);

  let p1score = document.createElement('p');
  p1score.className = 'score';
  p1score.textContent = '' + player1Score + '%';
  p1score.style.top = 354;
  p1score.style.left = 165;

  let p1high = document.createElement('p');
  p1high.className = 'score';
  p1high.textContent = orangeHighStreak;
  p1high.style.top = 540;
  p1high.style.left = 234;

  let p2score = document.createElement('p');
  p2score.className = 'score';
  p2score.textContent = '' + player2Score + '%';
  p2score.style.top = 354;
  p2score.style.left = 409;

  let p2high = document.createElement('p');
  p2high.className = 'score';
  p2high.textContent = greenHighStreak;
  p2high.style.top = 540;
  p2high.style.left = 476;

  let p3score = document.createElement('p');
  p3score.className = 'score';
  p3score.textContent = '' + player3Score + '%';
  p3score.style.top = 354;
  p3score.style.left = 643;

  let p3high = document.createElement('p');
  p3high.className = 'score';
  p3high.textContent = pinkHighStreak;
  p3high.style.top = 540;
  p3high.style.left = 713;

  let teamFinalScore = (orangeNumHit + greenNumHit + pinkNumHit) * (orangeHighStreak + greenHighStreak + pinkHighStreak);

  let teamScore = document.createElement('p');
  teamScore.className = 'score';
  teamScore.textContent = teamFinalScore;
  teamScore.style.fontSize = '72px';
  teamScore.style.top = 350;
  teamScore.style.left = 982;
  teamScore.style.width = 400;

  scores = [p1score, p1high, p2score, p2high, p3score, p3high, teamScore];

  background.height = window.screen.height;
  background.width = window.screen.width;

  scores.forEach((thing) => {
    document.querySelector('body').appendChild(thing);
    thing.style.opacity = 0;
  });
  background.alpha = 0;

  app.stage.addChild(background);

  let setOpacity = 0;

  let timer = setInterval(() => {
    if(setOpacity >= 1) {
      clearInterval(timer);
      scores.forEach((thing) => {
        thing.style.opacity = 1;
      });
      background.alpha = 1;
    } else {
      setOpacity += 0.008;
      scores.forEach((thing) => {
        thing.style.opacity = setOpacity;
      });
      background.alpha = setOpacity;
    }
  }, 15);
};

const restartDrom = () => {
  gameState = GAME_STATE.MENU;
  while(app.stage.children.length > 0) {
    app.stage.removeChild(app.stage.children[0]);
  }
  video.loop = true;
  video.play();
  going = false;
  sched.removeAll();

  conductor = new Conductor();
};

spaceButton.press = () => {
	//check game ready
	if(GAME_STATE === GAME_STATE.MENU){
		playerRdyOne = true;
	}
	
  if(actionable) {
    conductor.noteMgrOrange.playLine.play();
  }
};

v.press = () => {
	//check game ready
	if(GAME_STATE === GAME_STATE.MENU){
		playerRdyTwo = true;
	}
  if(actionable) {
    conductor.noteMgrPink.playLine.play();
  }
};

b.press = () => {
	
	//check game ready
	if(GAME_STATE === GAME_STATE.MENU){
		playerRdyThree = true;
	}
  if(actionable){
    conductor.noteMgrGreen.playLine.play();
  }
};

class NoteManager {
  constructor(x, imgStr, gfx) {
    this.notes = [];
    this.qtrFrames = [blueRingFrames, greenRingFrames, orangeRingFrames, purpleRingFrames];
    this.eightFrames = [blueDotFrames, greenDotFrames, orangeDotFrames, purpleDotFrames];

    this.noteSwitcher = 0;

    this.x = x;

    this.playLine = new PlayLine(imgStr, this.x, this.notes);

    this.graphics = gfx;

    this.offset = 0.250;

    this.imgStr = imgStr;

    this.tutorialHit = false;
  }

  start() {
    sched.start(this.keepTime);
  }

  tutorialStart() {
    sched.start(this.keepTimeTutorial);
  }

  tutorialEnd() {
    sched.stop(this.keepTimeTutorial);
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

    if(this.imgStr.includes("Orange")){
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
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
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
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
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
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
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
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
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
      
      // 13
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 14
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 15
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 16
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 17
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 18
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 19
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 20
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 21
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 22
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 23
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 24
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 25
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 26
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 27
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 28
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 29
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 30
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 31
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 32
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 33
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createNote);
      measure++;

      // 34
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 35
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 36
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 37
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      //Last note
      sched.insert(t0 + measure * 2 + 0.00, this.createNote);
    }  else if(this.imgStr.includes("Green")){
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
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
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
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 7
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;
      
      // 8
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 9
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 10
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 11
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 12
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;
      
      // 13
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 14
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 15
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 16
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 17
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      measure++;

      // 18
      sched.insert(t0 + measure * 2 + 0.000, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 19
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 20
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 21
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 22
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 23
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 24
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 25
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 26
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 27
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 28
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 29
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 30
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 31
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 32
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 33
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createNote);
      sched.insert(t0 + measure * 2 + 1.250, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createEightNote);
      measure++;

      // 34
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 35
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 36
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 37
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      //Last note
      sched.insert(t0 + measure * 2 + 0.00, this.createNote);
    }   else if(this.imgStr.includes("Pink")){
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
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
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
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 7
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;
      
      // 8
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
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
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 11
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 12
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;
      
      // 13
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 14
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 15
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 16
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 17
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 18
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 19
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 20
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 21
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      measure++;

      // 22
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 23
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 24
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 25
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 26
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 27
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 28
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 29
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 30
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 31
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 32
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 33
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      // 34
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 35
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 36
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 0.500, this.createEightNote);
      sched.insert(t0 + measure * 2 + 0.750, this.createEightNote);
      sched.insert(t0 + measure * 2 + 1.500, this.createNote);
      measure++;

      // 37
      sched.insert(t0 + measure * 2 + 0.000, this.createNote);
      sched.insert(t0 + measure * 2 + 1.000, this.createNote);
      measure++;

      //Last note
      sched.insert(t0 + measure * 2 + 0.00, this.createNote);
    }

  //  sched.insert(t0 + 2.000, this.keepTime);

    this.offset = 0;
  }

  keepTimeTutorial = (e) => {
    const t0 = e.playbackTime;
    if(this.tutorialHit === false) {
      sched.insert(t0 + 0.000, this.createNote);
      sched.insert(t0 + 2.000, this.keepTimeTutorial);
    }
  }

  createNote = () => {
    const note = new Note('qtr', this.graphics, this.x, this.imgStr, this.qtrFrames[this.noteSwitcher], () => {
      this.playLine.fail();
    });
    this.notes.push(note);

    if(this.noteSwitcher === 3) {
      this.noteSwitcher = 0;
    } else {
      this.noteSwitcher++;
    }
  }
  createEightNote = () => {
    const note = new Note('eighth', this.graphics, this.x, this.imgStr, this.eightFrames[this.noteSwitcher], () => {
      this.playLine.fail();
    });
    this.notes.push(note);

    if(this.noteSwitcher === 3) {
      this.noteSwitcher = 0;
    } else {
      this.noteSwitcher++;
    }
  }
}

class PlayLine {
  constructor(imgStr, x, notes) {
    this.streak = 0;
    this.totalHit = 0;
    this.highestStreak = 0;
    this.glowing = false;
    this.opacity = 0;

    // For the line itself
    this.playLineImg = new PIXI.Sprite(PIXI.loader.resources[imgStr].texture);
  
    this.playLineImg.width = 300;
    this.playLineImg.height = 300;
    this.playLineImg.x = x - 175;
    this.playLineImg.y = 250;
    this.playLineImg.alpha = this.opacity;

    this.x = x;

    // For the shaded circle around the center
    this.circle = new PIXI.Graphics();
    this.circle.beginFill(0x000000);
    this.circle.drawCircle(166, 166, 150);
    this.circle.endFill();
    this.circle.width = 270;
    this.circle.height = 270;
    this.circle.x = this.playLineImg.x;
    this.circle.y = this.playLineImg.y;
    this.circle.alpha = this.opacity;

    // For the streak text
    const style = new PIXI.TextStyle({
      fill: "white",
      fontFamily: "Tahoma"
    });
    // this.text = new PIXI.Text('Streak: ' + this.streak, style);

    // this.text.position.set(this.playLineImg.x, this.playLineImg.y + 300);

    // this.text.alpha = 0;

    this.text = document.createElement('p');
    this.text.className = 'streak';
    this.text.innerHTML = '<span>' + this.streak + '</span>' + '<br> note streak';
    this.text.style.top = 620;
    this.text.style.left = this.playLineImg.x + 27;

    this.text.style.opacity = 0;


    document.querySelector('body').appendChild(this.text);

    // For the feedback text
    this.goodAnim = new PIXI.extras.AnimatedSprite(goodFrames);
    this.niceAnim = new PIXI.extras.AnimatedSprite(niceFrames);
    this.awesomeAnim = new PIXI.extras.AnimatedSprite(awesomeFrames);
    this.textAnims = [this.goodAnim, this.niceAnim, this.awesomeAnim];

    this.textAnims.forEach((anim) => {
      anim.position.set(this.playLineImg.x + 150, 350);
      anim.anchor.set(.5);
      anim.scale.set(.5);
      anim.loop = false;

      app.stage.addChild(anim);
    });

    this.goodAnim.onComplete = () => {
      this.goodAnim.gotoAndStop(0);
    }

    this.niceAnim.onComplete = () => {
      this.niceAnim.gotoAndStop(0);
    }

    this.awesomeAnim.onComplete = () => {
      this.awesomeAnim.gotoAndStop(0);
    }
  
    app.stage.addChild(this.circle);
    app.stage.addChild(this.playLineImg);

    this.notes = notes;
  }

  draw() {
    this.playLineImg.bringToFront();

    this.playLineImg.alpha = this.opacity;
    this.circle.alpha = this.opacity / 3;
  }

  play() {
    this.glowing = true;
    this.opacity = 1.2;

    var timer = setInterval(() => {
      this.opacity -= 0.02;
      if(this.opacity <= 0.75) {
        clearInterval(timer);
        this.opacity = 0.75;
      }
    }, 15);

    for(let i=0; i<this.notes.length; i++){
      if(this.notes[i].chance){
        this.notes[i].hit();
        this.totalHit++;
        this.streak++;
         this.text.innerHTML = '<span>' + this.streak + '</span>' + '<br> note streak';
         this.text.style.textAlign = 'center';
        if(this.streak >= 3) {
          this.text.style.opacity = 1;
        }

        if(this.streak === 5) {
          this.goodAnim.play();
        } else if(this.streak === 10) {
          this.niceAnim.play();
        } else if(this.streak === 15) {
          this.awesomeAnim.play();
        }
        break;
      }
    }

    setTimeout(() => {
      this.glowing = false;
    }, 500);
  }

  fail() {
    if(this.streak > this.highestStreak) {
      this.highestStreak = this.streak;
    }
    this.streak = 0;
    this.text.innerHTML = '<span>' + this.streak + '</span>' + '<br> note streak';
    this.text.style.opacity = 0;
  }
	
	//See if players are ready to move past the menu
	menuOption() {
		if(GAME_STATE === GAME_STATE.MENU){
			//if player ready one, fill that
			if(playerRdyOne){
				orgCircle.beginFill(0xFFA500);
				orgCircle.drawCircle(orgCirclex,orgCircley,circleSize);
				orgCircle.endFill();
				app.stage.addChild(orgCircle);
			}
			//if player ready two, fill that
			if(playerRdyTwo){
				grnCircle.beginFill(0x0080000);
				grnCircle.drawCircle(grnCirclex,grnCircley,circleSize);
				grnCircle.endFill();
				app.stage.addChild(grnCircle);
			}
			//if player ready three, fill that
			if(playerRdyThree){
				pnkCircle.beginFill(0xFF007F);
				pnkCircle.drawCircle(pnkCirclex,pnkCircley,circleSize);
				pnkCircle.endFill();
				app.stage.addChild(pnkCircle);
			}
			//set interval, every x seconds check if all are ready, else set all to false
			setInterval(function(){
				if(playerRdyOne&&playerRdyTwo&&playerRdyThree){
					//start the game
					changeState();
				} else {
					playerRdyOne = false;
					playerRdyTwo = false;
					playerRdyThree = false;
					
					orgCircle.beginFill(0xffffff);
					orgCircle.drawCircle(orgCirclex,orgCircley,circleSize);
					orgCircle.endFill();
					app.stage.addChild(orgCircle);
					
					grnCircle.beginFill(0xffffff);
					grnCircle.drawCircle(grnCirclex,grnCircley,circleSize);
					grnCircle.endFill();
					app.stage.addChild(grnCircle);
					
					pnkCircle.beginFill(0xffffff);
					pnkCircle.drawCircle(pnkCirclex,pnkCircley,circleSize);
					pnkCircle.endFill();
					app.stage.addChild(pnkCircle);
				}
			},5000);
		}
	}
};

let going = false;

class Note {
  constructor(type, gfx, x, imgStr, animationFrames, missCallback) {
    this.radius = 1;
    this.stroke = 5;
    this.x = x - 25;
    this.y = 400;
    this.active = true;
    this.chance = false;
    this.played = false;
    this.missed = false;
    this.playerFail = missCallback;

    this.imgStr = imgStr;

    this.animation = new PIXI.extras.AnimatedSprite(animationFrames);

    this.animation.position.set(this.x, this.y + 35);
    this.animation.scale.set(.91);
    this.animation.animationSpeed = 1.5;
    this.animation.anchor.set(.5);

    this.animation.loop = false;

    this.animation.onComplete = () => {
      app.stage.removeChild(this.animation);
    };
  
    app.stage.addChild(this.animation);

    this.animation.bringToFront();

    this.animation.play();

    if(imgStr.includes('Orange')){
      this.explosion = new PIXI.extras.AnimatedSprite(orangeExpFrames);
      this.feedback = new PIXI.extras.AnimatedSprite(orangeFeedbackFrames);
      this.explosion.position.set(this.x, this.y + 35);
      this.feedback.position.set(this.x, this.y);
    } else if(imgStr.includes('Green')){
      this.explosion = new PIXI.extras.AnimatedSprite(greenExpFrames);
      this.feedback = new PIXI.extras.AnimatedSprite(greenFeedbackFrames);
      this.explosion.position.set(this.x, this.y);
      this.feedback.position.set(this.x, this.y);
    } else if(imgStr.includes('Pink')){
      this.explosion = new PIXI.extras.AnimatedSprite(pinkExpFrames);
      this.feedback = new PIXI.extras.AnimatedSprite(pinkFeedbackFrames);
      this.explosion.position.set(this.x, this.y + 35);
      this.feedback.position.set(this.x, this.y);
    }
    this.explosion.anchor.set(0.5);

    this.explosion.scale.set(.8, .8);

    this.explosion.animationSpeed = 1;

    this.explosion.loop = false;

    this.feedback.anchor.set(0.5);

    this.feedback.scale.set(.8, .8);

    this.feedback.animationSpeed = 1;

    this.feedback.loop = false;

    this.explosion.onComplete = function() {
      app.stage.removeChild(this.explosion);
    };

    this.feedback.onComplete = () => {
      app.stage.removeChild(this.feedback);
    };
  
    app.stage.addChild(this.explosion);
    app.stage.addChild(this.feedback);
  }

  draw(){
    if(this.active) {
      if(this.chance === true) {
        if(!going && gameState === GAME_STATE.GAME) {
          video.play();
          video.onended = () => {
            endGame();
          }
          video.currentTime = 0;
          going = true;
        }
      }

      if(this.animation.currentFrame >= 125 && this.animation.currentFrame <= 136) {
        this.chance = true;
      } else {
        this.chance = false;
      }

      if(this.animation.currentFrame === 137) {
        this.animation.visisble = false;
        this.miss();
      }
    }
  }

  fade() {
    if(!this.fading){
      this.fading = true;
    }
  }

  hit() {
    this.explosion.play();
    this.feedback.play();
    this.animation.visible = false;
    this.active = false;
    this.chance = false;

    if(gameState === GAME_STATE.TUTORIAL) {
      if(this.imgStr.includes('Orange')){
        conductor.noteMgrOrange.tutorialHit = true;
      } else if(this.imgStr.includes('Green')){
        conductor.noteMgrGreen.tutorialHit = true;
      } else if(this.imgStr.includes('Pink')){
        conductor.noteMgrPink.tutorialHit = true;
      }
    }
  }

  miss() {
    if(!this.missed){
      this.missed = true;
      this.playerFail();
    }
  }
}

//----------- Testing Material ------------

// let masterGain = null;
// let offset = 1.417;

// function log() {
//   console.log('works');
// }
 
// function metronome(e) {
//     going = true;
//     const t0 = e.playbackTime;
 
//     sched.insert(t0 + 0.000, ticktack, { frequency: 880, duration: 0.1 });
//     sched.insert(t0 + 0.500, ticktack, { frequency: 440, duration: 0.1 });
//     sched.insert(t0 + 1.000, ticktack, { frequency: 440, duration: 0.1 });
//     sched.insert(t0 + 1.500, ticktack, { frequency: 440, duration: 0.1 });
//     sched.insert(t0 + 2.000, metronome);
// }
 
// function ticktack(e) {
//   const t0 = e.playbackTime;
//   const t1 = t0 + e.args.duration;
//   const osc = audioContext.createOscillator();
//   const amp = audioContext.createGain();
 
//   osc.frequency.value = e.args.frequency;
//   osc.start(t0);
//   osc.stop(t1);
//   osc.connect(amp);
 
//   amp.gain.setValueAtTime(0.5, t0);
//   amp.gain.exponentialRampToValueAtTime(1e-6, t1);
//   amp.connect(masterGain);
 
//   sched.nextTick(t1, () => {
//     osc.disconnect();
//     amp.disconnect();
//   });
// }
 
// sched.on("start", () => {
//   masterGain = audioContext.createGain();
//   masterGain.connect(audioContext.destination);
// });
 
// sched.on("stop", () => {
//   masterGain.disconnect();
//   masterGain = null;
// });
 
// document.addEventListener("visibilitychange", () => {
//   if (document.visibilityState === "visible") {
//     sched.aheadTime = 0.1;
//   } else {
//     sched.aheadTime = 1.0;
//     sched.process();
//   }
// });
 
