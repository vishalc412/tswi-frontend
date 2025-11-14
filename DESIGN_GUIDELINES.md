# Banking-Professional Design Guidelines

This document outlines the design system and principles used in the MS EXIMP Hypothecation Management System.

## Design Philosophy

### Core Principles
1. **Trust First** - Every design decision prioritizes user trust and confidence
2. **Professional Clarity** - Clean, unambiguous interfaces
3. **Banking Standards** - Follows financial industry design conventions
4. **Accessibility** - WCAG compliant color contrasts and interactions
5. **No Over-Engineering** - Simple, maintainable code

---

## Color System

### Primary Colors - Navy
Professional, trustworthy navy blues for primary branding and navigation.

```css
bank-navy-50:  #f0f4f8  /* Lightest - backgrounds */
bank-navy-100: #d9e2ec  /* Light - subtle backgrounds */
bank-navy-200: #bcccdc  /* Borders */
bank-navy-300: #9fb3c8  /* Disabled states */
bank-navy-400: #829ab1
bank-navy-500: #627d98
bank-navy-600: #486581
bank-navy-700: #334e68  /* Text */
bank-navy-800: #243b53  /* Primary buttons */
bank-navy-900: #102a43  /* Headings */
bank-navy-950: #0a1929  /* Darkest - logo */
```

### Interactive Colors - Blue
Clean blues for interactive elements and focus states.

```css
bank-blue-50:  #e6f2ff  /* Focus backgrounds */
bank-blue-100: #bfdeff
bank-blue-500: #0080ff  /* Primary interactions */
bank-blue-600: #0066cc  /* Hover states */
```

### Neutral Colors - Slate
Professional grays for backgrounds, borders, and supporting text.

```css
bank-slate-50:  #f8fafc  /* Page background */
bank-slate-100: #f1f5f9  /* Card backgrounds */
bank-slate-200: #e2e8f0  /* Borders */
bank-slate-300: #cbd5e1  /* Input borders */
bank-slate-400: #94a3b8  /* Placeholder text */
bank-slate-500: #64748b  /* Secondary text */
bank-slate-600: #475569  /* Body text */
bank-slate-700: #334155
bank-slate-800: #1e293b
bank-slate-900: #0f172a  /* Darkest text */
```

### Status Colors
Standard status colors for alerts and notifications.

```css
Success: Green (#10b981)
Error:   Red (#ef4444)
Warning: Yellow (#f59e0b)
Info:    Blue (#3b82f6)
```

---

## Typography

### Font Stack
System fonts for maximum performance and native feel:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', Arial, sans-serif
```

### Font Sizes
```css
xs:   0.75rem  (12px)  /* Badges, captions */
sm:   0.875rem (14px)  /* Secondary text */
base: 1rem     (16px)  /* Body text */
lg:   1.125rem (18px)  /* Subheadings */
xl:   1.25rem  (20px)  /* Card titles */
2xl:  1.5rem   (24px)  /* Section titles */
3xl:  1.875rem (30px)
4xl:  2.25rem  (36px)  /* Page titles */
5xl:  3rem     (48px)
6xl:  3.75rem  (60px)  /* Hero titles */
```

### Font Weights
```css
regular:  400  /* Body text */
medium:   500  /* Secondary emphasis */
semibold: 600  /* Labels, buttons */
bold:     700  /* Headings, titles */
```

---

## Components

### Buttons

**Primary Button**
```tsx
className="bg-bank-navy-800 text-white hover:bg-bank-navy-900"
```
- Solid navy background
- White text
- Subtle shadow
- No gradients

**Secondary Button**
```tsx
className="border-2 border-bank-slate-300 bg-white text-bank-navy-800"
```
- White background with border
- Navy text
- Hover border darkens

**Button Sizes**
- sm: h-9 px-4
- default: h-11 px-6
- lg: h-12 px-8

### Cards

**Standard Card**
```tsx
className="rounded-lg border border-bank-slate-200 bg-white shadow-bank"
```
- Clean borders
- Subtle shadow
- White background
- Hover effect: shadow-bank-lg

**Card Header**
- Bottom border for separation
- Padding: p-6
- Space-y-1.5 for title and description

### Inputs

**Text Input**
```tsx
className="border-2 border-bank-slate-300 focus:border-bank-blue-500"
```
- Clean 2px border
- Professional focus state
- Rounded corners
- Height: h-11

**Focus State**
- 2px ring in bank-blue-500
- Border color changes to bank-blue-500
- Smooth transition

### Labels

**Form Labels**
```tsx
className="text-sm font-semibold text-bank-navy-800"
```
- Semibold weight for clarity
- Small size (14px)
- Dark navy color

---

## Shadows

Banking-grade subtle shadows for depth without distraction:

```css
shadow-bank:    0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)
shadow-bank-lg: 0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)
shadow-bank-xl: 0 16px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)
```

**Usage**:
- shadow-bank: Cards, buttons
- shadow-bank-lg: Hover states, elevated cards
- shadow-bank-xl: Modals, popovers

---

## Spacing

Consistent spacing scale:

```css
1:  0.25rem (4px)
2:  0.5rem  (8px)
3:  0.75rem (12px)
4:  1rem    (16px)  /* Base unit */
6:  1.5rem  (24px)
8:  2rem    (32px)
12: 3rem    (48px)
16: 4rem    (64px)
20: 5rem    (80px)
24: 6rem    (96px)
```

**Common Patterns**:
- Card padding: p-6 (24px)
- Section spacing: py-16 (64px)
- Grid gap: gap-6 (24px)
- Button padding: px-6 py-2

---

## Layout Patterns

### Container
```tsx
className="container-custom" // max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Section Spacing
- Desktop: py-16 md:py-20 (64-80px)
- Mobile: py-12 (48px)

