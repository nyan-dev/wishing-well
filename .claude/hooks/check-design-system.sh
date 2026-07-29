#!/bin/bash
FILE="$1"
VIOLATIONS=0

check() {
  if grep -nE "$1" "$FILE" > /dev/null; then
    echo "⚠️  DESIGN.md violation in $FILE: $2"
    VIOLATIONS=1
  fi
}

check "linear-gradient|radial-gradient" "No CSS gradients allowed on pixel-art surfaces (use color ramps/dithering)"
check "border-radius:\s*[1-9]" "No rounded corners on game-object sprites/panels (use pixel-notch corners)"
check "box-shadow:.*[0-9]+px [0-9]+px [0-9]+px [0-9]+px" "No blurred box-shadow — use hard-offset pixel shadows (e.g. 4px 4px 0)"
check "font-family:\s*(Inter|Helvetica|Arial|system-ui)" "No modern sans-serif fonts — use pixel fonts (Press Start 2P, VT323)"

if [ $VIOLATIONS -eq 1 ]; then
  echo "❌ Fix violations above before proceeding — see DESIGN.md section 11."
  exit 1
else
  echo "✅ CSS passes DESIGN.md checks."
fi