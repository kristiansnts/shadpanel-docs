# Changelog

All notable changes to this documentation site will be documented in this file.

## v1.6.0 (2026-10-18)

Docs aligned with ShadPanel CLI **1.6.0**:

- Next.js 16 (`proxy.ts`), React 19, Better Auth, Prisma 6.18.0
- Resource 2.0 (`shadpanel resource`) including view pages and relation widgets
- `db init --yes` / `--driver` and Laravel-style `migrate make|run|status`
- Canonical URL `https://shadpanel-docs.vercel.app` (sitemap, robots, OG)
- Favicons and Open Graph image
- Edit-this-page paths and Feedback → CLI GitHub issues
- New pages for resource, protected routes, form/table API, and previously 404'd component subpages

## v1.3.1 (2025-11-02)
- Updated `shadpanel db migrate status` to print concise summary with counts and a list of pending migration files. Removed verbose Prisma output.
- Introduced Laravel-style Prisma migration workflow and improved CLI migrate status.
- Cleaner status output: concise counts and a list of pending migrations.
- Improved error messages and developer experience around Prisma setup.
- Removed deprecated commands and unused user management pages.
- Internal refactors, repository cleanup, version bumps, and documentation tweaks.

## v1.1.2
- removed `db generate-schema` CLI; users must edit `prisma/schema.prisma` manually and use `shadpanel db migrate [name]` or `shadpanel db push` followed by `shadpanel db generate` to update the Prisma Client.
