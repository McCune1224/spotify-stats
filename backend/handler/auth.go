package handler

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
)

// Helper Function to make a Oauth2 config struct for Spotify
func spotifyConfig() *oauth2.Config {
	conf := &oauth2.Config{
		ClientID:     os.Getenv("SPOTIFY_CLIENT_ID"),
		ClientSecret: os.Getenv("SPOTIFY_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("REDIRECT_URL"),
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://accounts.spotify.com/authorize",
			TokenURL: "https://accounts.spotify.com/api/token",
		},
		Scopes: []string{
			"user-library-read",
			"user-read-private",
			"user-top-read",
		},
	}

	return conf
}

// Handler for Generating Oauth2 Config for Spotify and then initiate Oauth2
// process. will send user to authCodeURL with a "state" string for csrf saftey
func SpotifyAuth(c *fiber.Ctx) error {
	path := spotifyConfig()
	url := path.AuthCodeURL("state")
	return c.Redirect(url)
}

// Handler for when Spotify returns to callback url and does the following
// 1. Attempts to Generate AccessToken using Golang Oauth2 Lib (errors if fails)
// 2. Store AccessToken and RefreshToken in Browser Cookie Jar
// 3. Redirects User to Dashboard now that we have the ability to get to their spotify info
func SpotifyCallback(c *fiber.Ctx) error {
	token, err := spotifyConfig().Exchange(c.Context(), c.FormValue("code"))
	if token == nil {
		c.JSON(fiber.Map{"error": "Failed to make Token"})
	}
	if err != nil {
		c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if len(token.AccessToken) < 1 {
		return c.SendString("FAILED NO ACCESS TOKEN")
	}
	accessToken := new(fiber.Cookie)
	accessToken.Name = "AccessToken"
	accessToken.Value = token.AccessToken
	accessToken.Expires = token.Expiry

	refreshToken := new(fiber.Cookie)
	refreshToken.Name = "RefreshToken"
	refreshToken.Value = token.RefreshToken

	c.Cookie(accessToken)
	c.Cookie(refreshToken)

	return c.Redirect("/", 302)
}
