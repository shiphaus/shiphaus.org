# Shiphaus Setup Script for Windows
# Installs Claude Code on your PC.
# Usage: irm https://shiphaus.org/setup.ps1 | iex

$ErrorActionPreference = "Stop"

function Write-Success($msg) { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Write-Info($msg)    { Write-Host "  ->  $msg" -ForegroundColor Cyan }
function Write-Fail($msg)    { Write-Host "  X   $msg" -ForegroundColor Red }

# Welcome
Write-Host ""
Write-Host "  Shiphaus Setup" -ForegroundColor White
Write-Host "  Getting your computer ready for Claude Code" -ForegroundColor DarkGray
Write-Host ""

# Install Claude Code
Write-Host "  Claude Code" -ForegroundColor White -NoNewline
Write-Host " (AI coding assistant)" -ForegroundColor DarkGray

$claudeCmd = Get-Command claude -ErrorAction SilentlyContinue
if ($claudeCmd) {
    Write-Success "Already installed"
} else {
    Write-Info "Installing Claude Code..."
    try {
        irm https://claude.ai/install.ps1 | iex
        Write-Success "Claude Code installed!"
    } catch {
        Write-Fail "Could not install Claude Code."
        Write-Host "     Try running: irm https://claude.ai/install.ps1 | iex" -ForegroundColor DarkGray
        Write-Host ""
        exit 1
    }
}
Write-Host ""

# Done
Write-Host "  All done!" -ForegroundColor White
Write-Host ""
Write-Host "  Open your terminal and type " -NoNewline
Write-Host "claude" -ForegroundColor White -NoNewline
Write-Host " to get started."
Write-Host "  You'll be prompted to sign in with your Claude account on first launch."
Write-Host ""
Write-Host "  Learn more: https://code.claude.com/docs/en/overview" -ForegroundColor DarkGray
Write-Host ""
