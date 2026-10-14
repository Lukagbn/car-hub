# CarRent

A car rental platform built with React and TypeScript, styled with Tailwind CSS, with global state managed by Redux Toolkit.

## Tech Stack

- **React** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — styling
- **React Router** — routing and navigation
- **Redux Toolkit** — global state management
- **React Hook Form** + **Yup** — form validation

## Project Structure

```
src/
├── assets/
│   ├── icons/
│   └── images/
│
├── components/
│   ├── Modals/
│   │   ├── LogIn.tsx
│   │   ├── Modals.tsx
│   │   ├── Profile.tsx
│   │   └── Register.tsx
│   │
│   ├── Skeletons/
│   │   ├── CarDetailsLoader.tsx
│   │   ├── CardLoader.tsx
│   │   ├── CheckoutLoader.tsx
│   │   └── ProfileLoader.tsx
│   │
│   ├── SvgIcons/
│   │   ├── CarType.tsx
│   │   ├── Fuel.tsx
│   │   ├── Heart.tsx
│   │   └── Transmission.tsx
│   │
│   ├── Banner.tsx
│   ├── Card.tsx
│   ├── CardList.tsx
│   ├── CategoryBox.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   └── StarRating.tsx
│
├── pages/
│   ├── CarDetails.tsx
│   ├── Categories.tsx
│   ├── Checkout.tsx
│   ├── Contact.tsx
│   ├── Favorites.tsx
│   ├── Home.tsx
│   └── NotFound.tsx
│
└── store/
    ├── hooks.ts
    ├── store.ts
    └── slices/
        └── carSlice.ts
```

## Pages

| Page | Path | Description |
|---|---|---|
| Home | `src/pages/Home.tsx` | Landing page with the banner and the car listing |
| Categories | `src/pages/Categories.tsx` | Browse cars grouped by category |
| CarDetails | `src/pages/CarDetails.tsx` | Full details, image gallery, and reviews for a single car |
| Checkout | `src/pages/Checkout.tsx` | Rental checkout flow (protected route) |
| Favorites | `src/pages/Favorites.tsx` | User's saved/favorite cars |
| Contact | `src/pages/Contact.tsx` | Contact information and form |
| NotFound | `src/pages/NotFound.tsx` | 404 fallback page |

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# production build
npm run build

# preview production build
npm run preview

# lint
npm run lint
```

## Packages Used

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.8 | UI library |
| `react-dom` | ^19.2.8 | React renderer for the DOM |
| `react-router` | ^7.18.4 | Routing and navigation |
| `@reduxjs/toolkit` | ^2.13.0 | Global state management |
| `react-redux` | ^9.3.0 | React bindings for Redux |
| `react-hook-form` | ^7.89.0 | Form state and handling |
| `@hookform/resolvers` | ^5.9.1 | Connects Yup schemas to React Hook Form |
| `yup` | ^1.7.1 | Schema-based form validation |
| `tailwindcss` | ^4.3.3 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.3.3 | Tailwind CSS Vite plugin |
| `@fontsource/roboto` | ^5.3.0 | Self-hosted Roboto font |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.3.0 | Build tool and dev server |
| `@vitejs/plugin-react` | ^6.1.1 | React support for Vite |
| `typescript` | ~6.0.2 | Static typing |
| `typescript-eslint` | ^8.69.0 | TypeScript ESLint integration |
| `eslint` | ^10.10.0 | Linting |
| `@eslint/js` | ^10.0.1 | ESLint's core JS rules |
| `eslint-plugin-react-hooks` | ^7.1.1 | Lint rules for React Hooks |
| `eslint-plugin-react-refresh` | ^0.5.6 | Lint rules for React Fast Refresh |
| `@types/react` | ^19.2.18 | TypeScript types for React |
| `@types/react-dom` | ^19.2.7 | TypeScript types for React DOM |
| `@types/node` | ^24.13.3 | TypeScript types for Node.js |
| `globals` | ^17.12.0 | Global variable definitions for ESLint |
