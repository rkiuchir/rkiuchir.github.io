#!/bin/sh
# Compatibility entry point for the repository publication script.
set -eu
exec sh "$(dirname "$0")/scripts/publish.sh" "$@"
