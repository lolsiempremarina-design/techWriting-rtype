import { Force } from './force.js';

export class Player {
  constructor(x,y, input, bullets) {
    this.x = x; this.y = y; this.w = 32; this.h = 16;
    this.speed = 200; this.input = input; this.bullets = bullets;
    this.shootCooldown = 0; this.shootRate = 0.12;
    this.charge = 0; this.chargeMax = 1.5; this.charging = false;
    this.lives = 3; this.score = 0;
    this.force = new Force(this);
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
    // clamp to canvas area 20..580
    this.x = Math.max(20, Math.min(760, this.x));
    this.y = Math.max(20, Math.min(580, this.y));

    // shooting
    if (this.input.isDown('Space')) {
      this.charging = true; this.charge = Math.min(this.chargeMax, this.charge + dt);
    } else if (this.charging) {
      // release wave cannon (simple large bullet)
      const power = this.charge/this.chargeMax;
      this.bullets.spawn(this.x+24,this.y, 500, 0, 'player');
      // small volley depending on power
      if (power > 0.6) {
        this.bullets.spawn(this.x+24,this.y-8, 450, -40, 'player');
        this.bullets.spawn(this.x+24,this.y+8, 450, 40, 'player');
      }
      this.charge = 0; this.charging = false;
    } else {
      // normal rapid fire
      this.shootCooldown -= dt;
      if (this.input.isDown('KeyZ') || this.input.isDown('KeyX') || this.input.isDown('KeyC')) {
        if (this.shootCooldown <= 0) {
          this.bullets.spawn(this.x+24,this.y, 480, 0, 'player');
          this.shootCooldown = this.shootRate;
        }
      }
    }

    // toggle force attach/detach
    if (this.input.isDown('KeyF')) { this.force.toggle(); }
    this.force.update(dt);
  }
  render(ctx) {
    // ship
    ctx.fillStyle = '#0ff';
    ctx.fillRect(this.x-16,this.y-8,this.w,this.h);
    // charge bar
    ctx.fillStyle = '#444'; ctx.fillRect(10,560,120,12);
    ctx.fillStyle = '#f90'; ctx.fillRect(10,560, 120*(this.charge/this.chargeMax),12);
    // HUD
    ctx.fillStyle = '#fff'; ctx.font = '14px monospace';
    ctx.fillText(`Lives: ${this.lives}`, 10, 20);
    ctx.fillText(`Score: ${this.score}`, 120, 20);
    this.force.render(ctx);
  }
}
