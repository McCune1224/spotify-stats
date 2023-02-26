package handler

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
)

// Helper Function to make a Oauth2 config struct for Spotify
func spotifyConfig() *oauth2.Config {
	config := &oauth2.Config{
		ClientID:     os.Getenv("SPOTIFY_CLIENT"),
		ClientSecret: os.Getenv("SPOTIFY_SECRET"),
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
	return config
}

// Helper function to encode the state for the Spotify Oauth login process and
// then rediect the user to the Spotify login page
func SpotifyLogin(c *fiber.Ctx) error {
	config := spotifyConfig()
	authedURL := config.AuthCodeURL(os.Getenv("STATE"))
	fmt.Println(authedURL)
	return c.Redirect(authedURL, 302)
}

// Callback for handling the redirect after user has logged in to Spotify.
// Function will exchange the code given from spotify for an access token
// and redirect the user to the frontend with the access token in the query
// so that the frontend can use it to make requests to Spotify's API.
func SpotifyCallback(c *fiber.Ctx) error {
	config := spotifyConfig()

	// Check that the state is present and correct
	state := c.FormValue("state")
	if state == "" {
		return c.Redirect(os.Getenv("FRONTEND_URL")+"?error=state_not_found", 302)
	}
	if state != os.Getenv("STATE") {
		return c.Redirect(os.Getenv("FRONTEND_URL")+"?error=state_mismatch", 302)
	}

	// Check that code is present
	code := c.FormValue("code")
	if code == "" {
		return c.Redirect(os.Getenv("FRONTEND_URL")+"?error=code_not_found", 302)
	}

	// attempt to exchange the code for an access token
	token, err := config.Exchange(c.Context(), code)
	if err != nil {
		return c.Redirect(os.Getenv("FRONTEND_URL")+"?error=token_exchange_failed", 302)
	}

	// jobs done :)
	return c.Redirect(os.Getenv("FRONTEND_URL")+"?access_token="+token.AccessToken, 302)
}
