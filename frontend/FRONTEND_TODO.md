# ChefMentor X – Frontend Todo

> Based on the [design system](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_frontend_design_system_frontend_guidelines.md), [stitch mockups](file:///c:/Users/gonu7/Downloads/hk/stitch), [PRD](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_final_prd_v_2_two_tab_experience.md), and [app flow](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_application_flow_app_flow.md).

---

## 1. Project Setup & Configuration

- [ ] Configure NativeWind (TailwindCSS for React Native) with `tailwind.config.js`
- [ ] Set up design tokens as CSS/theme variables (colors, typography, spacing, shadows, radii) per [design system](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_frontend_design_system_frontend_guidelines.md#L33-L163)
- [ ] Install & configure `Inter` font (primary) and `JetBrains Mono` (monospace/debug)
- [ ] Install `lucide-react-native` icon library (sizes: 16/20/24px, stroke: 1.5)
- [ ] Configure React Navigation (stack + bottom tabs)
- [ ] Set up Zustand stores (auth, recipe, cooking session, analysis)
- [ ] Configure Axios instance with base URL, interceptors, and error handling
- [ ] Set up folder structure:
  ```
  src/
  ├── components/    # Reusable UI components
  ├── screens/       # Screen components
  ├── navigation/    # Navigation config
  ├── stores/        # Zustand stores
  ├── services/      # API services
  ├── hooks/         # Custom hooks
  ├── constants/     # Theme tokens, config
  ├── types/         # TypeScript types
  └── utils/         # Helpers
  ```

---

## 2. Design System Components

Build reusable components per [Section 4 of design system](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_frontend_design_system_frontend_guidelines.md#L183-L231):

- [ ] **Button** — Variants: Primary, Secondary, Outline, Danger; states: default, hover, pressed, disabled; mandatory focus ring; `active:scale-95` press animation
- [ ] **TextInput** — States: default, focus, error, disabled; focus ring `primary-400`
- [ ] **Card** — Rounded-lg, shadow-md, white bg; used for recipes & diagnosis results
- [ ] **Alert / Toast** — Semantic color variants (success, warning, error, info); auto-dismiss
- [ ] **Loading Spinner** — Spinner + skeleton variants
- [ ] **Empty State** — Icon + message + CTA button
- [ ] **Error Card** — Red alert with retry action
- [ ] **Success Card** — Green confirmation with checkmark animation

---

## 3. Navigation Setup

Per [app flow navigation map](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_application_flow_app_flow.md#L252-L263):

- [ ] **Auth Stack** (unauthenticated):
  - Splash → Login → Permissions → Onboarding (Skill Level + Recipe Setup)
- [ ] **Main Tab Navigator** (authenticated/demo):
  - Tab 1: **Cook a Dish** (Recipe List → Recipe Details → Live Cooking → Completion)
  - Tab 2: **Analyze Failed Dish** (Upload → Analysis Loading → Diagnosis Result)
- [ ] Bottom tab bar with icons (mobile-first, per design system)
- [ ] Screen transition animations: 300ms fade

---

## 4. Screens – Auth & Onboarding

### 4.1 Splash Screen
Stitch ref: [splash_screen_1–9](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_splash_screen_1)

- [ ] App logo with floating animation + decorative food emoji badges
- [ ] Gradient background (orange/coral primary `#FF6B4A`)
- [ ] Food image grid (masonry-style, 2 columns)
- [ ] "Learn · Cook · Share" tag pills
- [ ] **"Try Demo Mode"** button (primary CTA) → skip to Main Tabs
- [ ] **"Sign in with Google"** button (secondary) → Login screen
- [ ] Terms & Privacy links
- [ ] Auth state check: auto-redirect if session exists

### 4.2 Login Screen
Stitch ref: [login](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_login)

- [ ] Back button (rounded, outlined)
- [ ] App icon (orange circle, restaurant_menu icon) with glow shadow
- [ ] "Welcome Back" heading (serif `Playfair Display`)
- [ ] **"Continue with Google"** button (OAuth via `expo-auth-session`)
- [ ] **"Continue with Apple"** button (dark bg)
- [ ] Divider with "or"
- [ ] **"Continue as Guest"** link (demo mode)
- [ ] Fade-in-up animations with staggered delays
- [ ] Error states: login failure → error message + retry
- [ ] Terms & Privacy footer

### 4.3 Onboarding Screen
Stitch ref: [onboarding](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_onboarding)

- [ ] Permissions request (camera, mic, notifications via Expo APIs)
- [ ] Skill level selector: Beginner / Intermediate / Experienced
- [ ] Recipe setup: "Tell us 5 dishes you'd like to learn" input
- [ ] Loading state while recipes are fetched/generated
- [ ] Skip/resume from last step if app closed during onboarding

---

## 5. Screens – Cook a Dish Tab

### 5.1 Recipe List Screen
Stitch ref: [recipe_list](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_recipe_list)

- [ ] Header with greeting & profile avatar
- [ ] Search/filter bar
- [ ] Recipe cards grid (image, title, difficulty, time, ingredients count)
- [ ] Card press → navigate to Recipe Details
- [ ] Empty state if no recipes loaded
- [ ] Pull-to-refresh

### 5.2 Recipe Details Screen
Stitch ref: [recipe_details](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_recipe_details)

- [ ] Hero image with back button overlay
- [ ] Recipe title, difficulty badge, estimated time
- [ ] Tabbed content: Ingredients | Steps
- [ ] Ingredients list with quantities
- [ ] Step-by-step list with numbering
- [ ] **"Start Cooking"** primary CTA button (sticky bottom)
- [ ] Camera setup validation before entering cooking mode

### 5.3 Live Cooking Screen
Stitch ref: [live_cooking](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_live_cooking)

- [ ] Camera preview (full-screen background via `expo-camera`)
- [ ] Current step overlay (step number, instruction text, timer)
- [ ] Voice guidance indicator (mandatory TTS active via `expo-speech`)
- [ ] Minimal controls: pause, next step, previous step
- [ ] Timer display with countdown
- [ ] AI guidance bubble (real-time tips/warnings)
- [ ] Voice command support (STT): "next step", "repeat", "set timer", etc.
- [ ] Error states: camera lost → reposition prompt; inference delay → static fallback
- [ ] Edge cases: pause/resume from last step; skip step → warning

### 5.4 Pause Overlay
Stitch ref: [pause_overlay](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_pause_overlay)

- [ ] Semi-transparent overlay on cooking screen
- [ ] Current step summary shown
- [ ] **"Resume"** and **"End Cooking"** buttons
- [ ] Timer pauses during overlay

### 5.5 Cooking Completion Screen
Stitch ref: [completion](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_completion)

- [ ] Success animation (subtle confetti or checkmark)
- [ ] Cooking summary: total time, steps completed, tips used
- [ ] CTA: "View Summary" / "Cook Another Dish"
- [ ] Option to switch to Analyze tab if dish failed

---

## 6. Screens – Analyze Failed Dish Tab

### 6.1 Upload & Analysis Screen
Stitch ref: [upload_analysis](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_upload_analysis)

- [ ] Upload instructions + example images
- [ ] Photo picker (camera or gallery via `expo-image-picker`)
- [ ] Video upload support (`expo-media-library`)
- [ ] Context questions form (heat level, timing, ingredient changes)
- [ ] **"Analyze"** submit button
- [ ] Error states: upload failure → retry; unsupported media → format guidance; file too large → compress

### 6.2 Analysis Loading Screen
Stitch ref: [analysis_loading](file:///c:/Users/gonu7/Downloads/hk/stitch/chefmentor_x_analysis_loading)

- [ ] Loading animation (spinner or skeleton)
- [ ] Progress message: "Analyzing your dish..."
- [ ] AI response timeout handling (extend to 5s max, show "Taking longer than expected")

### 6.3 Diagnosis Result Screen

- [ ] Root cause card (red/warning colored)
- [ ] Simple explanation text
- [ ] Correction suggestions for next attempt (green/accent cards)
- [ ] Option to save to cooking profile
- [ ] "Analyze Another Dish" CTA

---

## 7. State Management (Zustand)

- [ ] **Auth Store**: user, token, isAuthenticated, isDemo, login(), logout()
- [ ] **Recipe Store**: recipes[], selectedRecipe, fetchRecipes(), selectRecipe()
- [ ] **Cooking Session Store**: currentStep, totalSteps, timerValue, isPaused, isVoiceActive, nextStep(), prevStep(), pause(), resume()
- [ ] **Analysis Store**: uploadedImage, contextAnswers, analysisResult, isAnalyzing, submitAnalysis()
- [ ] **UI Store**: isLoading, toastMessage, showToast()

---

## 8. API Services

- [ ] `authService` — Google OAuth, session management, demo mode
- [ ] `recipeService` — Fetch recipes, recipe details, search
- [ ] `cookingService` — Start session, get step guidance, AI Q&A, complete session
- [ ] `analysisService` — Upload photo/video, submit context, get diagnosis
- [ ] `voiceService` — TTS (expo-speech), STT integration
- [ ] Error interceptor: network offline banner, API failure → retry, rate limit → queue

---

## 9. Voice Integration

Per [voice interaction spec](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_voice_interaction_spec.md):

- [ ] TTS via `expo-speech` (mandatory during cooking)
- [ ] STT integration for voice commands
- [ ] Command handlers: navigation, timers, queries, control
- [ ] Push-to-talk UI button
- [ ] Voice error fallback: recognition failed → "Didn't catch that" message; mic denied → manual controls
- [ ] Respect `prefers-reduced-motion`

---

## 10. Accessibility & UX

Per [design system Section 5](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_frontend_design_system_frontend_guidelines.md#L234-L241):

- [ ] WCAG 2.1 AA contrast ratios (≥ 4.5:1)
- [ ] Touch targets ≥ 44px
- [ ] Full keyboard navigation (accessible labels, roles)
- [ ] Visible focus outlines (2px)
- [ ] Large text mode during active cooking
- [ ] Animation: 150–200ms, ease-in-out, only opacity/transform; honor `prefers-reduced-motion`

---

## 11. Error Handling & Edge Cases

Per [app flow Section 6](file:///c:/Users/gonu7/Downloads/hk/md/chef_mentor_x_application_flow_app_flow.md#L318-L351):

- [ ] Network offline during onboarding → block with error
- [ ] Network offline during cooking → offline mode indicator, AI disabled, basic nav works
- [ ] AI service failure → Gemini → Groq → cached response fallback
- [ ] Camera permission denied → disable photo, allow text description
- [ ] Session expired → redirect to login with message
- [ ] 404/500 errors → redirect to Home with retry message
- [ ] Form validation → inline error messages

---

## 12. Offline Support

- [ ] Cache recipes locally after first fetch
- [ ] Basic cooking navigation (next/prev/timers) works offline
- [ ] Queue AI questions for sync when reconnected
- [ ] Show "Offline mode" indicator when disconnected

---

## 13. Testing

- [ ] Jest unit tests for Zustand stores
- [ ] Component snapshot tests for all reusable components
- [ ] Navigation flow integration tests
- [ ] API service mock tests
- [ ] ESLint + Prettier configuration

---

## Priority Order (Recommended)

| Priority | Items | Rationale |
|----------|-------|-----------|
| **P0** | Setup (#1), Design system (#2), Navigation (#3) | Foundation for everything |
| **P1** | Splash (#4.1), Login (#4.2), Recipe List (#5.1) | Core entry flow |
| **P2** | Recipe Details (#5.2), Live Cooking (#5.3), Completion (#5.5) | Main cooking feature |
| **P3** | Upload Analysis (#6.1-6.3), Voice (#9) | Second tab + voice |
| **P4** | Error handling (#11), Offline (#12), Accessibility (#10) | Polish & resilience |
| **P5** | Testing (#13) | Quality assurance |
