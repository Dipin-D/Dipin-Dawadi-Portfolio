# Dipin Portfolio

A fresh static portfolio app built with modern browser-native tools:

- semantic HTML
- CSS variables and responsive layouts
- vanilla ES modules
- one centralized data file for all portfolio content

## Edit content

Most future edits happen in:

- `app/assets/js/data.js`

That file contains profile info, skills, projects, experience, certifications, and social links.

## Local preview

From the repo root:

```bash
python3 build_static_app.py
python3 -m http.server 8000 -d dist
```

Open `http://127.0.0.1:8000/`.

## GitHub Pages deployment

The GitHub Actions workflow builds the static app and deploys `dist/` to GitHub Pages.

1. Push the repository to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`.

The build step:

1. Copies the static app from `app/`
2. Writes the final deployable site into `dist/`

## Project structure

- `app/index.html`
- `app/projects/index.html`
- `app/experiences/index.html`
- `app/assets/js/data.js`
- `app/assets/js/render.js`
- `app/assets/js/app.js`
- `app/assets/css/styles.css`
- `build_static_app.py`
