# Guidelines for High-Quality Code with AI Companion

This document defines the protocols for interacting with Artificial Intelligence (AI Companion) code generation tools to ensure that the produced code is **functional, secure, maintainable, and testable**. The AI Companion must be treated as an **expert assistant** whose output must always be guided and validated by the developer.

The core principle is: **Test First, then Implementation, always with the AI under the developer's supervision.**

---

## 0. Introduction

(The original content for the introduction section seems to be only the document definition and the core principle, which are already covered above.)

## 1. The TDD Cycle Guided by the AI Companion

### 1.1 RED PHASE: Write the Failing Test (Goal: Definition)

| Developer Action (Prompt) | Goal and Expected AI Output |
| :------------------------ | :-------------------------- |
| **Context and Framework** | Specify the technology, file, and testing framework. *E.g.: "In the `users.service.spec.ts` file, using **Jest/TypeScript**, generate a test for..."* |
| **Functional Requirement** | Clearly describe the single, yet-to-be-implemented expectation. *E.g.: "...the `createUser` function must throw an exception when the `password` field is empty."* |
| **Validation** | **Verify the Output:** Immediately run the test. The AI has completed the RED phase only if the test **fails** with the expected error message. |

### 1.2 GREEN PHASE: Write the Minimum Code (Goal: Functionality)

| Developer Action (Prompt) | Goal and Expected AI Output |
| :------------------------ | :-------------------------- |
| **Context and Test** | Provide the failing test code from the RED phase. *E.g.: "Implement the necessary code in `users.service.ts` to make the following test pass."* |
| **Implementation Scope** | Request the minimum code necessary to satisfy only the single functional requirement (the current test). *E.g.: "...create the `createUser` function that handles the empty password check."* |
| **Validation** | **Verify the Output:** Rerun the test. The AI has completed the GREEN phase only if the test **passes** and all previous tests (if any) still pass. |

### 1.3 REFACTOR PHASE: Improve the Code (Goal: Quality and Maintainability)

| Developer Action (Prompt) | Goal and Expected AI Output |
| :------------------------ | :-------------------------- |
| **Context and Code** | Provide the code to be refactored and the quality requirement. *E.g.: "Refactor the `createUser` function in `users.service.ts` to improve performance and adhere to SOLID principles."* |
| **Refactoring Objective** | Specify the quality metric to be optimized (e.g., performance, readability, separation of concerns). *E.g.: "...use dependency injection for external resources and separate the validation logic into a dedicated class."* |
| **Validation** | **Verify the Output:** Rerun all tests. The AI has completed the REFACTOR phase only if the code has demonstrably improved in quality and **all tests still pass** (GREEN). |

---

## 2. Specific FullStack Guidelines

The AI Companion must be instructed with specific context for the layer (Frontend, Backend, Infrastructure) in which it is operating.

### 2.1 Backend (Services and APIs)

* **Idempotency and Resilience:** Instruct the AI to design API endpoints to be idempotent whenever possible (especially for PUT/DELETE) and to incorporate retry and exponential backoff mechanisms.
* **Structured Logging:** Request the use of structured logging (e.g., JSON format) for easy querying and monitoring, including request IDs for traceability.
* **ORM Security:** When generating database interactions, instruct the AI to use ORM (Object-Relational Mapping) features correctly to prevent SQL Injection (e.g., parameterized queries).

### 2.2 Frontend (UI/UX and Accessibility)

* **Accessibility First:** Explicitly include the need for accessibility in prompts. *E.g.: "Generate the **Button** component including the necessary **ARIA** attributes."*
* **Rendering Tests:** Always generate rendering/interaction tests (**React Testing Library/Vue Test Utils**) that simulate user behavior.

### 2.3 Infrastructure as Code (IaC)

* **Principle of Least Privilege:** When generating security policies (**IAM/ACL**), instruct the AI to rigorously apply the **principle of least privilege**.
* **Secret Management:** Require the AI to always use secret management mechanisms (**AWS Secrets Manager, HashiCorp Vault**) and **never** include hardcoded credentials.

---

## Final Acceptance Conditions (Refactor)

A code snippet generated or refactored with the help of the AI Companion is accepted only when all the following conditions are met:

1.  ✅ **All Tests Pass:** The entire test suite is GREEN.
2.  ✅ **Clear Logic:** The code logic is fully understood and easily readable by the developer.
3.  ✅ **No Hidden Technical Debt:** There are no temporary workarounds or "TODO" code left by the AI.
4.  ✅ **Updated Documentation:** **Docstrings** and relevant comments have been generated or updated to reflect the changes.
5.  ✅ **Style and Formatting:** The code adheres to the project standard (e.g., the formatter like **Prettier** or **ESLint** has been executed).