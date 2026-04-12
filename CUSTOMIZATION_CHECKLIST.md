# Customization Checklist

Use this file when updating the portfolio later.

## 1. Update Identity

File: `index.html`

- hero name
- role text
- hero description
- hero skills
- CTA link
- contact name
- footer credit

File: `script.js`

- logo full name
- logo initials
- email copy handlers

## 2. Update About

File: `script.js`

- replace `FULL_QUOTE`

## 3. Update Projects

File: `script.js`

- edit `PROJECTS`

For each project, check:

- `name`
- `category`
- `desc`
- `stack`
- `github`
- `demo`
- `screenshot`

## 4. Sync Project Overlay

File: `index.html`

Update the hardcoded project grid so it matches:

- project names
- project count
- project tags
- project order

Important:

- if `PROJECTS` has 4 items, the overlay must also show 4 cards

## 5. Update Images

Folder: `images/`

Replace when needed:

- `me.png`
- project screenshots used in `PROJECTS`

## 6. Update Timeline

File: `index.html`

Edit only `.career-entry` blocks.

Check:

- role
- type
- year
- description

## 7. Update Contact

File: `index.html`

- sidebar links
- navbar email text
- contact section email
- GitHub link
- LinkedIn link
- email link

File: `script.js`

- `copyEmail()`
- `copyAbEmail()`

## 8. Update Skills

File: `index.html`

- hero skill pills

File: `script.js`

- `SKILLS`
- `TECH_LINKS`

## 9. Update CV Note

File: `script.js`

- update `downloadCV()` if the CV filename changes

## 10. Final Checks

Run through this before publishing:

- no old personal data remains
- email is consistent everywhere
- project count is correct
- timeline count is correct
- all screenshot paths exist
- all links open correctly
- `script.js` has no syntax errors

