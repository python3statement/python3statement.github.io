with open('_sections/30-projects.md') as f: 
    data = f.read()



import re
import sys
import requests
import requests_cache


match = re.compile('sg:(\d+)')
def make_groups(lines):
    # assume first line does not match
    matching = True
    groups = []
    loc = []
    for l in lines:
        if (len(match.findall(l)) == 0) != matching:
            matching = not matching
            if loc:
                groups.append((matching, loc))
            loc = []
        loc.append(l)
    if loc:
        groups.append((not matching, loc))
    return groups


with open('_sections/30-projects.md','w') as f: 

    groups = make_groups(data.splitlines())
    for m,g in groups:
        if m:
            g = sorted(g, key=lambda s:int(match.findall(s)[0]), reverse=True)
        for l in g:
            f.write(l + '\n')






