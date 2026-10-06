# Ryota Kiuchi’s personal website

https://rkiuchir.github.io/

## Directory layout

```text
index.html                 Main profile, career, publications and presentations
aboutme.html               Redirect to the current profile
publication.html           Standalone publication page
presentation.html          Standalone presentation page
assets/
  css/                     Stylesheets
  js/                      Navigation behavior
  images/                  Website images
  documents/               PDF documents
visualizations/
  index.html               Visualization directory
  *.html                   Saved Plotly visualizations and earthquake pages
scripts/
  publish.sh               Push reviewed commits on the current branch
  check_links.py           Check local HTML and CSS references
```

The root-level visualization HTML files are compatibility redirects.
Edit the destination files in `visualizations/` instead. The underscore-named
spherical topography pages redirect to their equivalent canonical pages.
`deploy.sh` and `deploy_HP.sh` are compatibility entry points for `scripts/publish.sh`.
Keep `favicon.ico` at the root for browser discovery.

Historical pages (`archive/`, `old/`, `UnderConst/`), the experimental
`JMA_web_temp.html`, and the unfinished `event2.html` have been removed.
Their old URLs are no longer supported. Committed historical files remain
available in Git history.

## Local preview and checks

Run `python3 -m http.server 8000` from the repository root, then open
`http://localhost:8000`. This is a static HTML site; no Hugo build is required.
The profile is maintained in `index.html`; `aboutme.html` redirects to that section.
Run `python3 scripts/check_links.py` to check active local HTML/CSS references.

When adding a page, use paths relative to that file. Stylesheets resolve image
paths from `assets/css/`, for example `../images/MtDana.jpg`.

## Publish a branch

Review and commit the intended files, then run `./scripts/publish.sh` (or
`./deploy.sh` / `./deploy_HP.sh`). The script pushes the **current branch** to
`origin` and sets its upstream. It refuses uncommitted changes or a detached HEAD,
and never force-pushes or stages files automatically. Commit-message arguments
are not accepted. The script works regardless of the caller’s working directory.

Publishing a branch does not necessarily update the website. Check the deployment
source in GitHub **Settings → Pages**. If it uses `master`, open and merge a pull
request into `master`, then check the Pages deployment result in GitHub Actions.
