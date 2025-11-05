# 🛸 R-Type: Product Requirement Document (PRD)

## 1. Introduction

### 1.1. Purpose
This document defines the requirements, objectives, and high-level functionalities for the development of a faithful reproduction of the classic arcade video game **R-Type** by Irem (1987), an iconic side-scrolling shoot 'em up (Shmup).

### 1.2. Product Vision
To create a gaming experience that captures the essence, high challenge level, and distinctive mechanics of the original R-Type, targeting both nostalgic fans and a new generation of players.

### 1.3. Target Audience
* **Shmup Genre Fans:** Players who appreciate classic *bullet hell* and *scroll-shooter* titles.
* **Retrogaming Players:** Users seeking a faithful or modernized experience of a classic arcade game.
* **Demanding Players:** Users who desire a high level of challenge and level memorization.

---

## 2. Product Goals

| Goal ID | Description | Success Criteria (KPI) |
| :--- | :--- | :--- |
| **G1** | **Mechanical Fidelity:** Precisely reproduce R-Type's unique mechanics. | Functional and balanced implementation of the **Force** mechanic and the **Wave Cannon**. |
| **G2** | **Arcade Experience:** Maintain the high difficulty level and the sense of progression and learning inherent in the original *level design*. | The average completion rate for a new player is consistent with that of the arcade game (high challenge level). |
| **G3** | **Core Functionality:** Ensure a complete gameplay experience, including all levels and bosses. | Inclusion of all 8 levels and corresponding bosses from the original R-Type. |
| **G4** | **Control Responsiveness:** Guarantee fluid and responsive controls (essential for the genre). | Imperceptible input latency for precise control of the **R-9 Arrowhead** spacecraft. |

---

## 3. High-Level Features

### 3.1. Core Gameplay
* **F1. Fixed Horizontal Scroll:** The game must proceed with a fixed horizontal scroll (left to right).
* **F2. R-9 Arrowhead Piloting:** Control of the **R-9 Arrowhead** spacecraft with 360° movement capability within the play area.
* **F3. Immediate Death:** The spacecraft is destroyed by a single enemy hit or environmental contact (with the exception of the **Force** when attached).

### 3.2. Weapon and Power-up System
The weapon system must be based on power-ups dropped by enemies (Pods).

* **F4. Wave Cannon:**
    * Ability to charge the main weapon by holding down the fire button.
    * Release of a powerful beam after charging, with damage proportional to the charge time.
    * (Optional: Implementation of a second-level charge/maximum charge).
* **F5. Force (Sphere Module):**
    * An indestructible spherical module that acts as an additional weapon and shield.
    * Can be **attached** to the R-9's bow or stern.
    * Can be **detached** to independently attack enemies and/or block projectiles.
* **F6. Laser Power-ups:** Implementation of three main types of lasers (obtained by collecting the Laser power-up):
    * **Red Laser:** Anti-air beams that can pierce through enemies.
    * **Blue Laser:** Reflected beams/beams that bounce off walls (crucial in certain levels).
    * **Yellow Laser:** Ground attack laser or horizontally propagating waves.
* **F7. Other Power-ups:** Inclusion of Missile power-ups, **Speed Up** (speed increase), and *Bit* (small defensive/offensive satellites).

### 3.3. Levels and Enemies
* **F8. Game Levels:** Full implementation of all 8 characteristic Stages from the original, with their unique environments and hazards (e.g., the Bydo internal section, organic tentacles).
* **F9. Biomechanical Aesthetic (Bydo Empire):** Design of enemies, obstacles, and bosses in a biomechanical/alien style, which is a hallmark of R-Type.
* **F10. Boss Fights:** Each level must conclude with a unique boss fight, requiring the learning of a specific attack pattern and the strategic use of the **Force** to defeat it.

### 3.4. User Interface and Scoring System
* **F11. HUD:** Clear display of the following elements: Score, Remaining Lives/Ships (Lives), **Wave Cannon** charge indicator.
* **F12. Scoring System:** Implementation of score calculation based on enemy destruction, with a multiplier system for multiple destructions.
* **F13. Continues & Game Over:** Option to use limited (or unlimited, as an option) *Continues*.

---

## 4. High-Level Technical Requirements

* **T1. Game Engine:** **(Request for clarification 1)**
* **T2. Platform:** **(Request for clarification 2)**
* **T3. Graphics:** *Pixel-perfect collision detection* to ensure correct game dynamics functionality.
* **T4. Control:** Support for Gamepad/Keyboard with customizable key mapping for: Movement (4 directions), Fire/Charge, **Force** Detach/Attach.

---

## 5. Open Questions and Assumptions

To finalize the PRD and guide development, the following points need clarification:

1.  **Fidelity vs. Reinvention:**
    * **Question:** Do we aim for a **1:1 reproduction** of the arcade experience (graphic style, framerate, etc.) or a **remake/tribute** with modern quality-of-life features (e.g., saves, training mode) and/or graphical enhancements (e.g., HD graphics, modern particle effects)?

2.  **Content Scope:**
    * **Question:** Is the initial goal to reproduce all **8 levels** of the original arcade, or is an **MVP (Minimum Viable Product)** planned with a lower number of levels (e.g., 4) for an initial *release*?

3.  **Target Platform:**
    * **Question:** What is the primary *release* platform (PC, Console, Mobile)? This will influence the User Interface (UI) design and the choice of the game engine.

4.  **Soundtrack System:**
    * **Question:** Should the soundtrack be the **original soundtrack** (rearranged/remastered) or should a **new soundtrack** be composed, inspired by the original?