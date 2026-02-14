# ChefMentor X – Application Flow Documentation

---

## App Context
ChefMentor X is a mobile-first AI cooking mentor that guides users during cooking, prevents common mistakes using visual cues, and diagnoses failed dishes to explain why they failed and how to fix them in the future. The app is designed for live, guided cooking sessions with mandatory voice interaction and a live demo–ready flow.

---

## 1. Entry Points

Users can enter ChefMentor X through the following methods:

- **App Launch (Primary Entry Point)**
  - User opens the mobile application from the device home screen

- **Deep Link (Secondary)**
  - Link from hackathon demo QR code or internal demo link

- **OAuth Login**
  - Google Sign-In

- **Returning Session**
  - User reopens app with an active authenticated session

**Out of Scope:**
- Web access
- Marketing campaigns
- Search engine indexing

---

## 2. Core User Flows

### 2.1 User Onboarding & Registration

#### Happy Path

1. **Splash Screen**
   - UI: App logo, loading indicator
   - System checks authentication state

2. **Demo Mode Prompt**
   - UI: "Skip onboarding (Demo Mode)" button
   - Action: User selects Demo Mode
   - System: Bypasses onboarding and navigates directly to Main Tab Screen

3. **Login Screen (Non-Demo Users)**
   - UI: Google Sign-In button
   - User taps "Sign in with Google"

4. **Permissions Screen**
   - UI: Camera, microphone, notification permission prompts
   - User grants required permissions

5. **Skill Level Selection**
   - UI: Beginner / Intermediate / Experienced
   - User selects level

6. **Initial Recipe Setup**
   - UI: "Tell us 5 dishes you'd like to learn"
   - User provides 5 dish names (e.g., "Chicken Biryani", "Maggi")
   - System fetches/generates recipes from RecipeDB/FlavorDB/AI
   - Loading indicator while recipes are prepared

7. **Main Tab Screen**
   - Tabs: "Cook a Dish" | "Analyze Failed Dish"
   - Success criteria: User reaches desired primary flow with recipes ready

#### Error States
- Permission denied → Show explanation and retry option
- Login failure → Show error message and retry

#### Edge Cases
- User closes app during onboarding → Resume from last step
- Session timeout during login → Restart login flow

---

### 2.2 Cook a Dish Flow (Primary Tab)

#### Happy Path

1. **Cook a Dish Tab**
   - UI: Recipe list (5 supported recipes)
   - Action: User selects recipe

2. **Recipe Overview Screen**
   - UI: Ingredients, estimated time, difficulty
   - Action: User taps "Start Cooking"

3. **Camera Setup Screen**
   - UI: Camera preview, placement instructions
   - Validation: Camera must detect cooking area

4. **Live Cooking Screen**
   - UI: Minimal controls, mandatory voice guidance active
   - System:
     - Fetches steps from RecipeDB
     - Monitors visual cooking cues at step boundaries
     - Provides voice guidance and mistake prevention

5. **Cooking Completion Screen**
   - UI: Completion confirmation
   - Action: User marks dish as completed

6. **Post-Cook Summary Screen**
   - UI: Cooking summary with option to switch to Failure Analysis tab

#### Error States
- Camera feed lost → Prompt user to reposition device
- Inference delay → Fallback to static step guidance

#### Edge Cases
- User pauses cooking → Resume from last completed step
- User skips step → Show warning and allow continuation

---

### 2.3 Analyze Failed Dish Flow (Secondary Tab)

#### Trigger Behavior
- Accessible directly from Main Tab Screen
- Can be used independently without cooking flow

#### Happy Path

1. **Analyze Failed Dish Tab**
   - UI: Upload instructions and examples
   - Action: User uploads photo/video of failed dish

2. **Context Input Screen**
   - UI: Short questions (heat level, timing, ingredient changes)
   - Action: User submits context

3. **Analysis Processing Screen**
   - UI: Loading indicator

4. **Diagnosis Result Screen**
   - UI:
     - Identified root cause
     - Simple explanation
     - Suggested correction for next attempt

5. **Profile Update**
   - System updates personal cooking profile

#### Error States
- Upload failure → Retry option
- Unsupported media → Show format guidance

#### Edge Cases
- User uploads multiple images → Analyze most recent
- User exits mid-analysis → Resume on return

---

### 2.2 Guided Cooking Flow (Main Feature)

#### Happy Path

1. **Home Screen**
   - UI: List of 5 supported recipes
   - Action: User selects a recipe

2. **Recipe Overview Screen**
   - UI: Ingredients, estimated time, difficulty
   - Action: User taps "Start Cooking"

3. **Camera Setup Screen**
   - UI: Camera preview, placement instructions
   - Validation: Camera must detect cooking area

4. **Live Cooking Screen**
   - UI: Minimal controls, voice prompts active
   - System:
     - Fetches steps from RecipeDB
     - Monitors visual cooking cues at step boundaries
     - Provides voice guidance and warnings

