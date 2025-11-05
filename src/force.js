export class Force {
  constructor(player) {
    this.player = player;
    this.attached = true; // attached by default
    this.offset = {x: 28, y: 0};
    this.x = player.x + this.offset.x; this.y = player.y;
    this.detachedVel = {x: 120, y:0};
    this.cooldown = 0;
  }
  toggle() {
    // simple debounce to avoid rapid toggles
    if (this.cooldown > 0) return;
    this.attached = !this.attached;
    if (!this.attached) {
      this.x = this.player.x + this.offset.x; this.y = this.player.y;
    }
    this.cooldown = 0.2;
  }
  update(dt) {
    this.cooldown = Math.max(0, this.cooldown - dt);
    if (this.attached) {
      this.x = this.player.x + this.offset.x;
      this.y = this.player.y + this.offset.y;
    } else {
      // simple forward motion when detached
      this.x += this.detachedVel.x * dt;
      // slow drift to follow player slightly
      this.y += (this.player.y - this.y) * 0.5 * dt;
    }
    // clamp
    this.x = Math.max(0, Math.min(800, this.x));
    this.y = Math.max(0, Math.min(600, this.y));
  }
  render(ctx) {
    // Force rendering disabled
  }
}
