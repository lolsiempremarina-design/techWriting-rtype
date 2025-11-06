# 🧩 Technical Analysis – Project “R-Type Browser Edition”

---

## 1️⃣ General Description

The project is a **2D side-scrolling shooter video game**, inspired by the classic *R-Type* (Irem, 1987), developed in **modern JavaScript (ES6)** and fully executable within a web browser.  
The player controls a spaceship that faces dynamically generated waves of enemies using standard weapons, charged shots, and a detachable “Force” module that can attach to or separate from the main ship.

The game engine is based on **HTML5 Canvas 2D**, featuring logic independent from the actual screen resolution and full support for **fullscreen mode**.

---

## 2️⃣ Project Objectives

- Reproduce *R-Type* gameplay mechanics in a modern web environment.  
- Ensure smooth performance (60 FPS) across desktop and mobile devices.  
- Maintain a modular, easily extensible architecture for future updates.  
- Optimize memory usage and minimize Garbage Collector load.  
- Provide a consistent, scalable user experience across all screen resolutions.  

---

## 3️⃣ General Architecture

The project adopts a **modular OOP architecture**, composed of independent classes with well-defined responsibilities.  
It is designed for a future transition to an **ECS (Entity-Component-System)** architecture.

| Component | Function | Dependencies |
|------------|-----------|---------------|
| `Game` | Manages the game loop, logic, rendering, and global states | All other modules |
| `Player` | Controls the player’s spaceship (movement, shooting, “Force”) | `Input`, `BulletManager`, `Force` |
| `BulletManager` | Implements *object pooling* for projectile management | None |
| `Force` | Detachable or attachable satellite module | `Player` |
| `Input` | Handles keyboard input | Browser events |
| `main.js` | Game entry point, initializes canvas and fullscreen | `Game` |

---

## 4️⃣ Technology Stack

| Technology | Usage |
|-------------|--------|
| **HTML5 Canvas** | Main 2D rendering |
| **JavaScript (ES6 Modules)** | Game logic and modular architecture |
| **Web APIs** | Input handling, animations, fullscreen management |
| **CSS / DOM** | Overlay and user interface |
| *(Optional)* WebAudio API | Sound effects (future implementation) |

---

## 5️⃣ Core Module Structure

### 🕹️ `Player.js`
- Manages position, movement, and logical space boundaries (1280×720).  
- Implements two firing modes:
  - **Rapid fire** (keys Z/X/C).  
  - **Charged shot** (SPACE key) with variable power and side bursts.  
- Tracks lives, score, and charge state.  
- Integrates with `Force` and `BulletManager`.  
- Renders the spaceship (`img/navicella.png`) and HUD (lives, score, charge bar).

### 💥 `BulletManager.js`
- Manages projectiles via **object pooling** (100 preallocated objects).  
- Controls spawning, updates, and rendering.  
- Automatically removes projectiles that exit the logical space (+ margin).  
- Maintains consistent performance even under heavy load.

### 🌀 `Force.js`
- “Satellite” module attachable or detachable from the player’s ship.  
- When detached, moves autonomously forward while partially following the player’s vertical position.  
- Includes a **0.2s cooldown** to prevent multiple triggers.  
- Currently non-firing, but ready for future extensions (attack or defensive mode).

### 🎮 `Input.js`
- Tracks key press and release events using a `Set` structure.  
- Provides a simple API: `isDown(code)` returns a key’s current state.  
- Supports multiple layouts (WASD, arrow keys, ZXC, SPACE, F, ESC).

### 🧠 `Game.js`
- The **core engine module**:
  - Handles the **main game loop** using a *fixed timestep* (1/60s).  
  - Implements states: `menu`, `playing`, `paused`, `gameOver`.  
  - Calculates logical scaling based on browser window size.  
  - Controls enemy generation and increasing difficulty over time.  
  - Executes **AABB collision detection** between bullets, enemies, and player.  
  - Manages pause, Game Over, and transitions to the main menu.  
  - Draws the HUD and interface using screen coordinates.

### 🖥️ `main.js`
- Project entry point.  
- Initializes the canvas, overlay, and the `Game` instance.  
- Implements **fullscreen mode** (via `F` key or UI button).  
- Dynamically adapts rendering while maintaining constant logical buffer size.  
- Restores the original layout and graphics hierarchy when exiting fullscreen.

---

## 6️⃣ Graphics and Logic Management

### 🔲 Logical Coordinates
All game logic operates within a **1280×720 logical grid**, independent of the actual canvas size.  
The system automatically computes `scale` and `offset` values to preserve aspect ratio on any display.

### 🎨 Rendering
- All elements are drawn in logical coordinates, then scaled to the canvas.  
- Bullets are rendered with `fillRect` for maximum performance.  
- Sprites load asynchronously with a `spriteLoaded` flag.  
- The HUD is drawn in screen coordinates, remaining independent from logical scaling.

---

## 7️⃣ Core Algorithms

