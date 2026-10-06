#!/usr/bin/env python3
"""Check local file references without fetching remote resources."""
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        for key in ('href', 'src'):
            if attributes.get(key):
                self.references.append(attributes[key])
        if tag == 'meta' and attributes.get('http-equiv', '').lower() == 'refresh':
            match = re.search(r'url\s*=\s*(.*)', attributes.get('content', ''), re.I)
            if match:
                self.references.append(match.group(1).strip(' \"\''))


def main():
    errors = []
    checked = 0
    for path in sorted(ROOT.rglob('*')):
        relative = path.relative_to(ROOT)
        if '.git' in relative.parts or path.suffix not in ('.html', '.css'):
            continue
        content = path.read_text(encoding='utf-8')
        if path.suffix == '.html':
            scan = References()
            scan.feed(content)
            references = scan.references
        else:
            references = [value.strip(' \"\'') for value in re.findall(r'url\(([^)]+)\)', content)]
        checked += 1
        for value in references:
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path:
                continue
            target = (ROOT / unquote(url.path).lstrip('/') if url.path.startswith('/')
                      else path.parent / unquote(url.path))
            if not target.exists():
                errors.append('{}: {}'.format(relative, value))
    for error in sorted(set(errors)):
        print('MISSING ' + error)
    print('Checked {} HTML/CSS files; {} missing references.'.format(checked, len(set(errors))))
    return 1 if errors else 0


if __name__ == '__main__':
    raise SystemExit(main())
