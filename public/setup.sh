#!/bin/bash
# Shiphaus Setup Script
# Installs Claude Code on macOS.
# Usage: curl -fsSL https://shiphaus.org/setup.sh | bash

set -e

# ─── Colors ───────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

# ─── Helpers ──────────────────────────────────────────────────────────────────
success() { echo -e "  ${GREEN}✓${RESET} $1"; }
info()    { echo -e "  ${BLUE}→${RESET} $1"; }
fail()    { echo -e "  ${RED}✗${RESET} $1"; }

die() {
  fail "$1"; shift
  for line in "$@"; do echo -e "     $line"; done
  echo ""; exit 1
}

# ─── Welcome ──────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}  Shiphaus Setup${RESET}"
echo -e "${DIM}  Getting your computer ready for Claude Code${RESET}"
echo ""

# ─── OS Check ─────────────────────────────────────────────────────────────────
if [[ "$(uname -s)" != "Darwin" ]]; then
  die "This script supports macOS only." \
    "Check the Claude Code docs for installation instructions:" \
    "${BLUE}https://code.claude.com/docs/en/overview${RESET}"
fi

# ─── Install Claude Code ─────────────────────────────────────────────────────
claude_bin=""
for candidate in "$(command -v claude 2>/dev/null)" "$HOME/.local/bin/claude" "/opt/homebrew/bin/claude" "/usr/local/bin/claude"; do
  if [[ -x "$candidate" ]]; then claude_bin="$candidate"; break; fi
done

if [[ -n "$claude_bin" ]]; then
  version=$("$claude_bin" --version 2>/dev/null || echo "installed")
  success "Claude Code already installed (${DIM}${version}${RESET})"
else
  info "Installing Claude Code..."
  curl -fsSL https://claude.ai/install.sh | bash \
    || die "Could not install Claude Code." \
         "Try running ${DIM}curl -fsSL https://claude.ai/install.sh | bash${RESET} yourself."
  success "Claude Code installed!"
fi
echo ""

# ─── Done ─────────────────────────────────────────────────────────────────────
echo -e "${BOLD}  All done!${RESET}"
echo ""
echo -e "  Open your terminal and type ${BOLD}claude${RESET} to get started."
echo ""
echo -e "  You'll be prompted to sign in with your Claude account on first launch."
echo ""
echo -e "  ${DIM}Learn more: https://code.claude.com/docs/en/overview${RESET}"
echo ""
