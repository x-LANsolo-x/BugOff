# 🧪 ChefMentor X - Complete Visual Testing Guide

## 📋 Table of Contents
1. [Pre-Testing Setup](#pre-testing-setup)
2. [Backend Testing](#backend-testing)
3. [Frontend Testing](#frontend-testing)
4. [Feature-by-Feature Testing](#feature-by-feature-testing)
5. [Integration Testing](#integration-testing)
6. [Performance Testing](#performance-testing)
7. [Bug Reporting](#bug-reporting)

---

## 🛠️ Pre-Testing Setup

### Step 1: Backend Setup (5 minutes)

```powershell
# Navigate to backend directory
cd backend

# Activate virtual environment (if you have one)
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Or create new one:
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env.development

# Edit .env.development with your API keys:
# - GROQ_API_KEY=your_key_here
# - GEMINI_API_KEY=your_key_here
# - RECIPE_DB_API_KEY=your_key_here

# Initialize database
alembic upgrade head

# Seed database with test data
python seed_recipes.py

# Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**✅ Backend Health Check:**
- Open browser: http://localhost:8000/docs
- You should see FastAPI Swagger documentation
- Check: http://localhost:8000/health (should return `{"status": "healthy"}`)

---

### Step 2: Frontend Setup (5 minutes)

```powershell
# Open NEW terminal/PowerShell window
cd frontend-v1

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

**✅ Frontend Health Check:**
- Expo Dev Tools should open in browser
- You should see QR code
- Options: Press `w` for web, `a` for Android, `i` for iOS

---

## 🎯 Feature-by-Feature Testing Checklist

### 1️⃣ **Authentication Flow** (10 minutes)

#### Test 1.1: Splash Screen
- [ ] **What to test:** App launch animation
- [ ] **How:** Open the app
- [ ] **Expected:** 
  - ChefMentor X logo appears
  - Smooth fade-in animation
  - Auto-navigates to Login after 2 seconds
- [ ] **Screenshot:** Take screenshot of splash screen

#### Test 1.2: Login Screen
- [ ] **What to test:** User login functionality
- [ ] **How:**
  1. Enter email: `test@example.com`
  2. Enter password: `password123`
  3. Tap "Login" button
- [ ] **Expected:**
  - Form validation works
  - Loading spinner appears
  - Success: Navigate to main app
  - Error: Show error message
- [ ] **Edge Cases:**
  - Try invalid email format
  - Try wrong password
  - Try empty fields
- [ ] **Screenshot:** Login screen, error states

#### Test 1.3: Registration
- [ ] **What to test:** New user registration
- [ ] **How:**
  1. Tap "Sign Up" link
  2. Fill in all fields (name, email, password)
  3. Submit form
- [ ] **Expected:**
  - All fields validate correctly
  - Password strength indicator works
  - Account created successfully
  - Auto-login after registration

---

### 2️⃣ **Onboarding Flow** (5 minutes)

#### Test 2.1: Skill Level Selection
- [ ] **What to test:** User skill assessment
- [ ] **How:**
  1. Complete login/registration
  2. Select skill level: Beginner/Intermediate/Expert
- [ ] **Expected:**
  - Three options clearly visible
  - Selection highlights properly
  - Can proceed to next step
- [ ] **Screenshot:** Skill level screen

#### Test 2.2: Permissions Request
- [ ] **What to test:** Camera & microphone permissions
- [ ] **How:**
  1. After skill selection
  2. Review permission requests
  3. Grant/deny permissions
- [ ] **Expected:**
  - Clear explanation of why permissions needed
  - Camera permission for failure analysis
  - Microphone for voice commands
  - App handles denial gracefully
- [ ] **Screenshot:** Permission screens

---

### 3️⃣ **Cook Tab - Recipe List** (10 minutes)

#### Test 3.1: Browse Recipes
- [ ] **What to test:** Recipe browsing
- [ ] **How:**
  1. Navigate to Cook tab
  2. Scroll through recipe list
- [ ] **Expected:**
  - Recipes load from database
  - Images display correctly
  - Recipe cards show: title, cuisine, difficulty, time
  - Smooth scrolling
  - Pull-to-refresh works
- [ ] **Screenshot:** Recipe list view

#### Test 3.2: Search Recipes
- [ ] **What to test:** Recipe search functionality
- [ ] **How:**
  1. Tap search bar
  2. Enter: "chicken"
  3. View results
- [ ] **Expected:**
  - Search bar responsive
  - Results filter in real-time
  - Relevant recipes shown
  - Clear search button works
- [ ] **Screenshot:** Search results

#### Test 3.3: Filter Recipes
- [ ] **What to test:** Recipe filtering
- [ ] **How:**
  1. Tap filter icon
  2. Select cuisine type (e.g., Italian)
  3. Select difficulty (e.g., Easy)
  4. Apply filters
- [ ] **Expected:**
  - Filter modal opens
  - Multiple filters can be selected
  - Results update when applied
  - Can clear all filters
- [ ] **Screenshot:** Filter modal, filtered results

---

### 4️⃣ **Cook Tab - Recipe Details** (10 minutes)

#### Test 4.1: View Recipe Details
- [ ] **What to test:** Recipe detail screen
- [ ] **How:**
  1. Tap any recipe card
  2. Review all sections
- [ ] **Expected:**
  - Recipe image loads
  - Title, description visible
  - Ingredients list complete
  - Step-by-step instructions
  - Prep time, cook time, servings
  - Difficulty level
- [ ] **Screenshot:** Recipe detail screen (scroll to capture all)

#### Test 4.2: Start Cooking Session
- [ ] **What to test:** Begin cooking
- [ ] **How:**
  1. In recipe details
  2. Tap "Start Cooking" button
- [ ] **Expected:**
  - Confirmation dialog appears
  - Navigates to Live Cooking screen
  - Session starts properly
- [ ] **Screenshot:** Start cooking confirmation

---

### 5️⃣ **Cook Tab - Live Cooking** (15 minutes) ⭐ CRITICAL

#### Test 5.1: Step Navigation
- [ ] **What to test:** Navigate through cooking steps
- [ ] **How:**
  1. Start a recipe
  2. Tap "Next Step" button
  3. Tap "Previous Step" button
- [ ] **Expected:**
  - Current step highlights
  - Step counter updates (e.g., "Step 2/10")
  - Instruction text changes
  - Progress bar updates
  - Smooth transitions
- [ ] **Screenshot:** Different cooking steps

#### Test 5.2: Voice Commands 🎤
- [ ] **What to test:** Voice interaction
- [ ] **How:**
  1. Tap microphone button
  2. Say: "Next step"
  3. Say: "Previous step"
  4. Say: "Repeat"
  5. Say: "Set timer 5 minutes"
  6. Say: "Pause"
- [ ] **Expected:**
  - Mic button shows listening state (pulsing animation)
  - Voice transcribed correctly
  - Commands executed properly
  - Voice feedback confirms action
  - "Next step" → advances to next instruction
  - "Repeat" → re-reads current step
  - "Timer" → starts countdown
  - "Pause" → pauses session
- [ ] **Screenshot:** Voice button active state

#### Test 5.3: AI Mentor Tips
- [ ] **What to test:** Contextual AI assistance
- [ ] **How:**
  1. During cooking, tap "Ask AI" button
  2. Read AI tip for current step
- [ ] **Expected:**
  - Tip appears relevant to current step
  - Professional cooking advice
  - Can hide/show tip
  - Multiple tips can be requested
- [ ] **Screenshot:** AI tip displayed

#### Test 5.4: Timer Functionality
- [ ] **What to test:** Built-in cooking timer
- [ ] **How:**
  1. In a step with timer
  2. Start timer
  3. Let it count down
  4. Test pause/resume
- [ ] **Expected:**
  - Timer displays clearly
  - Countdown accurate
  - Notification when complete
  - Can pause/resume
  - Can cancel timer
- [ ] **Screenshot:** Active timer

#### Test 5.5: Session Pause/Resume
- [ ] **What to test:** Pause cooking session
- [ ] **How:**
  1. Tap pause button
  2. Review pause screen
  3. Tap resume
- [ ] **Expected:**
  - Pause overlay appears
  - Session state preserved
  - Resume returns to exact step
  - Timer pauses if active
- [ ] **Screenshot:** Pause screen

#### Test 5.6: Complete Session
- [ ] **What to test:** Finish cooking
- [ ] **How:**
  1. Navigate to last step
  2. Tap "Complete" or "Finish"
- [ ] **Expected:**
  - Completion screen appears
  - Congratulations message
  - Option to rate recipe
  - Option to save session
  - Navigate back to recipe list
- [ ] **Screenshot:** Completion screen

---

### 6️⃣ **Analyze Tab - Failure Analysis** (15 minutes) ⭐ CRITICAL

#### Test 6.1: Take Photo
- [ ] **What to test:** Camera capture
- [ ] **How:**
  1. Navigate to Analyze tab
  2. Tap "Take Photo" button
  3. Grant camera permission (if needed)
  4. Take photo of any dish/food
- [ ] **Expected:**
  - Camera opens properly
  - Can capture photo
  - Photo preview shows
  - Can retake photo
  - Can proceed with photo
- [ ] **Screenshot:** Camera interface, photo preview

#### Test 6.2: Upload Photo
- [ ] **What to test:** Gallery upload
- [ ] **How:**
  1. In Analyze tab
  2. Tap "Upload Photo" button
  3. Select image from gallery
- [ ] **Expected:**
  - Gallery opens
  - Can select image
  - Image preview loads
  - Can change image
  - Can proceed
- [ ] **Screenshot:** Upload interface

#### Test 6.3: Context Questions
- [ ] **What to test:** Additional context gathering
- [ ] **How:**
  1. After photo capture/upload
  2. Answer context questions:
     - What dish were you making?
     - What went wrong?
     - Heat level used?
     - Any modifications?
- [ ] **Expected:**
  - Questions display clearly
  - Can select multiple options
  - Text input works for custom answers
  - Can skip optional questions
  - Can go back to edit
- [ ] **Screenshot:** Context questions screen

#### Test 6.4: AI Vision Analysis
- [ ] **What to test:** Computer vision failure detection
- [ ] **How:**
  1. Submit photo + context
  2. Wait for analysis (loading screen)
  3. View results
- [ ] **Expected:**
  - Loading screen with progress indicator
  - Analysis completes in ~10-30 seconds
  - Results screen shows:
    - Root cause of failure
    - Severity level (Minor/Moderate/Major)
    - Detailed explanation
    - Visual indicators
    - Confidence score
- [ ] **Screenshot:** Loading screen, analysis results

#### Test 6.5: Diagnosis Results
- [ ] **What to test:** Failure diagnosis display
- [ ] **How:**
  1. Review diagnosis screen
  2. Read all sections
- [ ] **Expected:**
  - Root cause clearly stated
  - Severity badge displayed (color-coded)
  - "What went wrong" explanation
  - "How to fix" tips (3-5 tips)
  - Science behind it (optional section)
  - Can save for later
  - Can try again with new photo
- [ ] **Screenshot:** Full diagnosis screen

#### Test 6.6: Save Analysis
- [ ] **What to test:** Save diagnosis to history
- [ ] **How:**
  1. In diagnosis results
  2. Tap "Save to History" button
- [ ] **Expected:**
  - Confirmation message
  - Analysis saved to profile
  - Can view in history later
- [ ] **Screenshot:** Save confirmation

---

### 7️⃣ **Profile & Settings** (10 minutes)

#### Test 7.1: User Profile
- [ ] **What to test:** Profile screen
- [ ] **How:**
  1. Navigate to Profile tab/screen
  2. View profile information
- [ ] **Expected:**
  - User name, email displayed
  - Profile picture (if set)
  - Skill level shown
  - Account creation date
  - Can edit profile
- [ ] **Screenshot:** Profile screen

#### Test 7.2: Cooking History
- [ ] **What to test:** Past cooking sessions
- [ ] **How:**
  1. Navigate to Cooking History
  2. Review past sessions
- [ ] **Expected:**
  - List of completed sessions
  - Recipe names, dates
  - Session duration
  - Can view session details
  - Can delete sessions
- [ ] **Screenshot:** Cooking history list

#### Test 7.3: Analysis History
- [ ] **What to test:** Past failure analyses
- [ ] **How:**
  1. Navigate to Analysis History
  2. View past diagnoses
- [ ] **Expected:**
  - List of analyzed failures
  - Thumbnails of photos
  - Root causes visible
  - Can tap to view full analysis
  - Can delete entries
- [ ] **Screenshot:** Analysis history

#### Test 7.4: Settings
- [ ] **What to test:** App settings
- [ ] **How:**
  1. Navigate to Settings
  2. Toggle various options
- [ ] **Expected:**
  - Voice settings:
    - Enable/disable voice commands
    - Voice speed control
    - Auto-read steps toggle
  - Notification settings
  - Theme/appearance (if available)
  - Units (metric/imperial)
  - Language preferences
  - About section (version info)
- [ ] **Screenshot:** Settings screen

#### Test 7.5: Logout
- [ ] **What to test:** User logout
- [ ] **How:**
  1. In Profile/Settings
  2. Tap "Logout" button
- [ ] **Expected:**
  - Confirmation dialog
  - Logs out successfully
  - Returns to Login screen
  - Session cleared
  - Can log back in
- [ ] **Screenshot:** Logout confirmation

---

## 🔗 Integration Testing (20 minutes)

### End-to-End Test 1: Complete Cooking Journey
**Time: ~10 minutes**

1. [ ] Launch app
2. [ ] Login with account
3. [ ] Browse recipes
4. [ ] Select "Chicken Parmesan" (or any recipe)
5. [ ] Start cooking session
6. [ ] Use voice command: "Next step" (2-3 times)
7. [ ] Tap "Ask AI" for a tip
8. [ ] Set a timer using voice: "Set timer 2 minutes"
9. [ ] Pause session
10. [ ] Resume session
11. [ ] Complete all steps
12. [ ] Rate recipe
13. [ ] Check cooking history

**Expected:** Entire flow works seamlessly without crashes or errors

---

### End-to-End Test 2: Complete Failure Analysis Journey
**Time: ~10 minutes**

1. [ ] Navigate to Analyze tab
2. [ ] Take photo OR upload image
3. [ ] Fill out context questions:
   - Dish: "Chocolate Cake"
   - Issue: "Burned on top, raw inside"
   - Heat: "High"
   - Modifications: "Used honey instead of sugar"
4. [ ] Submit for analysis
5. [ ] Wait for results
6. [ ] Review diagnosis
7. [ ] Save to history
8. [ ] Navigate to Analysis History
9. [ ] Open saved analysis

**Expected:** Complete analysis flow works end-to-end

---

## ⚡ Performance Testing (15 minutes)

### Test 1: App Launch Time
- [ ] **How:** Close app completely, reopen
- [ ] **Expected:** Launches in < 3 seconds
- [ ] **Record:** Actual time: _____

### Test 2: Recipe List Loading
- [ ] **How:** Navigate to recipe list with 50+ recipes
- [ ] **Expected:** 
  - Initial load < 2 seconds
  - Smooth scrolling (60 FPS)
  - Images lazy load
- [ ] **Record:** Load time: _____

### Test 3: Live Cooking Responsiveness
- [ ] **How:** Rapidly tap "Next" button 10 times
- [ ] **Expected:**
  - No lag or freeze
  - Each step transitions smoothly
  - UI remains responsive
- [ ] **Record:** Any issues? _____

### Test 4: Voice Recognition Speed
- [ ] **How:** Say "Next step" 5 times consecutively
- [ ] **Expected:**
  - Recognition < 1 second each time
  - Commands execute immediately
  - No missed commands
- [ ] **Record:** Success rate: ___/5

### Test 5: AI Analysis Speed
- [ ] **How:** Submit 3 different photos for analysis
- [ ] **Expected:**
  - Each completes in < 30 seconds
  - Loading indicator shows progress
  - Results accurate
- [ ] **Record:** 
  - Photo 1: ____ seconds
  - Photo 2: ____ seconds
  - Photo 3: ____ seconds

### Test 6: Memory Usage
- [ ] **How:** Use app for 30 minutes continuously
- [ ] **Expected:**
  - No significant slowdown
  - No memory leaks
  - App doesn't crash
- [ ] **Record:** Any issues? _____

---

## 📱 Device-Specific Testing

### iOS Testing (if available)
- [ ] iPhone SE (small screen)
- [ ] iPhone 12/13 (standard)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] iPad (tablet layout)

### Android Testing (if available)
- [ ] Small screen (< 5.5")
- [ ] Medium screen (5.5" - 6.5")
- [ ] Large screen (> 6.5")
- [ ] Tablet

### Web Testing
- [ ] Chrome browser
- [ ] Safari browser
- [ ] Firefox browser
- [ ] Mobile web view

---

## 🐛 Bug Reporting Template

When you find a bug, document it:

```markdown
### Bug Report #___

**Date:** YYYY-MM-DD
**Feature:** [e.g., Voice Commands]
**Severity:** [Critical / High / Medium / Low]

**Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Step one
2. Step two
3. Step three

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happened

**Screenshots:**
[Attach screenshots]

**Device Info:**
- Device: [e.g., iPhone 13]
- OS: [e.g., iOS 16.1]
- App Version: [e.g., 1.0.0]
- Browser (if web): [e.g., Chrome 110]

**Additional Notes:**
Any other relevant information
```

---

## ✅ Testing Completion Checklist

### Must Test (Critical Features)
- [ ] User login/registration
- [ ] Recipe browsing and search
- [ ] Live cooking step navigation
- [ ] Voice commands (all 7 commands)
- [ ] AI mentor tips
- [ ] Camera capture for analysis
- [ ] AI failure diagnosis
- [ ] Context questions
- [ ] Session history
- [ ] Settings and preferences

### Should Test (Important Features)
- [ ] Recipe filters
- [ ] Timer functionality
- [ ] Pause/resume session
- [ ] Save to favorites
- [ ] Profile editing
- [ ] Logout/login flow
- [ ] Onboarding flow
- [ ] Permission requests

### Nice to Test (Secondary Features)
- [ ] Pull-to-refresh
- [ ] Dark mode (if available)
- [ ] Offline mode
- [ ] Error handling
- [ ] Network issues
- [ ] Low battery scenarios

---

## 🎬 Quick Start: 5-Minute Smoke Test

If you have limited time, run this quick smoke test:

1. **Launch App** (30 sec)
   - Open app, check splash screen

2. **Login** (1 min)
   - Login with test credentials
   - Verify navigation to main screen

3. **Browse Recipe** (1 min)
   - View recipe list
   - Open one recipe
   - Check details load

4. **Start Cooking** (2 min)
   - Start a cooking session
   - Try "Next step" voice command
   - Check timer works

5. **Analyze Feature** (30 sec)
   - Navigate to Analyze tab
   - Take/upload photo
   - Verify camera works

**Expected:** All 5 tests pass without crashes = Basic functionality working ✅

---

## 📊 Test Results Summary Template

```markdown
# ChefMentor X - Test Results

**Test Date:** YYYY-MM-DD
**Tester:** Your Name
**Version:** 1.0.0
**Platform:** iOS / Android / Web

## Summary
- Total Tests: ___
- Passed: ✅ ___
- Failed: ❌ ___
- Skipped: ⏭️ ___
- Success Rate: ___%

## Critical Bugs Found
1. [List critical bugs]

## Non-Critical Issues
1. [List minor issues]

## Performance Metrics
- App Launch: ___ seconds
- Recipe Load: ___ seconds
- AI Analysis: ___ seconds

## Overall Assessment
[Good / Needs Improvement / Critical Issues]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]
```

---

## 🎯 Next Steps After Testing

1. **Document all bugs** using the bug report template
2. **Prioritize fixes**:
   - P0: Critical (app crashes, data loss)
   - P1: High (major features broken)
   - P2: Medium (minor features, UX issues)
   - P3: Low (cosmetic, nice-to-have)
3. **Create GitHub issues** for each bug
4. **Fix and retest**
5. **Prepare for beta release**

---

## 💡 Testing Tips

1. **Take Screenshots:** Document everything visually
2. **Test Edge Cases:** Try unusual inputs, slow networks
3. **Test Different Times:** Test during peak API usage hours
4. **Use Real Data:** Test with actual recipes and images
5. **Multiple Devices:** Test on various screen sizes
6. **Clear Cache:** Restart fresh between major test sessions
7. **Note Performance:** Pay attention to speed and smoothness
8. **Check Accessibility:** Test with screen readers if possible

---

**Happy Testing! 🚀**

If you find any issues, don't worry - that's what testing is for! Document everything and we'll fix it together.
