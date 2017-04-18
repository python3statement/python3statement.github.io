---
bg: '#4da45e'
color: white
title: practicalities
fa-icon: pencil
id: bar
---

We do not discourage authors to release software on Python 2. While this guide
is mostly written with the assumption that software are going to stop Python 2
support, it does perfectly apply to a package that wish to not support Python 3,
or is stopping support for any minor version. 


This page gather information and links to resources allowing to release a
library that stop supporting an older version of Python without causing too
much disruption for users who haven't upgraded to this new version.

Whether you are a user, or a developer, being aware of the issue listed here, at
least the main points should ease lots of the pain.

# Too long, did not read:

 - Help and encourage users to install **pip 9.0+**
 - Help and encourage users to install **setuptools 24.3+**
 - As maintainer use `setup(..., python_requires='>=3.4')` new option.
 - do use `pip install [-e] .` and do **not** invoke `setup.py` directly.
 - **Fail** early at **install time** if on Python 2.
 - We are giving a talk at PyCon 2017 (likely recorded), add link here. 

## The problem

Up until December 2016 it was hard to publish a new major version of library
that changed requirements in Python version and mark it as such so that user
system will not try to upgrade said library.

With the recent changes in Python packaging this is now possible.

As an example let's look at the example of the `fictitious` library.

- `fictitious` 1.1, 1.2, 1.3, 1.4 are compatible Python 2.7 and 3.3+
- `fictitious` 2.0 has been released and is python 3.4+ only.

As a Python 2.7 user, if I don't pay attention, or if the library is not
correctly tagged, if I issue the following:

    $ python -c 'import fictitious; print(fictitious.__version__)'
    1.3.2
    $ pip install fiction --upgrade

Either my system will install 2.0, which will not work, on the worst case
scenario, or fail to install, in which case I will not get the critical 1.4
upgrade.

## As a user

### Install Pip 9.0

If you are already a Python 3 user, you should not encounter a lot of
disruption. Please still check that the libraries you use follow best practices
not to break for Python 2 users. Python is a community regardless of which
python version you have to (or decided to) run, making sure that everything
works make the community strong.

Make sure you have Pip >= 9.0, this is especially important if you have Python
2 installations. Having pip 9.0+ is not a guaranty to flawless upgrade. But pip
9.0+ does have a number of safety check not available on previous versions.

Having a version of pip < 9.0 can lead your system to try to upgrade to
non-compatible versions of Python packages even if these are marked as
non-compatible.

Help as many other _users_ as possible to install pip >=9.0, for the
transition, it is the slowest part of the ecosystem to update, and is the only
piece that requires action of all Python users.

The simplest way to make sure all is up to date is to run the following for
each installation of Python:

    $ pip install --upgrade setuptools pip

This will install the latest version of pip and setuptools.

You can issue the following to see the version of pip:

   $ pip --version
   9.0.0

All good.



## Setuptools

If you are on a system  for which no wheel is available, pip will try to
install a source distribution (aka `sdist`).

Installing an `sdist` will require setuptools make sure you have setuptools
`>=24.2.0` or building Python 3 only libraries is likely to fail. In particular
if library authors have taken time to mark their library as Python 3 only, the
`python_requires` argument to `setup()` may not be recognized and installation
will fail.

Use the following to check setuptools version :

    $ python -c 'import setuptools; print(setuptools.__version__)
    24.2.0

Again make sure to upgrade pip and setuptools to make sure you have an up to
date system:

    $ pip install --upgrade setuptools pip

## Local package index

