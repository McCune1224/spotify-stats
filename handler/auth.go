package handler

import (
	"log"
	"statify/auth"

	"github.com/gofiber/fiber/v2"
)

func Auth(c *fiber.Ctx) error {
	path := auth.SpotifyConfig()
	log.Print(path.ClientID)
	log.Print(path.ClientSecret)
	log.Print(path.RedirectURL)
	url := path.AuthCodeURL("state")
	return c.Redirect(url)
}

func Callback(c *fiber.Ctx) error {
	// retState := c.FormValue("state")
	// if retState != "state" {
	// 	c.JSON(fiber.Map{
	// 		"State not valid": retState,
	// 	})
	// }
	token, error := auth.SpotifyConfig().Exchange(c.Context(), c.FormValue("code"))
	if error != nil {
		panic(error)
	}

    if len(token.AccessToken) > 1{
        return c.SendString("GOT ACCESS TOKEN")

    }
    return c.SendString("NO TOKEN :(")

}
