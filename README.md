# A pledge to migrate to Python 3.

This is the main website for a pledge to stop supporting Python 2 for free in
open source software.

# Run locally

Install Jekyll : `gem install jekyll`, `gem install github-pages`

Clone this locally, `cd` in the newly created directory.

Run `jekyll serve -w` in one terminal, open your browser to `localhost:4000`.

Modify the various files, refresh your browser and enjoy.

PRs welcomed.

# Add your project

If you just want to add your project to the list of participating projects, add
a line in [the list of participating projects](_sections/30-projects.md). It's
markdown so feel free to just list your project name or add a link, and make a
pull request. You should even be able to [edit it
online](https://github.com/python3statement/python3statement.github.io/edit/master/_sections/30-projects.md).

There is no need to install Jekyll: A check creating a preview will be run on your pull request. Please check this preview.

## Add timeline information

The front page also has a timeline chart, with past release dates and future
(planned) releases. You can also add your project there, if you have a specific
date where you plan to drop Python 2 support.

See [site.js](site.js) around [line
100](https://github.com/python3statement/python3statement.github.io/blob/master/site.js#L103)
to see how to add this kind of data.

# Base template

This site is based on
[github.com/t413/SinglePaged](https://github.com/t413/SinglePaged).
