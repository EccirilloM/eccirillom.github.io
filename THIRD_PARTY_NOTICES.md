# Third-party notices

## portfolio-react — Sagar Gupta

Source: https://github.com/Sagargupta16/portfolio-react
Reviewed local revision: 8b5c341c9a8c3a71f7bc49915222128130316331.
License: GNU GPL version 3; full text in LICENSE.

The AmbientBackground component was adapted from the original. The dark/blue palette,
font pairing and centered hero design informed the custom implementation.
Changes dated 2026-10-12: motion preference supplied as a prop; replaced original
content, navigation and sections with Ettore Cirillo's bilingual portfolio; original
globe integration; local-only Docker tooling. The derivative application code is
distributed under GPL-3.0-only. Original authorship remains with Sagar Gupta.
Modifications and new application code: Copyright (c) 2026 Ettore Cirillo.

The original owner's portrait, project assets, CV, analytics identifiers,
EmailJS configuration, deployment workflows and personal data were not imported.

## Independent globe

COBE: https://github.com/shuding/cobe — MIT, Copyright (c) 2021 Shuding.
See dependency-licenses.txt in production output for the installed package notices.
No source, assets or API endpoints from Shengxiang-Lin/Shengxiang-Lin.github.io are used.
The general idea of a visitor globe was inspiration only. That local checkout has
no general license granting reuse of its globe implementation.

## Other dependencies

React / React DOM (MIT), Motion (MIT), Lucide (ISC), Vite and tooling (their respective
licenses). Inter, Bricolage Grotesque and Geist Mono fonts are self-hosted through
Fontsource and carry the SIL Open Font License 1.1. Installed license texts are
collected during the build in dependency-licenses.txt and font-licenses.txt.

Ettore's portrait and personal biographical material are separate content, not
relicensed by the application GPL notice. No reuse rights over personal images,
third-party trademarks or team materials are implied.

## Template header and hero update — 2026-10-13

Navbar, hero layout, typography, button styles, social tiles and shell-style command
palette in HeaderHero.tsx and landing.css are adapted from the same GPL-3.0 template.
maker-placeholder.json copies the template's Maker vector artwork, copyright Sagar
Gupta, as a temporary placeholder explicitly requested by the user. It is not
Ettore's personal avatar and must be replaced when the user's avatar is supplied.
No portrait or professional data of the original author is used.

Yellowtail and Instrument Serif are also self-hosted via Fontsource, under OFL-1.1.
Their full license texts are included in font-licenses.txt. Social and skill icons
are supplied through react-icons with their respective bundled license notices.

## About and personal avatar update — 2026-10-13

About.tsx and about.css adapt the About, HighlightCard, QuickFacts and DevAvatar
layouts from Sagar Gupta's GPL-3.0 portfolio-react. Personal content and skill
choices are replaced with Ettore Cirillo's CV information in Italian and English.
The temporary Maker artwork is no longer rendered.

The user-selected avatar.svg is generated with Avataaars and served locally.
Avataaars: Copyright (c) 2017 Pablo Stanley, Fang-Pen Lin; MIT License.
Source: https://github.com/fangpenlin/avataaars
Artwork: https://avataaars.com/
Full license: AVATAAARS-LICENSE.txt in public and production output.
No request to avataaars.io is made by the website.

## Scrolling skill icons and Gazebo — 2026-10-13

StackBackdrop.tsx and stackGeometry.ts adapt the fixed flank layer and scroll
wrapping from portfolio-react StackFieldBackdrop and heroStackData (GPL-3.0).
Modified for fourteen user-selected icons, equal spacing and column speeds,
responsive viewport gates and tab visibility. Skills are supplied by react-icons.

Gazebo icon: https://github.com/devicons/devicon/blob/master/icons/gazebo/gazebo-original.svg
Devicon: MIT, Copyright (c) 2015 konpa. Full license: DEVICON-LICENSE.txt.
The SVG is served locally; the Gazebo trademark belongs to its respective owner.
