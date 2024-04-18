# Week Five Group Project

## Project - Design and Build a Full Stack Application:

**Link to project:** 


### The Team

- Ester
- Precious
- Praise
- Frankie

This week we were to work in a mighty group of four, combining front-end display and interactivity, with backend management of inputs and data, making use of Node,js, Express and SQL.


### Our Links

- **Trello:** https://trello.com/b/BBKqUeGZ/teched-week-5-group-project-game-review-site
- **Figma:** https://www.figma.com/file/oLgYaGuzEmax2NtVVRGaXK/Welcome-to-FigJam?type=whiteboard&node-id=0-1&t=UefACiswzs33nZ7q-0
- **IGDB API We Used:** https://www.igdb.com/api


### Objectives

There were many sections to this weeks project:

- **Design and Planning**: Create wireframes and plan the layout and functionality of your web application.
- **Front-End Development**: Develop the user interface with HTML and CSS, focusing on a responsive and intuitive design.
- **Interactivity**: Implement dynamic content on the front end using vanilla JavaScript for DOM manipulation.
- **Back-End Development**: Build a server with Express that handles HTTP requests and communicates with a SQLite database.
- **Database Integration**: Design a database and use SQLite to store, update, and retrieve data efficiently using SQL queries.
- **Collaboration**: Work as a team to design and build a web application that showcases your skills in full-stack development,
and collaborate on code using Git and GitHub.

### Requirements & Deliverables

- The application must include both client-side and server-side code.
- Ensure the application is fully responsive and works across modern browsers.
- Use Express.js to set up your server and define API endpoints.
- Use SQLite with the better-sqlite3 library for database operations.
- Implement async/await and the Fetch API for non-blocking database operations and API calls.
- Demonstrate an understanding of database design, relationships, and SQL queries.
- A live version of the application, deployed on a platform like Render.
- A GitHub repository containing the source code with a detailed `README.md` about the project.
- A low-fidelity wireframe of the application's layout, ideally created with a tool like Figma or Excalidraw
- A `seed.js` file with SQL commands to set up and seed the database for initial development and testing.
- A brief presentation or document explaining the architecture of your application, the technologies used, and any challenges you faced.

### Our User Stories

As a user, I can:

- Search for a game
- Leave a review
- See other peoples reviews

### Minimum Viable Product

We were aware of scope creep, especially with how extensive the API was and how much we could do for the user with the data. The minimum we needed to do to achieve success in our project was:

- Display games
- Let user click the games
- Let user leave comments
- Comments should display under the game, and display without refreshing the page.

## The Outcome!

### Features!

- Theres's a client, a server and a database!
- The client ...
- The database ...
- The server ...
- The API ...
- The reviews ...

### What went well
The team was able to come up with the idea for the project very early on, with an achievable MVP and possible stretch goals to attempt depending on time constraint. Communication within the team was excellent and we were able to divide the tasks that needed doing based on our individual strengths. we used pair programming for debugging both on the front and back end, we reviewed each others commit on gitHub before merging to main branch, we achieved our MVP on time which allowed us to spend extra time on css styling and improving the user interface.

**Planning**
planning was inintially carried out in group discussion on discord, using figma to brainstorm what our MVP was going to be, the user stories and how the potential functionality of the app. we also used trello to assign tasks and manage progress


**Functionality**
- The app had to be able to fetch game data from an API and display them onto the page
- A link between our databse data and the API data to allow reviews to be grouped based on the unique game id from the API 
- Users should be able to click on individual games to leave a review and view previously left reviews
- Users should be able to search for a game using the search bar.


**User Interface and Design**
we took inspiration from RAWG.IO for the user interface and design and later settled on a grid display of 3 game cards per row for desktop view, 2 and 1 game card per row for tablet and mobile view respectively aswell


**Presentation**
-Used canva.com to create and design the presentation. Our team member Prasie took the lead on this and delivered an excellent design which blended nicely with the colour scheme and them of the app. He also shared the canva link with the rest of us to allow any potential edits to be carried out remotely by any member of the team. 


### Sticky points and Difficulties


**Difficulty 1**
- Getting the associate game img url to display alongside the game data on our page. This really took some impressive work from Frankie to achieve as the img url was had a different endpoint to the game data from the API, so a seperate fetch request had to be made which linked the unique game id from the game data endpoint to its respective img url from a different endpoint.

**Difficulty 2**
- After managing to link the game data to their respective img url, we found out that the img's were displaying as thumbnail sizes, and on reading the documentation from the API, Frankie was able to to use the .replace method on img url to display a larger sized image.



### Future improvements

- increase accessibility by improving the use/functinality of tab controls and utilising aria-labels
- introducing an  and delete review endpoint - to allow reviews to be updated and deleted accordingly
- "Load more games" button at the buttom of the page to allow more search results to be displayed on the page
- "Favourite games" button which allows users to log the games they are currently playing and a diary of comments/reviews about their progress on each of those games


### Resources

IGDB API Docs - https://api-docs.igdb.com/?javascript


