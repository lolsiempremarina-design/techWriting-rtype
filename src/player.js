import { Force } from './force.js';

export class Player {
  // now accepts logical game width/height to clamp movement correctly
  constructor(x,y, input, bullets, logicalWidth = 1280, logicalHeight = 720) {
    this.x = x; this.y = y; this.w = 64; this.h = 32;  // increased size to 64x32 (2x original size)
    this.speed = 200; this.input = input; this.bullets = bullets;
    this.shootCooldown = 0; this.shootRate = 0.12;
    this.charge = 0; this.chargeMax = 1.5; this.charging = false;
    this.lives = 3; this.score = 0;
    this.force = new Force(this);
    // load ship sprite from project img folder
    this.sprite = new Image();
    this.spriteLoaded = false;
    // path relative to index.html
    this.sprite.src = 'img/navicella.png';
    this.sprite.onload = () => { this.spriteLoaded = true; };
    this.logicalWidth = logicalWidth;
    this.logicalHeight = logicalHeight;
  }
  update(dt) {
    let dx=0, dy=0;
    if (this.input.isDown('ArrowLeft') || this.input.isDown('KeyA')) dx -= 1;
    if (this.input.isDown('ArrowRight') || this.input.isDown('KeyD')) dx += 1;
    if (this.input.isDown('ArrowUp') || this.input.isDown('KeyW')) dy -= 1;
    if (this.input.isDown('ArrowDown') || this.input.isDown('KeyS')) dy += 1;
    const len = Math.hypot(dx,dy) || 1;
    this.x += (dx/len)*this.speed*dt;
    this.y += (dy/len)*this.speed*dt;
  // clamp to logical game area with small margin
  const margin = 10;
  this.x = Math.max(this.w/2 + margin, Math.min(this.logicalWidth - this.w/2 - margin, this.x));
  this.y = Math.max(this.h/2 + margin, Math.min(this.logicalHeight - this.h/2 - margin, this.y));

    // shooting
    if (this.input.isDown('Space')) {
      this.charging = true; this.charge = Math.min(this.chargeMax, this.charge + dt);
    } else if (this.charging) {
      // release wave cannon (simple large bullet)
      const power = this.charge/this.chargeMax;
      const shotX = this.x + this.w/2; // fire from front of ship (logical coords)
      this.bullets.spawn(shotX, this.y, 500, 0, 'player');
      // small volley depending on power
      if (power > 0.6) {
        this.bullets.spawn(shotX, this.y - 8, 450, -40, 'player');
        this.bullets.spawn(shotX, this.y + 8, 450, 40, 'player');
      }
      this.charge = 0; this.charging = false;
    } else {
      // normal rapid fire
      this.shootCooldown -= dt;
      if (this.input.isDown('KeyZ') || this.input.isDown('KeyX') || this.input.isDown('KeyC')) {
        if (this.shootCooldown <= 0) {
          const shotXn = this.x + this.w/2;
          this.bullets.spawn(shotXn, this.y, 480, 0, 'player');
          this.shootCooldown = this.shootRate;
        }
      }
    }

    // toggle force attach/detach
    if (this.input.isDown('KeyF')) { this.force.toggle(); }
    this.force.update(dt);
  }
  // render only the ship (logical coordinates)
  renderShip(ctx) {
    if (this.sprite && this.spriteLoaded) {
      ctx.drawImage(this.sprite, 
        this.x - this.w/2,
        this.y - this.h/2,
        this.w,
        this.h
      );
    } else {
      ctx.fillStyle = '#0ff';
      ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
    }
    this.force.render(ctx);
  }

  // render HUD in screen coordinates (canvas pixels)
  renderHUD(ctx, canvasWidth, canvasHeight) {
    // charge bar bottom-left
    const padding = 10;
    const barW = 180;
    const barH = 12;
    const x = padding;
    const y = canvasHeight - padding - barH;
    ctx.fillStyle = '#444'; ctx.fillRect(x, y, barW, barH);
    ctx.fillStyle = '#f90'; ctx.fillRect(x, y, barW * (this.charge / this.chargeMax), barH);
    // HUD text
    ctx.fillStyle = '#fff'; ctx.font = '16px monospace';
    ctx.fillText(`Lives: ${this.lives}`, padding, 24);
    ctx.fillText(`Score: ${this.score}`, padding + 120, 24);
  }
}
