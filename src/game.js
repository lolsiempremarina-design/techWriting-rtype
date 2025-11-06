import { Input } from './input.js';
import { BulletManager } from './bulletManager.js';
import { Player } from './player.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
  // Logical game size (16:9) used for game logic and rendering
  this.baseWidth = 1280;
  this.baseHeight = 720;

  // Set initial canvas size to window size
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  // compute initial scale factors and uniform scale
  this.scaleX = this.canvas.width / this.baseWidth;
  this.scaleY = this.canvas.height / this.baseHeight;
  this.scale = Math.min(this.scaleX, this.scaleY);
  this.offsetX = (this.canvas.width - this.baseWidth * this.scale) / 2;
  this.offsetY = (this.canvas.height - this.baseHeight * this.scale) / 2;
    
    // Add window resize listener
    window.addEventListener('resize', () => {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  // update scale factors and uniform scale and offsets when canvas size changes
  this.scaleX = this.canvas.width / this.baseWidth;
  this.scaleY = this.canvas.height / this.baseHeight;
  this.scale = Math.min(this.scaleX, this.scaleY);
  this.offsetX = (this.canvas.width - this.baseWidth * this.scale) / 2;
  this.offsetY = (this.canvas.height - this.baseHeight * this.scale) / 2;
  if (this.gameState === 'menu') this.updateMenuPositions();
    });
    
  this.input = new Input();
  // pass logical bounds to BulletManager so bullets respect logical game area
  this.bullets = new BulletManager(this.baseWidth, this.baseHeight);
  this.player = new Player(this.baseWidth * 0.15, this.baseHeight * 0.5, this.input, this.bullets, this.baseWidth, this.baseHeight);
    this.lastTime = 0; this.accumulator = 0; this.FIXED_DT = 1/60;
    this.enemies = [];
    // load enemy sprite
    this.enemySprite = new Image();
    this.enemySprite.src = 'img/nemico.png';
    this.enemySpriteLoaded = false;
    this.enemySprite.onload = () => { this.enemySpriteLoaded = true; };
    
    // Game progression variables
    this.gameTime = 0;          // Tracks total game time
    this.spawnInterval = 2500;  // Start with 2.5 seconds between spawns
    this.minSpawnInterval = 1200; // Minimum spawn interval (fastest) - more forgiving
    this.lastSpawnTime = 0;     // Last enemy spawn time
    this.difficulty = 1;        // Difficulty multiplier
    
    // Game state (menu, playing, paused, or gameOver)
    this.gameState = 'menu';  // 'menu', 'playing', 'paused', or 'gameOver'
    
    // Listen for ESC key to toggle pause
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.gameState === 'playing') {
        this.gameState = 'paused';
      } else if (e.code === 'Escape' && this.gameState === 'paused') {
        this.gameState = 'playing';
      }
    });
    
    // Menu button area (will be initialized in render)
    this.startButton = {
      x: 300,
      y: 300,
      width: 200,
      height: 50
    };
    
    // Mouse position tracking for menu
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
    
    // Click handling for menu
    this.canvas.addEventListener('click', (e) => {
      if (this.gameState === 'menu') {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Check if click is within start button area
        if (clickX >= this.startButton.x && 
            clickX <= this.startButton.x + this.startButton.width &&
            clickY >= this.startButton.y && 
            clickY <= this.startButton.y + this.startButton.height) {
          this.startGame();
        }
      }
    });
    // ensure menu positions are initialized
    this.mouseX = -1; this.mouseY = -1;
    this.updateMenuPositions();
  }
  start() { window.requestAnimationFrame(this._loop.bind(this)); }
  
  startGame() {
    this.gameState = 'playing';
    this.gameTime = 0;
    this.lastSpawnTime = 0;
    this.spawnInterval = 2000;
    this.difficulty = 1;
    this.enemies = [];
  }
  
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
    if (this.gameState === 'playing') {
      // Update game time and difficulty
      this.gameTime += dt;
      // Increase difficulty every 45 seconds, cap at level 5
      this.difficulty = Math.min(5, 1 + Math.floor(this.gameTime / 45));
      
      // Update game objects
      this.player.update(dt);
      this.bullets.update(dt);
      
      // Update spawn interval based on time (gradually decrease to minimum)
      this.spawnInterval = Math.max(
        this.minSpawnInterval,
        2500 - (this.gameTime * 25)  // Decrease by 25ms per second (slower progression)
      );
      
      // Check if it's time to spawn a new enemy
      if (this.gameTime - this.lastSpawnTime >= this.spawnInterval/1000) {
        this._spawnEnemy();
        this.lastSpawnTime = this.gameTime;
      }
      
      // basic enemy movement
      for (let i=this.enemies.length-1;i>=0;i--) {
        const e = this.enemies[i]; e.x += e.vx*dt; e.y += e.vy*dt;
        if (e.x < -100) this.enemies.splice(i,1);
      }
      this._checkCollisions();
      
      // Check for game over
      if (this.player.lives <= 0) {
        this.gameState = 'gameOver';
        // Clear enemies and bullets for next game
        this.enemies = [];
        this.bullets.active = [];
        // Schedule return to menu
        setTimeout(() => {
          this.gameState = 'menu';
          // Reset player for next game
          this.player.lives = 3;
          this.player.score = 0;
          this.player.x = 120;
          this.player.y = 300;
        }, 2000); // Wait 2 seconds before returning to menu
      }
    }
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
            const points = this.enemies[j].points;
            this.enemies.splice(j,1);
            this.bullets._deactivate(i);
            this.player.score += points;  // use enemy-specific points value
            break;
          }
        }
      }
    }
    // enemy vs player simple
    for (const e of this.enemies) {
      if (this._aabb(
          this.player.x - this.player.w/2,    // player left
          this.player.y - this.player.h/2,    // player top
          this.player.w,                      // player width
          this.player.h,                      // player height
          e.x-e.w/2,                         // enemy left
          e.y-e.h/2,                         // enemy top
          e.w,                               // enemy width
          e.h                                // enemy height
        )) {
        // immediate death rule (simplified)
        if (this.player.lives > 0) {
          this.player.lives -= 1;
          // reset position only if still alive
          this.player.x = 120; this.player.y = 300;
        }
      }
    }
  }
  _aabb(x1,y1,w1,h1,x2,y2,w2,h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }
  // (resizeCanvas removed - canvas is sized directly to window and menu positions
  // are updated in the resize listener)

  updateMenuPositions() {
    // Calculate positions based on game area
    const buttonWidth = 250;  // Increased button width
    const buttonHeight = 60;  // Increased button height
    const spacing = 70;       // Increased spacing between elements

    // Position title and start button with more space
    this.titlePosition = {
      x: this.canvas.width / 2,
      y: this.canvas.height * 0.2  // Title at 20% from top
    };

    this.startButton = {
      x: (this.canvas.width - buttonWidth) / 2,
      y: this.canvas.height * 0.35,  // Start button at 35% from top
      width: buttonWidth,
      height: buttonHeight
    };

    // Controls section starts lower with more spacing
    const controlsStartY = this.canvas.height * 0.55;  // Controls start at 55% from top

    // Store control positions for click detection with increased spacing
    this.controlButtons = [
      {
        text: 'Controls:',
        x: this.canvas.width / 2,
        y: controlsStartY
      },
      {
        text: 'Arrow Keys / WASD - Move',
        x: this.canvas.width / 2,
        y: controlsStartY + spacing
      },
      {
        text: 'Z/X/C - Shoot',
        x: this.canvas.width / 2,
        y: controlsStartY + spacing * 2
      },
      {
        text: 'SPACE - Charge Shot',
        x: this.canvas.width / 2,
        y: controlsStartY + spacing * 3
      },
      {
        text: 'F - Toggle Force',
        x: this.canvas.width / 2,
        y: controlsStartY + spacing * 4
      }
    ];
  }

  render() {
    const ctx = this.ctx;
    
    // Reset transform and clear canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    ctx.fillStyle = '#001020';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameState === 'menu') {
      // Menu rendering
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 64px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('R-Type', this.canvas.width/2, this.canvas.height * 0.2);

      // Start button (use computed positions)
      const isHovered = this.mouseX >= this.startButton.x && 
                        this.mouseX <= this.startButton.x + this.startButton.width &&
                        this.mouseY >= this.startButton.y && 
                        this.mouseY <= this.startButton.y + this.startButton.height;

      ctx.fillStyle = isHovered ? '#4488ff' : '#2266dd';
      ctx.fillRect(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height);
      
      ctx.fillStyle = '#fff';
      ctx.font = '30px Arial';
      ctx.fillText('Start Game', this.startButton.x + this.startButton.width/2, this.startButton.y + this.startButton.height * 0.65);

      // Controls
      ctx.font = '24px Arial';
      ctx.fillStyle = '#aaa';
      const controls = [
        'Controls:',
        'Arrow Keys / WASD - Move',
        'Z/X/C - Shoot',
        'SPACE - Charge Shot',
        'F - Toggle Force'
      ];
      
      controls.forEach((text, i) => {
        ctx.fillText(text, this.canvas.width/2, this.canvas.height * 0.55 + (i * 50));
      });
    } else if (this.gameState === 'playing' || this.gameState === 'paused') {
      // Game rendering: map logical 1280x720 coords to canvas using uniform scale
      ctx.save();
      ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);
      // Draw enemies (in logical coordinates)
      for (const e of this.enemies) {
        if (this.enemySprite && this.enemySpriteLoaded) {
          ctx.drawImage(this.enemySprite,
            e.x - e.w/2,
            e.y - e.h/2,
            e.w,
            e.h
          );
        } else {
          ctx.fillStyle = '#f00';
          ctx.fillRect(e.x-e.w/2, e.y-e.h/2, e.w, e.h);
        }
      }
  // Draw bullets and player in logical coords
  this.bullets.render(ctx);
  this.player.renderShip(ctx);
      ctx.restore();

      // If paused, draw overlay and text in screen coordinates (no transform)
      if (this.gameState === 'paused') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', this.canvas.width/2, this.canvas.height * 0.4);
        ctx.font = '28px Arial';
        ctx.fillText('Press ESC to continue', this.canvas.width/2, this.canvas.height * 0.5);
      }
    }
    // After rendering game area, draw HUD in screen coordinates
    if (this.gameState === 'playing' || this.gameState === 'paused') {
      // HUD: draw using screen coords
      ctx.setTransform(1,0,0,1,0,0);
      this.player.renderHUD(ctx, this.canvas.width, this.canvas.height);
    }
    
    // Game Over screen (separate from playing/menu)
    if (this.gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = '#ff0000';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.canvas.width/2, this.canvas.height/2);
      ctx.fillStyle = '#fff';
      ctx.font = '24px Arial';
      ctx.fillText(`Final Score: ${this.player.score}`, this.canvas.width/2, this.canvas.height/2 + 50);
    }
  }
  _spawnEnemy() {
    const baseWidth = 42;    // base enemy width
    const baseHeight = 27;   // base enemy height
    const baseSpeed = 80;    // base horizontal speed
    const basePoints = 100;  // base points value
    
  // Random scale between 0.8 (smaller) and 1.2 (bigger)
  const scale = 0.8 + Math.random() * 0.4;
    
    // Speed adjustments
    const speedMultiplier = (2 - scale) * this.difficulty; // Faster with difficulty
    
    // Points multiplier based on size and difficulty
    const pointsMultiplier = (2 - scale) * this.difficulty;
    
    // Find a safe spawn position within logical height, with margin
    const margin = 50;
    let safeY;
    let attempts = 0;
    const maxAttempts = 10;
    const minY = margin;
    const maxY = this.baseHeight - margin;
    do {
      safeY = minY + Math.random() * (maxY - minY);
      // Check if this position is far enough from other enemies
      const isSafe = this.enemies.every(e => Math.abs(e.y - safeY) > 50);
      if (isSafe) break;
      attempts++;
    } while (attempts < maxAttempts);

    this.enemies.push({
      x: this.baseWidth + 20, // spawn slightly off right edge in logical coords
      y: safeY,
      vx: -(baseSpeed + Math.random()*40) * speedMultiplier, // Base speed + difficulty scaling
      vy: Math.sin(this.gameTime + Math.random() * Math.PI) * 20, // Slight vertical movement
      w: Math.round(baseWidth * scale),
      h: Math.round(baseHeight * scale),
      scale: scale,
      points: Math.round(basePoints * pointsMultiplier)
    });
  }
}
