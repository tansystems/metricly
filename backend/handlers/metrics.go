package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"backend/models"
	"strconv"

	"github.com/jung-kurt/gofpdf"
	"github.com/xuri/excelize/v2"
)

type MetricInput struct {
	MetricType string  `json:"metric_type" binding:"required"`
	Value      float64 `json:"value" binding:"required"`
}

func GetMetrics(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetUint("userID")
		var metrics []models.Metric
		if err := db.Where("user_id = ?", userID).Order("created_at desc").Find(&metrics).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения метрик"})
			return
		}
		c.JSON(http.StatusOK, metrics)
	}
}

func AddMetric(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetUint("userID")
		var input MetricInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Некорректные данные"})
			return
		}
		metric := models.Metric{
			UserID:     userID,
			MetricType: input.MetricType,
			Value:      input.Value,
			CreatedAt:  time.Now(),
		}
		if err := db.Create(&metric).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка сохранения метрики"})
			return
		}
		c.JSON(http.StatusOK, metric)
	}
}

func ExportMetricsExcel(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetUint("userID")
		var metrics []models.Metric
		if err := db.Where("user_id = ?", userID).Order("created_at desc").Find(&metrics).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения метрик"})
			return
		}

		f := excelize.NewFile()
		sheet := "Metrics"
		f.NewSheet(sheet)
		f.SetCellValue(sheet, "A1", "ID")
		f.SetCellValue(sheet, "B1", "Тип метрики")
		f.SetCellValue(sheet, "C1", "Значение")
		f.SetCellValue(sheet, "D1", "Дата")
		for i, m := range metrics {
			row := strconv.Itoa(i + 2)
			f.SetCellValue(sheet, "A"+row, m.ID)
			f.SetCellValue(sheet, "B"+row, m.MetricType)
			f.SetCellValue(sheet, "C"+row, m.Value)
			f.SetCellValue(sheet, "D"+row, m.CreatedAt.Format("2006-01-02 15:04:05"))
		}
		c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
		c.Header("Content-Disposition", "attachment; filename=metrics.xlsx")
		c.Header("File-Name", "metrics.xlsx")
		_ = f.Write(c.Writer)
	}
}

func ExportMetricsPDF(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetUint("userID")
		var metrics []models.Metric
		if err := db.Where("user_id = ?", userID).Order("created_at desc").Find(&metrics).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка получения метрик"})
			return
		}

		pdf := gofpdf.New("P", "mm", "A4", "")
		pdf.AddPage()
		pdf.SetFont("Arial", "B", 14)
		pdf.Cell(40, 10, "Метрики пользователя")
		pdf.Ln(12)
		pdf.SetFont("Arial", "", 10)
		pdf.Cell(10, 7, "ID")
		pdf.Cell(40, 7, "Тип метрики")
		pdf.Cell(30, 7, "Значение")
		pdf.Cell(40, 7, "Дата")
		pdf.Ln(7)
		for _, m := range metrics {
			pdf.Cell(10, 7, strconv.Itoa(int(m.ID)))
			pdf.Cell(40, 7, m.MetricType)
			pdf.Cell(30, 7, strconv.FormatFloat(m.Value, 'f', 2, 64))
			pdf.Cell(40, 7, m.CreatedAt.Format("2006-01-02 15:04:05"))
			pdf.Ln(7)
		}
		c.Header("Content-Type", "application/pdf")
		c.Header("Content-Disposition", "attachment; filename=metrics.pdf")
		c.Header("File-Name", "metrics.pdf")
		_ = pdf.Output(c.Writer)
	}
}
