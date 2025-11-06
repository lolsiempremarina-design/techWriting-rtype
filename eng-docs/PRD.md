# 🛸 R-Type: Product Requirement Document (PRD)

| Dati di Identificazione e Processo | Valore |
| :--- | :--- |
| **Titolo Documento** | R-Type: Product Requirement Document (PRD) |
| **Identificativo Documento** | R-TYPE-PRD-V1.0 |
| **Versione** | 1.0 (Draft Iniziale) |
| **Data Emissione** | Novembre 2025 |
| **Autore/Proprietario** | [Nome del Product Owner / Team Prodotto] |
| **Riservatezza** | Interna (Commerciale) |
| **Stato QA/Approvazione** | Non Ispezionato / Non Approvato (Draft) |

---

## 1. Introduzione

### 1.1. Scopo
Questo documento definisce i requisiti, gli obiettivi e le funzionalità di alto livello per lo sviluppo di una riproduzione fedele del classico videogioco arcade **R-Type** di Irem (1987), un iconico *shoot 'em up* a scorrimento orizzontale (*Shmup*).

### 1.2. Visione del Prodotto
Creare un'esperienza di gioco che catturi l'essenza, l'alto livello di sfida e le meccaniche distintive dell'originale R-Type, rivolgendosi sia ai fan nostalgici sia a una nuova generazione di giocatori.

### 1.3. Pubblico Target
* **Fan del Genere Shmup:** Giocatori che apprezzano i classici titoli *bullet hell* e *scroll-shooter*.
* **Giocatori Retrogaming:** Utenti che cercano un'esperienza fedele o modernizzata di un classico arcade.
* **Giocatori Esigenti:** Utenti che desiderano un alto livello di sfida e memorizzazione dei livelli.

---

## 2. Obiettivi del Prodotto

| Goal ID | Descrizione | Criteri di Successo (KPI) |
| :--- | :--- | :--- |
| **G1** | **Fidelità Meccanica:** Riprodurre con precisione le meccaniche uniche di R-Type. | Implementazione funzionale ed equilibrata della meccanica **Force** e del **Wave Cannon**. |
| **G2** | **Esperienza Arcade:** Mantenere l'alto livello di difficoltà e il senso di progressione e apprendimento insito nel *level design* originale. | Il tasso di completamento medio per un nuovo giocatore è coerente con quello del gioco arcade (alto livello di sfida). |
| **G3** | **Funzionalità Core:** Garantire un'esperienza di gioco completa, inclusi tutti i livelli e i boss. | Inclusione di tutti gli 8 livelli e dei boss corrispondenti dell'originale R-Type. |
| **G4** | **Reattività dei Controlli:** Garantire controlli fluidi e reattivi (essenziali per il genere). | Latenza di input impercettibile per un controllo preciso della navicella **R-9 Arrowhead**. |

---

## 3. Funzionalità di Alto Livello

