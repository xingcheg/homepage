# Xingche Guo — academic homepage

**Website:** <https://xingcheg.github.io/homepage/>

A static academic website with a biography, research themes, publications,
teaching, selected talks, group photos, and research code links. Built from the current Google Sites homepage, supplied
Research and Publications HTML, and the supplied portrait.

## Update the website

| File | What to edit |
| --- | --- |
| `index.html` | Biography, research interests, portrait, group photo gallery, and contact information |
| `research.html` | Research theme descriptions, diagrams, and related papers |
| `publications.html` | Publication titles, authors, venues, years, and links |
| `teaching.html` | Graduate and undergraduate courses, semesters, and course links |
| `talks.html` | Selected talk titles, dates, venues, and slide links |
| `slides/` | Original PDF slide decks linked from Selected talks |
| `assets/talks.css` | Selected talks layout and mobile styles |
| `assets/photos/` | Group photographs at their original resolution |
| `assets/teaching.css` | Teaching layout and featured STAT5095 repository |
| `assets/site.css` | Shared typography, layout, navigation, and mobile styles |
| `assets/research.css` and `research.js` | Research layout and accessible tabs |
| `assets/publications.css` and `publications.js` | Publication layout and filters |
| `assets/xingche-guo.jpg` | Portrait photograph |

To add a publication, copy a `li.paper` into the appropriate year group in
`publications.html`, assign unique IDs, and update its citation, links, and
`data-search` text. Keep `data-status="published"` or `data-status="review"`.
Counts are recalculated when the page loads. Also add the paper to its theme in
`research.html` if appropriate.

Edit `teaching.html` to update course offerings. STAT5095 links to the public
Statistical Generative Modeling repository; undergraduate courses link to their
UConn descriptions.

To add a talk, copy a `li.talk-row` into the appropriate year in `talks.html`,
assign unique heading and link IDs, and add the PDF under `slides/`. Use the title,
date, and venue shown in the slides; do not infer missing event details. Update
the displayed file size when replacing a deck.

The home page gallery is linked directly at `index.html#photos`. Add photographs
to `assets/photos/` and update the gallery in `index.html`, including descriptive
alt text and the original image dimensions. Each photo links to its full-size
file; the gallery preserves the complete image without cropping.

Research theme IDs support direct links, such as
`research.html#functional-data`. Shared header and footer HTML appears in each
page; update all pages when changing navigation.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. The main pages use relative asset and
navigation links. Canonical URLs, the sitemap, and the custom 404 page target the
published `/homepage/` path.

## Deployment

GitHub Pages publishes from the **main** branch, **/ (root)** directory.
Push changes to `main` to update the website. The `.nojekyll` file disables
Jekyll processing; there is no build step or package installation.

All biography, research, and publication content remains readable without
JavaScript. JavaScript enables the research tabs and publication filters. Print
styles include all themes and publications. Google Fonts has system fallbacks.
No analytics or tracking scripts are included.

## Content sources

- [Original homepage](https://sites.google.com/view/xingche-guo/home)
- Supplied `research-embed.html` and `publications-embed.html`
- Supplied portrait and three group photographs, preserved at their original resolution
- Seven supplied PDF slide decks, copied unchanged; talk metadata comes from their title pages

The supplied bibliography includes 8 published/forthcoming papers and 5
manuscripts under review. The 2020 Metabolites paper and working-paper section
remain excluded. The Google Scholar profile link is preserved; citation
metrics are not copied or inferred.
