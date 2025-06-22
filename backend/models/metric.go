package models

import (
	"time"
)

type Metric struct {
	ID         uint      `gorm:"primaryKey"`
	UserID     uint      `gorm:"not null"`
	MetricType string    `gorm:"not null"`
	Value      float64   `gorm:"not null"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}
