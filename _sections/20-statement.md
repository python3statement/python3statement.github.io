---
title: statement
bg: '#4da45e'
color: white
---

# Moving to require Python 3

Almost all major open souce Python packages now support
both Python 3.x and Python 2.7, and many projects have been supporting these
two versions of the language for several years. While we have developed tools
and techniques to maintain compatibility efficiently, it is a small but
constant friction in the development of a lot of code.

We are keen to use Python 3 to its full potential, and we currently accept the
cost of writing cross-compatible code to allow a smooth transition, but we
don’t intend to maintain this compatibility indefinitely. Although the
transition has not been as quick as we hoped, we do see it taking place, with
more and more people using, teaching and recommending Python 3.

The developers of the Python language extended support of Python 2.7 from 2015
to 2020, recognising that many people were still using Python 2. We believe
that the extra 5 years is sufficient to transition off of Python 2, and our
projects plan to stop supporting Python 2 when upstream support ends in 2020,
if not before. We will then be able to simplify our code and take advantage of
the many new features in the current version of the Python language and
standard library.

In addition, significantly before 2020, many of our projects will step down
Python 2.7 support to only fixing bugs, and require Python 3 for all new
feature releases. Some projects have already made this transition.
This too parallels support for the language itself, as Python
2.7 releases only include bugfixes and security improvements.

Third parties may offer paid support for our projects on old Python versions
for longer than we support them ourselves. We won’t obstruct this, and it is a
core principle of free and open source software that this is possible. However,
if you enjoy the free, first party support for many projects including the Scientific
Python stack, please start planning to move to Python 3.

For all of these reasons, the following projects have pledged to **drop support
for Python 2.7 no later than 2020**, coinciding with the Python development
team's [timeline for dropping support for Python
2.7](https://www.python.org/dev/peps/pep-0373/#update).
