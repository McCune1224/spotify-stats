package router

import (
	"statify/handler"

	"github.com/gofiber/fiber/v2"
)

func CreateAuthRoutes(app *fiber.App) {
	auth := app.Group("/auth")
	auth.Get("/", handler.Auth)
	auth.Get("/spotify/callback", handler.Callback)
}
