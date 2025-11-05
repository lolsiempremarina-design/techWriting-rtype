# 📄 Linee Guida per Codice di Alta Qualità con AI Companion
**(Metodologia TDD per Sviluppo FullStack)**

## 0. Introduzione

Questo documento definisce i protocolli di interazione con strumenti di generazione codice basati sull'intelligenza artificiale (**AI Companion**) per assicurare che il codice prodotto sia **funzionale, sicuro, mantenibile e testabile**. L'AI Companion deve essere trattato come un **assistente esperto** la cui produzione deve essere sempre guidata e validata dal developer.

Il principio cardine è: **Prima il Test, poi l'Implementazione, sempre con l'AI sotto la supervisione del developer.**

---

## 1. Il Ciclo TDD guidato dall'AI Companion

La metodologia TDD si articola nelle fasi **Red, Green, Refactor**. Per ogni fase, l'interazione con l'AI Companion deve essere precisa e mirata.

### 1.1 FASE RED: Scrivere il Test Fallimentare (Obiettivo: Definizione)

In questa fase, l'AI viene utilizzato per generare il **test unitario o di integrazione** per una funzionalità che non esiste ancora o non è ancora completa.

| Azione del Developer (Prompt) | Obiettivo e Output Atteso dall'AI |
| :--- | :--- |
| **Contesto e Framework** | Specificare la tecnologia, il file e il framework di testing. *Es: "Nel file `users.service.spec.ts`, usando **Jest/TypeScript**, genera un test per..."* |
| **Requisito Funzionale** | Descrivere chiaramente la singola aspettativa non ancora implementata. *Es: "...la funzione `createUser` deve sollevare un'eccezione quando il campo `password` è vuoto."* |
| **Validazione** | **Verificare l'Output:** Eseguire immediatamente il test. L'AI ha completato la fase RED solo se il test **fallisce** con il messaggio di errore atteso. |

### 1.2 FASE GREEN: Scrivere il Codice Minimo (Obiettivo: Funzionalità)

Si istruisce l'AI a generare solo la logica strettamente necessaria per far passare il test RED.

| Azione del Developer (Prompt) | Obiettivo e Output Atteso dall'AI |
| :--- | :--- |
| **Riferimento al Test** | Collegare esplicitamente l'implementazione al test fallito. *Es: "Implementa la logica **minima** per far passare il test `should reject empty password` nella funzione `createUser`."* |
| **Vincolo di Minimo** | Istruire l'AI a evitare qualsiasi logica aggiuntiva (over-engineering). *Es: "**Non** aggiungere logica di logging, gestione del database o validazioni non richieste dal test corrente."* |
| **Validazione** | **Verificare l'Output:** Eseguire nuovamente la suite di test. La fase GREEN è completata solo se **tutti i test sono verdi** e non è stato introdotto alcun side effect. |

### 1.3 FASE REFACTOR: Migliorare il Codice (Obiettivo: Qualità e Manutenibilità)

Dopo aver raggiunto il GREEN, l'AI viene utilizzato per ottimizzare la struttura e la leggibilità del codice, mantenendo la garanzia dei test.

| Azione del Developer (Prompt) | Obiettivo e Output Atteso dall'AI |
| :--- | :--- |
| **Ottimizzazione Standard** | Richiedere miglioramenti di stile, performance e aderenza a pattern. *Es: "Riscrivi la funzione `createUser` utilizzando il pattern **Dependency Injection**."* Oppure: "*Refactor* del blocco `if/else` per utilizzare le `guard clauses`." |
| **Sicurezza e Best Practices** | Richiedere una revisione mirata alla sicurezza. *Es: "Rivedi questa funzione API per prevenire vulnerabilità **OWASP Top 10**, in particolare **Cross-Site Scripting (XSS)**. Assicurati che tutti gli input siano sanificati."* |
| **Validazione** | **Verificare l'Output:** Eseguire nuovamente tutti i test. Il refactoring è accettato solo se **tutti i test rimangono verdi**. |

---

## 2. Linee Guida Specifiche FullStack

L'AI Companion deve essere istruito con contesto specifico per lo strato (Frontend, Backend, Infrastruttura) in cui opera.

### 2.1 Backend (Servizi e API)

* **Contratti Espliciti:** Prima di generare la logica, istruire l'AI a definire e generare gli **schema (es. OpenAPI/Swagger)** e i modelli dati (**Interfacce Typescript/DTOs**).
* **Immutabilità:** Richiedere all'AI di preferire strutture dati **immutabili** e di evitare side effect non desiderati.
* **Logging e Tracing:** Richiedere l'inclusione di istruzioni di **logging strutturato** (`JSON`) nei punti critici (es. inizio/fine di una transazione, gestione degli errori).

### 2.2 Frontend (Interfaccia Utente)

* **Separazione Logica/Presentazione:** Istruire l'AI a isolare la logica di business in **Hooks personalizzati** o **Servizi** separati dal componente di presentazione (Principio **Container/Presentational Component**).
* **Accessibilità (A11y):** Includere requisiti di accessibilità nei prompt. *Es: "Genera il componente **Button** includendo gli attributi **ARIA** necessari."*
* **Test di Rendering:** Generare sempre test di rendering/interazione (**React Testing Library/Vue Test Utils**) che simulino il comportamento dell'utente.

### 2.3 Infrastruttura come Codice (IaC)

* **Principio del Minimo Privilegio:** Quando si generano policy di sicurezza (**IAM/ACL**), istruire l'AI ad applicare rigorosamente il **principio del minimo privilegio**.
* **Gestione dei Segreti:** Richiedere all'AI di utilizzare sempre meccanismi di gestione dei segreti (**AWS Secrets Manager, HashiCorp Vault**) e di **non** includere mai credenziali hardcoded.

---

## 3. Checklist di Validazione Finale (Revisione Umana)

Prima di approvare il codice generato dall'AI e procedere al commit, il developer **deve** verificare i seguenti punti:

1.  ✅ **Tutti i Test Passano:** La suite di test è verde.
2.  ✅ **Codice Leggibile:** La logica è pienamente compresa e facilmente leggibile.
3.  ✅ **Nessun Debito Tecnico Nascosto:** Non ci sono workaround temporanei o codice "TODO" lasciato dall'AI.
4.  ✅ **Documentazione Aggiornata:** I **Docstrings** e i commenti pertinenti sono stati generati o aggiornati per riflettere le modifiche.
5.  ✅ **Stile e Formattazione:** Il codice aderisce allo standard del progetto (es. è stato eseguito il formattatore come **Prettier** o **ESLint**).