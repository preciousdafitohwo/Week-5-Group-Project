//  ----- Standard import things -----
import express, { response } from "express";
import Database from "better-sqlite3";
import cors from "cors";

//  ----- Variables we'll use across the API calls -----
const ClientId = "0bhe2twfupz91ap9npnm787grb2e3h";
let AuthorizationString = "";

const app = express();
const db = new Database("database.db");
const PORT = 8080;
app.use(express.json());
app.use(cors()); // allows the client to communicate with the server without being blocked

// get request to our review database for Reviews.
app.get("/reviews", function (req, res) {
  const reviews = db
    .prepare(`SELECT * FROM review_board WHERE game_id = ${req.query.id}`)
    .all();
  res.json(reviews);
});

app.post("/leave-review", function (req, res) {
  const newReview = db.prepare(`
    INSERT INTO review_board (name, review, game_id) VALUES (?, ?, ?)
  `);
  console.log(req.body);
  newReview.run(req.body.name, req.body.review, req.body.game_id);
  res.send("Success");
});

//  ----- IGDB uses the POST method basically exclusively -----
//  ----- This gets the access-token we need to use the API -----
app.post("/get-auth", async (req, res) => {
  try {
    const response = await fetch(
      "https://id.twitch.tv/oauth2/token?client_id=0bhe2twfupz91ap9npnm787grb2e3h&client_secret=satv3ukvax9ckvm27g0vv5qj4k01jl&grant_type=client_credentials",
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get authorization token");
    }

    const data = await response.json();
    console.log(data);
    console.log(data.access_token);

    AuthorizationString = `Bearer ${data.access_token}`;
    res.json({ message: "Success in getting Auth!", AuthorizationString });
  } catch (error) {
    console.error("Error getting authorization:", error.message);
    res.status(500).json({ error: "Failed to get authorization token" });
  }
});

//  ----- This is our main method to fetch game information-----
app.post("/fetch-igdb", async (req, res) => {
  console.log(req.body);

  console.log(req.body.search);
  console.log(req.body.fields);
  console.log(req.body.limit);

  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Shhhh these are secret...
        "Client-ID": ClientId,
        Authorization: AuthorizationString
      },
      //   Syntax to make our request, taken from the client submission
      body: `search "${req.body.search}"; fields ${req.body.fields}; limit ${req.body.limit};`

      // We could define on server side what data gets back to the user:
      //   body: "fields category,collection,cover,created_at,dlcs,expanded_games,expansions,first_release_date,franchise,genres,involved_companies,keywords,name,platforms,rating,rating_count,release_dates,screenshots,summary,tags,url,websites;"
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  ----- Get image for the game -----
app.post("/fetch-igdb-image", async (req, res) => {
  console.log(req.body);
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      // Shhhh these are secret...
      "Client-ID": ClientId,
      Authorization: AuthorizationString
    },
    body: `fields cover.*; where id = ${req.body.game};`
  });
  const data = await response.json();
  res.json(data);
});

// app.delete("/delete", function (req, res){
//   const deleteMessage = db.prepare(`DELETE FROM review_board WHERE game_id = ?`);
//   deleteMessage.run(req.body.game_id);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
