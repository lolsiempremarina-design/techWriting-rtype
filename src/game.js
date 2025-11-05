import { Input } from './input.js';
import { BulletManager } from './bulletManager.js';
import { Player } from './player.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d');
    this.input = new Input();
    this.bullets = new BulletManager();
    this.player = new Player(120, 300, this.input, this.bullets);
    this.lastTime = 0; this.accumulator = 0; this.FIXED_DT = 1/60;
    this.enemies = [];
    this._spawnTestEnemy();
  }
  start() { window.requestAnimationFrame(this._loop.bind(this)); }
  _loop(ts) {
    if (!this.lastTime) this.lastTime = ts;
    let dt = (ts - this.lastTime)/1000; this.lastTime = ts;
    // clamp dt
    dt = Math.min(0.05, dt);
    this.accumulator += dt;
    while (this.accumulator >= this.FIXED_DT) {
      this.update(this.FIXED_DT);
      this.accumulator -= this.FIXED_DT;
    }
    const interp = this.accumulator / this.FIXED_DT;
    this.render(interp);
    window.requestAnimationFrame(this._loop.bind(this));
  }
  update(dt) {
    this.player.update(dt);
    this.bullets.update(dt);
    // basic enemy movement
    for (let i=this.enemies.length-1;i>=0;i--) {
      const e = this.enemies[i]; e.x += e.vx*dt; e.y += e.vy*dt;
      if (e.x < -100) this.enemies.splice(i,1);
    }
    this._checkCollisions();
  }
  _checkCollisions() {
    // bullets vs enemies
    for (let i=this.bullets.active.length-1;i>=0;i--) {
      const b = this.bullets.active[i];
      if (b.owner === 'player') {
        for (let j=this.enemies.length-1;j>=0;j--) {
          const e = this.enemies[j];
          if (this._aabb(b.x-2,b.y-2,4,4, e.x-e.w/2, e.y-e.h/2, e.w, e.h)) {
            // hit
            this.enemies.splice(j,1);
            this.bullets._deactivate(i);
            this.player.score += 100;
            break;
          }
        }
      }
    }
    // enemy vs player simple
    for (const e of this.enemies) {
      if (this._aabb(this.player.x-16,this.player.y-8,this.player.w,this.player.h, e.x-e.w/2,e.y-e.h/2,e.w,e.h)) {
        // immediate death rule (simplified)
        this.player.lives -= 1;
        // reset position
        this.player.x = 120; this.player.y = 300;
      }
    }
  }
  _aabb(x1,y1,w1,h1,x2,y2,w2,h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }
  render() {
    const ctx = this.ctx; ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    // background
    ctx.fillStyle = '#001020'; ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    // draw enemies
    ctx.fillStyle = '#f00';
    for (const e of this.enemies) ctx.fillRect(e.x-e.w/2,e.y-e.h/2,e.w,e.h);
    // draw bullets
    this.bullets.render(ctx);
    // draw player on top
    this.player.render(ctx);
  }
  _spawnTestEnemy() {
    // simple enemy spawner for MVP
    setInterval(() => {
      this.enemies.push({x:820, y:50 + Math.random()*500, vx:-80 - Math.random()*80, vy:0, w:28, h:18});
    }, 900);
  }
}
