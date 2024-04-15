//  ----- Standard import things -----
import express, { response } from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();
const db = new Database("preciouses-home-made-database.db");
const PORT = 8080;
app.use(express.json());
app.use(cors()); // allows the client to communicate with the server without being blocked

//  ----- IGDB uses the POST method basically exclusively -----
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
        "Client-ID": "0bhe2twfupz91ap9npnm787grb2e3h",
        Authorization: "Bearer 5avatphm88wu5nvuau1r7c2p4f4msz"
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
