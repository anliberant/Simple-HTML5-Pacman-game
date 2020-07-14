// const canvas = document.getElementById('canvasSpace');
// const ctx = canvas.getContext('2d');
// ctx.fillText('helloworld', 10, 150);

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = 'pac.png';

let keyClick = {};
document.addEventListener(
    'keydown',
    function (event) {
        keyClick[event.keyCode] = true;
        move(keyClick);
    },
    false
);
document.addEventListener(
    'keyup',
    function (event) {
        delete keyClick[event.keyCode];
    },
    false
);

let score = 0,
    gscore = 0,
    ghost2 = false,
    countblink = 10,
    ghost = false;

const player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 5,
};
const enemy = {
    x: 100,
    y: 50,
    speed: 5,
    moving: 0,
    dirX: 0,
    dirY: 0,
    flash: 0,
    ghostEat: false,
};
const enemy2 = {
    x: 100,
    y: 50,
    speed: 5,
    moving: 0,
    dirX: 0,
    dirY: 0,
    flash: 0,
    ghostEat: false,
};
const powerdot = {
    x: 100,
    y: 50,
    powerup: false,
    pcountdown: 0,
    ghostNumber: 0,
    ghostNumber2: 0,
};

function checkReady() {
    this.ready = true;
    playGame();
}

function playGame() {
    render();
    requestAnimationFrame(playGame);
}

