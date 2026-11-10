# Omnifood

A responsive meal subscription landing page built with HTML, CSS and TypeScript. Includes accessible navigation, local fonts and icons, and a signup form handled by Netlify Forms.

[Live site](https://omnifood-vdrenkov.netlify.app/)

## Development

Use Node **26.13.0** from `.nvmrc` and npm **12.2.2**.

```bash
npm ci
npm run dev
```

For a production preview, run `npm run build` followed by `npm run preview`. Open the URL printed by Vite; the source HTML requires its TypeScript compilation and public asset handling.

## Checks

```bash
npm run check
npm audit --audit-level=low
```

`check` runs Prettier, the strict TypeScript/Vite build and Vitest unit tests. Tests cover navigation, the current year, form validation and submission fields. GitHub Actions runs the same checks.

## Acknowledgments

Based on **Build Responsive Real-World Websites with HTML and CSS** by Jonas Schmedtmann. The design foundation and photography come from the course assets. Icons use [Ionicons](https://ionic.io/ionicons) under MIT; [Rubik](https://fonts.google.com/specimen/Rubik) uses the SIL Open Font License. Their notices are included in `public/`. This is a personal portfolio project and is not for redistribution.
