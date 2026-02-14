# ChefMentor X – Frontend Design System

---

## App Context

- **Style:** Modern · Minimal · Professional (calm, instructional, non-distracting)
- **Brand Personality:** Trustworthy, supportive, mentor-like, calm under pressure
- **Target Audience:** Students, beginner–intermediate home cooks, busy professionals using the app hands-free while cooking
- **Design Priority:** Clarity first → then speed → then aesthetics

---

## 1. Design Principles

1. **Clarity Over Decoration**  
   Every screen must be understandable at a glance, especially during cooking.

2. **Low Cognitive Load**  
   Minimal text, clear hierarchy, voice-first interaction.

3. **Consistency**  
   Same colors, spacing, and components across both tabs (Cook / Analyze).

4. **Accessibility by Default**  
   High contrast, large touch targets, readable typography.

5. **Fail-Safe UX**  
   Always guide the user even if something goes wrong (camera, network, AI).

---

## 2. Design Tokens

### 2.1 Color Palette

#### Primary (Mentor Blue – Trust & Guidance)
```css
--primary-50:  #eef4ff;
--primary-100: #dbe7ff;
--primary-200: #bcd4ff;
--primary-300: #8fb8ff;
--primary-400: #5c94ff;
--primary-500: #2f6fff;
--primary-600: #1f56e0;
--primary-700: #1943b8;
--primary-800: #183a8f;
--primary-900: #162f6b;
```

#### Accent (Fresh Green – Success & Improvement)
```css
--accent-50:  #ecfdf5;
--accent-100: #d1fae5;
--accent-200: #a7f3d0;
--accent-300: #6ee7b7;
--accent-400: #34d399;
--accent-500: #10b981;
--accent-600: #059669;
--accent-700: #047857;
--accent-800: #065f46;
--accent-900: #064e3b;
```

**Usage:**
- Blue → primary actions, navigation, guidance
- Green → success states, improvements, learning indicators

---

#### Neutral (Kitchen Calm)
```css
--neutral-50:  #fafafa;
--neutral-100: #f4f4f5;
--neutral-200: #e4e4e7;
--neutral-300: #d4d4d8;
--neutral-400: #a1a1aa;
--neutral-500: #71717a;
--neutral-600: #52525b;
--neutral-700: #3f3f46;
--neutral-800: #27272a;
--neutral-900: #18181b;
```

**Usage:** Backgrounds, text, borders

---

#### Semantic Colors
```css
--success: #16a34a;
--warning: #f59e0b;
--error:   #dc2626;
--info:    #0284c7;
```

**Usage:** Feedback, alerts, cooking state warnings

---

### 2.2 Typography

- **Primary Font:** Inter (sans-serif)
- **Monospace:** JetBrains Mono (logs/debug only)

#### Font Sizes
```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-2xl: 1.5rem;   /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem;  /* 36px */
```

#### Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

### 2.3 Spacing Scale
```css
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

---

### 2.4 Border Radius
```css
--radius-none: 0;
--radius-sm: 0.25rem;
--radius-base: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-full: 9999px;
```

---

### 2.5 Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-base: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.15);
```

---

## 3. Layout System

### Grid
- **Container max-width:** 1280px
- **Columns:** 12
- **Gutter:** 16px

### Breakpoints
```css
sm: 640px;
md: 768px;
lg: 1024px;
xl: 1280px;
```

---

## 4. Component Library (Core)

### Buttons

Variants: Primary, Secondary, Outline, Danger

```jsx
<button className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50">Primary</button>
```

Accessibility:
- Focus ring mandatory
- Disabled state visible

---

### Input Fields

```jsx
<input className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-400" />
```

States: default, focus, error, disabled

---

### Cards

```jsx
<div className="bg-white rounded-lg shadow-md p-4">...</div>
```

Used for recipes, diagnosis results

---

### Alerts / Toasts

```jsx
<div className="bg-warning text-white p-3 rounded-md">Heat too high</div>
```

---

### Navigation (Tabs)

- Bottom tab navigation (mobile)
- Tabs: Cook a Dish | Analyze Failed Dish

---

## 5. Accessibility Guidelines

- WCAG 2.1 AA target
- Contrast ratio ≥ 4.5:1
- Touch targets ≥ 44px
- Full keyboard navigation
- Visible focus outline (2px)

---

## 6. Animation Guidelines

- **Style:** Minimal (professional, non-distracting)
- Duration: 150–200ms
- Easing: ease-in-out
- Animate only opacity and transform
- Avoid complex motion during cooking
- Respect prefers-reduced-motion

---

## 7. Icon System

- **Library:** Lucide React
- Sizes: 16px, 20px, 24px
- Stroke width: 1.5

---

## 8. State Indicators

- Loading: Spinner, skeleton
- Empty: Icon + message + CTA
- Error: Red alert card
- Success: Green confirmation

---

## 9. Responsive Design

- Mobile-first
- Large text during cooking
- Bottom navigation preferred

---

