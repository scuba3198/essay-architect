# Mobile Responsive Design
**Date:** 2025-01-16
**Status:** Approved

## Overview

Transform Essay Architect from a desktop-focused app to a fluid, frictionless mobile experience. The core challenge is the side-by-side wizard/preview layout and crowded fixed header.

## Key Changes

### 1. Mobile Header (< 768px)

**Desktop:** Unchanged - full header with logo, tabs, timer, "Go Pro" button

**Mobile:**
- Slim bar (~60px) containing only:
  - "E" logo (left) - tap to toggle expandable menu
  - Current view title (center) - "The Guide" or "The Wizard"
  - Timer (right) - simplified, tap to expand controls
- Logo tap reveals slide-down menu with: tabs, full timer controls, "Go Pro" CTA
- Header NOT `sticky` on mobile - scrolls away with content
- Add backdrop overlay when menu is open, tap to dismiss

### 2. Toggle Layout (Wizard ↔ Preview)

**Desktop:** Side-by-side unchanged - Wizard (3/5) | Preview (2/5)

**Mobile (< 768px):**
- Bottom Tab Bar (fixed, ~64px tall) with two tabs:
  - "Write" - StepWizard, topic prompt, vocabulary pills
  - "Preview" - live essay with word count
- Active tab has solid indicator, content fills remaining height
- Tab bar sits above footer

**State:**
- `mobileView: 'write' | 'preview'`
- Defaults to `'write'` when entering practice mode
- Auto-switch to `'preview'` when user completes final step
- Lock to `'write'` when textarea is focused

### 3. Tour Tooltips - Mobile Adaptations

- Responsive width: `w-64` (tablet), `w-[calc(100vw-2rem)]` (mobile)
- Position prefers `bottom` or `top` over side positions
- Connector line adjusts length based on available space
- Step 0 repoints to bottom tab bar instead of header tabs
- Add mobile preference: "Don't show tour on mobile" in localStorage

### 4. Touch Targets

- Minimum 44px height for all interactive elements
- Vocabulary pills: increase tap area, replace `hover:` with `active:` scale effect
- Step nav: duplicate at bottom of wizard card for thumb-friendly access
- "New Prompt" button: full-width below topic box on mobile
- Preview footer buttons: stack vertically instead of side-by-side

### 5. Transitions

- Tab switch: Fade + slide (200ms)
- Preserve scroll position per tab
- Header menu: Slide down with spring easing, backdrop overlay
- Swipe down gesture to close menu

### 6. Keyboard Handling

**When virtual keyboard detected:**
- Use `window.visualViewport` API (with resize fallback)
- Add `.keyboard-open` class to body
- Hide bottom tab bar while typing
- Restore tab bar when keyboard dismissed

**CSS:**
```css
.keyboard-open .mobile-tab-bar { display: none; }
```

## New State

```javascript
mobileView: 'write' | 'preview'  // Active mobile tab
isMobileMenuOpen: boolean         // Header menu state
isKeyboardOpen: boolean           // Virtual keyboard state
```

## Component Changes

| Component | Changes |
|-----------|---------|
| `App.jsx` | Mobile menu, keyboard detection, conditional layouts |
| `StepWizard.jsx` | Bottom nav buttons, responsive touch targets |
| `PreviewSection.jsx` | Stack buttons vertically on mobile |
| `TourTooltip.jsx` | Responsive widths, mobile positioning |
| `index.css` | Mobile styles, animations, keyboard handling |

## Root Layout Change

The root div's `h-screen` and `overflow-hidden` become conditional:
- Desktop: `h-screen overflow-hidden` (current behavior)
- Mobile: `min-h-screen` with natural document scrolling
