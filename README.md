# Rachel Regacho — Portfolio

A personal portfolio site for Rachel Regacho, BS Computer Science student at DMMMSU-SLUC. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

🔗 **Live site:** https://hersheysxz.github.io/REPO-NAME/

## Sections

- **Hero** — intro with an embedded 3D computer-setup model (via Sketchfab)
- **About** — background, focus areas, and a short timeline of skills
- **Skills Orbit** — animated tech-stack badges
- **Projects** — filterable folder-style cards (Mobile / Web / Database / Hardware)
- **Certificates** — certification gallery
- **Journey** — yearly timeline, 2023–2027
- **Contact** — email, GitHub, LinkedIn, and a location map

## Tech

- HTML5 / CSS3 (no preprocessor)
- Vanilla JavaScript (`script.js`) for scroll reveals, the typing effect, project filters, and the modal
- [Font Awesome](https://fontawesome.com/) for icons (via CDN)
- [Sketchfab](https://sketchfab.com/) embed for the 3D model in the hero
- OpenStreetMap embed for the contact section

## Project structure

```
.
├── index.html
├── style.css
├── script.js
└── assets/
    ├── dp.png
    └── cert1.jpg … cert8.jpg
```

## Running locally

No build step required — just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

Hosted via GitHub Pages from the `main` branch:
`Settings → Pages → Deploy from a branch → main → / (root)`

## Credits

3D model: ["Entire computer setup"](https://sketchfab.com/3d-models/entire-computer-setup-08952b58afda4349a50e8505167ab4a5) by [LuckyMan2337](https://sketchfab.com/luckyman2337) on Sketchfab.

## License

© Rachel Regacho. All rights reserved.
