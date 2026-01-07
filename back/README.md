# Link Reductor - Backend

Django REST Framework backend for the URL shortener service.

## API Endpoints

### Create shortened URL
```
POST /api/urls
Body: { "url": "https://example.com/long-url" }
Response: { "id": "eb180b57-2795-4414-b5ff-8cf8caff350e", "url": "https://example.com/long-url" }
```

### Redirect to original URL
```
GET /api/urls/{id}
Redirects to the original URL
```

## Local Development

### Prerequisites
- Python 3.12
- Poetry
- PostgreSQL

### Setup

1. Install dependencies:
```bash
poetry install
```

2. Activate virtual environment:
```bash
poetry shell
```

3. Create `.env` file with database credentials

4. Run migrations:
```bash
python manage.py migrate
```

5. Run the development server:
```bash
python manage.py runserver 0.0.0.0:8000
```

The API will be available at http://localhost:8000

API documentation (drf-spectacular): http://localhost:8000/api/docs

### Run tests
```bash
pytest
```

### Code quality
```bash
ruff format
ruff check .
```