If you are using a custom local package index, for example if you are working
at a company with private packages, make sure it implement correctly
[pep-503](https://www.python.org/dev/peps/pep-0503/) and let pip knows about
the `python_requires` field. This _mostly_ mean that the html you are exposing
should get a `data-python-requires` data attribute with the (html escaped)
version specifier.

## The state of PyPI

Note that at the time of this writing the patches to `pypi.python.org` are not
deployed yet but should hopefully be deployed soon.

[Warehouse](https://github.com/pypi/warehouse) and [Legacy
PyPI](https://github.com/pypa/legacy-pypi) have received various patches to
insure they support this new functionality.

# Preparing your library


As a library author one of the most important factor in a smooth transition is
planning and communication, letting your user base know in advance that the
transition is happening and what step to take is critical for a transition.

For your library code here the steps you need to take to ensure that
installation will fail in the least number of case:

You need to release your new packages version with
[setuptools](https://pypi.python.org/pypi/setuptools) version 24.2.0 or above.
You can also use one of the alternate package manager that can set the
[Requires-Python](https://www.python.org/dev/peps/pep-0345/#requires-python)
metadata field. Without this, pip 9.0 **will try** to install non-compatible
version of your software on Python 2. This version of setuptools is recent
(July 20, 2016) and this possible thank to the [work of Xavier
Fernandez](https://github.com/pypa/setuptools/pull/631)

Add the following to your `setup.py`

```
setup(
   ...
   python_requires='>=3.3'
   ...
)
```

Change `>=3.3` accordingly depending on what version your library decides to
support. In particular you can use `>=2.6` or `>=3.5` ! Note that this also
support the _compable with_ syntax: `~=2.5` (meaning, `>=2.5` and `<3`).

This will make [PyPI aware](https://github.com/pypa/warehouse/pull/1448) that
your package is Python 3.3+ only, and [allow
pip](https://github.com/pypa/pip/pull/3877) to be [made aware of
this](https://github.com/pypa/pypi-legacy/pull/506).

Thus as long as your user have recent enough versions of pip and setuptools
they will get the right version of your library.

# Unit Testing and documentation

It is recommended **not** to invoke `setup.py` directly either with `install` or
`develop` subcommands. These may not correctly resolve dependencies, and can
install incompatible versions of dependencies. Please recommend and use `pip
install . `  and `pip install -e .` for regular and developer install.

Check in scripts, and documentation that the correct installation command is
used. 

# Recommended Mitigations

These are not mandatory but should make the transition seamless by warning your
user early enough _and_ providing useful error messages.

## Runtime warning on master

Add a warning at _runtime_ early on master (before switching to Python 3
  only)

```
import warnings
import sys
if sys.version_info < (3,):
    warnings.warn('You are using master of `Frobulator` with Python 2. '
                  'Frobulator will soon be Python 3 only. '
                  'See this issue to know more.',
                  UserWarning)
```

Your Python 2 user have a chance to upgrade, or get off master, (for example on
the LTS branch).

## Fail early at import time

Add an error early at import at runtime with a clear error message, leave the
early import compatible Python 2 for users to not be welcomed with a useless
`SyntaxError`. Don't hesitate to use multi-line strings in error messages.

Error at import time _will_ happen on system with old version of pip and
setuptools. Keep in mind that saying the package is Python 3 only is not a lot
more helpful than a Syntax error. The most reasonable reason would be out of
data pip and setuptools:


```
import sys

if sys.version_info < (3,):
    raise ImportError(
    """You are running Frobulator 6.0 on Python 2

Unfortunately Frobulator 6.0 and above are not compatible with Python 2
anymore, and you still ended up with this version installed on your system.
That's a bummer. Sorry about that. It should not have happened. Make sure you
have pip >= 9.0 to avoid this kind of issues, as well as setuptools >= 24.2:

 $ pip install pip setuptools --upgrade

You have various other choices

- install an older version of Frobulator:

 $ pip install 'frobulator<6.0'

- Upgrade your system to use Python 3.

It would be great if you can figure out how this version ended up being
installed, and try to check how to prevent that for future users.

See the following url for more up to date informations:

https://i.am.an/url

""")

```

## Watch out for beta releases


Make sure your version number match pep 440 or you will get surprises during
beta in particular as the `sdist` and `wheel` will appear as being different
versions, in particular sdist (during beta/rc/post) can appear with a greater
version number than wheels. Pip thus try to install the sdist instead of the
wheel, which have more chance of failing, in particular with pre 24.2 versions
of setuptools.

The regular expression to check for validity of pep440 can be find below:

  `^([1-9]\\d*!)?(0|[1-9]\\d*)(\\.(0|[1-9]\\d*))*((a|b|rc)(0|[1-9]\\d*))?(\\.post(0|[1-9]\\d*))?(\\.dev(0|[1-9]\\d*))?`


## fail early in setup.py

Leave `setup.py` python 2 compatible and fail early. If you detect Python 2
raise a clear error message and ask user to make sure they have pip >9.0 (or
migrate to Python 3). You can (try to) conditionally import pip and check for
its version but this might not be the same pip. Failing early is important to
make sure the Python installation does not install an incompatible version.
Otherwise user code can fail at runtime arbitrary later in the future, which can
be a difficult to debug and fix. Get inspiration from the message of failure at
runtime, and adapt for installation time.

## Fix dependant libraries

If you control dependant packages, Make sure to include conditional dependencies
depending on the version of Python.

# Non recommended mitigations

This is a collection of "mitigation" or "solutions" you will find on the web
and that you will hear about. This is an attempt to acknowledge them, and
explain why they can't work and what are their drawbacks before you attempt to
implement them.

### Use a meta-package.

It is possible to release a meta-package that has _virtually_ no code and rely
on conditional dependency to install its actual core code on the user system.
For example, Frob-6.0 could be a meta-package which depends on
Frob-real-py2 on Python <3.0, and Frob-real-py3 on Python >= 3.4. While
this approach is _doable_ this can make imports confusing.

## Depend on setuptools

You can mark your library as dependent on setuptools greater than 24.3 this
will insure that during the next upgrade (when the packages drop python 2
support) will have the right version of setuptools.

Of course regardless of all the care you will take for your library to no break
and to install only on python 2, you will likely have cases where it still end
up being installed on incompatible versions of Python. Simply because users
upgrades rarely and only an old version of pip or setuptools is enough to make
the all update process broken.

Plus setuptools is rarely an actual dependency of your project but a
requirement to build wheels.


### Multiple Sdist.

Pip (used to) support a "feature" where a sdist ending in `-pyX.Y.tar.gz` would
only be seen as compatible on Python X.Y, thus it used to be possible to
publish multiple sdist of a package targeting various python version.

Though it is not possible anymore to upload multiple sdist on PyPI. This
solution is thus not possible.

### Wheel only ?

Releasing a package only using wheel for a given python version is doable, but
this will break downstream packages that may require the original source to
reproduce the build.

# Why all that ?

You might wonder why all this, it's 2016 already, so how come all these
issues ? Python 3 has been out for 8+ years now !

Well there are many reasons to this, first of all, this issue mostly affect
libraries that are currently python 2 and Python 3 compatible at the same time.
Many libraries have transitioned from Python 2-only to Python 2 + 3. And the
issue of transitioning to Python 3 only is relatively recent. Technically it
can also apply to libraries that are only stopping support for 2.6, or even are
already Python 3 only, but are starting to stop support for earlier versions of
Python. For example a library releasing a Python 3.4+ only version.

Python 3.3 was release at the end of 2012, and was the first version to
support (again) `u` as a prefix for Unicode string. It was one of the first
minor version of Python 3 that saw a majority of single-source project working
both on Python 2 and Python 3. These are the Project that will likely be
affected by this issue.

The introduction of Python 3 was chaotic, there are still strong argument both
in Python 2 and Python 3 camps. In the one suffering the most from this are
users. Starting with the fact that inevitably some libraries will stop support
for Python 2 and release Python 3 only library. And that inevitably some system
will will not be upgraded to Python 3 how can we _ensure_ that users get the
_least_ breakage as possible ? And what are the best practices to follow.
