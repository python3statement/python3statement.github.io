---
---

Add note here to explain that this does _not_ prevent _nor_ discourage library
author to release 2 version of their software one Python 3 only and the other
python 2. 

This actually made the above easier and less-likely to break. 


Too long, did not read:

 - Help and encourage users to install **pip 9.0+**
 - Help and encourage users to install **setuptools 24.3+**
 - Use **`setup(..., python_requires='>=3.3')`** new option.
 - **Fail** early at **install time** if on Python 2.


# As a user

## Install Pip 9.0

If you are already a Python 3 user, you should not encounter a lot of
disruption. Please still check that the libraries you use follow best practices
not to break for Python 2 users. Python is a community regardless of which
python version you have to a decide to run, making sure that things works make
the community strong.

Make sure you have Pip >= 9.0, this is especially important if you have Python
2 installations. Having pip 9.0+ will not insure that you install will not
break, but they are more likely not to. Having a version off pip < 9.0 can lead
your system to try to upgrade to non-compatible versions of Python packages
even if these are marked as non-compatible.

Help as many other _users_ as possible to install pip >=9.0, for the
transition, it is the slowest part of the ecosystem to update, and is the only
piece that concerns all installations.

The simplest way to make sure all is up to date is to run the following for
each installation of Python:

    pip install --upgrade setuptools pip

This will install the latest version of pip and setuptools.

You can issue the following to see the version of pip:

   pip --version



## Setuptools

If you are on a system that will not install python wheel and use `setuptools`,
make sure you have setuptools >=24.2.0, or building Python 3 only libraries
might fail. In particular if authors have taken time to mark their library as
Python 3 only,  the `python_requires` argument to `setup()` will not be
recognize and installation will fail.

Use the following to check setuptools version :

    python -c 'import setuptools; print(setuptools.__version__)

Again make sure tu upgrade pip and setuptools to make sure you have an up to
date system:

    pip install --upgrade setuptools pip

## Local package index

If you are using a custom local package index, for example if you are working
at a company with private packages, make sure it implement correctly
[pep-503](https://www.gg python.org/dev/peps/pep-0503/) and let pip knows about
the `python_requires` field.

## The state of PyPI

Note that at the time of this writing the patches to `pypi.python.org` are not
deployed yet but should hopefully be deployed soon.


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

Changes `>=3.3` accordingly depending on what version your library decides to
support.

This will make [PyPI aware](https://github.com/pypa/warehouse/pull/1448) that
your package is Python 3 only, and [allow
pip](https://github.com/pypa/pip/pull/3877) to be [made aware of
this](https://github.com/pypa/pypi-legacy/pull/506).


- Add a warning at _runtime_ early on master (before switching to Python 3
  only)

```
import warnings
import sys
if sys.version_info < (3,):
    warnings.warn('You are using master of `Frobulator` with Python 2. Frobulator will soon be Python 3 only. See this issue to know more.', UserWarning)
else:

```

- Add an error early at import at runtime with a clear error message, leave the
  early import compatible Python 2 for users to not be welcomed with a useless `SyntaxError`.
  You are _allowed_ to use multi-line strings in error messages.


```
import sys

if sys.version_info < (3,):
    Raise ValueError(
    """You are running Frobulator 6.0 on Python 2

Unfortunately Frobulator 6.0 and above re not compatible with Python 2 anymore,
and you still ended up with this version installed on your system. That's a
bummer sorry about that it should not have happen. Make sure you have pip >=
9.0 to avoid this kind of issues:

 $ pip install pip --upgrade

Use the following to check pip version

You have various choices:

- You can still install an older version of Frobulator:
 $ pip install frobulator<6.0

- Upgrade your system to use Python 3.

It would be great if you can figure out how this version ended up being
installed, and try to check how to prevent that for future users.

This  this page for more information : url to here for example.
""")

```

    

Make sure your version number match pep440 or you will get surprises during
beta in particular as the `sdist` and `wheel` will appear as being different
versions, in particular sdist (during beta/rc/post) can appear with a greater
version number than wheels. Pip thus try to install the sdist instead of the
wheel, which have more chance of failing, in particular with pre 24.2 versions
of setuptools.

The regular expression to check for validity of pep440 can be find below:

  `^([1-9]\\d*!)?(0|[1-9]\\d*)(\\.(0|[1-9]\\d*))*((a|b|rc)(0|[1-9]\\d*))?(\\.post(0|[1-9]\\d*))?(\\.dev(0|[1-9]\\d*))?`



You can mark your library as dependent on setuptools greater than 24.3 starting
now, this will insure that during the next upgrade (when the packages drop
python 2 support) will have the right version of setuptools.



# Recommended Mitigations

Of course regardless of all the care you will take for your library to no break
and to install only on python 2, you will likely have cases where it still end
up being installed on incompatible versions of Python. Simply because users
upgrades rarely and only an old version of pip or setuptools is enough to make
the all update process broken.

- Leave `setup.py` python 2 compatible and fail early. If you detect Python 2
  raise a clear error message and ask user to make sure they have pip >9.0 (or
  migrate to Python 3). You can (try to) conditionally import pip and check for
  its version but this might not be the same pip. Failing early is important to
  make sure the Python installation does not install and incompatible version. 
  Otherwise user code can fail at runtime arbitrary later in the future, which
  can be a difficult to debug and fix. 

- If you control dependant packages, Make sure to include conditional
  dependencies depending on the version of Python.

- Regardless of whether the installation step fails on Python 2, implement a
  similar check in the top level import of your package. 


# Alternative mitigation

This is a collection of "mitigation" or "solutions" you will find on the web
and that you will hear about. This is an attempt to acknowledge them, and
explain why they can't work and what are their drawbacks before you attempt to
implement them.

### Use a meta-package.

It is possible to release a meta-package that has _virtually_ no code and rely
on conditional dependency to install its actual core code on the user system.
For example, Frob-6.0 could be a meta-package which depends on
Frob-real-py2 on Python <3.0, and Frob-real-py3 on Python >= 3.4. While
this approach is _doable_ this can make import confusing.

Moreover, upgrading your package may need the user to explicitly tell pip to
upgrade dependencies as `pip install frob` will only upgrade the meta-package.

### Multiple Sdist.

Pip (used to) support a "feature" where a sdist ending in `-pyX.Y.tar.gz` would
only be seen as compatible on Python X.Y, thus it used to be possible to
publish multiple sdist of a package targeting various python version. 

Though it is not possible anymore to upload multiple sdist on PyPI. This
solution is thus not possible.

### Wheel only ?

Break downstream packages. 




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

Python 3.3 was release end of 2012, and was the first version to support
(again) `u` as a prefix for Unicode string. It was one of the first minor
version of Python 3 that saw a majority of single-source project working both
on Python 2 and Python 3. These are the Project that will likely be affected by
this issue. 

The introduction of Python 3 was chaotic, there are still strong argument both
in Python 2 and Python 3 camps. In the one suffering the most from this are
users. Starting with the fact that inevitably some libraries will stop support
for Python 2 and release Python 3 only library. And that inevitably some system
will will not be upgraded to Python 3 how can we _ensure_ that users get the
_least_ breakage as possible ? And what are the best practices to follow.


