# A pledge to migrate to Python 3.

This is the main website for a pledge to stop supporting Python 2 for free in
open source software.

## History

This page is now an archive of part of the transition from Python 2 to 3.

By around 2015, when Python 2 support was originally planned to end, many
important Python libraries and tools supported Python 3. But Python 2 still had
a lot of users, and projects needed to support both major versions. The end of
Python 2 support was postponed to 2020, and some people argued that development
of Python 2 should resume. It seemed like a real possibility that the end date
would be postponed again, and we'd need to support two versions of the language
indefinitely.

The Python 3 statement was drawn up around 2016. Projects pledged to require
Python 3 by 2020, giving other projects confidence that they could plan a similar
transition, and allowing downstream users to figure out their options without a
nasty surprise. We didn't force people to move to Python 3, but if they wanted
to stick with Python 2, they would stop getting new versions of our projects.
The focus was originally on the scientific Python ecosystem, with Jupyter and
matplotlib among the first projects involved, but in late 2017 it was expanded
to any Python projects.
A rapidly growing number of projects signed up as we approached 2020.

The long-term transition we hoped for has succeeded: in 2024 it is entirely
normal for projects to support only Python 3, simplifying maintainers' lives
and letting us take full advantage of newer language features.

Thank-you to all of the people, in projects big and small, who contributed
their support to the statement!

## Run locally

Install Jekyll : `gem install jekyll`, `gem install github-pages`

Clone this locally, `cd` in the newly created directory.

Run `jekyll serve -w` in one terminal, open your browser to `localhost:4000`.

Modify the various files, refresh your browser and enjoy.

PRs welcomed.

## Add your project

We're no longer adding new projects - see the history section above.

If you just want to add your project to the list of participating projects, add
a line in [the list of participating projects](_sections/30-projects.md). It's
markdown so feel free to just list your project name or add a link, and make a
pull request. You should even be able to [edit it
online](https://github.com/python3statement/python3statement.github.io/edit/master/_sections/30-projects.md).

There is no need to install Jekyll: A check creating a preview will be run on your pull request. Please check this preview.

### Add timeline information

The front page also has a timeline chart, with past release dates and future
(planned) releases. You can also add your project there, if you have a specific
date where you plan to drop Python 2 support.

See [site.js](site.js) around [line
100](https://github.com/python3statement/python3statement.github.io/blob/master/site.js#L103)
to see how to add this kind of data.

## Base template

This site is based on
[github.com/t413/SinglePaged](https://github.com/t413/SinglePaged).
