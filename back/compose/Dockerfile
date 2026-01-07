ARG PYTHON_VERSION=3.12

#################
# Builder stage #
#################
FROM python:${PYTHON_VERSION}-slim AS builder

# Set up environment
# First line is to enable running poetry without specifying the path
# Second line is to prevent Python from writing .pyc files
# Third line is to ensure that Python output is sent straight to the terminal
# Fourth line is to pin the Poetry version
ENV PATH="/root/.local/bin:${PATH}" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=2.1.3

# Set working directory to /src
WORKDIR /src

# Update package lists and install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install poetry
RUN pip install poetry==${POETRY_VERSION}

# Copy dependency files
COPY pyproject.toml poetry.lock README.md ./

# Install dependencies
RUN poetry config virtualenvs.in-project true && \
    poetry install --with dev --no-interaction --no-ansi --no-root

#################
# Runtime stage #
#################
FROM python:${PYTHON_VERSION}-slim AS runtime

ENV PATH="/src/.venv/bin:${PATH}" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /src

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user and group
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy virtual environment from builder
COPY --from=builder /src/.venv /src/.venv

COPY app ./app/
COPY config ./config/
COPY manage.py ./
COPY compose/entrypoint.sh ./

RUN sed -i 's/\r$//g' ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Set directories ownership to the non-root user
RUN chown -R appuser:appgroup /src

USER appuser