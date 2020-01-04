---
title: statement
bg: '#4da45e'
color: white
---

# Moving to require Python 3

Almost all major open source Python packages now support
both Python 3.x and Python 2.7, and many projects have been supporting these
two versions of the language for several years. While we have developed tools
and techniques to maintain compatibility efficiently, it is a small but
constant friction in the development of a lot of code.

We are keen to use Python 3 to its full potential, and though 
we accepted the cost of writing cross-compatible 
code to allow a smooth transition, we
did not intend to maintain this compatibility indefinitely. Although the
transition was not as quick as we hoped, it is taking place, with
more and more people using, teaching and recommending Python 3.

The developers of the Python language extended support of Python 2.7 from 2015
to January 1, 2020, recognising that many people were still using Python 2. We believe
that the extra 5 years was sufficient to transition off of Python 2, and 
now that upstream support has ended, our
projects have stopped supporting Python 2 or will do so before the end of 2020. 
We will thus be able to simplify our code and take advantage of
the many new features in the current version of the Python language and
standard library.

Third parties may offer paid support for our projects on old Python versions
for longer than we support them ourselves. We won’t obstruct this, and it is a
core principle of free and open source software that this is possible. However,
if you enjoy the free, first party support for many projects including the Scientific
Python stack, please move to Python 3.

For all of these reasons, the following projects have pledged to **drop support
for Python 2.7 no later than 2020**, following the [end of support for Python
2.7 itself](https://www.python.org/dev/peps/pep-0373/#update) at the start of
the year.
