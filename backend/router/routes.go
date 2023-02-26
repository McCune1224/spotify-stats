package router

import (
	"statify/handler"

	"github.com/gofiber/fiber/v2"
)

func CreateOauthRoutes(app *fiber.App) {
	auth := app.Group("/auth")
	auth.Get("/spotify", handler.SpotifyLogin)
	auth.Get("/spotify/callback", handler.SpotifyCallback)
}
