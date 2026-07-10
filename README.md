# Mantine Lens Select Component

<img alt="Mantine Lens Select" src="https://github.com/gfazioli/mantine-lens-select/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-lens-select?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-lens-select)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-lens-select?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-lens-select)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-lens-select?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-lens-select)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-lens-select?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

The [Mantine Lens Select](https://gfazioli.github.io/mantine-lens-select/) component is a fisheye/lens magnification select for React applications built with Mantine. It displays a list of items with a macOS Dock-like magnification effect on hover, where items near the cursor scale up creating an interactive and visually engaging selection experience.

## Features

- Fisheye/lens magnification effect on hover (macOS Dock-like)
- **Count mode**: `<LensSelect count={15} />` — no data array needed
- **Range mode**: `min`/`max`/`step` props (like Mantine Slider)
- Horizontal and vertical orientation support
- Configurable magnification, lens range, scale, opacity, and blur effects
- Controlled and uncontrolled modes via value/defaultValue/onChange
- Keyboard navigation (Arrow keys, Home, End) with optional loop
- Mouse wheel and touch/swipe navigation
- Custom item rendering via renderItem callback
- LensSelect.Indicator compound component for selection indicator
- Full Mantine Styles API support
- WAI-ARIA listbox pattern for accessibility
- GPU-optimized with targeted will-change
- TypeScript — full type safety out of the box

> [!note]
>
> [Demo and Documentation](https://gfazioli.github.io/mantine-lens-select/) | [More Mantine Components](https://mantine-extensions.vercel.app/)

## Installation

```sh
npm install @gfazioli/mantine-lens-select
```
or

```sh
yarn add @gfazioli/mantine-lens-select
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-lens-select/styles.css';
```

## Usage

### Simple count mode

```tsx
import { LensSelect } from '@gfazioli/mantine-lens-select';

function Demo() {
  return <LensSelect count={20} />;
}
```

### Range with step

```tsx
<LensSelect min={0} max={100} step={10} withIndicator />
```

### Custom data

```tsx
import { LensSelect } from '@gfazioli/mantine-lens-select';

const data = [
  { value: 'home', view: <span>🏠</span> },
  { value: 'search', view: <span>🔍</span> },
  { value: 'mail', view: <span>📧</span> },
  { value: 'settings', view: <span>⚙️</span> },
];

function Demo() {
  return <LensSelect data={data} withIndicator />;
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long-term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back - even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

[Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up-to-date, and growing for everyone.
