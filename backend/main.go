package main

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

// Data Structures

type Project struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ProjectDB struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	TechStack string `json:"tech_stack"`
	Status    string `json:"status"`
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
	var err error
	db, err = sql.Open("sqlite3", "./projects.db")
	if err != nil {
		log.Fatal("Could not open DB file:", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Database is not reachable:", err)
	}
	defer db.Close()

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

		results := make(chan Project, 2)

		go func() {
			results <- Project{
				ID:          1,
				Name:        "Personal Desktop Digital Assistant",
				Description: "Developed a voice activated assistant for. PC using Python Libraries (speech recognition, text-to-speech, automation libraries).",
			}
		}()
		go func() {
			results <- Project{
				ID:          2,
				Name:        "Frontend(React)and Backend(Go) Simple HTTP Application",
				Description: "Created a simple web application displaying my professional identity such as my bio, experience, role on the team, and projects",
			}
		}()

		pj1 := <-results
		pj2 := <-results

		c.JSON(200, []Project{pj1, pj2})
	})

	router.GET("/projectsdb", func(c *gin.Context) {
		rows, err := db.Query("SELECT id, name, tech_stack, status FROM projects")
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to query database!"})
			return
		}
		defer rows.Close()

		var dbProjects []ProjectDB
		for rows.Next() {
			var p ProjectDB
			if err := rows.Scan(&p.ID, &p.Name, &p.TechStack, &p.Status); err != nil {
				continue
			}
			dbProjects = append(dbProjects, p)
		}
		c.JSON(200, dbProjects)
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
		results := make(chan Role, 2)
		go func() {
			results <- Role{
				ID:   1,
				Name: "My role is an Undergrad Product Developer on the Product Development Team",
			}
		}()
		go func() {
			results <- Role{
				ID:   2,
				Name: "My Reponsibilites as part of the Product Development Team are as follows: developing and maintain web-based applications, utilizing technology to streamline and optimize processes, and improve efficiency for all other teams throughout the RFID lab. I am required to pick up new skills such as using resources such as Shadcn, Go, and Bun to develop web applications.",
			}
		}()

		role1 := <-results
		role2 := <-results

		c.JSON(200, []Role{role1, role2})
	})

	router.GET("/experience", func(c *gin.Context) {

		results := make(chan Experience, 2)
		go func() {
			results <- Experience{
				ID:          1,
				Company:     "RFID Lab at Auburn University",
				Role:        "Undergrad Product Developer",
				Description: "As an Undergrad Product Developer, I am responsible for developing and maintaining web-based applications that support the lab's research and development efforts. I utilize technology to streamline and optimize processes, improving efficiency for all other teams throughout the RFID lab. I am required to pick up new skills such as using resources such as Shadcn, Go, and Bun to develop web applications.",
			}
		}()
		go func() {
			results <- Experience{
				ID:          2,
				Company:     "Prime AE Group, Inc.",
				Role:        "IT Intern",
				Description: "As an IT intern I will preforming a variety of tasks such as: assisting with web application development, providing technical support, and using external tools like ArcGis Pro",
			}
		}()

		exp1 := <-results
		exp2 := <-results

		c.JSON(200, []Experience{exp1, exp2})

	})

	//run server
	router.Run(":8080")
}
