# Toufiqul Islam — Software Engineering Portfolio

**Live website:** https://toufiqul-27.github.io/Portfolio/

A calm, evidence-first personal portfolio for software engineering internships and junior roles. Built with plain HTML, CSS and JavaScript; no framework or build step.

## Design goals

- **Recruiter-first information architecture:** role and interests → selected code → verified collaboration → education and skills → clear contact
- Restrained navy/violet palette, accessible typography and breathing room
- Meaningful interactivity: working project filters, native expandable technical briefs, copy-email feedback, light/dark theme and mobile menu
- Responsive layouts, keyboard navigation, semantic headings, reduced-motion support, accessible labels and focus states
- Verified upstream contributions: [Neo.mjs PR #20191](https://github.com/neomjs/neo/pull/20191) and [synthdata PR #7](https://github.com/javvadivijayprasad/synthdata/pull/7) (merged); [regexpp PR #220](https://github.com/eslint-community/regexpp/pull/220) (in review when last checked)
- Four highlighted repositories: [AgroLink](https://github.com/Toufiqul-27/Agro-Link-java-), [TaskFlow API](https://github.com/Toufiqul-27/taskflow-api), [ApplyTrack](https://github.com/Toufiqul-27/applytrack-fullstack) and [GitHub Insights](https://github.com/Toufiqul-27/github-insights-dashboard)

## Important transparency

Project illustrations are **typographic concepts**, not screenshots of deployed apps. Recent web/backend learning projects were initially developed with substantial AI assistance. Real-world deployment and deeper integration testing remain future work. This site avoids invented performance metrics, employment experience or testimonials.

## Local development

Open \`index.html\`, or serve locally:

\`\`\`bash
python -m http.server 8080
\`\`\`

Go to http://localhost:8080/.

## Structure

- \`index.html\` — content, accessible structure, case-study briefs and project links
- \`styles.css\` — visual system, dark/light themes and responsive layout
- \`script.js\` — project filtering, theme toggle, mobile navigation, copy-email and scroll behavior
- \`portrait-toufiqul.jpg\` — existing portrait
- \`.github/workflows/deploy-pages.yml\` — deploys website on GitHub Pages after pushes to \`main\`

## Notes

The website is static, keeps no login credentials and has no external tracking script. A theme preference may be saved locally in the browser. Do not commit tokens or personal secrets.

Made for [Toufiqul Islam](https://github.com/Toufiqul-27).
