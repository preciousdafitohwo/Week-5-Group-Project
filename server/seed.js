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

populateReview.run("The Witcher 3: Wild Hunt","Quite boring, wish i saved my money","1942");
populateReview.run("Resident Evil Village","Too Scary, never again!","55163");
populateReview.run("The Last Of Us Part 2","Need a pillow, cant watch","626192");
// populateReview.run("Resident Evil 2","Much better than i expected, good graphics","95080");
populateReview.run("Fortnite Battle Royal","Sick! Best game i've ever played","1905");
// populateReview.run("Grand Theft Auto V","loving the story mode"," 89616");
// populateReview.run("Call Of Duty Mordern Warfare 3","Best game this year, hands down!"," 91579");
populateReview.run("God Of War 3","Revenge ridden","499");
// populateReview.run("Fallout 3","","124961");
populateReview.run("Grand Theft Auto: Vice City","Too violent, i refuse to ever play it again","215550");