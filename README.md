# book-review-application

### Top Features

- Users can sign up and login
- Read reviews about books and give one
- Add new books for review by other users

## Run the application locally

In order to run the application locally, you would need **Docker** installed in your machine. (Though this is not the only way to run the application).

- Copy `.env.example` file in `frontend/` to `.env` in the same directory and update the values accordingly.
- Copy `.env.example` file in `backend/` to `.env` in the same directory and update the values accordingly.
- Copy updated `.env` present in `backend/` directory to the root of the project, since its values are required by database service defined in the `docker-compose.yml`

```bash
cd backend
docker build -t review-api:v1 .

cd frontend
docker build -t review-web:v1 .

docker compose up -d
```

## Debugging Session

### Check User's privileges on database tables

```psql
SELECT table_catalog, table_schema, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE grantee = 'appuser';

## TABLE PERMISSIONS
SELECT * FROM information_schema.role_table_grants WHERE grantee = 'YOUR_USER';

## OWNERSHIPS
SELECT * FROM pg_tables WHERE tableowner = 'YOUR_USER';

## SCHEMA PERMISSIONS
SELECT r.usename AS grantor,
             e.usename AS grantee,
             nspname,
             privilege_type,
             is_grantable
        FROM pg_namespace
JOIN LATERAL (SELECT *
                FROM aclexplode(nspacl) AS x) a
          ON true
        JOIN pg_user e
          ON a.grantee = e.usesysid
        JOIN pg_user r
          ON a.grantor = r.usesysid
       WHERE e.usename = 'YOUR_USER';

```

> `\du` lists all user accounts and roles and `\du+` is the extended version which shows even more information.
