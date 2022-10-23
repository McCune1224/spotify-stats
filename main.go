package main

import (
	"log"
	"statify/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	router.CreateAuthRoutes(app)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"Hello": "World"})
	})
	log.Fatal(app.Listen(":3000"))
}
