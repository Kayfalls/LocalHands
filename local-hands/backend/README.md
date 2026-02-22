# Backend (FastAPI)

## Structure

```text
backend/
  app/
    main.py
    core/
      config.py
      security.py
    services/
      auth/
      profile/
      jobs/
      matching/
      analytics/
    models/
    schemas/
    db/
      session.py
      base.py
    api/
      routes/
    tests/
```

## Run Locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
