# Trivy Scan Docker Images

So there were number of HIGH status vulnerabilities found in the container image (both in OS and application libraries). Due to this. `scan-image` job exited with error code 1.

## Remedy

First determine which packages are introducing vulnerabilities

```bash
npm ls lodash
npm ls deepmerge-ts
npm ls brace-expansion
npm ls hono

npm explain lodash
```
