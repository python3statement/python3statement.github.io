---
---


Add note here to explain that this does _not_ prevent _nor_ discourage library
author to release 2 version of their software one Python 3 only and the other
python 2. 

This actually made the above easier and less-likely to break. 


# As a user

If you are already a Python 3 user, you should not encounter a lot of
disruption. Please check that the libraries you use follow best practices not
to break for Python 3 users.

Make sure you have Pip >= 9.0

If you are using a custom local package index, for example if you are working
at a company, make sure it implement correctly pep-512 and let pip knows about
the `python_requires` field.




# Preparing your library

Things to speak about:

- Be on recent enough setuptools, since [This
  PR](https://github.com/pypa/setuptools/pull/631), 24.2.0 (or above, July 20,
  2016, Xavier Fernandez PR.)

  Add the followign to your setup.py

```
  setup(
      ...
      python_requires='>=3.3'
      ...
  )
```

change >=



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



# Mitigations

- Leave `setup.py` python 2 compatible and fail early. If you detect Python 2
  raise a clear error message and ask user to make sure they have pip >9.0 (or
  migrate to Python 3). You can (try to) conditionally import pip and check for
  its version but this might not be the same pip. 

- If you control dependant packages, Make sure to include conditional
  dependencies depending on the version of Python.




