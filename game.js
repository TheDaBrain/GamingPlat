const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let keys = {};
let player = {
  x: 100,
  y: 400,
  w: 40,
  h: 40,
  vx: 0,
  vy: 0,
  speed: 4,
  jumpForce: -10,
  grounded: false,
  combo: 0
};

let gravity = 0.5;
let floor = canvas.height - 40;

// Event listeners
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Game loop
function update() {
  // Horizontal movement
  if (keys['a'] || keys['ArrowLeft']) player.vx = -player.speed;
  else if (keys['d'] || keys['ArrowRight']) player.vx = player.speed;
  else player.vx = 0;

  // Jump
  if ((keys['w'] || keys['ArrowUp'] || keys[' ']) && player.grounded) {
    player.vy = player.jumpForce;
    player.grounded = false;
  }

  // Gravity
  player.vy += gravity;

  // Position update
  player.x += player.vx;
  player.y += player.vy;

  // Ground collision
  if (player.y + player.h >= floor) {
    player.y = floor - player.h;
    player.vy = 0;
    player.grounded = true;
  }

  // Perform trick combo (E to increase combo)
  if (keys['e']) {
    player.combo += 1;
    keys['e'] = false;
    console.log("Combo Power:", player.combo);
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = '#00ffd0';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Draw floor
  ctx.fillStyle = '#222';
  ctx.fillRect(0, floor, canvas.width, canvas.height - floor);

  // Draw combo meter
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Combo Power: ' + player.combo, 10, 30);
}

update();
