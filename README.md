# A Plege to migrate to Python 3. 

This is the main website for a pledge to stop supporting Python 2 for free in open source software. 

# run locally

Install Jekyll : `gem install jekyll`, `gem install gh-pages`

Clone this locally, `cd` in the newly created directory.

run `jekyll serve -w` in one terminal, open you browse to `localhost:4000`.

Modify the various files, refresh your browser and enjoy. 

PRs welcomed.

# Add your project

If you just want to add you project to the list of participating project, add a
line in [the list of participating project](_sections/30-projects.md), it's
markdown so feel free to just list your project name or add a link, and make a
pull request. You should even be able to [edit it
online](https://github.com/python3statement/python3statement.github.io/edit/master/_sections/30-projects.md).




## Add timeline informations

The front page also have a timeline chart, with past release dates, and future
(planned) releases. You can also add you project there, if you have a specific
date where you plan to drop Python 2 support. 

See [site.js](site.js) around [line
100](https://github.com/python3statement/python3statement.github.io/blob/master/site.js#L103)
to see how to add this kind of data. 


# Base template:

This is a based on version of
[github.com/t413/SinglePaged](https://github.com/t413/SinglePaged)