### ⚙️ Game Loop
```js
while (accumulator >= FIXED_DT) update(FIXED_DT);
render(interpolation);
```
Ensures consistent physics even under fluctuating frame rates.

### 🎯 AABB Collision
```js
x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
```
Used to detect collisions between bullets, enemies, and the player.

### 👾 Enemy Generation
- Enemies spawn at decreasing intervals (`spawnInterval`).  
- Difficulty increases every 45 seconds, up to level 5.  
- Each enemy has size, speed, and score proportional to difficulty.

---

## 8️⃣ UI and Game States

| State | Description |
|--------|-------------|
| **Menu** | Displays title screen, “Start” button, and controls. |
| **Playing** | Active gameplay state with visible HUD. |
| **Paused** | Transparent overlay with “PAUSED” text, resumed via ESC. |
| **GameOver** | Displays final score and returns automatically to the menu. |

---

## 9️⃣ Performance Analysis

| Area | Existing Optimization | Possible Improvements |
|-------|------------------------|------------------------|
| Projectiles | Object pooling (100 instances) | Expandable or dynamic pool |
| Collision | Double loop O(n²) | Spatial Hash Grid or Quadtree |
| Rendering | Canvas batching | Switch to PixiJS / WebGL |
| Dynamic Resize | Uniform scaling | Debounce resize event |
| Memory | No runtime object creation | Extend pooling to enemies |

---

## 🔟 Scalability and Future Development

- Full adoption of **ECS architecture** (EntityManager, Systems, Components).  
- Implementation of a **LevelManager** with level data stored in JSON.  
- Addition of a **SoundManager** using the WebAudio API.  
- Extension of the `Force` module with offensive or defensive abilities.  
- **Particle and explosion system** for enhanced visuals.  
- Touch control support for mobile devices.  
- Online leaderboard and cooperative mode via WebSocket/Node.js.

---

## 11️⃣ Risks and Mitigations

| Risk | Impact | Mitigation |
|-------|----------|-------------|
| Reduced performance on mobile | Medium | “Low graphics” mode with aggressive culling and pooling |
| Excessive simultaneous objects | Medium | Expand object pooling system |
| Unhandled multiple input sources | Low | Input debouncing and command priority |
| Audio-video desynchronization | Low | Unified clock based on `gameTime` |
| Fullscreen distortion | Low | Aspect-ratio locking and dynamic cropping |

---

## 12️⃣ Conclusion

The **“R-Type Browser Edition”** project demonstrates a technically solid, efficient, and modular implementation.  
The current version exhibits a clear separation between logic, input, and rendering, ensuring high performance even on low-end hardware.

The use of:
- *Object pooling* for bullets,  
- resolution-independent logic,  
- a fixed timestep loop with scaled rendering,  

guarantees a consistent and stable gameplay experience.  
The modular ES6 codebase makes the project **maintainable, extensible, and ready** for a full transition toward an **ECS-based architecture**.

<!-- 
# 🧩 Technical Analysis – Game “R-Type” (Browser Edition)
---

## 📘 1. Document Identification

| Field | Description |
|--------|-------------|
| **Title** | Technical Analysis – Game “R-Type” (Browser Edition) |
| **Version** | 3.0 |
| **Author** | [R-Type Web Development Team] |
| **Date** | November 2025 |
| **Document Type** | Technical project document |
| **Recipients** | Developers, maintainers, technical reviewers |
| **Confidentiality** | Public / educational |
| **Keywords** | 2D Video Game, JavaScript, ECS, Canvas, WebGL, Sommerville |
| **Copyright** | © 2025 – Academic Project R-Type Browser |

---

## 📖 2. Summary

1. Introduction and purpose  
2. Operational concept  
3. General system description  
4. Technical objectives and requirements  
5. Software architecture and components  
6. Process documentation  
7. Product documentation  
   - User manual  
   - Technical manual  
   - Administrator/maintainer guide  
8. Standards and documentation quality  
9. Glossary  
10. Bibliographic references  

---

## 🧭 3. Introduction and Purpose

This document describes the technical analysis, architecture, and project management of *R-Type (Browser Edition)*, a **2D side-scrolling shooter** video game developed in **JavaScript** and **HTML5 Canvas**, inspired by the classic *R-Type (Irem, 1987)*.

It follows *Ian Sommerville’s* guidelines for software documentation, aiming to provide a complete technical reference for development, maintenance, and usage.

---

## 🚀 4. System Operational Concept

The system simulates a 2D space environment where the player controls an armed spaceship, facing waves of enemies and end-level bosses.  
The game runs entirely in the browser, with multi-device compatibility and support for keyboard or controller input.

### Main Features:
- Free movement on a 2D plane (game logic independent from rendering).  
- Bullet system and chargeable weapon.  
- “Force Unit” management (attachable orbiting module).  
- Score, lives, and charge bar management.  
- Optimized rendering (Canvas/WebGL).  

