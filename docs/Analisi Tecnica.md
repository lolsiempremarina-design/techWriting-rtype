# 🧩 Analisi Tecnica – Progetto “R-Type Browser Edition”

---

## 1️⃣ Descrizione generale

Il progetto è un **videogioco 2D di tipo side-scroll shooter**, ispirato al classico *R-Type* (Irem, 1987), sviluppato in **JavaScript moderno (ES6)** ed eseguibile interamente nel browser.  
Il giocatore controlla una navicella spaziale che affronta ondate di nemici generati dinamicamente, utilizzando armi standard, colpi caricati e un modulo “Force” agganciabile o indipendente.

Il motore di gioco è basato su **HTML5 Canvas 2D**, con una gestione logica indipendente dalla risoluzione reale dello schermo e con supporto completo per la modalità **schermo intero**.

---

## 2️⃣ Obiettivi del progetto

- Riprodurre la meccanica di gioco di *R-Type* in ambiente web moderno.  
- Garantire prestazioni fluide (60 FPS) su PC e dispositivi mobili.  
- Struttura modulare e facilmente estendibile per futuri aggiornamenti.  
- Ottimizzare l’uso della memoria e ridurre al minimo il carico del Garbage Collector.  
- Offrire un’esperienza utente coerente e scalabile su qualsiasi risoluzione.  

---

## 3️⃣ Architettura generale

Il progetto adotta un’architettura **OOP modulare**, con classi indipendenti e responsabilità chiaramente definite.  
È predisposto per una futura transizione verso un’architettura **ECS (Entity-Component-System)**.

| Componente | Funzione | Dipendenze |
|-------------|-----------|-------------|
| `Game` | Gestisce il ciclo di gioco, logica, rendering e stati globali | Tutti gli altri moduli |
| `Player` | Gestisce la navicella del giocatore (movimento, fuoco, “Force”) | `Input`, `BulletManager`, `Force` |
| `BulletManager` | Sistema di *object pooling* per la gestione dei proiettili | Nessuna |
| `Force` | Modulo orbitante agganciabile o indipendente | `Player` |
| `Input` | Rilevamento e gestione dell’input da tastiera | Eventi browser |
| `main.js` | Entry point del gioco, inizializzazione canvas e fullscreen | `Game` |

---

## 4️⃣ Stack tecnologico

| Tecnologia | Utilizzo |
|-------------|-----------|
| **HTML5 Canvas** | Rendering 2D principale |
| **JavaScript (ES6 Modules)** | Logica di gioco, architettura modulare |
| **Web APIs** | Input, animazioni, gestione fullscreen |
| **CSS / DOM** | Overlay e interfaccia utente |
| *(Opzionale)* WebAudio API | Gestione effetti sonori futuri |

---

## 5️⃣ Struttura dei moduli principali

### 🕹️ `Player.js`
- Gestisce posizione, movimento e limiti dello spazio logico (1280×720).  
- Implementa due modalità di fuoco:
  - **Fuoco rapido** (tasti Z/X/C).  
  - **Colpo caricato** (tasto SPACE) con potenza variabile e raffiche laterali.  
- Tiene traccia di vite, punteggio e stato di carica.  
- Si integra con `Force` e `BulletManager`.  
- Effettua il rendering della navicella (`img/navicella.png`) e dell’HUD (vite, punteggio, barra di carica).

### 💥 `BulletManager.js`
- Gestisce i proiettili attraverso un sistema di **object pooling** (100 oggetti preallocati).  
- Controlla spawn, aggiornamento e rendering.  
- Rimuove automaticamente i proiettili fuori dallo spazio logico (+ margine).  
- Mantiene prestazioni costanti anche con molti colpi attivi.

### 🌀 `Force.js`
- Modulo “satellite” della navicella, **agganciabile o distaccabile**.  
- Quando è distaccato si muove autonomamente in avanti, seguendo parzialmente la posizione verticale del giocatore.  
- Integra un **cooldown di 0.2s** per evitare attivazioni multiple.  
- Attualmente non spara, ma il codice è predisposto per future estensioni (fuoco o scudo difensivo).

### 🎮 `Input.js`
- Registra la pressione e il rilascio dei tasti tramite `Set`.  
- API semplice e diretta: `isDown(code)` restituisce lo stato di un tasto.  
- Supporta layout multipli (WASD, frecce direzionali, ZXC, SPACE, F, ESC).

### 🧠 `Game.js`
- È il cuore del motore di gioco:
  - Gestisce il **ciclo principale** con *fixed timestep* (1/60s).  
  - Implementa stati: `menu`, `playing`, `paused`, `gameOver`.  
  - Calcola proporzioni e scala logica in base alla finestra del browser.  
  - Controlla la generazione dinamica dei nemici e la difficoltà crescente.  
  - Esegue il controllo delle **collisioni AABB** tra proiettili, nemici e giocatore.  
  - Gestisce la pausa, il Game Over e la transizione al menu principale.  
  - Disegna l’HUD e l’interfaccia in coordinate schermo.

