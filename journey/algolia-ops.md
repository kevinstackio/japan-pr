# Algolia Ops Guide

## Scope

This document describes the current Algolia setup used by this project.

- Site: `https://japan.kevinstack.dev`
- Framework: VitePress
- Deploy target: GitHub Pages
- Search mode: Algolia DocSearch only
- Config principle: single entry, no fallback branch

## Source Of Truth

Only one runtime config entry:

1. `.vitepress/config.ts`

Automation entry:

1. `.github/workflows/deploy.yml`

Ignore build output under `.vitepress/dist` and dependency entries in `pnpm-lock.yaml`.

## Runtime Search Config (VitePress)

In `.vitepress/config.ts`, search provider is fixed to `algolia`.
`appId`, `apiKey`, and `indexName` are defined in this file as a single `algoliaConfig` object.

Also configured in `head`:

- `algolia-site-verification` meta tag for crawler/domain verification.

## CI/CD Config (GitHub Actions)

Workflow: `.github/workflows/deploy.yml`

### Reindex job

After deploy success, workflow triggers crawler reindex with:

- `ALGOLIA_CRAWLER_ID`
- `ALGOLIA_CRAWLER_USER_ID`
- `ALGOLIA_CRAWLER_API_KEY`

Auth mode is fixed to `Crawler User ID + API Key` (Basic Auth fallback is removed).
No skip branch is used. If secrets are invalid, workflow fails directly.

## Required GitHub Secrets

Set these in:
`GitHub Repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

Crawler reindex automation:

1. `ALGOLIA_CRAWLER_ID`
2. `ALGOLIA_CRAWLER_USER_ID`
3. `ALGOLIA_CRAWLER_API_KEY`

## Verification Checklist

1. Push to `main`.
2. Open GitHub Actions run for deploy workflow.
3. Confirm `Build VitePress site` is green.
4. Confirm `Deploy to GitHub Pages` is green.
5. Confirm `Trigger Algolia crawler reindex` is green.
6. Open `https://japan.kevinstack.dev`, search a new keyword from latest content.

## Common Issues

### UI shows `No results` but API has hits

Likely mismatch in crawler record fields or facet config (especially `lang` filters).  
Fix crawler config and run reindex.

### Search returns old paths

Crawler has not reindexed latest site yet.  
Check workflow `reindex_algolia` step and crawler logs.

### Reindex step failed

One or more crawler secrets are missing/invalid, or crawler auth is wrong.
