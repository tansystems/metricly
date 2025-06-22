# Аналитический Dashboard

## Описание

Веб-приложение для аналитики с визуализацией метрик из базы данных или внешних API. 

**Стек:**
- Backend: Go (Gin, GORM), PostgreSQL
- Frontend: React, Recharts
- Экспорт: Excel, PDF

## Функционал
- Логин (JWT)
- Загрузка и отображение метрик (автоматически и вручную)
- Визуализация: Bar, Line, Pie (Recharts)
- Экспорт метрик в Excel и PDF

---

## Быстрый старт

### 1. Запуск PostgreSQL (docker)
```bash
docker run --name analytics-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=analytics -p 5432:5432 -d postgres:15
```

### 2. Backend (Go)
```bash
cd backend
export POSTGRES_DSN="host=localhost user=postgres password=postgres dbname=analytics port=5432 sslmode=disable"
export JWT_SECRET="your_secret_key"
go run main.go
```

### 3. Frontend (React)
```bash
cd backend/frontend
npm install
npm start
```

---

## Страницы и сценарии
- **/login** — форма входа
- **/dashboard** — графики, экспорт, добавление метрик

### Добавление метрик
- Вручную через форму на Dashboard
- Автоматически через API (см. backend)

### Экспорт
- Кнопки "Экспорт в Excel" и "Экспорт в PDF" на Dashboard

---

## Пример .env для backend
```
POSTGRES_DSN=host=localhost user=postgres password=postgres dbname=analytics port=5432 sslmode=disable
JWT_SECRET=your_secret_key
```

---

## Структура проекта
```
backend/
  main.go
  models/
  handlers/
  middleware/
  utils/
  frontend/
    src/components/
    src/api/
```

---

## Контакты
Автор: Max Spenser 