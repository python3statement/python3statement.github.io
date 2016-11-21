---
---
# As a user

If you are already a Python 3 user, you should not encounter a lot of
disruption. Please check that the libraries you use follow best practises not
to break for other users. 

Make sure you have Pip >= 9.0

If you are using a custom local package index, for example if you are working
at a company, make sure it implement correctly pep-512 and let pip knows about
the `python_requires` field.




# Preparing your library

Things to speak about:

- Be on recent enough setuptools
- Add a warning at _runtime_ early on master (before switching to Python 3
  only)
- Add an error early at import at runtime with a clear error message, leave the
  early import compatible Python 2 for user to not be welcomed with SyntaxError



# Mitigations

- Leave `setup.py` python 2 compatible and fail early. If you detect Python 2
  raise a clear error message and ask user to make sure they have pip >9.0 (or
  migrate to Python 3). You can (try to) conditionally import pip and check for
  its version but this might not be the same pip. 

- If you control dependant packages, Make sure to include conditional
  dependencies depending on the version of Python.




