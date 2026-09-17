# Trivy Scan Docker Images

So there were number of HIGH status vulnerabilities found in the container image (both in OS and application libraries). Due to this. `scan-image` job exited with error code 1.

To resolve OS vulnerabilities, I used **Docker Hardened Image** as base image.

## Remedy

First determine which packages are introducing vulnerabilities

```bash
npm ls lodash
npm ls deepmerge-ts
npm ls brace-expansion
npm ls hono

npm explain lodash
```

To update the vulnerable sub-dependencies (dependencies used by npm packages in application's `package.json`), I went through output of trivy-scan job in Github Action's pipeline UI, and recorded the fixed versions recommended by the scanner.

### Minor Version Upgrade

For sub-dependencies, whose recommended fixed version is **Minor** version bump, I removed that sub-dependency's block (where the sub-dependency itself is defined) from `package-lock.json`. And ran `npm i`, this resulted in new updated (minor) version installed and specified in `package-lock.json`.

> [!Caution]
> Ignore blocks, where the sub-dependency is merely referenced. Such as `prisma` referencing `deepmerge-ts`.

### Major Version Upgrade

For sub-dependencies, whose recommended fixed version is **Major** version bump, I reviewed all the dependency chains that require this sub-dependency with `npm explain fast-uri`. For each dependency chain, I replaced sub-dependency version with recommended fixed version, and removed the sub-dependency's block as well (similar to above minor version upgrade). After this, I ran `npm i`, this resulted in new updated (major) version installed and specified in `package-lock.json`.
