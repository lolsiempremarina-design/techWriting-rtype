# 🛸 R-Type: Product Requirement Document (PRD)

## 1. Introduzione

### 1.1. Scopo
Questo documento definisce i requisiti, gli obiettivi e le funzionalità di alto livello per lo sviluppo di una riproduzione fedele del videogioco arcade classico **R-Type** di Irem (1987), un iconico *side-scrolling shoot 'em up* (Shmup).

### 1.2. Visione del Prodotto
Creare un'esperienza di gioco che catturi l'essenza, l'elevato livello di sfida e le meccaniche distintive dell'originale R-Type, rivolgendosi sia ai fan nostalgici che a una nuova generazione di giocatori.

### 1.3. Pubblico Target
* **Fan del genere Shmup:** Giocatori che apprezzano i titoli *bullet hell* e *scroll-shooter* classici.
* **Giocatori Retrogaming:** Utenti in cerca di un'esperienza fedele o modernizzata di un classico arcade.
* **Giocatori Esigenti:** Utenti che desiderano un alto livello di sfida e memorizzazione dei livelli.

---

## 2. Obiettivi del Prodotto (Goals)

| ID Obiettivo | Descrizione | Criteri di Successo (KPI) |
| :--- | :--- | :--- |
| **O1** | **Fedeltà Meccanica:** Riprodurre con precisione le meccaniche uniche di R-Type. | Implementazione funzionante e bilanciata della meccanica **Force** e del **Wave Cannon** (Cannone a Onde). |
| **O2** | **Esperienza Arcade:** Mantenere l'elevato livello di difficoltà e il senso di progressione e apprendimento del *level design* originale. | Il tasso di completamento medio per un nuovo giocatore è coerente con quello del gioco arcade (alto livello di sfida). |
| **O3** | **Funzionalità Base:** Assicurare un'esperienza di gioco completa, inclusiva di tutti i livelli e boss. | Inclusione di tutti gli 8 livelli e relativi boss dell'originale R-Type. |
| **O4** | **Reattività dei Controlli:** Garantire controlli fluidi e reattivi (essenziale per il genere). | Latenza degli input impercettibile, per un controllo preciso della navicella **R-9 Arrowhead**. |

---

## 3. Funzionalità di Alto Livello (High-Level Features)

### 3.1. Gameplay Core
* **F1. Scroll Orizzontale Fisso:** Il gioco deve procedere con uno *scroll* orizzontale fisso (da sinistra a destra).
* **F2. Pilotaggio della R-9 Arrowhead:** Controllo della navicella spaziale **R-9 Arrowhead** con possibilità di movimento a 360° all'interno dell'area di gioco.
* **F3. Morte Immediata:** La navicella viene distrutta con un singolo colpo nemico o contatto con l'ambiente (ad eccezione della **Force** quando è attaccata).

### 3.2. Sistema di Armi e Potenziamenti
Il sistema di armi deve basarsi sui potenziamenti che cadono dai nemici (Pods).

* **F4. Wave Cannon (Cannone a Onde):** * Capacità di caricare l'arma principale tenendo premuto il pulsante di fuoco.
    * Rilascio di un potente raggio dopo il caricamento, con danno proporzionale al tempo di carica.
    * (Opzionale: implementazione di una carica di secondo livello/carica massima).
* **F5. Force (Modulo Sfera):**
    * Un modulo sferico indistruttibile che agisce come arma aggiuntiva e scudo.
    * Può essere **attaccato** alla prua o alla poppa della R-9.
    * Può essere **sganciato** per attaccare i nemici in modo indipendente e/o bloccare proiettili.
* **F6. Power-up Laser:** Implementazione di tre principali tipi di laser (ottenuti raccogliendo il power-up Laser):
    * **Laser Rosso:** Raggi anti-aerei che possono attraversare i nemici.
    * **Laser Blu:** Raggi riflessi/che rimbalzano sulle pareti (fondamentale in alcuni livelli).
    * **Laser Giallo:** Laser per attacco a terra o onde che si propagano orizzontalmente.
* **F7. Altri Power-up:** Inclusione di potenziamenti per i Missili, **Speed Up** (incremento di velocità) e *Bit* (piccoli satelliti difensivi/offensivi).

### 3.3. Livelli e Nemici
* **F8. Livelli di Gioco:** Implementazione completa di tutti gli 8 livelli (Stage) caratteristici dell'originale, con i loro ambienti e pericoli unici (ad es. la sezione interna al Bydo, i tentacoli organici).
* **F9. Estetica Biomeccanica (Bydo Empire):** Design dei nemici, degli ostacoli e dei boss in stile biomeccanico/alieno, che è un tratto distintivo di R-Type.
* **F10. Boss Fights:** Ogni livello deve terminare con una boss fight unica, che richiede l'apprendimento di uno schema d'attacco specifico e l'utilizzo strategico della **Force** per sconfiggerlo.

### 3.4. Interfaccia Utente e Sistema di Punteggio
* **F11. HUD:** Visualizzazione chiara dei seguenti elementi: Punteggio (Score), Vite/Navicelle rimanenti (Lives), Indicatore di caricamento del **Wave Cannon**.
* **F12. Sistema di Punteggio:** Implementazione del calcolo del punteggio basato sulla distruzione dei nemici, con un sistema di moltiplicatori per le distruzioni multiple.
* **F13. Continues & Game Over:** Possibilità di utilizzare *Continues* limitati (o illimitati, come opzione).

---

## 4. Requisiti Tecnici di Alto Livello (High-Level Technical Requirements)

* **T1. Motore di Gioco:** **(Richiesta di chiarimento 1)**
* **T2. Piattaforma:** **(Richiesta di chiarimento 2)**
* **T3. Grafica:** *Pixel-perfect collision detection* (rilevamento delle collisioni preciso) per garantire il corretto funzionamento delle dinamiche di gioco.
* **T4. Controllo:** Supporto per Gamepad/Tastiera con mappatura dei tasti personalizzabile per: Movimento (4 direzioni), Fuoco/Carica, Sgancio/Aggancio **Force**.

---

## 5. Domande Aperte e Presupposti (Assumptions)

Per completare il PRD e indirizzare lo sviluppo, è necessario chiarire i seguenti punti:

1.  **Fedeltà vs. Reinvenzione:**
    * **Domanda:** Vogliamo una riproduzione **1:1** dell'esperienza arcade (stile grafico, framerate, ecc.) o un **remake/tribute** con funzionalità di qualità della vita moderne (es. salvataggi, modalità addestramento) e/o miglioramenti grafici (es. grafica HD, effetti particellari moderni)?

2.  **Scope del Contenuto:**
    * **Domanda:** L'obiettivo iniziale è riprodurre tutti gli **8 livelli** dell'originale arcade, o si prevede un **MVP (Minimum Viable Product)** con un numero inferiore di livelli (es. 4) per una prima *release*?

3.  **Piattaforma Target:**
    * **Domanda:** Qual è la piattaforma di *release* primaria (PC, Console, Mobile)? Questo influenzerà il design dell'interfaccia utente (UI) e la scelta del motore di gioco.

4.  **Sistema di Colonna Sonora:**
    * **Domanda:** La colonna sonora deve essere la **colonna sonora originale** (riarrangiata/remasterizzata) o deve essere composta una **nuova colonna sonora** ispirata all'originale?