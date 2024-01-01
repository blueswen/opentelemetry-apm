FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt && \
    opentelemetry-bootstrap -a install

EXPOSE 8000

CMD python main.py
