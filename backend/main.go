package main

import (
	"github.com/gin-gonic/gin"
)

// Data Structures
type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type DataResponse struct {
	ID      int    `json:"id"`
	Message string `json:"message"`
}

type Bio struct {
	ID      int    `json:"id"`
	Message string `json:"message"`
}

type Role struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Experience struct {
	ID          int    `json:"id"`
	Company     string `json:"company"`
	Role        string `json:"role"`
	Description string `json:"description"`
}

func main() {
	router := gin.Default()

	// ADD CORS MIDDLEWARE
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Route Definitions
	router.GET("/projects", func(c *gin.Context) {
		projects := []Project{
			{ID: 1, Name: "Personal Desktop Digital Assistant", Description: "Developed a voice activated assistant for. PC using Python Libraries (speech recognition, text-to-speech, automation libraries)."},
			{ID: 2, Name: "Frontend(React)and Backend(Go) Simple HTTP Application", Description: "Created a simple web application displaying my professional identity such as my bio, experience, role on the team, and projects"},
		}
		c.JSON(200, projects)
	})

	router.GET("/api/data", func(c *gin.Context) {
		c.JSON(200, DataResponse{
			ID:      1,
			Message: "Connection Successful",
		})
	})

	router.GET("/home", func(c *gin.Context) {
		c.JSON(200, Bio{
			ID:      1,
			Message: "Hello! My name is Sawyer Guarisco and I am in my Junior Year, studying Computer Science at Auburn University. Regarding my career, I have an interest in cybersecurity and IT, and other than that I am completely flexible. I have experience with multiple languages, such as Pyton, Java, C++, and SQL. As well as that, I have strong foundations in Excel, Powerpoint, and data analysis. I am skilled in problem-solving, critical thinking,and collaboriation demonstrated through technical coursework, projects, and club involvement.",
		})
	})

	router.GET("/role", func(c *gin.Context) {
		c.JSON(200, []Role{
			{ID: 1, Name: "My role is an Undergrad Product Developer on the Product Development Team"},
			{ID: 2, Name: "My Reponsibilites as part of the Product Development Team are as follows: developing and maintain web-based applications, utilizing technology to streamline and optimize processes, and improve efficiency for all other teams throughout the RFID lab. I am required to pick up new skills such as using resources such as Shadcn, Go, and Bun to develop web applications."},
		})
	})

	router.GET("/experience", func(c *gin.Context) {
		c.JSON(200, []Experience{
			{ID: 1,
				Company:     "RFID Lab at Auburn University",
				Role:        "Undergrad Product Developer",
				Description: "As an Undergrad Product Developer, I am responsible for developing and maintaining web-based applications that support the lab's research and development efforts. I utilize technology to streamline and optimize processes, improving efficiency for all other teams throughout the RFID lab. I am required to pick up new skills such as using resources such as Shadcn, Go, and Bun to develop web applications.",
			},
			{ID: 2,
				Company:     "Prime AE Group, Inc.",
				Role:        "IT Intern",
				Description: "As an IT intern I will preforming a variety of tasks such as: assisting with web application development, providing technical support, and using external tools like ArcGis Pro"},
		})
	})

	//run server
	router.Run(":8080")
}
