# Omnifood

Responsive marketing site for the fictional Omnifood meal subscription service. Built with semantic HTML, modern CSS (Flexbox, Grid, custom properties, responsive queries), and a sprinkle of vanilla JavaScript for UX enhancements like smooth scrolling and sticky navigation.

## Features

- Multi-section landing page highlighting features, pricing, testimonials, and a newsletter CTA.
- Mobile-first layout with extensive responsive tweaks in `css/queries.css`.
- Mobile navigation drawer toggled via JavaScript and CSS class switches.
- Smooth scroll behavior for internal anchor links and automatic current-year footer update.
- Sticky header using the Intersection Observer API and a Safari flexbox gap fallback.
- Progressive Web App metadata (`manifest.webmanifest`) and favicons in `img/`.

## Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, custom properties, responsive media queries)
- Vanilla JavaScript (ES6+)

## Getting Started

No build step is required. Clone/download the repository and open `index.html` in any modern browser. For local development with live reload you can use a lightweight static server, e.g.:

```bash
npm install -g serve
serve .
```

## Project Structure

```
.
├── css/
│   ├── general.css       # Base typography, layout helpers, reset
│   ├── styles.css        # Component styles, section layouts, utilities
│   └── queries.css       # Responsive breakpoints
├── js/
│   └── script.js         # Mobile nav toggle, smooth scrolling, sticky header, polyfills
├── img/                  # Optimized images and icons
├── index.html            # Main HTML document
└── manifest.webmanifest  # PWA metadata
```

## Deployment

Because the site is fully static, any static host works (Netlify, GitHub Pages, Vercel, etc.). Simply upload the project root or connect the Git repository—no build command needed, publish directory is `/`.

## License

Built while following the Udemy course **“Build Responsive Real-World Websites with HTML and CSS” by Jonas Schmedtmann**. Course materials and design credit belong to the instructor; this repository is shared only for personal learning and portfolio purposes.
