#!/usr/bin/env python3
import sys
import os
import re
import json
import subprocess
from pathlib import Path

def get_modified_files(before: str, after: str):
    if not before or before == '0' * 40:
        cmd = ['git', 'diff-tree', '--no-commit-id', '--name-only', '-r', after or 'HEAD']
    else:
        cmd = ['git', 'diff', '--name-only', before, after]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return [line.strip() for line in res.stdout.splitlines() if line.strip()]
    except Exception as e:
        print(f'Warning: git diff failed: {e}', file=sys.stderr)
        return []

def is_version_modified(before: str, after: str) -> bool:
    if not before or before == '0' * 40:
        cmd = ['git', 'diff-tree', '-p', after or 'HEAD', '--', 'package.json', '__CORECONTEXT_VERSION']
    else:
        cmd = ['git', 'diff', '-p', before, after, '--', 'package.json', '__CORECONTEXT_VERSION']
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        for line in res.stdout.splitlines():
            if line.startswith('+') and not line.startswith('+++'):
                if '"version":' in line:
                    return True
                # Direct version line in __CORECONTEXT_VERSION
                stripped = line.lstrip('+').strip()
                if re.match(r'^\d+\.\d+\.\d+', stripped):
                    return True
        return False
    except Exception:
        return False

def set_github_output(key: str, value: str):
    output_file = os.environ.get('GITHUB_OUTPUT')
    if output_file:
        with open(output_file, 'a', encoding='utf-8') as f:
            f.write(f'{key}={value}\n')
    print(f'{key}={value}')

def update_package_json(pkg_file: Path, new_ver: str):
    with open(pkg_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    data['version'] = new_ver
    with open(pkg_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        f.write('\n')

def main():
    pkg_file = Path('package.json')
    core_file = Path('__CORECONTEXT_VERSION')

    if not pkg_file.exists():
        print('Error: package.json not found', file=sys.stderr)
        sys.exit(1)

    with open(pkg_file, 'r', encoding='utf-8') as f:
        pkg_data = json.load(f)
    current_ver = pkg_data.get('version', '1.0.0').strip()

    before = os.environ.get('GITHUB_EVENT_BEFORE', '')
    after = os.environ.get('GITHUB_SHA', 'HEAD')

    version_manually_changed = is_version_modified(before, after)

    if version_manually_changed:
        print(f'[CoreCatalog Flow] Version manually specified in commit. Preserving: {current_ver}')
        new_ver = current_ver
        auto_bumped = False
    else:
        # Auto-bump patch version: major.minor.patch -> major.minor.(patch+1)
        match = re.match(r'^(\d+)\.(\d+)\.(\d+)(.*)$', current_ver)
        if match:
            major, minor, patch, suffix = match.groups()
            new_patch = int(patch) + 1
            new_ver = f'{major}.{minor}.{new_patch}{suffix}'
        else:
            new_ver = f'{current_ver}.1'

        print(f'[CoreCatalog Flow] Auto-bumping version: {current_ver} -> {new_ver}')
        update_package_json(pkg_file, new_ver)
        auto_bumped = True

    if core_file.exists() or auto_bumped:
        core_file.write_text(f'{new_ver}\n', encoding='utf-8')

    tag = f'v{new_ver}'
    set_github_output('version', new_ver)
    set_github_output('tag', tag)
    set_github_output('auto_bumped', 'true' if auto_bumped else 'false')

if __name__ == '__main__':
    main()
