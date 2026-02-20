![Banner](https://raw.githubusercontent.com/ktmcp-cli/rapidapi/main/banner.svg)

> "Six months ago, everyone was talking about MCPs. And I was like, screw MCPs. Every MCP would be better as a CLI."
>
> — [Peter Steinberger](https://twitter.com/steipete), Founder of OpenClaw
> [Watch on YouTube (~2:39:00)](https://www.youtube.com/@lexfridman) | [Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger/)

# IdealSpot GeoData CLI

> **⚠️ Unofficial CLI** - Not officially sponsored or affiliated with IdealSpot GeoData.

A production-ready command-line interface for IdealSpot GeoData — hyperlocal demographics and market intelligence. Access powerful API features directly from your terminal.

## Features

- **Demographics** — Get hyperlocal demographic data
- **Traffic Analysis** — Vehicle traffic and foot traffic data
- **Market Signals** — Economic and market intelligence
- **Boundaries** — Geographic boundary data
- **JSON output** — All commands support `--json` for scripting
- **Colorized output** — Clean terminal output with chalk

## Installation

```bash
npm install -g @ktmcp-cli/rapidapi
```

## Quick Start

```bash
# Configure with your API key
rapidapi config set --api-key YOUR_API_KEY

# List items
rapidapi list

# Get item details
rapidapi get ITEM_ID

# JSON output
rapidapi list --json
```

## Commands

### Config

```bash
rapidapi config set --api-key <key>
rapidapi config set --base-url <url>
rapidapi config show
```

### Items

```bash
rapidapi list
rapidapi list --json
rapidapi get <id>
rapidapi get <id> --json
```

## JSON Output

All commands support `--json` for structured output:

```bash
rapidapi list --json | jq '.items[]'
rapidapi get ITEM_ID --json | jq '.data'
```

## Why CLI > MCP?

No server to run. No protocol overhead. Just install and go.

- **Simpler** — Just a binary you call directly
- **Composable** — Pipe to `jq`, `grep`, `awk`
- **Scriptable** — Works in cron jobs, CI/CD, shell scripts

## License

MIT — Part of the [Kill The MCP](https://killthemcp.com) project.