### 🖥️ `main.js`
- Entry point del progetto.  
- Inizializza il canvas, crea l’overlay e l’istanza di `Game`.  
- Implementa il sistema di **fullscreen** (tasto `F` o pulsante dedicato).  
- Adatta dinamicamente la visualizzazione, mantenendo il buffer logico costante.  
- Ripristina le dimensioni originali e la gerarchia grafica all’uscita dal fullscreen.

---

## 6️⃣ Gestione grafica e logica

### 🔲 Coordinate logiche
Tutta la logica si svolge su una **griglia logica 1280×720**, indipendente dalle dimensioni reali del canvas.  
Il sistema calcola automaticamente `scale` e `offset` per mantenere proporzioni corrette su qualsiasi schermo.

### 🎨 Rendering
- Tutti gli elementi vengono disegnati in coordinate logiche, poi scalati sul canvas.  
- I proiettili sono disegnati con `fillRect` per massima efficienza.  
- Gli sprite sono caricati in modo asincrono con un flag `spriteLoaded`.  
- L’HUD è disegnato in coordinate schermo, quindi indipendente dallo scaling logico.

---

## 7️⃣ Algoritmi principali

### ⚙️ Ciclo di gioco
```js
while (accumulator >= FIXED_DT) update(FIXED_DT);
render(interpolation);
```
Garantisce coerenza della fisica anche con FPS variabili.

### 🎯 Collisioni AABB
```js
x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
```
Utilizzata per rilevare le collisioni tra proiettili, nemici e il giocatore.

### 👾 Generazione dei nemici
- I nemici vengono generati a intervalli decrescenti (`spawnInterval`).  
- La difficoltà aumenta ogni 45 secondi, fino a un massimo di livello 5.  
- Ogni nemico ha dimensioni, velocità e punteggio proporzionali alla difficoltà.

---

## 8️⃣ Gestione UI e Stati di gioco

| Stato | Descrizione |
|--------|-------------|
| **Menu** | Mostra titolo, pulsante “Start” e comandi di gioco. |
| **Playing** | Stato attivo con logica di gioco e HUD visibile. |
| **Paused** | Overlay trasparente con testo “PAUSED”, ripresa con ESC. |
| **GameOver** | Schermata con punteggio finale e ritorno automatico al menu. |

---

## 9️⃣ Analisi delle performance

| Area | Ottimizzazione presente | Miglioramenti possibili |
|-------|--------------------------|---------------------------|
| Proiettili | Object pooling (100 istanze) | Pool dinamico o espandibile |
| Collisioni | Ciclo doppio O(n²) | Spatial Hash Grid o Quadtree |
| Rendering | Canvas batching | Adozione PixiJS/WebGL |
| Resize dinamico | Scala uniforme | Debounce del resize event |
| Memoria | Nessuna creazione di oggetti a runtime | Pooling esteso a nemici |

---

## 🔟 Scalabilità e sviluppi futuri

- Adozione completa dell’architettura **ECS** (EntityManager, Systems, Components).  
- Introduzione di un **LevelManager** con dati di livello in JSON.  
- Aggiunta di un **SoundManager** basato su WebAudio API.  
- Estensione del modulo `Force` con capacità di fuoco o difesa.  
- Sistema di **particelle ed esplosioni** per effetti visivi.  
- Integrazione di controlli touch per dispositivi mobili.  
- Leaderboard online e modalità cooperativa via WebSocket/Node.js.

---

## 11️⃣ Rischi e mitigazioni

| Rischio | Impatto | Mitigazione |
|----------|----------|-------------|
| Prestazioni ridotte su mobile | Medio | Modalità “low graphics” con culling e pooling aggressivo |
| Troppi oggetti simultanei | Medio | Espansione del sistema di pooling |
| Input multiplo non gestito | Basso | Debounce e priorità ai comandi principali |
| Desincronizzazione audio-video | Basso | Clock unificato basato su `gameTime` |
| Distorsione in fullscreen | Basso | Blocco aspect-ratio e cropping dinamico |

---

## 12️⃣ Conclusione

Il progetto **“R-Type Browser Edition”** è tecnicamente solido, fluido e modulare.  
L’implementazione attuale dimostra una buona separazione tra logica, input e rendering, garantendo prestazioni elevate anche su hardware limitato.

L’utilizzo di:
- *Object pooling* per i proiettili,  
- logica indipendente dalla risoluzione,  
- ciclo di gioco a tempo fisso e rendering scalato,  

consente un’esperienza coerente e stabile.  
La struttura a moduli ES6 rende il codice **manutenibile, estendibile e pronto** per una futura evoluzione verso un’architettura **ECS completa**.

---
