# Static Application Security Testing (SAST) with semgrep

We are performing SAST on application with semgrep. But one of the findings was blocking.
The error that was blocking was from rules `p/owasp-top-ten` check_id: `dockerfile.security.missing-user` and message: `By not specifying a USER, a program in the container may run as 'root'. This is a security hazard. If an attacker can control a process running as root, they may have control over the container. Ensure that the last USER in a Dockerfile is a USER other than 'root'`

> To overcome the above issue, we specified the same user **node**, that comes as default in base image (`dhi.io/node:24-alpine`), with **USER** directive in Dockerfile.
