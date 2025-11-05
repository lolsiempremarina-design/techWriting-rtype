## 📝 Analisi Funzionale: R-Type Replica
L'obiettivo di questo documento è descrivere il **comportamento dell'utente, le interazioni e le logiche di gioco** del prodotto, rispondendo alla domanda: *"Cosa vedrà e farà l'utente?"*.

---

### 1. Comportamento Utente (Interazioni Base)

Descrizione delle azioni che l'utente può compiere sulla navicella **R-9 Arrowhead**.

| Azione Utente | Interazione di Gioco | Logica (Stato del Gioco) |
| :--- | :--- | :--- |
| **Movimento** | L'utente preme i tasti direzionali/leva analogica. | La navicella si muove a **360°** all'interno dell'area di gioco, con una velocità determinata dal livello di **Speed Up** attivo (F7). Il movimento è fluido e la latenza è impercettibile (O4). |
| **Fuoco Normale** | L'utente preme brevemente il pulsante di fuoco. | La R-9 spara un **proiettile standard** non caricato. Se un Power-up Laser (F6) è attivo, spara il laser corrispondente. |
| **Caricamento Wave Cannon** | L'utente tiene premuto il pulsante di fuoco (F4). | Un indicatore sull'HUD mostra lo stato di carica. Rilasciando il pulsante, viene rilasciato il **Wave Cannon (Cannone a Onde)**, il cui danno e dimensione dipendono dal tempo di carica. |
| **Aggancio/Sgancio Force** | L'utente preme il pulsante dedicato a Force (T4). | La **Force (F5)** si sgancia dalla poppa/prua della R-9 se era attaccata, e viceversa si aggancia se era sganciata, invertendo la sua posizione in relazione alla navicella. |

---

### 2. Logiche di Gioco Principali (Collisioni e Morte)

Queste logiche sono fondamentali per mantenere l'elevato livello di sfida e la fedeltà all'originale (O2).

#### 2.1. Regola di Morte (**Immediate Death**)

**Condizione di Morte**: La navicella R-9 Arrowhead viene **immediatamente distrutta** (morte istantanea) se:

* Viene colpita da un **proiettile nemico**.
* Entra in **collisione con un nemico** (non la Force).
* Entra in **collisione con l'ambiente** (es. muri, soffitti, tentacoli organici).

**Eccezione Force**: La **Force (F5)**, quando è agganciata alla navicella, agisce come **scudo** e può assorbire colpi nemici o collisioni ambientali **senza distruggere la R-9**. La Force stessa è indistruttibile.

#### 2.2. Collisioni con Power-up

**Logica di Raccolta**: Quando l'hitbox della R-9 entra in contatto con un Power-up Pod nemico, l'oggetto viene immediatamente rimosso dal gioco e viene applicato l'effetto corrispondente.

* **Laser Power-up**: Se viene raccolto un Power-up Laser quando un laser è già attivo, il tipo di laser cambia **ciclicamente** (Rosso → Blu → Giallo → Rosso).

---

### 3. Logica del Modulo Force (F5)

La meccanica Force è il cuore di R-Type (O1).

#### 3.1. Stato e Posizionamento

La Force ha **due stati di aggancio** e **uno stato sganciato**.

* **Attaccata (Agganciata)**: Può essere agganciata a due posizioni.
    * **Prua (Anteriore)**: Attaccata alla parte anteriore della R-9 per un attacco frontale e difesa.
    * **Poppa (Posteriore)**: Attaccata alla parte posteriore della R-9 per una difesa e attacco posteriore.
* **Sganciata (Libera)**: La Force si muove autonomamente rispetto alla navicella (mantenedo l'ultima direzione impressa o orbitando leggermente, a seconda dell'implementazione fedele), agendo come unità di attacco/scudo indipendente per eliminare nemici o bloccare proiettili a distanza.

#### 3.2. Funzione Offensiva

La Force spara proiettili quando è attaccata e agisce come arma quando è sganciata. La sua potenza e tipo di attacco dipendono dal **tipo di laser attivo** sulla R-9.

---

### 4. Logica del Punteggio (Score)

Il sistema di punteggio deve incentivare la distruzione dei nemici e delle strutture.

* **Base Score**: Distruggere un singolo nemico assegna un punteggio base (es. **100 punti**).
* **Multipliers**: La distruzione di più nemici o parti di una catena (es. sezioni di un nemico segmentato) in rapida successione deve attivare un **moltiplicatore di punteggio crescente**. Questo deve essere visibile nell'HUD (F11).
* **Boss Score**: Sconfiggere un boss (F10) assegna un **punteggio bonus significativo**, proporzionale alla sua difficoltà e/o al tempo impiegato.

---

### 5. Progressione e Continues (F8, F13)

* **Avanzamento Livello**: Il gioco avanza tramite uno **scroll orizzontale fisso** (F1). Il completamento di un livello avviene solo dopo aver sconfitto il suo rispettivo **Boss** (F10).
* **Continues**: Quando il giocatore esaurisce tutte le navicelle (**Lives**), appare la schermata di **Game Over**. L'utente ha la possibilità di utilizzare un **Continue** per riprendere il gioco dal punto (o checkpoint predefinito) in cui è avvenuta la sconfitta.