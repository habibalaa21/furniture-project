# Furniture. — Home Page

A modern, responsive furniture e-commerce home page built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Replacing images

All images are centralized in `src/data/images.js`. Swap any placeholder URL
there and it updates everywhere that image is used — no component edits
needed.

## Structure

```
src/
  components/
    AnnouncementBar.jsx      Top dark-green bar (phone, promo, socials)
    Navbar.jsx                Sticky header with mobile drawer
    Hero.jsx                  Two-column hero (heading, CTAs, rating, showcase)
    Rating.jsx                Overlapping avatars + rating text
    FurnitureShowcase.jsx     Living room / bedroom image cards + floating nav buttons
    CategoryCard.jsx          Single category card (image + label + count)
    Categories.jsx            "Shop by Room" grid section
    Button.jsx                Reusable primary/secondary button
  data/
    images.js                 Centralized image URLs — edit here only
  pages/
    Home.jsx                  Composes the full page
  App.jsx
  main.jsx
  index.css                   Design tokens (colors, type, radius, shadow) + resets
```

## Design tokens

| Token | Value |
|---|---|
| Primary (forest green) | `#176B45` |
| Accent (gold) | `#F5C400` |
| Background | `#FCFBF8` |
| Text | `#1B1B18` |
| Muted text | `#6B6B63` |

Fonts: **Poppins** for headings, **Manrope** for body text (loaded from Google Fonts in `index.html`).

## Responsive behavior

- **Desktop (>900px):** full nav, two-column hero, 4-column category grid.
- **Tablet (640–900px):** hero stacks, nav collapses to hamburger, 2-column category grid.
- **Mobile (<640px):** announcement bar simplifies, secondary bedroom card and floating arrows hide from the hero to avoid overflow, buttons go full-width. Tested down to 320px with no horizontal scroll.
