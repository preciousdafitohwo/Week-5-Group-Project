//  ----- Get some things from index.html -----
const userGameSearch = document.getElementById("userGameSearch");
const gameContainer = document.getElementById("game-container");

//  ----- Get an authorisation token to use with the API -----
async function getAuthorizationToken() {
  try {
    const response = await fetch(
      "https://week-5-group-project.onrender.com/get-auth",
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get authorization token");
    }

    const data = await response.json();
    console.log(data);
    getGamesFromAPI("spider-man");
  } catch (error) {
    console.error("Error fetching authorization token:", error.message);
  }
}

getAuthorizationToken();

//  ----- Get user search term -----
async function handleUserSearch(event) {
  gameContainer.innerHTML = "";
  let loading = `<p class="loading">Loading new games...</p>`;
  gameContainer.insertAdjacentHTML("afterbegin", loading);

  event.preventDefault();

  // let newForm = Formdata
  // let userSearchTerm = "event.target.search.value"
  const formTarget = event.target;
  console.log(formTarget);
  const formData = new FormData(formTarget);
  console.log(formData);
  console.log(formData.get("search"));

  let userSearchTerm = formData.get("search");
  console.log(`"${userSearchTerm}"`);
  await getGamesFromAPI(`${userSearchTerm}`);
}

userGameSearch.addEventListener("submit", (event) => handleUserSearch(event));

//  ----- Get game information from the IGDB API -----
async function getGamesFromAPI(userSearchTerm) {
  console.log(userSearchTerm);
  try {
    const response = await fetch(
      "https://week-5-group-project.onrender.com/fetch-igdb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          search: userSearchTerm,
          fields: "*",
          limit: 10

          // We can definte on client side what data gets sent to the request, to be returned to the user.
          // fields:
          //   " category,collection,cover,created_at,dlcs,expanded_games,expansions,first_release_date,franchise,genres,involved_companies,keywords,name,platforms,rating,rating_count,release_dates,screenshots,summary,tags,url,websites;"
        })
      }
    );
    const data = await response.json();
    console.log(data);
    gameContainer.innerHTML = "";
    data.forEach(async (element) => {
      let imageURL = await getImageUrl(element.id);
      console.log("Image url = ", imageURL);
      // ----- Alternative display method -----
      //   const newP = document.createElement("p");
      //   newP.textContent = element.name;
      //   newP.classList.add("game-entry");
      //   gameData.appendChild(newP);

      //    Put the information on the page
      let gameItem = `
      <div class="game-card game-id-${element.id}">
      <img src="${imageURL}" alt="${element.name}" class="game-img"/>
        <h2>${element.name}</h2>
        <p class="game-entry" id="${element.id}">Unique Game ID: ${element.id}</p>       
        <p class="game-entry" id="${element.id}">Cover number (We'll use this to find images from their other endpoints): ${element.cover}</p>
        <div class="review-form flex">
        <button class="toggle-reviews toggle-reviews-id-${element.id}">Leave a Review</button>

        <form class="new-review game-reviews-id-${element.id} flex hidden">
          <p class="regular-text">Please leave a review!</p>
          <div class="username flex">
            <label for="name" class="regular-text">Name:</label>
            <input type="text" name="name" placeholder="Type in your username" />
          </div>
          <div class="review flex">
            <label for="review" class="regular-text">Comment:</label>
            <input type="text" name="review" placeholder="Leave a review" />
          </div>
          <div class="submit flex">
          <button type="submit" id="submitComment-${element.id}">Send Review!</button>
          </div>
        </form>
        <div class="reviews-wrapper hidden"></div>
      </div>
      </div>
      `;
      gameContainer.insertAdjacentHTML("afterbegin", gameItem);

      const toggleBtn = document.querySelector(
        `.toggle-reviews.toggle-reviews-id-${element.id}`
      );
      toggleBtn.addEventListener("click", () => toggleReview(element.id));
    });
  } catch (error) {
    // response.status(500).json({ message: "Internal Server Error" });
  }
}

//  ----- Function for the toggle buttons to show/hide the form and reviews -----
function toggleReview(gameId) {
  const gameCard = document.querySelector(`.game-id-${gameId}`);
  if (gameCard) {
    const form = gameCard.querySelector(".new-review");
    form.classList.toggle("hidden");
    const allReviews = gameCard.querySelector(".reviews-wrapper");
    allReviews.classList.toggle("hidden");
  }
}

//  ----- Get game image from the IGDB API -----
async function getImageUrl(gameId) {
  console.log(gameId);
  try {
    const response = await fetch(
      "https://week-5-group-project.onrender.com/fetch-igdb-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ fields: "*", game: gameId })
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(data[0]);
    console.log(data[0].cover.url);
    console.log(data[0].cover.url.replace("t_thumb", "t_720p"));
    return data[0].cover.url.replace("t_thumb", "t_cover_big");
  } catch (error) {
    console.error("Error processing element:", error);
  }
}
