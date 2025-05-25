FROM python:3.12

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app
COPY ./ ./
RUN uv sync --locked && \
    uv add $(uv run opentelemetry-bootstrap -a requirements)

EXPOSE 8000

CMD ["python", "main.py"]
