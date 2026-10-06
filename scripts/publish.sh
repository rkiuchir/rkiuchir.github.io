#!/bin/sh
# Push reviewed commits on the current branch. GitHub Pages deployment is separate.
set -eu
cd "$(dirname "$0")/.."
branch=$(git symbolic-ref --quiet --short HEAD) || {
  echo "Cannot publish a detached HEAD. Switch to a branch first." >&2
  exit 1
}
if [ "$#" -ne 0 ]; then
  echo 'Usage: ./deploy.sh (commit your changes before running)' >&2
  exit 1
fi
if [ -n "$(git status --porcelain)" ]; then
  echo 'Uncommitted changes found. Review and commit them before publishing.' >&2
  exit 1
fi
git push --set-upstream origin "$branch"
