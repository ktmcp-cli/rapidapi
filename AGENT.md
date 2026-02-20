# AGENT.md — IdealSpot GeoData CLI for AI Agents

This document explains how to use the IdealSpot GeoData CLI as an AI agent.

## Overview

The `rapidapi` CLI provides hyperlocal demographics and market intelligence via the IdealSpot GeoData API.

## Prerequisites

```bash
rapidapi config set --api-key <key>
```

## All Commands

### Config

```bash
rapidapi config set --api-key <key>
rapidapi config set --base-url <url>
rapidapi config show
```

### Items

```bash
rapidapi list                      # List all items
rapidapi list --json               # JSON output
rapidapi get <id>                  # Get item details
rapidapi get <id> --json           # JSON output
```

## Tips for Agents

1. Always use `--json` when parsing results programmatically
2. Use `rapidapi list --json` to get all items as structured data
3. Use `rapidapi get <id> --json` for detailed item information
4. All commands return structured data suitable for automation
