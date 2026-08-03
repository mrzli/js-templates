#!/usr/bin/env bash
set -euo pipefail

KEEP=(.git .github .setup .vscode docs)
DRY_RUN=false

if [[ "${1-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

echo "Resetting project at: $ROOT"
if [[ "$DRY_RUN" == true ]]; then
  echo "(dry run - nothing will be deleted)"
  echo
else
  echo
fi

should_keep() {
  local entry_name="$1"

  for keep_name in "${KEEP[@]}"; do
    if [[ "$entry_name" == "$keep_name" ]]; then
      return 0
    fi
  done

  return 1
}

while IFS= read -r -d '' entry_path; do
  entry_name="$(basename "$entry_path")"

  if should_keep "$entry_name"; then
    printf '  kept     %s\n' "$entry_name"
    continue
  fi

  if [[ "$DRY_RUN" == false ]]; then
    rm -rf -- "$entry_path"
  fi

  printf '  removed  %s\n' "$entry_name"
done < <(find "$ROOT" -mindepth 1 -maxdepth 1 -printf '%f\0' | sort -z | while IFS= read -r -d '' name; do
  printf '%s\0' "$ROOT/$name"
done)

echo
echo "Done."