### Intended Users:
- **End players**: play the game directly from the browser.  
- **Developers and maintainers**: modify code, levels, sprites, or logic.  
- **System administrators**: manage versions, publication, and debugging.  

---

## 🧩 5. General System Description

### General Architecture
The system is divided into core modules that correspond to logical components of the game engine:

| Module | Description |
|--------|-------------|
| **GameEngine** | Manages the game loop (update/render) and global state. |
| **Input** | Captures keyboard and controller events. |
| **Player** | Handles player position, movement, firing, and health. |
| **Force** | Implements the orbiting module with attack and attachment logic. |
| **BulletManager** | Manages active bullet pools for efficiency. |
| **LevelManager** | Defines enemy waves and progression. |
| **UI/HUD** | Displays scores, lives, and charge bar. |

### Operational Flow
1. Initialize canvas and resources.  
2. Execute `update(dt)` for logic and physics.  
3. Execute `render(ctx)` for visualization.  
4. Handle user input and collisions.  
5. Update HUD and score.

---

## 🎯 6. Technical Objectives and Requirements

| Category | Requirement |
|------------|-------------|
| **Performance** | Constant 60 FPS on PC and mobile devices. |
| **Compatibility** | Support for modern browsers (Chrome, Firefox, Safari, Edge). |
| **Scalability** | Modular system for new levels, weapons, enemies. |
| **Maintainability** | Clean, modular code separation. |
| **Efficiency** | Use of object pooling and spatial grid. |
| **Portability** | No non-standard external dependencies. |

---

## 🧱 7. Software Architecture and Components

### Architectural Paradigm
Hybrid **OOP → ECS (Entity Component System)**, evolving toward a fully composable structure.

### Main Components
- **EntityManager**: manages future ECS entities.  
- **PhysicsSystem**: updates positions and velocities.  
- **RenderSystem**: draws sprites ordered by layer.  
- **CollisionSystem**: detects and handles impacts.  
- **AISystem**: coordinates enemy movement and attacks.  

### Interfaces
Each module exposes standard methods:
```js
update(dt)
render(ctx)
reset()
```

---

## 🧾 8. Process Documentation

### 8.1 Plans and Estimates
- Agile cycle with weekly sprints.  
- Objective: full implementation of Level 1 within 4 weeks.  

### 8.2 Development Standards
- **Language:** JavaScript (ES6).  
- **Formatting:** ESLint + Prettier.  
- **Version Control:** GitHub / GitFlow.  

### 8.3 Quality Control
- Manual testing + collision simulation.  
- Profiling with Chrome DevTools.  
- Validation: average 60 FPS on laptop.  

---

## 🕹️ 9. Product Documentation

### 9.1 User Manual
#### Introduction
The player controls the spaceship using keyboard or USB controller.  
The goal is to destroy enemies and survive as long as possible.

#### Controls
| Action | Key |
|--------|-----|
| Move | Arrows or WASD |
| Shoot | Z / X / C |
| Charge shot | Space |
| Force (attach/detach) | F |

#### Tips
- Charge the shot for higher damage.  
- Keep moving: enemies attack from multiple directions.  

### 9.2 Technical Manual
#### Code Structure
Organized into ES6 modules:
```
/main.js
/game.js
/player.js
/force.js
/bulletManager.js
/input.js
```
#### Pooling and Performance
- Bullets are reused instead of destroyed.  
- The Force module follows independent logic from the player.  

### 9.3 Administrator / Maintainer Guide
#### Installation
1. Copy the project folder to a static or local server.  
2. Open `index.html` in the browser.  
3. Verify the correct path to `img/navicella.png`.  

#### Debug and Maintenance
- Use `console.log` to track game events.  
- For updates: check compatibility of `update(dt)` and `render(ctx)`.  
- Save versions in Git before modifications.  

#### Configuration
- Game logic parameters are defined in the `Player` constructor (`logicalWidth`, `logicalHeight`).  
- Adjustable for different resolutions.  

---

## 📏 10. Documentation Standards and Quality

This document follows Sommerville (2001) principles:
- **Clarity:** short sentences, active voice, list formatting.  
- **Structure:** numbered, independent sections.  
- **Consistency:** uniform style and terminology.  
- **Accessibility:** suitable for print, PDF, and screen reading.  

---

## 🧠 11. Glossary

| Term | Description |
|-------|-------------|
| **ECS** | Entity-Component-System, modular game architecture. |
| **Pooling** | Reuse of objects to reduce memory allocation. |
| **HUD** | Head-Up Display – in-game interface (lives, score, charge). |
| **Force** | Orbiting module that can attach to the main ship. |
| **Canvas** | HTML5 element for 2D rendering. |

---

## 📚 12. Bibliographic References

- Sommerville, I. *Software Documentation*, Lancaster University, 2001.  
- Irem Corp. *R-Type* (arcade), 1987.  
- Mozilla Developer Network (MDN): *Canvas API Reference*.  
- IEEE Std 1063-2001: *Standard for Software User Documentation*.   -->
