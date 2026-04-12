# Portfolio Customization Notes

This project is a static portfolio site built with:

- `index.html`
- `script.js`
- `style.css`

The main customization work happens in `index.html` and `script.js`.

## Project Structure

- `index.html`: layout, visible sections, contact block, project overlay cards
- `script.js`: dynamic data, project array, about text, tech stack globe, copy-to-clipboard logic
- `style.css`: styling and animations
- `images/`: profile image and project screenshots
- `audio/`: loader background video

## Where Personal Data Lives

### Hero

File: `index.html`

Edit:

- name
- role
- hero description
- top skill pills
- main CTA link
- profile image alt text

Current values are already set to:

- `KOTA SHASHIDHAR REDDY`
- `Full Stack Developer`
- `Spring Boot & React`
- `mailto:kotakshashidharreddy@gmail.com`

### About

File: `script.js`

Edit:

- `FULL_QUOTE`

This value is rendered into the About section at runtime.

### Projects

File: `script.js`

Edit:

- `PROJECTS`

Each project uses:

- `name`
- `category`
- `desc`
- `stack`
- `github`
- `demo`
- `screenshot`

Current screenshots:

- `images/project1.png`
- `images/project2.png`
- `images/project3.png`
- `images/project4.png`

Important:

- The horizontal project section is rendered from `PROJECTS`
- The fullscreen project grid in `index.html` is hardcoded and must match the same 4 projects

### Timeline / Experience

File: `index.html`

Current entries:

- BTech in Computer Science Engineering
- Full Stack Developer
- DSA Practice

If you add or remove entries, keep the timeline structure as `.career-entry`.

### Contact

Files:

- `index.html`
- `script.js`

Edit in `index.html`:

- sidebar links
- navbar email text
- contact section email
- GitHub / LinkedIn / email links
- footer name

Edit in `script.js`:

- `copyEmail()`
- `copyAbEmail()`

Current email:

- `kotakshashidharreddy@gmail.com`

### Logo / Branding

Files:

- `index.html`
- `script.js`

Edit:

- visible initials in nav logo
- hover-expanded full name

Current values:

- initials: `KSR`
- full name: `KOTA SHASHIDHAR REDDY`

## Updating Projects

To replace a project:

1. Update the entry in `script.js` inside `PROJECTS`
2. Replace the matching image in `images/`
3. Update the matching hardcoded project card in `index.html`

If you only change `script.js`, the overlay project grid can go out of sync.

## Updating Skills

There are two skill areas:

- hero skill pills in `index.html`
- animated tech globe in `script.js` under `SKILLS`

If you change stack names in projects, make sure `TECH_LINKS` in `script.js` includes matching keys if you want clickable tech tags.

## Common Maintenance Notes

- Keep project count consistent between `script.js` and the hardcoded overlay cards in `index.html`
- Keep the same email in both HTML and JS clipboard functions
- Keep screenshot paths valid
- If a project has no live demo, leave `demo: '#'`
- If you rename the CV file, update `downloadCV()` in `script.js`

## Validation Checklist

After edits, verify:

- the site loads without console errors
- `script.js` still parses
- project names match in both `index.html` and `script.js`
- screenshot files exist
- email and social links open the correct destinations

