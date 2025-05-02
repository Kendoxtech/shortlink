
# 📘 ShortLink URL Shortener

## 🔗 Project Overview

**ShortLink** is a URL shortening service that allows users to convert long URLs into short ones, retrieve original URLs from short ones, view statistics for shortened links, and search previously shortened URLs.

---

## 🚀 Features

- Shorten long URLs
- Redirect using shortened URLs
- Decode shortened URLs to original form
- Track statistics (visits, creation date, etc.)
- Search existing URLs (client-side)
- In-memory storage (no database required)

---

## 🖥️ Tech Stack

- **Backend:** Django (Python)
- **Frontend:** ReactJS (TailwindCSS)
- **Testing:** Pytest

---

## ⚙️ Setup Instructions

### 📦 Backend

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/shortlink-url-shortener.git
   cd shortlink-url-shortener/backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Django server**
   ```bash
   python manage.py runsever
   ```

   - Access API Docs at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 🌐 Frontend

1. Open a new terminal and navigate to `frontend/` directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start React app:
   ```bash
   npm start
   ```

   - App will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

1. Ensure the backend is **not running**.
2. From the `backend/` directory, run:
   ```bash
   pytest test.py
   ```

   This runs the following test cases:
   - ✅ `/api/encode` – Encode long URL to short URL
   - ✅ `/api/decode` – Decode short URL back to long
   - ✅ `/api/statistic/{url_path}` – Retrieve stats
   - ✅ `/{url_path}` – Redirect endpoint

---

## 📑 API Endpoints

| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| POST   | `/api/encode`            | Encode long URL to short URL         |
| POST   | `/api/decode`            | Decode short URL to original URL     |
| GET    | `/api/statistic/{code}`  | Get stats for a short URL            |
| GET    | `/api/list`              | List all shortened URLs              |
| GET    | `/{code}`                | Redirect to original URL             |

---

## ✅ Example Usage

```json
# Encode
POST /api/encode
{
  "long_url": "https://indicina.co"
}

# Response:
{
  "short_url": "http://localhost:8000/GeAi9K"
}
```

```json
# Decode
POST /api/decode
{
  "short_url": "http://localhost:8000/GeAi9K"
}

# Response:
{
  "long_url": "https://indicina.co"
}
```

---




