# Prezent Prep Hub - API Documentation

## Server Endpoints Overview

All server routes run on port `3000` (or Express server instance) and interface with Google Gemini 3.6 Flash model server-side.

### 1. Health Check
- **GET** `/api/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-08-13T00:00:00.000Z",
    "uptime": 120.5
  }
  ```

### 2. AI Tutor Endpoint
- **POST** `/api/ai-tutor`
- **Body**:
  ```json
  {
    "prompt": "Explain quadratic equations with examples",
    "history": [
      { "role": "user", "parts": [{ "text": "Hello" }] },
      { "role": "model", "parts": [{ "text": "Salom! Men sizning AI Tutor'ingizman." }] }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Kvadrat tenglamalar ax^2 + bx + c = 0 ko'rinishida bo'ladi..."
  }
  ```

### 3. IELTS Speaking Evaluator
- **POST** `/api/ielts/speaking`
- **Body**:
  ```json
  {
    "transcript": "In my hometown, I enjoy visiting local historical parks...",
    "partNumber": "1",
    "promptQuestion": "What do you like most about your hometown?"
  }
  ```
- **Response**:
  ```json
  {
    "feedback": {
      "bandScore": 7.5,
      "fluencyScore": "7.5",
      "lexicalScore": "7.5",
      "grammarScore": "7.0",
      "feedback": "Great range of topic vocabulary and natural rhythm.",
      "corrections": ["Use 'visit' instead of 'visiting' in that clause."]
    }
  }
  ```

### 5. Authentication Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "student@prephub.uz",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "token-1723528800000",
    "user": {
      "email": "student@prephub.uz",
      "name": "student",
      "role": "student",
      "isVerified": true
    }
  }
  ```

### 6. Rewards Sync
- **POST** `/api/rewards`
- **Body**:
  ```json
  {
    "userId": "student@prephub.uz",
    "coinsDelta": 100,
    "xpDelta": 150,
    "reason": "wheel_spin"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "updatedAt": "2026-08-13T00:00:00.000Z",
    "message": "Rewards synced: +100 coins, +150 XP (wheel_spin)"
  }
  ```

### 7. Referral Code Validation
- **POST** `/api/referral`
- **Body**:
  ```json
  {
    "referralCode": "PREP-8921",
    "userCode": "PREP-1234"
  }
  ```
- **Response**:
  ```json
  {
    "valid": true,
    "bonusCoins": 150,
    "bonusXp": 200,
    "bonusSpins": 1,
    "message": "Referal kod muvaffaqiyatli qabul qilindi!"
  }
  ```

### 8. Leaderboard Data
- **GET** `/api/leaderboard`
- **Response**:
  ```json
  {
    "leaderboard": [
      { "rank": 1, "id": "u1", "name": "Madinabonu Rahimova", "xp": 3890, "coins": 2100, "mastery": 96, "subject": "English Core" },
      { "rank": 2, "id": "u2", "name": "Shaxzod Bekmuromov", "xp": 3450, "coins": 1850, "mastery": 92, "subject": "Matematika" }
    ]
  }
  ```
