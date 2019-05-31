with open('_sections/30-projects.md') as f: 
    data = f.read()



import re
import sys
import requests
import requests_cache

requests_cache.install_cache('cache')

token = None
if len(sys.argv) == 2:
    token = sys.argv[1]


headers = {}
if token:
    headers = {
        "Authorization": f"token {token}"
    }

match = re.compile('github.com/([a-zA-Z0-9-]+)/([0-9a-zA-Z-._]+)/?')

with open('_sections/30-projects.md','w') as f: 

    for line in data.splitlines():
        if not 'github' in line:
            f.write(line+'\n')
            continue

        m = match.findall(line)
        if m: 
            print('.', end='')
            sys.stdout.flush()
            org,repo = m[-1]
            url = f'https://api.github.com/repos/{org}/{repo}'
            info = requests.get(url, headers=headers).json()
            llll  =     line.split(' <!')[0]
            # do not write url:.... if the link url match the same.
            # if len(m) == 2:
            #     if m[1] == m[0]:
            #         f.write(llll + f" <!-- sg:{info['stargazers_count']} -->\n")
            #         continue
            f.write(llll + f" <!-- url:https://github.com/{org}/{repo} sg:{info['stargazers_count']} -->\n")
        else:
            f.write(line+'\n')
                    


