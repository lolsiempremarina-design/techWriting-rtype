export class BulletManager {
  constructor() {
    this.pool = [];
    this.active = [];
    this._initPool(100);
  }
  _initPool(n) {
    for (let i=0;i<n;i++) this.pool.push({x:0,y:0,vx:0,vy:0,active:false,owner:null,w:4,h:4});
  }
  spawn(x,y,vx,vy,owner) {
    const b = this.pool.find(p => !p.active) || null;
    if (b) {
      b.x=x; b.y=y; b.vx=vx; b.vy=vy; b.active=true; b.owner=owner;
      this.active.push(b);
      return b;
    }
    return null;
  }
  update(dt) {
    for (let i=this.active.length-1;i>=0;i--) {
      const b = this.active[i];
      b.x += b.vx*dt; b.y += b.vy*dt;
      // deactivate if off screen
      if (b.x < -50 || b.x > 1000 || b.y < -50 || b.y > 1000) this._deactivate(i);
    }
  }
  _deactivate(index) {
    const b = this.active[index];
    b.active=false; b.owner=null;
    this.active.splice(index,1);
  }
  render(ctx) {
    ctx.fillStyle = '#ff0';
    for (const b of this.active) ctx.fillRect(b.x-2,b.y-2,4,4);
  }
}
