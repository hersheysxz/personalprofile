# Rachel Regacho — Portfolio

A personal portfolio site for Rachel Regacho, BS Computer Science student at DMMMSU-SLUC. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

🔗 **Live site:** https://hersheysxz.github.io/personalprofile/

## Build Prompt

This portfolio was built using the following specification:

### Project Overview
Create an interactive personal portfolio website for **Rachel A. Regacho**, 4th-year BSCS student at DMMMSU South La Union Campus. The site should showcase five completed projects, nine+ certifications, twelve technical skills, and professional experience in a modern, interactive format suitable for GitHub Pages deployment.

### Content Requirements

#### About Section
- Student status: 4th year BSCS, DMMMSU South La Union Campus
- Include personal introduction, technical background, and community involvement (SK Kagawad role)

#### Projects (5 Total)
1. SK Resident Information System (Database) — Digitized resident records management system
2. Edubyte (Mobile App) — Education-focused mobile application
3. FireGuard (Mobile App) — Emergency response mobile application  
4. Door Locking System (Arduino) — Embedded systems/IoT hardware project
5. Portfolio Website (Web) — Live deployment at thefolioproject (Vercel), source on GitHub with tech stack: Express, MongoDB, Vercel, Render

#### Certifications (9+)
- Introduction to Modern AI
- Introduction to Data Science
- Introduction to IoT and Digital Transformation
- Data Science Essentials with Python
- AI Fluency: Framework and Foundations
- The Hour of Code
- OJT Certificate of Completion and Participation
- Foundation of AI & Data Science
- Additional certifications as available

#### Technical Skills (12)
HTML, CSS, JavaScript, Python, MySQL, C/C++, Express, Dart, Java, MongoDB, plus development tools (GitHub, Vercel, Visual Studio, MongoDB Atlas, Render)

#### Contact Information
- Email: rachelregacho645@gmail.com
- GitHub: https://github.com/hersheysxz
- LinkedIn: https://www.linkedin.com/in/rachel-regacho-050540418
- Facebook: https://www.facebook.com/share/1D7vRYt4Vo/?mibextid=wwXIfr

### Interactive Features Required

1. **Custom Cursor** (Desktop, fine-pointer only)
   - Animated dot + lagging ring that expands on hover
   - Shows contextual labels over interactive elements ("GO", "VIEW", "OPEN")
   - Automatically disabled on touch devices and for users with `prefers-reduced-motion` set

2. **3D Tilt Animation** (Desktop, motion-OK only)
   - Project cards, certificate frames, contact cards, and profile photo tilt toward cursor on hover
   - Maximum 7-degree rotation with perspective(800px)
   - Smooth spring-back to flat on mouse-leave
   - Respects touch and reduced-motion preferences

3. **Scroll-Reveal Animations**
   - Section headings use clip-path wipe effect (left to right)
   - Grouped items (skill chips, certificate frames, project cards) cascade in with staggered 70ms delays
   - Timeline clips visually "grow" from zero width into place when section scrolls into view
   - All animations respect `prefers-reduced-motion`

4. **Certificate Lightbox**
   - Click any certificate frame to open full-size overlay
   - Display certificate image, title, issuer, and completion date
   - Close via dedicated button, Escape key, or clicking outside the image
   - Manage focus properly (move to close button on open, restore focus on close)

5. **Sticky Navigation**
   - Header nav bar with brand, current section timecode/label, chapter links
   - Updates in real-time as user scrolls through sections
   - Mobile hamburger menu toggle for small screens
   - All chapter links have active state styling

6. **Timeline Visualization**
   - Multi-track NLE-style layout showing education and work experience
   - Clips positioned and sized proportionally to actual year ranges (2011–2026)
   - Hover effects with brightness increase and subtle lift
   - Responsive horizontal scroll on mobile

### Accessibility Requirements
- Keyboard navigation: all interactive elements reachable via Tab, focus-visible outlines
- Semantic HTML with proper landmarks (<header>, <main>, <footer>, <section>)
- Alt text on all images
- ARIA labels for dynamic content (cursor ring, lightbox)
- Respects `prefers-reduced-motion: reduce` (disables animations, shows all content immediately)
- Respects `pointer: coarse` (disables custom cursor on touch devices)
- Color contrast meets WCAG AA standards

### Technical Specifications
- **Stack**: Vanilla HTML5, CSS3, JavaScript — no frameworks or build tools
- **Version Control**: Git with meaningful commit history
- **Hosting**: GitHub Pages ready
- **Responsive Breakpoints**: Mobile (390px), Tablet (768px), Desktop (1440px+)
- **Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: Optimized images, no external dependencies except Google Fonts
- **File Structure**:


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
