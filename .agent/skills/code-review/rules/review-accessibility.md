---
title: Accessibility Scrutiny
impact: HIGH
impactDescription: Ensures the application is usable by all users, including those with disabilities.
tags: accessibility, a11y, code-review
---

## Accessibility Scrutiny

Verify that interactive elements are accessible. Missing accessibility leads to a poor experience for keyboard and screen-reader users, and may violate legal requirements.

### What to Check

1. **Semantic HTML**: Are `<button>`, `<a>`, `<nav>`, `<main>`, `<header>` used instead of generic `<div>` with click handlers?
2. **ARIA attributes**: Do custom components have appropriate `aria-label`, `aria-describedby`, `role`, etc.?
3. **Keyboard navigation**: Can all interactive elements be reached and activated using Tab, Enter, and Escape?
4. **Focus management**: After modals/dialogs close, does focus return to the trigger element?
5. **Color contrast**: Do text and backgrounds meet WCAG AA contrast ratios?
6. **Alt text**: Do images have meaningful `alt` attributes (or `alt=""` for decorative images)?

**Incorrect Finding:**

> **Finding**: Add an aria-label here.

**Correct Finding (Standardized):**

> **📍 Location**: `src/features/dashboard/components/action-button.tsx:L23`
> **Finding**: 🟡 Icon-only button has no accessible label. Screen readers will announce it as "button" with no context.
> **Suggested Improvement**: Add `aria-label="Delete item"` to the `<Button>` component.
> **Rationale**: Ensures screen reader users understand the button's purpose. See WCAG 2.1 SC 1.1.1.
