## 📝 Functional Analysis: R-Type Replica
The objective of this document is to describe the **user behavior, interactions, and game logic** of the product, answering the question: *"What will the user see and do?"*.

---

### 📚 Glossario dei Termini e Riferimenti Chiave

| Term | Description | Reference |
| :--- | :--- | :--- |
| **R-9 Arrowhead** | The player-controlled spaceship. | - |
| **Wave Cannon** | The powerful energy attack activated by charging (Hold Fire). | F4 |
| **Force** | The indestructible spherical module that serves as both a weapon and a shield. | F5, O1 |
| **Laser Power-up** | Collectible item to change/cycle the type of laser. | F6 |
| **Speed Up** | Power-up to increase the spaceship's movement speed. | F7 |
| **Boss** | End-of-level enemy. | F10 |
| **O2** | Objective: Maintain the high level of challenge and fidelity to the original. | Objective |
| **O4** | Objective: Performance (Fluid movement and imperceptible latency). | Objective |
| **T4** | Key/Button: Input dedicated to attaching/detaching the Force. | Task |
| **F1** | Functional: Fixed horizontal scrolling. | Functional |
| **F11** | Functional: Score multiplier indicator on the HUD. | Functional |

---

### 1. User Behavior (Basic Interactions)

Description of the actions the user can perform with the **R-9 Arrowhead** spaceship.

| User Action | Game Interaction | Logic (Game State) |
| :--- | :--- | :--- |
| **Movement** | The user presses the directional keys/analog stick. | The spaceship moves **360°** within the play area, at a speed determined by the active **Speed Up** level (F7). Movement is fluid, and latency is imperceptible (O4). |
| **Normal Fire** | The user briefly presses the fire button. | The R-9 fires a standard, uncharged **standard projectile**. If a Laser Power-up (F6) is active, it fires the corresponding laser. |
| **Wave Cannon Charge** | The user holds down the fire button (F4). | An indicator on the HUD shows the charge status. Releasing the button releases the **Wave Cannon**, whose damage and size depend on the charge time. |
| **Force Attach/Detach** | The user presses the dedicated Force button (T4). | The **Force (F5)** detaches from the R-9's stern/bow if it was attached, and conversely attaches if it was detached, reversing its position relative to the spaceship. |

---

### 2. Core Game Logic (Collisions and Death)

These logics are fundamental to maintaining the high level of challenge and fidelity to the original (O2).

#### 2.1. Death Rule (**Immediate Death**)

**Death Condition**: The R-9 Arrowhead spaceship is **immediately destroyed** (instant death) if:

* It is hit by an **enemy projectile**.
* It **collides with an enemy** (not the Force).
* It **collides with the environment** (e.g., walls, ceilings, organic tentacles).

**Force Exception**: The **Force (F5)**, when attached to the spaceship, acts as a **shield** and can absorb enemy hits or environmental collisions **without destroying the R-9**. The Force itself is indestructible.

#### 2.2. Power-up Collisions

**Collection Logic**: When the R-9's hitbox makes contact with an enemy Power-up Pod, the item is immediately removed from the game, and the corresponding effect is applied.

* **Laser Power-up**: If a Laser Power-up is collected when a laser is already active, the laser type **cycles** (Red → Blue → Yellow → Red).

---

### 3. Force Module Logic (F5)

The Force mechanic is the heart of R-Type (O1).

#### 3.1. State and Positioning

The Force has **two attached states** and **one detached state**.

* **Attached**: It can be attached to two positions.
    * **Bow (Front)**: Attached to the front of the R-9 for a frontal attack and defense.
    * **Stern (Rear)**: Attached to the back of the R-9 for rear defense and attack.
* **Detached (Free)**: The Force moves independently of the spaceship (maintaining the last direction inputted or orbiting slightly, depending on faithful implementation), acting as an independent attack/shield unit to eliminate enemies or block projectiles at a distance.

#### 3.2. Offensive Function

The Force fires projectiles when attached and acts as a weapon when detached. Its power and attack type depend on the **active laser type** on the R-9.

---

### 4. Scoring Logic (Score)

The scoring system must incentivize the destruction of enemies and structures.

* **Base Score**: Destroying a single enemy awards a base score (e.g., **100 points**).
* **Multipliers**: Destroying multiple enemies or parts of a chain (e.g., segments of a segmented enemy) in quick succession must activate an **increasing score multiplier**. This must be visible on the HUD (F11).
* **Boss Score**: Defeating a boss (F10) awards a **significant bonus score**, proportional to its difficulty and/or the time taken.

---

### 5. Progression and Continues (F8, F13)

* **Level Advancement**: The game progresses through a **fixed horizontal scroll** (F1). A level is completed only after defeating its respective **Boss** (F10).
* **Continues**: When the player runs out of all spaceships (**Lives**), the **Game Over** screen appears. The user has the option to use a **Continue** to resume the game from the point (or predefined checkpoint) where the defeat occurred.