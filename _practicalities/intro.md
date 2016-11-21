---
---


Add note here to explain that this does _not_ prevent _nor_ discourage library
author to release 2 version of their software one Python 3 only and the other
python 2. 

This actually made the above easier and less-likely to break. 


# As a user

## Install Pip 9.0

If you are already a Python 3 user, you should not encounter a lot of
disruption. Please still check that the libraries you use follow best practices
not to break for Python 2 users. Python is a community regardless of which
python version you have to a decide to run, making sure that things works make
the community strong.

Make sure you have Pip >= 9.0, this is especially important if you have Python
2 installations. Having pip 9.0+ will not insure that you install will not
break, but they are more likely not to. Having a version off pip <9.0 can lead
your system to try to upgrade to non-compatible versions of Python packages
even if these are marked as non-compatible.

Make as many other _users_ as possible to install pip >=9.0, for the
transition, it is the slowest part of the ecosystem to update, and is the only
piece that concern all all installations.

## Setuptools

If you are on a system that will not install python wheel and use `setuptools`,
make sure you have setuptools >=24.2.0, or building Python 3 only libraries
might fail, even on Python 2.

## Local package index

If you are using a custom local package index, for example if you are working
at a company with private packages, make sure it implement correctly pep-503
and let pip knows about the `python_requires` field.

## The state of PyPI

Note that at the time of this writing the patches to `pypi.python.org` are not
deployed yet but should hopefully be deployed soon.


# Preparing your library



As a library author one of the most important factor in a smooth transition is
planning and communication, letting your user base know in advance that the
transition is happening and what step to take is critical for a transition.

For your library code here the steps you need to take to ensure that
installation will fail in the least number of case:

You need to release your new packages version with [setuptools] version 24.2.0
or above, or use one of the alternate package manager that can set the
[`python_require`] metadata field. Without this, pip 9.0 **will try** to
install non-compatible version of your software on Python 2. This version of
setuptools is recent (July 20, 2016) and this possible thank to the [work of
Xavier Fernandez](https://github.com/pypa/setuptools/pull/631)

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

This will make [PyPI aware](linkto mike's PR on warehouse) that your package is
Python 3 only, and [allow pip](link to pip's PR) to be [made aware of this](link to PyPI PR).


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
  You are _allowed_ to use multiline strings in error messages.


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

Use the followign to check pip version

You have various choices:

- You can still install an older version of Frobulator:
 $ pip install frobulator<6.0

- Upgrade your system to use Python 3.

It would be great if you can figure out how this version ended up being
installed, and try to check how to prevent that for future users.

This  this page for more information : url to here for example.
""")

    

- Make sure your version number match pep440 or you will get surprises during
  beta in particular as the `sdist` and `wheel` will appear as being different
  versions, in particular sdist (during beta/rc/post) might appear with a
  greater version number than wheels... and pip will try to install the sdist
  instead of the wheel... The regular expression is trickier than expected:

  `^([1-9]\\d*!)?(0|[1-9]\\d*)(\\.(0|[1-9]\\d*))*((a|b|rc)(0|[1-9]\\d*))?(\\.post(0|[1-9]\\d*))?(\\.dev(0|[1-9]\\d*))?`

- depend on setuptools greater than 24.3



# Recommende Mitigations

Of course regardless of all the care you will take for your library to no break
and to install only on python 2, you will likely have cases where it still end
up being installed on incompatible versions of Python. Simply because users
upgrades rarely and only an old version of pip or setuptools is enough to make
the all update process broken.

- Leave `setup.py` python 2 compatible and fail early. If you detect Python 2
  raise a clear error message and ask user to make sure they have pip >9.0 (or
  migrate to Python 3). You can (try to) conditionally import pip and check for
  its version but this might not be the same pip. 

- If you control dependant packages, Make sure to include conditional
  dependencies depending on the version of Python.


# Non recommended mitigation

This is a collection of "mitigation" or "solutions" you will find on the web
and that you will hear about. This is an attempt to acknowlege them, and
explain why they can't work and what are their drawbacks before you attempt to
implement them.

### Use a meta-package.




# Why all that ?

You might wonder why all thi, it's 2016 already, so how come all these issues ?
Python 3 has been out for 8+ years now !

Well there are many reasons to this, 

