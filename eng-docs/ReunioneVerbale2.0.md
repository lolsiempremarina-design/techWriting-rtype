# 🗓️ State Meeting Minutes  
**Date:** November 5, 2025  
**Time:** 2:00 PM – 4:00 PM  
**Project:** *R-Type Remake / Arcade Shooter*  
**Location / Platform:** School / GitHub  
**Participants:** Jonathan Mendez, Rudy Huacasi, Federico Pellesi, Andrea, Samuele Oliviera  

---

## 🎯 Meeting Objectives
- Define the **basic movement and shooting mechanics**.  
- Evaluate the **structure of Level 1** and identify **enemy types**.

---

## 🧩 Decisions Made
1. **Projectile Management:**  
   All projectiles will be handled by a centralized `BulletManager` to optimize collision detection.  
2. **Graphics Framework:**  
   Development will use **2D Canvas** instead of WebGL to simplify the initial prototype phase.  
3. **Weapon Progression:**  
   The player will be able to **upgrade weapons** through a **progressive power-up system**.  
4. **Audio Design:**  
   Game music will be composed in **chiptune (1980s style)** to preserve the retro aesthetic.

---

## 🚧 Issues Discussed
- Potential **frame rate drops** with a high number of animated sprites.  
- **Missing boss spawn logic** at the end of the first level.  
- **Difficulty scaling** between levels still needs to be defined and tested.

---

## 🧭 Action Items (To Do)

| # | Task | Responsible | Deadline |
|---|------|--------------|-----------|
| 1 | Implement the `BulletManager` class and test collisions. | — | — |
| 2 | Write enemy behavior rules in the *Functional Analysis* document. | — | — |
| 3 | Prototype the first level map. | — | — |
| 4 | Prepare 3 sound drafts in chiptune style. | — | — |

---

## 📎 Additional Notes
- Test **performance across multiple browsers** to ensure stability.  
- Consider **transitioning to WebGL** after the **alpha version** for improved visuals.  

---

**Written by:** Jonathan Mendez  
**Approved by:** All Participants  
**Publication Date:** November 5, 2025
