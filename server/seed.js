import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
	CREATE TABLE IF NOT EXISTS review_board (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
        review TEXT,
        game_id INTEGER
	)
`);

const populateReview = db.prepare(`
INSERT INTO review_board (name, review, game_id) VALUES (?, ?, ?)`);

populateReview.run("Gary", "Amazingreviews", "2153");
populateReview.run("Mitchell", "Amazingreviews", "2153");
populateReview.run("Susan", "Amazingreviews", "703");
populateReview.run("Kevin", "Amazingreviews", "703");
populateReview.run("Brad", "Amazingreviews", "701");
populateReview.run("Kim", "Amazingreviews", "154986");
populateReview.run("Kim", "Amazingreviews", "701");
populateReview.run("Kim", "Amazingreviews", "136355");
populateReview.run("John", "Amazingreviews", "701");
populateReview.run("Paul", "Amazingreviews", "136355");
populateReview.run("Kim", "Amazingreviews", "240278");
populateReview.run("Kim", "Amazingreviews", "3136");
populateReview.run("Kim", "Amazingreviews", "134101");
populateReview.run("Kim", "Amazingreviews", "3136");
populateReview.run("Jen", "Amazingreviews", "302345");
populateReview.run("Jen", "Amazingreviews", "2946");
populateReview.run("Jen", "Amazingreviews", "302345");
populateReview.run("Jen", "Amazingreviews", "154986");
populateReview.run("Jen", "Amazingreviews", "240278");
