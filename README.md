# NAVODYA — Stories Behind Every Business

Navodya is an independent digital publication covering founders, startups, business, funding and the realities of building something from scratch.

This repository holds the website: a static, single-page site built with plain HTML, CSS and JavaScript. There is no framework, build step or backend.

> **Note:** All articles in this repo are **demonstration copy** created to show the layout. They are not reported news stories. Replace them with original, researched and fact-checked reporting before publishing.

## Features

- **Section pages:** Home, Latest, Founder stories, Startups, Funding, Small business, Women in business, About, Pitch a story and Editorial standards
- **Hash-based routing.** Each section has its own URL (for example `index.html#founders`), and the browser back/forward buttons work
- **Latest page** with beat filters, text search and sorting
- **Article view** rendered from a shared data file
- **Search overlay** (the ⌕ button; close it with `Esc`)
- **Newsletter and pitch forms.** These are front-end only: they show a success message but send nothing
- **Responsive layout** with a mobile menu

## Project structure

```
.
├── index.html      # All page markup (each section is a <div class="page" id="page-…">)
├── css/
│   └── styles.css  # Site styles
└── js/
    ├── data.js     # Article content (the `articles` array)
    └── script.js   # Cards, filters, routing, article view, search, forms
```

## Running locally

Because it's a static site, you can just open `index.html` in a browser.

You can also serve it locally:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Adding or editing articles

Articles live in [js/data.js](js/data.js). Each entry looks like this:

```js
{
  id: 'unique-slug',
  title: 'Headline',
  cat: 'Founder stories',          // should match one of the beats in script.js
  desc: 'Short standfirst shown on cards.',
  author: 'Author name',
  read: '5 min read',
  img: 'https://…',                // hero / thumbnail image URL
  demo: true,                      // marks sample content
  body: [
    ['Subheading', 'Paragraph text…'],
    ['Another subheading', 'More text…']
  ]
}
```

To choose which stories appear on each section page, edit the `fill(...)` calls near the top of [js/script.js](js/script.js). The filter categories on the Latest page are listed in the `beats` array in the same file.

## Deployment

The site works on any static host, such as Netlify, GitHub Pages or Vercel. Deploy the repository root as-is, with no build command.

## Image credits

Illustrative images are loaded from [Unsplash](https://unsplash.com).
