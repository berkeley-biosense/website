# berkeley biosense webpage

Lab page for [biosense.berkeley.edu](http://biosense.berkeley.edu)

## Editing style

To edit the style, just edit the files in `dist/css`. Save them, and issue a PR.

*DO NOT CHANGE ANY HTML FILES IN DIST/*. Your changes will be overwritten. To change HTML templates, or project page content, see below.

## Editing templates or content

The webpage is generated from templates, kept in `templates/` and `projects/`

To modify content, first install the code that generates the webpage:

```
npm install
```

Now, take a look at `config.js`. You'll see the way projects and people are defined. 

If you want to add a new project, just follow the existing examples. Make a new directory in `projects/`, which should contain an `index.md` file and an `assets/` directory. Again, use the existing projects as a template. 

If you want to modify an existing project, find the directory (listed in `config.js`) and modify it to your liking.

To modify the underlying HTML templates on which the site is built, just modify the jinja templates in `templates/`. After you're done modifying things in `projects/` and/or `templates/`, build the static site with

```
npm run build
```

If you want to see the site, `npm run serve`, and visit http://localhost:8000

## license

all code BSD

all website content and images copyright berkeley biosense
