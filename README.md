📊 Metricly

A lightweight analytics dashboard for visualizing business metrics from a database or external APIs.

🔧 Tech Stack

Backend: Go (Gin, GORM), PostgreSQL

Frontend: React, Recharts

Export: Excel, PDF

✨ Features

JWT-based authentication

Metric ingestion: manually or via REST API

Data visualization (Bar, Line, Pie)

Export charts to Excel or PDF

Simple, extendable architecture

🚀 Quick Start

1. Launch PostgreSQL with Docker

docker run --name analytics-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=analytics -p 5432:5432 -d postgres:15

2. Start Backend (Go)

cd backend

export POSTGRES_DSN="host=localhost user=postgres password=postgres dbname=analytics port=5432 sslmode=disable"

export JWT_SECRET="your_secret_key"

go run main.go

3. Start Frontend (React)

cd backend/frontend

npm install

npm start

🖥️ Pages:

/login — secure login form

/dashboard — main analytics dashboard with charts and metric controls

Adding Metrics:

Manually: through the dashboard form

Automatically: via backend API (see docs or source)

Exporting:

Use "Export to Excel" or "Export to PDF" buttons on the dashboard

📁 Project Structure:

backend/
  
  main.go
  
  models/
  
  handlers/
  
  middleware/
  
  utils/
  
  frontend/
  
    src/components/
    
    src/api/

🔐 .env Example:

POSTGRES_DSN=host=localhost user=postgres password=postgres dbname=analytics port=5432 sslmode=disable

JWT_SECRET=your_secret_key
