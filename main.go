package main

import (
	"log"
	"os"
	"statify/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	_ "github.com/joho/godotenv/autoload"
)
func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":3000"
	} else {
		port = ":" + port
	}

	return port
}

func main() {
	app := fiber.New()
	app.Use(logger.New())
	router.CreateAuthRoutes(app)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"Hello": "World"})
	})
	app.Listen(getPort())
}
