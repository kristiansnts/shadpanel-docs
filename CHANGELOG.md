# Changelog

All notable changes to this project will be documented in this file.

## v1.3.1 (2025-11-02)
- Updated `shadpanel db migrate status` to print concise summary with counts and a list of pending migration files. Removed verbose Prisma output.
- Introduced Laravel-style Prisma migration workflow and improved CLI migrate status.
- Cleaner status output: concise counts and a list of pending migrations.
- Improved error messages and developer experience around Prisma setup.
- Removed deprecated commands and unused user management pages.
- Internal refactors, repository cleanup, version bumps, and documentation tweaks.

## v1.1.2
- removed `db generate-schema` CLI; users must edit `prisma/schema.prisma` manually and use `shadpanel db migrate [name]` or `shadpanel db push` followed by `shadpanel db generate` to update the Prisma Client.
