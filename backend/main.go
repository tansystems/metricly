package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"backend/handlers"
	"backend/middleware"
	"backend/models"
)

func main() {
	// Получаем параметры подключения из переменных окружения
	dsn := os.Getenv("POSTGRES_DSN")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=analytics port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	// Миграция таблиц
	db.AutoMigrate(&models.User{}, &models.Metric{})

	fmt.Println("Успешное подключение к базе данных!")

	r := gin.Default()

	r.POST("/api/register", handlers.Register(db))
	r.POST("/api/login", handlers.Login(db))

	// Защищённые роуты
	auth := r.Group("/api", middleware.JWTAuth())
	auth.GET("/metrics", handlers.GetMetrics(db))
	auth.POST("/metrics", handlers.AddMetric(db))
	auth.GET("/export/excel", handlers.ExportMetricsExcel(db))
	auth.GET("/export/pdf", handlers.ExportMetricsPDF(db))

	// TODO: Добавить роуты
	// r.GET("/api/metrics", ...)

	r.Run(":8080")
}
