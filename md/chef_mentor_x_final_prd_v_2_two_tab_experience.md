# ChefMentor X – Product Requirements Document (PRD)

---

## App Idea
**ChefMentor X** is a self-correcting AI cooking mentor that supports users in two clear ways: (1) guiding them live while cooking a dish, and (2) analyzing failed dishes to explain what went wrong and how to fix it next time.

The product is intentionally designed as a **two-tab experience** to match real user intent.

---

## Context
- **Target Users:** Students, beginner to intermediate home cooks, and busy professionals
- **Primary Use Cases:** Live guided cooking OR post-cooking failure analysis
- **Unique Value:** Combines mistake prevention and failure diagnosis in a single learning loop
- **Evaluation Focus:** Hackathon judging + startup readiness

---

## 1. Problem Statement

Many users follow recipes correctly, yet their food still fails due to subtle mistakes in heat control, timing, sequencing, or technique. Existing cooking and recipe apps:
- Assume correct execution of steps
- Do not observe how users cook
- Cannot prevent mistakes in real time
- Fail to explain why a dish went wrong

As a result, users repeat the same mistakes, waste food, and fail to build transferable cooking skills.

---

## 2. Goals & Objectives

### Primary Goals
1. Reduce repeated cooking mistakes by **at least 30%** across multiple sessions
2. Provide real-time guidance that prevents common cooking errors
3. Deliver clear failure explanations within **10 seconds** of analysis submission

### Secondary Goals
- Improve user confidence in cooking
- Reduce food waste caused by trial-and-error learning
- Demonstrate feasibility through a live demo

---

## 3. Success Metrics

- % reduction in repeated mistakes per user
- Number of successful guided cooking sessions
- Average response time for guidance and diagnosis
- User satisfaction score for failure explanations

---

## 4. Target Personas

### Persona 1: Guided Cook User
- **Profile:** Student or working professional (18–35)
- **Primary Intent:** Wants help while cooking
- **Pain Points:** Makes mistakes during cooking, lacks feedback
- **Goals:** Cook confidently with step-by-step support
- **Tech Proficiency:** Medium

### Persona 2: Failure Analysis User
- **Profile:** Any user who already cooked a dish (18–40)
- **Primary Intent:** Understand why a dish failed
- **Pain Points:** Food wasted, no clear explanation
- **Goals:** Learn from mistakes and avoid repeating them
- **Tech Proficiency:** Medium

---

## 5. Scope of the Project

### In Scope
- Mobile application with two primary tabs
- Live guided cooking using visual cues
- Optional failed-dish analysis via image/video upload
- Mandatory voice guidance during cooking
- Support for **5 recipes** in MVP
- Demo mode access

### Explicitly Out of Scope
- Exact temperature measurement
- Offline functionality
- Smart appliance or IoT integration
- Medical or dietary advice
- Full kitchen surveillance

---

## 6. Features & Requirements

### P0 – Must Have (MVP)

#### Feature 1: Two-Tab Primary Navigation
- **Description:** App opens to two clear choices: "Cook a Dish" and "Analyze Failed Dish"
- **User Story:** As a user, I want to choose my intent upfront so I can directly access what I need
- **Acceptance Criteria:**
  - Main screen displays both tabs clearly
  - Tabs are accessible independently
  - Demo mode lands directly on tab screen
- **Success Metric:** % of users entering intended flow without confusion

---

#### Feature 2: Cook a Dish (Guided Cooking)
- **Description:** Provides step-aware, live cooking guidance using visual cooking cues and voice assistance
- **User Story:** As a user, I want guidance while cooking so I can avoid mistakes
- **Acceptance Criteria:**
  - Exactly 5 recipes supported
  - Mandatory voice guidance enabled
  - Guidance triggered only at recipe step boundaries
- **Success Metric:** Reduction in mistakes during cooking sessions

---

#### Feature 3: Analyze Failed Dish
- **Description:** Allows users to upload a photo or video of a failed dish for diagnosis
- **User Story:** As a user, I want to know why my dish failed so I can fix it next time
- **Acceptance Criteria:**
  - Accessible directly from main tab
  - Photo/video upload supported
  - Clear root-cause explanation provided
- **Success Metric:** User satisfaction with diagnosis quality

---

### P1 – Should Have

- Personal cooking habit profile
- Context questions to improve diagnosis accuracy

---

### P2 – Nice to Have

- AR visual overlays
- Community failure examples

---

## 7. User Scenarios

### Scenario 1: Guided Cooking
- User selects "Cook a Dish"
- Chooses a recipe
- Receives live voice guidance
- Completes dish successfully

### Scenario 2: Failure Analysis Only (Demo-Friendly)
- User selects "Analyze Failed Dish" without login
- Uploads a photo of a failed dish
- Receives explanation and correction tips

### Scenario 3: Learning Over Time
- User repeats a recipe
- Guidance adapts based on past mistakes

---

## 8. Non-Functional Requirements

- **Performance:** Guidance latency < 2 seconds
- **Security:** Secure API access
- **Privacy:** Media processed transiently, not stored without consent
- **Reliability:** Graceful fallback to static guidance
- **Usability:** Hands-free, voice-first interaction

---

## 9. Dependencies & Constraints

### Dependencies
- RecipeDB API (recipe structure and steps)
- FlavorDB API (flavor relationships)
- Internet connectivity

### Constraints
- Hackathon time limits
- Mobile device compute constraints

---

## 10. Timeline

### MVP (Hackathon)
- Two-tab navigation implemented
- 5 supported recipes
- Live guided cooking flow
- Optional failure analysis flow
- Live demo–ready

### V1.0 (Post-Hackathon)
- Expanded recipe library
- Improved personalization
- Additional failure patterns

---

## 11. Conclusion

ChefMentor X reframes cooking as a learnable skill by combining real-time guidance with post-failure understanding. The two-tab design respects user intent and enables a clean, demo-friendly experience suitable for hackathon judging and future startup growth.

