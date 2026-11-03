# Toufiqul Islam — Software Engineering Portfolio

A custom, responsive portfolio built with plain HTML, CSS and JavaScript. The goal is a clean, recruiter-friendly presentation of real student projects and verifiable open-source contributions.

**Live site:** https://toufiqul-27.github.io/Portfolio/

## Highlights

- Accessible navigation, keyboard focus states, responsive mobile menu
- Midnight-navy design with subtle violet/cyan accents and an optional light theme
- Real portrait and carefully curated GitHub repository links
- Four selected projects: [AgroLink](https://github.com/Toufiqul-27/Agro-Link-java-), [TaskFlow API](https://github.com/Toufiqul-27/taskflow-api), [ApplyTrack](https://github.com/Toufiqul-27/applytrack-fullstack), [GitHub Insights](https://github.com/Toufiqul-27/github-insights-dashboard)
- Verified merged contributions: [Neo.mjs #20191](https://github.com/neomjs/neo/pull/20191) and [synthdata #7](https://github.com/javvadivijayprasad/synthdata/pull/7)
- One pending upstream contribution: [regexpp #220](https://github.com/eslint-community/regexpp/pull/220)

The illustrations in project cards are **schematic**, not application screenshots. Some recent web repositories began as AI-assisted learning builds and need further independent review, integration tests and deployment. The site does not claim they are production systems.

## Running locally

No dependencies or build tools needed. Clone the repository and open `index.html`, or run a local server:

```sh
python -m http.server 8080
```

Open http://localhost:8080/.

## Deploy

GitHub Pages publishes the `main` branch using [the deployment workflow](.github/workflows/deploy-pages.yml). See the repository's **Actions** tab for deployment status.

## Customize

- `index.html`: content, links, metadata, project summaries
- `styles.css`: layout, color tokens, theme and responsive styles
- `script.js`: menu, color theme and reveal effects
- `portrait-toufiqul.jpg`: hero photograph

Do not commit personal tokens, passwords or other secrets.

---

Made for [Toufiqul Islam](https://github.com/Toufiqul-27).
