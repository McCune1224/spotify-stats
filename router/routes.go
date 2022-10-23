package router

import (
	"statify/handler"

	"github.com/gofiber/fiber/v2"
)

func CreateAuthRoutes(app *fiber.App) {
	auth := app.Group("/auth")
	auth.Get("/spotify", handler.SpotifyAuth)
	auth.Get("/spotify/callback", handler.SpotifyCallback)
}

// func CreateSpotifyAPIRoutes(app *fiber.App) {
// 	api := app.Group("/api")
// 	api.Get("/me", handler.GetUser)
// }
