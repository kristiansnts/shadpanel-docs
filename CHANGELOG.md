# Changelog

All notable changes to this project will be documented in this file.

## v1.1.2
- removed `db generate-schema` CLI; users must edit `prisma/schema.prisma` manually and use `shadpanel db migrate [name]` or `shadpanel db push` followed by `shadpanel db generate` to update the Prisma Client.
