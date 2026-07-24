# Memory Bank Index

## Purpose

This file is the quick navigation and precedence guide for all memory-bank documents.

## Documents

- projectBrief.md: Product scope, goals, users, KPIs, and success criteria.
- productContext.md: Product behavior, audience workflows, and information architecture.
- uxVision.md: UX principles, layout priorities, interaction behavior, and writing style.
- techContext.md: Technical stack, route model, data model expectations, and implementation constraints.
- systemPatterns.md: Architecture layers, folder patterns, and component or logic separation rules.
- dataFlowPattern.md: End-to-end data pipeline from mock inputs to ranked insights and UI outputs.

## Precedence Rules

When two documents conflict, resolve in this order:

1. techContext.md for implementation and technical architecture decisions.
2. uxVision.md for user experience and interaction design decisions.
3. systemPatterns.md for module boundaries and code organization patterns.
4. dataFlowPattern.md for transformation and processing sequence.
5. productContext.md for workflow framing and page-level intent.
6. projectBrief.md for high-level scope and business narrative.

## Conflict Resolution Guidance

- If stack or folder guidance conflicts, follow techContext.md.
- If visual hierarchy conflicts, follow uxVision.md.
- If a flow step is unclear, follow dataFlowPattern.md and keep it consistent with systemPatterns.md.
- If any lower-priority file introduces a contradictory requirement, treat it as outdated and update that file.

## Maintenance Rules

- Update this index when adding or removing memory-bank docs.
- Keep cross-references synchronized after major architecture changes.
- Prefer concise updates over duplicating the same guidance across files.
