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