function render() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
        mainImage,
        player.pacmouth,
        player.pacdir,
        player.psize,
        player.psize,
        player.x,
        player.y,
        player.psize,
        player.psize
    );
    context.drawImage(
        mainImage,
        enemy.ghostNumber,
        enemy.flash,
        player.psize,
        player.psize,
        enemy.x,
        enemy.y,
        player.psize,
        player.psize
    );
    context.drawImage(
        mainImage,
        enemy2.ghostNumber,
        enemy2.flash,
        player.psize,
        player.psize,
        enemy2.x,
        enemy2.y,
        player.psize,
        player.psize
    );

    if (!powerdot.powerup && powerdot.pcountdown < 5) {
        powerdot.x = randomNumber(420) + 30;
        powerdot.y = randomNumber(250) + 30;
        powerdot.powerup = true;
    }

    if (!ghost) {
        enemy.ghostNumber = randomNumber(5) * 31;
        enemy.x = randomNumber(450);
        enemy.y = randomNumber(250) + 30;
        ghost = true;
    }
    if (!ghost2) {
        enemy2.ghostNumber = randomNumber(5) * 31;
        enemy2.x = randomNumber(450);
        enemy2.y = randomNumber(250) + 30;
        ghost2 = true;
    }
    if (enemy.moving < 0) {
        enemy.moving = randomNumber(30) * 3 + 10 + randomNumber(1);
        enemy.speed = randomNumber(4) + 1;
        enemy.dirX = 0;
        enemy.dirY = 0;
        if (powerdot.ghostEat) {
            enemy.speed = enemy.speed * -1;
        }
        if (enemy.moving % 2) {
            if (player.x < enemy.x) {
                enemy.dirX = -enemy.speed;
            } else {
                enemy.dirX = enemy.speed;
            }
        } else {
            if (player.y < enemy.y) {
                enemy.dirY = -enemy.speed;
            } else {
                enemy.dirY = enemy.speed;
            }
        }
    }
    if (enemy2.moving < 0) {
        enemy2.moving = randomNumber(30) * 3 + 10 + randomNumber(1);
        enemy2.speed = randomNumber(4) + 1;
        enemy2.dirX = 0;
        enemy2.dirY = 0;
        if (powerdot.ghostEat) {
            enemy2.speed = enemy2.speed * -1;
        }
        if (enemy2.moving % 2) {
            if (player.x < enemy2.x) {
                enemy2.dirX = -enemy2.speed;
            } else {
                enemy2.dirX = enemy2.speed;
            }
        } else {
            if (player.y < enemy2.y) {
                enemy2.dirY = -enemy2.speed;
            } else {
                enemy2.dirY = enemy2.speed;
            }
        }
    }
    enemy.moving--;
    enemy.x += enemy.dirX;
    enemy.y += enemy.dirY;
    enemy2.moving--;
    enemy2.x += enemy2.dirX;
    enemy2.y += enemy2.dirY;

    if (enemy.x >= canvas.width - 32) {
        enemy.x = 0;
    }
    if (enemy.x < 0) {
        enemy.x = canvas.width - 32;
    }
    if (enemy.y >= canvas.height - 32) {
        enemy.y = 0;
    }
    if (enemy.y < 0) {
        enemy.y = canvas.height - 32;
    }
    if (enemy2.x >= canvas.width - 32) {
        enemy2.x = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = canvas.width - 32;
    }
    if (enemy2.y >= canvas.height - 32) {
        enemy2.y = 0;
    }
    if (enemy2.y < 0) {
        enemy2.y = canvas.height - 32;
    }

    if (
        player.x <= enemy.x &&
        enemy.x <= player.x + 26 &&
        player.y <= enemy.y &&
        enemy.y <= player.y + 26
    ) {
        if (powerdot.ghostEat) {
            score++;
        } else {
            gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;
        powerdot.pcountdown = 0;
    }
    if (
        player.x <= enemy2.x &&
        enemy2.x <= player.x + 26 &&
        player.y <= enemy2.y &&
        enemy2.y <= player.y + 26
    ) {
        if (powerdot.ghostEat) {
            score++;
        } else {
            gscore++;
        }
        player.x = 10;
        player.y = 100;
        enemy2.x = 500;
        enemy2.y = 400;
        powerdot.pcountdown = 0;
    }
    if (
        player.x <= powerdot.x &&
        powerdot.x <= player.x + 32 &&
        player.y <= powerdot.y &&
        powerdot.y <= player.y + 32
    ) {
        powerdot.powerup = false;
        powerdot.pcountdown = 500;
        powerdot.ghostNumber = enemy.ghostNumber;
        powerdot.ghostNumber = enemy2.ghostNumber;
        enemy.ghostNumber = 384;
        enemy2.ghostNumber = 384;
        powerdot.x = 0;
        powerdot.y = 0;
        powerdot.ghostEat = true;
        player.speed = 10;
    }
    if (powerdot.ghostEat) {
        powerdot.pcountdown--;
        if (powerdot.pcountdown <= 0) {
            powerdot.ghostEat = false;
            enemy.ghostNumber = powerdot.ghostNumber;
            enemy2.ghostNumber = powerdot.ghostNumber2;
            player.speed = 5;
        }
    }

    if (powerdot.powerup) {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(powerdot.x, powerdot.y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
    if (countblink > 0) {
        countblink--;
    } else {
        countblink = 20;
    }
    if (enemy.flash == 0) {
        enemy.flash = 32;
        enemy2.flash = 32;
    } else {
        enemy.flash = 0;
        enemy2.flash = 0;
    }

    if (powerdot.pcountdown > 0) {
        powerdot.pcountdown--;
    }
    context.font = '20px Verdana';
    context.fillStyle = 'white';
    context.fillText('Pacman: ' + score + ' vs Ghost: ' + gscore, 2, 18);
}

function move(keyClick) {
    if (37 in keyClick) {
        player.x -= player.speed;
        player.pacdir = 64;
    }
    if (38 in keyClick) {
        player.y -= player.speed;
        player.pacdir = 96;
    }
    if (39 in keyClick) {
        player.x += player.speed;
        player.pacdir = 0;
    }
    if (40 in keyClick) {
        player.y += player.speed;
        player.pacdir = 32;
    }
    if (player.x >= canvas.width - 32) {
        player.x = 0;
    }
    if (player.x < 0) {
        player.x = canvas.width - 32;
    }
    if (player.y >= canvas.height - 32) {
        player.y = 0;
    }
    if (player.y < 0) {
        player.y = canvas.height - 32;
    }
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }

    render();
}
function randomNumber(n) {
    return Math.floor(Math.random() * n) + 1;
}

document.body.appendChild(canvas);