### 3.1. Core Gameplay
* **F1. Fixed Horizontal Scroll:** Il gioco deve procedere con uno scorrimento orizzontale fisso (da sinistra a destra).
* **F2. R-9 Arrowhead Piloting:** Controllo della navicella **R-9 Arrowhead** con capacità di movimento a 360° all'interno dell'area di gioco.
* **F3. Immediate Death:** La navicella viene distrutta da un singolo colpo nemico o contatto ambientale (con l'eccezione della **Force** quando è attaccata).

### 3.2. Sistema di Armi e Power-up
Il sistema di armi deve essere basato su power-up rilasciati dai nemici (*Pods*).
* **F4. Wave Cannon:**
    * Capacità di caricare l'arma principale tenendo premuto il pulsante di fuoco.
    * Rilascio di un potente raggio dopo la carica, con danno proporzionale al tempo di carica.
    * (Opzionale: Implementazione di una carica di secondo livello/massima carica).
* **F5. Force (Sphere Module):**
    * Un modulo sferico indistruttibile che funge da arma aggiuntiva e scudo.
    * Può essere **attaccato** alla prua o alla poppa dell'R-9.
    * Può essere **staccato** per attaccare i nemici in modo indipendente e/o bloccare proiettili.
* **F6. Laser Power-ups:** Implementazione di tre tipi principali di laser (ottenuti raccogliendo il power-up Laser):
    * **Red Laser:** Raggi anti-aerei che possono trapassare i nemici.
    * **Blue Laser:** Raggi riflessi/che rimbalzano sui muri (cruciali in certi livelli).
    * **Yellow Laser:** Laser per attacco a terra o onde che si propagano orizzontalmente.
* **F7. Other Power-ups:** Inclusione di power-up Missile, **Speed Up** (aumento della velocità) e *Bit* (piccoli satelliti difensivi/offensivi).

### 3.3. Livelli e Nemici
* **F8. Game Levels:** Piena implementazione di tutti gli 8 Stage caratteristici dell'originale, con i loro ambienti e pericoli unici (es. la sezione interna Bydo, tentacoli organici).
* **F9. Biomechanical Aesthetic (Bydo Empire):** Design di nemici, ostacoli e boss in stile biomeccanico/alieno, che è un tratto distintivo di R-Type.
* **F10. Boss Fights:** Ogni livello deve concludersi con un boss fight unico, che richiede l'apprendimento di uno specifico pattern di attacco e l'uso strategico della **Force** per sconfiggerlo.

### 3.4. Interfaccia Utente e Sistema di Punteggio
* **F11. HUD:** Visualizzazione chiara dei seguenti elementi: Punteggio, Vite/Navi Rimanenti (Lives), Indicatore di carica del **Wave Cannon**.
* **F12. Scoring System:** Implementazione del calcolo del punteggio basato sulla distruzione dei nemici, con un sistema moltiplicatore per distruzioni multiple.
* **F13. Continues & Game Over:** Opzione per utilizzare *Continues* limitati (o illimitati, come opzione).

---

## 4. Requisiti Tecnici di Alto Livello

* **T1. Game Engine:** **[IN COMPLETAZIONE]** Dipendente dalla piattaforma di destinazione - vedi Sezione 5.3.
* **T2. Platform:** **[IN COMPLETAZIONE]** Piattaforma di rilascio principale - vedi Sezione 5.3.
* **T3. Graphics:** *Pixel-perfect collision detection* per garantire la corretta funzionalità delle dinamiche di gioco.
* **T4. Control:** Supporto per Gamepad/Tastiera con mappatura dei tasti personalizzabile per: Movimento (4 direzioni), Fire/Charge, **Force** Detach/Attach.

---

## 5. Domande Aperte e Assunzioni

Per finalizzare il PRD e guidare lo sviluppo, i seguenti punti necessitano di chiarimento:

1.  **Fidelity vs. Reinvention:**
    * **Domanda:** Si punta a una **riproduzione 1:1** dell'esperienza arcade (stile grafico, framerate, ecc.) o a un **remake/tribute** con moderne funzionalità *quality-of-life* (es. salvataggi, modalità allenamento) e/o miglioramenti grafici (es. grafica HD, effetti particellari moderni)?

2.  **Ambito del Contenuto:**
    * **Domanda:** L'obiettivo iniziale è riprodurre tutti gli **8 livelli** dell'arcade originale, o è previsto un **MVP (Minimum Viable Product)** con un numero inferiore di livelli (es. 4) per un *release* iniziale?

3.  **Piattaforma Target:**
    * **Domanda:** Qual è la piattaforma di *release* primaria (PC, Console, Mobile)? Questo influenzerà il design dell'Interfaccia Utente (UI) e la scelta del *game engine*.

4.  **Sistema Colonna Sonora:**
    * **Domanda:** La colonna sonora dovrà essere l'**original soundtrack** (riarrangiata/remastered) o dovrà essere composta una **nuova colonna sonora** ispirata all'originale?

---

## 6. Glossario

Questa sezione definisce i termini specialistici e gli acronimi utilizzati nel documento.

| Termine | Definizione |
| :--- | :--- |
| **Bydo Empire** | La razza aliena/biomeccanica nemica che il giocatore affronta in R-Type. |
| **Force** | Il modulo sferico di attacco e difesa indistruttibile che può essere attaccato o staccato dalla navicella del giocatore. È una meccanica centrale del gioco. |
| **HUD** | **Head-Up Display**. L'interfaccia grafica visualizzata sullo schermo che fornisce al giocatore informazioni sullo stato (punteggio, vite, ecc.). |
| **MVP** | **Minimum Viable Product** (Prodotto Minimo Viabile). Versione di un nuovo prodotto che include solo le funzionalità sufficienti per soddisfare i primi utilizzatori e fornire feedback per lo sviluppo futuro. |
| **Pixel-perfect collision detection** | Una tecnica di rilevamento delle collisioni utilizzata nei videogiochi 2D in cui la collisione viene calcolata in base alla sovrapposizione esatta dei pixel degli oggetti, garantendo la precisione necessaria per gli *Shmup*. |
| **R-9 Arrowhead** | Il nome del veicolo spaziale da combattimento pilotato dal giocatore. |
| **Shmup** | Abbreviazione di **Shoot 'em up**. Sottogenere dei videogiochi d'azione in cui il giocatore pilota un veicolo sparando a ondate di nemici. |
| **Wave Cannon** | L'arma principale della R-9, che può essere caricata per rilasciare un potente raggio energetico. |