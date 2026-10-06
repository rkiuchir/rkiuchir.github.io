#!/bin/sh
# Compatibility entry point; keep publication logic in deploy.sh.
set -eu
exec sh "$(dirname "$0")/deploy.sh" "$@"
