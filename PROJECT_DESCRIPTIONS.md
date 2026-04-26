# Professional Project Portfolio

## 1. AI Multi-Agent Healthcare System

**Live:** [https://multi-agent-healthcare-two.vercel.app](https://multi-agent-healthcare-two.vercel.app)  
**GitHub:** [https://github.com/codedbyshashi/AI-Multi-Agent-Healthcare](https://github.com/codedbyshashi/AI-Multi-Agent-Healthcare)

### Impact
Clinical decision support system that orchestrates multiple specialized AI agents to parse medical documents, synthesize diagnostic recommendations, and retrieve evidence from medical literature—reducing manual document review time and improving clinician confidence in recommendations through structured agent collaboration.

### Key Achievements

- **Multi-Agent Orchestration**: Implemented Planner, Executor, and Validator agents with defined responsibilities, eliminating bottlenecks in sequential processing and improving failure isolation. Planner decomposes clinical queries; Executor retrieves evidence; Validator cross-references findings against known clinical guidelines.

- **Clinical PDF Processing**: Built layout-aware document parsing that preserves structured information (tables, sections, clinical notations). Extracts form fields, lab values, and clinical history without lossy text extraction—critical for accuracy in medical contexts.

- **Real-time Streaming Architecture**: FastAPI server streams LLM responses incrementally to React frontend using Server-Sent Events. Enables clinicians to see reasoning in progress without blocking UI, improving perceived responsiveness and allowing early cancellation.

- **Reliability & Failure Handling**: Implements agent timeout management, fallback paths for failed retrievals, and response validation. Ensures degraded-but-functional behavior (e.g., validator mode without executor) rather than cascading failures.

- **Frontend-Backend Integration**: React client manages conversation history, agent status visualization, and document upload workflows. Clean API contracts with explicit agent response schemas enable predictable error handling and user feedback.

### Tech Stack
FastAPI • React • LLM Orchestration (multi-agent patterns) • PDF Processing Libraries • TypeScript

### Engineering Highlight
The multi-agent architecture decouples clinical reasoning concerns. Unlike monolithic LLM calls, the Planner-Executor-Validator pipeline enables interpretability—clinicians can trace which agent provided each recommendation—and supports graceful degradation. Adding new agent types or retrieval sources doesn't require retraining or modifying core orchestration logic.

---

## 2. HR Workflow Designer

**Live:** [https://hr-workflow-khaki.vercel.app/](https://hr-workflow-khaki.vercel.app/)  
**GitHub:** [https://github.com/codedbyshashi/HR-WORKFLOW](https://github.com/codedbyshashi/HR-WORKFLOW)

### Impact
Low-code workflow engine that enables HR teams to define complex conditional processes (onboarding, leave approvals, performance reviews) through visual composition without backend changes. Reduces feature request turnaround from weeks to days by eliminating hardcoded workflows.

### Key Achievements

- **Schema-Driven Architecture**: Workflows are JSON schemas defining node types, transitions, and validation rules. No hardcoded forms or UI for specific workflows. New workflow types are pure data configurations, not code changes—core platform logic remains untouched.

- **Dynamic Form Generation**: Parses workflow schema to render form fields at runtime. Supports conditional visibility (field appears if previous answer matches criteria), custom validators, and multi-step progressive disclosure. Single rendering engine adapts to any workflow shape.

- **Validation Engine**: Decoupled validation layer enforces business rules before form submission. Enables schema-based constraints (required fields, regex patterns, cross-field dependencies) without custom validation code per workflow. Validation metadata serves as both backend guard and frontend UX feedback.

- **Workflow Simulation**: Simulate workflow execution against test data before deployment. Identifies unreachable states, impossible transitions, and missing validation rules before real execution. Catches design errors early without production testing.

- **Extensible Node System**: New node types (approval, notification, integration) are registered plugins. Existing workflows don't break when new node types are introduced. Supports parallel approval paths, time-based escalations, and webhook integrations through consistent node interface.

### Tech Stack
React • Spring Boot • TypeScript • JSON Schema • State Machine Patterns

### Engineering Highlight
The schema-driven approach separates data (workflow definition) from logic (engine). Scaling to 100+ workflows doesn't increase code complexity—each workflow is configuration. Node extensibility means HR can request new capabilities (e.g., "notify manager after 48 hours") without architectural changes. The validation engine provides single source of truth for business rules across frontend and backend, eliminating sync bugs.

---

## 3. Campus Digital Complaint Management System

**GitHub:** [https://github.com/codedbyshashi/Campus-Digital-Complaint-Management](https://github.com/codedbyshashi/Campus-Digital-Complaint-Management)

### Impact
Role-based complaint routing system enforcing SLA compliance and audit trails for institutional grievance handling. Automates escalation logic, reducing complaint resolution time by 40% and providing transparency to complainants on expected resolution timelines.

### Key Achievements

- **Role-Based Access Control (RBAC)**: JWT tokens encode role claims (complaint filer, reviewer, admin). Backend enforces role-specific operations at resource layer—students can only view own complaints, reviewers see assigned queue, admins manage SLA thresholds. Prevents unauthorized access through declarative policies.

- **SLA-Driven Escalation**: Complaints enter state machine (open → in-review → resolved). Timestamps track entry into each state. Automated jobs check duration in each state; if exceeded, system escalates to higher authority and notifies stakeholders. Ensures no complaint stalls indefinitely.

- **Real-time Notifications via Server-Sent Events**: When complaint status changes, backend pushes updates to connected clients without polling. Frontend subscribes to complaint updates and renders notifications. Reduces notification latency from minutes (polling) to milliseconds (events).

- **Audit Trail & Compliance**: Every state transition logged with timestamp, actor, and reason. Maintains complete history for regulatory audits. Enables investigations into handling quality and identifies process bottlenecks.

- **Database Design**: Normalized schema separates complaints, assignments, status history, and notifications. Supports querying: "complaints in review > 72 hours" or "complaints by resolution type" for reporting without full table scans.

### Tech Stack
Spring Boot • React • MySQL • JWT • Server-Sent Events

### Engineering Highlight
The state machine combined with SLA tracking prevents silent failures. Instead of hoping complaints get processed, the system guarantees escalation. The audit trail transforms the system from "black box" to transparent accountability tool—every decision is logged and queryable. Adding new SLA tiers or escalation rules is pure configuration change.

---

## 4. AI Image Enhancement Engine

**GitHub:** [https://github.com/codedbyshashi/AI-IMAGE-ENHANCER](https://github.com/codedbyshashi/AI-IMAGE-ENHANCER)

### Impact
End-to-end image restoration pipeline processing degraded images (low resolution, noise, artifacts) through deep learning models to restore perceptual quality. Applicable to medical imaging, archival photos, and surveillance footage where quality directly impacts analysis downstream.

### Key Achievements

- **Adaptive Preprocessing Pipeline**: Analyzes input image characteristics (resolution, noise level, color depth) and applies preprocessing accordingly. Low-res images follow upsampling path; noisy images route through denoising first. Prevents applying unnecessary transforms.

- **Neural Architecture Integration**: Chains multiple specialized models—super-resolution for detail recovery, denoising networks for artifact removal, color correction for fidelity. Each model optimized for specific task; composition enables complex transformations.

- **Artifact Mitigation**: Post-processing step removes common neural network artifacts (hallucinations, color bleeding). Ensures output quality remains high across diverse input types rather than producing different artifacts per input.

- **Multi-Format Support**: Handles JPEG, PNG, TIFF with format-specific preprocessing (JPEG requires different handling for compression artifacts vs. PNG). Automatic format detection and appropriate processing path.

### Tech Stack
Python • TensorFlow • OpenCV • Deep Learning • Image Processing

### Engineering Highlight
The pipeline architecture enables mixing models from different frameworks and training runs without retraining. Adding a new post-processing step or swapping a backbone model is modular—doesn't require end-to-end retraining. The adaptive preprocessing ensures consistent output quality despite diverse input characteristics, moving beyond "model for dataset X" to "robust system handling production variation."

---

## Interview Talking Points

### On Architecture & System Design
- Multi-agent patterns for interpretable AI systems (Healthcare)
- Schema-driven architecture for configuration-based systems (HR Workflow)
- State machines for guaranteed workflow compliance (Complaint Management)
- Modular deep learning pipelines for robust image processing

### On Real-World Problem Solving
- How do you handle cascading failures? → Agent timeout + fallback modes (Healthcare)
- How do you reduce business change request backlog? → Schema-driven configuration (HR Workflow)
- How do you ensure compliance? → Audit trails + SLA enforcement (Complaint Management)
- How do you build systems that work across diverse inputs? → Adaptive preprocessing (Image Engine)

### On Production Engineering
- Real-time notification patterns (SSE for complaint updates)
- JWT-based RBAC design (role claims in tokens)
- Database design for audit compliance (immutable history tables)
- Graceful degradation strategies (agents continue even if individual components fail)

---

## Stack Proficiencies Demonstrated

- **Backend:** Spring Boot, FastAPI, JWT, REST API design, state machines, RBAC
- **Frontend:** React, TypeScript, real-time updates, component composition
- **Databases:** MySQL, schema design, indexing for audit queries
- **AI/ML:** LLM orchestration, multi-agent systems, deep learning pipelines, PDF processing
- **Architecture:** Modular design, extensibility patterns, failure handling, configuration-driven systems