### Grid Layouts
```tsx
// 3-column grid
className="grid md:grid-cols-3 gap-6"

// 4-column grid
className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
```

---

## Icons

### Icon Library
Lucide React - Clean, professional icons

### Icon Sizes
- sm: h-4 w-4 (16px) - Navigation, inline
- md: h-5 w-5 (20px) - Buttons, lists
- lg: h-6 w-6 (24px) - Cards, features
- xl: h-8 w-8 (32px) - Page headers

### Icon Colors
- Primary: text-bank-navy-800
- Interactive: text-bank-blue-600
- Muted: text-bank-slate-500

---

## Navigation

### Header
- Height: h-16 (64px)
- Background: white
- Border: bottom 1px in bank-slate-200
- Shadow: shadow-bank
- Sticky positioning

### Active States
- Background: bank-navy-800
- Text: white
- No border indicators

### Security Badge
```tsx
<Shield className="h-4 w-4" />
<span>Secure</span>
```

---

## Forms

### Form Layout
- Single column on mobile
- Two columns for paired fields (dates)
- space-y-6 between fields

### Form Field Pattern
```tsx
<div className="space-y-2">
  <Label htmlFor="field">Label *</Label>
  <Input id="field" />
  {error && <p className="text-sm text-red-600">{error}</p>}
</div>
```

### Required Indicators
```tsx
<span className="text-red-500">*</span>
```

### Error Messages
- Color: text-red-600
- Size: text-sm
- Position: Below input

---

## Status Indicators

### Success
```tsx
<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Message here</AlertDescription>
</Alert>
```

### Error
```tsx
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Message here</AlertDescription>
</Alert>
```

---

## Animation & Transitions

### Principles
- Subtle and professional
- Fast transitions (200ms)
- No bouncy or playful animations
- Smooth, linear easing

### Standard Transition
```tsx
className="transition-all duration-200"
```

### Hover Effects
- Cards: shadow-bank → shadow-bank-lg
- Buttons: background color darkens
- Links: text color darkens

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Navy on white: 12.6:1 (AAA)
- Slate-600 on white: 7.2:1 (AAA)

### Focus States
- 2px ring in bank-blue-500
- Clear visual indicator
- Keyboard navigable

### ARIA Labels
- All interactive elements labeled
- Form fields properly associated
- Button purposes clear

---

## Mobile Responsiveness

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly tap targets (44px minimum)

---

## Logo Design

### Concept
- Shield: Security and trust
- Document: Hypothecation paperwork
- Checkmark: Verified/approved

### Colors
- Primary: #0a1929 (darkest navy)
- Secondary: #243b53 (navy)
- Highlight: white

### No Gradients
Professional solid colors only

---

## Best Practices

### Do's
✅ Use solid colors, not gradients
✅ Professional, conservative language
✅ Clear visual hierarchy
✅ Consistent spacing
✅ Subtle shadows
✅ Professional icons
✅ Clean borders
✅ System fonts

### Don'ts
❌ Bright, flashy colors
❌ Heavy animations
❌ Sales-heavy copy
❌ Rounded corners > 8px
❌ Multiple shadows
❌ Colorful gradients
❌ Decorative fonts
❌ Emoji in UI

---

## Code Organization

### File Structure
```
src/
├── app/                 # Pages
│   ├── globals.css     # Global styles
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # Reusable components
│   ├── Logo.tsx        # Brand logo
│   └── Navigation.tsx  # Header
└── lib/
    └── utils.ts        # Utilities
```

### CSS Organization
1. Tailwind base
2. Tailwind components
3. Tailwind utilities
4. Custom component classes

---

## Maintenance

### Adding New Colors
1. Check if existing color works
2. If not, add to appropriate scale (navy/blue/slate)
3. Maintain 10-step scale (50-950)
4. Test contrast ratios

### Adding Components
1. Start with existing components
2. Match existing patterns
3. Use banking color scheme
4. Add to ui/ folder if reusable

### Testing Checklist
- [ ] Builds without errors
- [ ] Works on mobile
- [ ] Keyboard accessible
- [ ] Color contrast meets WCAG AA
- [ ] Professional appearance
- [ ] Consistent with existing components

---

## Version History

**v2.0.0** - Banking-Professional Design
- Complete redesign to banking standards
- Professional color system
- Clean typography
- Subtle animations
- Trust-focused design

---

**Last Updated**: 2024
**Maintained By**: MS EXIMP Development Team
