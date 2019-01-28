let tileWidth = 101;
let tileHeight = 83;
let enemyWidth = 101;
let playerWidth = 83;
let countWin = 0;
let countLoose = 0;

let body = document.getElementsByTagName("body");
let scorepanel = document.createElement("h1");
document.body.appendChild(scorepanel);
scorepanel.setAttribute("id", "score");
let score = document.querySelector("#score");
score.innerHTML = "You won " + countWin + " times and lost " + countLoose + " times.";



// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y) {
      this.sprite = 'images/enemy-bug.png';
      this.x = x;
      this.y = y;
      this.speed = 20 + Math.floor(Math.random()*101);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
        if(this.x < 505) {
          this.x = this.x + this.speed * dt;
        }
        // the bugs start again
        else {
          this.x = -200;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor() {
    this.x = 200;
    this.y = 384;
    this.sprite = 'images/char-boy.png';
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(input) {
    if(this.x > 50 && input === 'left') {
      this.x -= tileWidth;
    }
    else if (this.x < 401 && input === 'right') {
      this.x += tileWidth;
    }
    else if(this.y < 380 && input === 'down') {
      this.y += tileHeight;
    }
    else if(this.y > -31 && input === 'up') {
      this.y -= tileHeight;
    }
  }

  update() {
    for(let enemy of allEnemies) {

      //checkCollision
      // every enemys position considering its width will be checked for collision with the player to the front
      if(this.y === enemy.y && (enemy.x + enemyWidth/2 > this.x - playerWidth/3) && !(enemy.x - enemyWidth/2 > this.x + playerWidth/3)) {
        // if the collision is true the players position goes back to his start position
          countLoose++;
          score.innerHTML = "You won " + countWin + " times and lost " + countLoose + " times.";
          this.x = 200;
          this.y = 384;
          if (countLoose === 3) {
            console.log("hmmm.... game over");
            score.innerHTML = " :/ ups... game over. " + "<br />" + "hey don't be sad, try it again! :) "
            setTimeout(function() {
              countLoose = 0;
              countWin = 0;
              score.innerHTML = "You won " + countWin + " times and lost " + countLoose + " times.";
            }, 2000);
          }
      }

      //checkWin
      // if the player reaches the water tiles he will be put to his start position with a delay of 1/2 a second
      else if (this.y === -31) {
        countWin++;
        score.innerHTML = "You won " + countWin + " times and lost " + countLoose + " times.";
        // the better you get the more bugs will appear
        const enemy10 = new Enemy (-150, 218);
        allEnemies.push(enemy10);
              // unfortunately the setTimeout makes the countWin to go up to more than 200. unfortunately I didn't come a solution in time. I'd be thankful for your help! :)
        // setTimeout(function() {
          player.x = 200;
          player.y = 384;
        // }, 500);
        if (countWin === 3) {
          score.innerHTML = "You won!!!";
          score.style.color = "red";
          // when you win the amount of bugs will be set to 9 again
          allEnemies.splice(9, 3);
          setTimeout(function() {
            countWin = 0;
            countLoose = 0;
            score.style.color = "black";
            score.innerHTML = "You won " + countWin + " times and lost " + countLoose + " times.";
          }, 2000);
        }
      }
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const enemy1 = new Enemy (-200, 52);
const enemy2 = new Enemy (-100, 135);
const enemy3 = new Enemy (-150, 218);
const enemy4 = new Enemy (-60, 52);
const enemy5 = new Enemy (-260, 135);
const enemy6 = new Enemy (-350, 218);
const enemy7 = new Enemy (-200, 52);
const enemy8 = new Enemy (-800, 52);
const enemy9 = new Enemy (-800, 135);
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9);
const player = new Player();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// init();