5. **Cooking Completion Screen**
   - UI: Completion confirmation
   - Action: User marks dish as completed

6. **Post-Cook Feedback Screen**
   - UI: Success confirmation or failure upload option

#### Error States
- Camera feed lost → Prompt user to reposition device
- Inference delay → Fallback to static step guidance

#### Edge Cases
- User pauses cooking → Resume from last completed step
- User skips step → Show warning and allow continuation

---

### 2.3 Failure Diagnosis Flow

#### Trigger Behavior
- Failure diagnosis is **optional** and presented as the **next tab** after cooking completion
- User explicitly chooses whether to analyze a failed dish

#### Happy Path

1. **Post-Cook Tabs Screen**
   - Tabs: "Summary" | "Failure Analysis"
   - Action: User selects "Failure Analysis" tab

2. **Failure Upload Screen**
   - UI: Upload photo/video, short context questions
   - Action: User submits failure

3. **Analysis Processing Screen**
   - UI: Loading indicator, explanation message

4. **Diagnosis Result Screen**
   - UI:
     - Identified root cause
     - Simple explanation
     - Suggested correction for next attempt

5. **Profile Update**
   - System updates personal cooking profile

#### Error States
- Upload failure → Retry option
- Unsupported media → Show format guidance

#### Edge Cases
- User skips analysis → Return to Home Screen
- Multiple failures → Analyze most recent submission

---

### 2.4 Account Management Flow

#### Happy Path

1. **Profile Screen**
   - UI: Skill level, cooking history
   - Actions: View profile, logout

2. **Logout**
   - System clears session and returns to login

#### Error States
- Session expired → Redirect to login

---

## 3. Navigation Map

- Splash Screen (Public)
  - Login Screen (Public)
    - Permissions Screen (Public)
      - Skill Level Selection (Authenticated)
        - Home Screen (Authenticated)
          - Recipe Overview (Authenticated)
            - Live Cooking Screen (Authenticated)
          - Failure Diagnosis (Authenticated)
          - Profile Screen (Authenticated)

---

## 4. Screen Inventory

### Splash Screen
- Access: Public
- Purpose: App initialization
- Actions: Auto-redirect

### Login Screen
- Access: Public
- Purpose: Authentication
- Actions: Google Sign-In

### Home Screen
- Access: Authenticated / Demo Mode
- Purpose: Recipe selection
- Actions: Select recipe, open profile

### Live Cooking Screen
- Access: Authenticated / Demo Mode
- Purpose: Core guidance
- Actions: Voice commands, pause/resume

### Failure Diagnosis Screen
- Access: Authenticated / Demo Mode
- Purpose: Analyze failed dishes
- Actions: Upload, submit

### Profile Screen
- Access: Authenticated / Demo Mode
- Purpose: View cooking history and habits
- Actions: View stats, logout

---

## 5. Decision Points

```
IF user is not authenticated
THEN redirect to Login Screen
ELSE allow access to Home Screen

IF camera permission denied
THEN show permission explanation
ELSE start camera preview

IF visual cues unavailable
THEN fallback to static guidance
ELSE provide live guidance
```

---

## 6. Error Handling

### Network & Connectivity
- **Network Offline (During Onboarding)**: Show error, cannot proceed without initial recipe setup
- **Network Offline (During Cooking)**: 
  - If recipe cached → Continue with basic navigation (next/previous/timers)
  - AI features disabled → Show "Offline mode" indicator
  - Queue AI questions → Sync when reconnected
- **Network Reconnected**: Auto-sync queued questions, restore AI features

### AI Service Errors
- **Gemini API Failure**: Automatic fallback to Groq API
- **Both AI Services Down**: Use cached responses, show degraded mode warning
- **AI Response Timeout**: Show "Taking longer than expected", extend timeout to 5s max
- **AI Rate Limit Hit**: Queue request, retry after delay, inform user

### Voice Errors
- **Voice Recognition Failed**: Show "Didn't catch that, please try again" message
- **Microphone Permission Denied**: Disable voice features, show manual controls
- **TTS Failure**: Fall back to text-only display
- **STT Failure**: Allow manual text input as alternative

### Camera/Photo Errors
- **Camera Permission Denied**: Disable photo upload, allow text description
- **Camera Feed Lost**: Prompt user to reposition device
- **Photo Upload Failed**: Retry option with error message
- **File Too Large**: Compress and retry, or show size limit message

### General Errors
- **404 / Screen Not Found**: Redirect to Home Screen
- **500 / System Error**: Show retry message with support contact
- **Permission Denied**: Explain requirement and provide retry option
- **Form Validation Errors**: Inline messages with correction guidance
- **Session Expired**: Redirect to login with session timeout message

---

## 7. Responsive Behavior

- **Mobile:** Primary platform, full functionality
- **Tablet:** Larger previews, same flow
- **Desktop:** Out of scope

---

## 8. Animations & Transitions

- Screen transitions: 300ms fade
- Loading indicators during analysis
- Subtle success confirmation animation after completion

---

