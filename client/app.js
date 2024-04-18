//  ----- Get some things from index.html -----
const userGameSearch = document.getElementById("userGameSearch");
const gameContainer = document.getElementById("game-container");

//  ----- Get an authorisation token to use with the API -----
async function getAuthorizationToken() {
  try {
    const response = await fetch(
      "https://week-5-group-project.onrender.com/get-auth",
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get authorization token");
    }

    const data = await response.json();
    console.log(data);
    getGamesFromAPI("fifa");
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: userSearchTerm,
          fields: "*",
          limit: 12,

          // We can definte on client side what data gets sent to the request, to be returned to the user.
          // fields:
          //   " category,collection,cover,created_at,dlcs,expanded_games,expansions,first_release_date,franchise,genres,involved_companies,keywords,name,platforms,rating,rating_count,release_dates,screenshots,summary,tags,url,websites;"
        }),
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
                <button class="toggle-reviews toggle-reviews-id-${element.id}">View/Leave Review</button>

        <form class="new-review game-reviews-id-${element.id} hidden">    
                    <div class="username">
            <label for="name" class="regular-text"><span class="span"><strong>Username:</span></strong></label>
            <span class="span"><input type="text" name="name" placeholder="" /></span>
          </div>
          <div class="review">
            <label for="review" class="regular-text"><span class="span"><strong>User review:</strong></span></label>
            <span class="span"><input type="text" name="review" placeholder="" /></span>
          </div>
          <div class="submit">
          <button type="submit" id="submitReview-${element.id}" class="review-button">Send Review</button>
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
      const sendReviewBtn = document.querySelector(
        `.new-review.game-reviews-id-${element.id}`
      );
      toggleBtn.addEventListener("click", () => toggleReview(element.id));
      console.log(sendReviewBtn);
      console.log(document.getElementById(`submitReview-${element.id}`));

      sendReviewBtn.addEventListener("submit", (event) =>
        sendReview(event, element.id)
      );
      getReviews(element.id);
    });
  } catch (error) {
    // response.status(500).json({ message: "Internal Server Error" });
  }
}

// send review function to later assign to the send review button as an event handler

async function sendReview(event, game_id) {
  event.preventDefault();
  const userName = event.target.name.value;
  const review = event.target.review.value;
  console.log(userName);
  console.log(review);
  console.log(game_id);
  try {
    const jsonData = JSON.stringify({
      name: userName,
      review: review,
      game_id: game_id,
    });
    console.log(jsonData);
    const response = await fetch(
      "https://week-5-group-project.onrender.com/leave-review",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonData,
      }
    );
    if (response.ok) {
      getReviews(game_id);
    }
  } catch (error) {
    console.error("error submitting review", error);
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: "*", game: gameId }),
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

// getting the reviews from the databse

async function getReviews(game_id) {
  try {
    const response = await fetch(
      `https://week-5-group-project.onrender.com/reviews/?id=${game_id}`
    );
    const dataReview = await response.json();

      // a let to get the number of reviews on a game and display it on the associated game card
    let numberOfReviews = `
    <p>${dataReview.length} Reviews so far</p>`;
    console.log(numberOfReviews);
    const gameCard = document.querySelector(`.game-card.game-id-${game_id}`);
    const reviewsWrapper = gameCard.querySelector(".reviews-wrapper");
    const h2 = gameCard.querySelector("h2");
    
    h2.insertAdjacentHTML("afterend", numberOfReviews);

    if (gameCard) {
      // Clear existing comments
      gameCard
        .querySelectorAll(".reviews-individual")
        .forEach((review) => review.remove());
        
      // Append the updated reviewss to the review wrapper
      for (const review of dataReview) {
        const newReview = `
        <div class="reviews-individual flex">
          <p class="review-from">${review.name} said:  ${review.review}</p>
        </div>
      `;
        reviewsWrapper.insertAdjacentHTML("beforeend", newReview);
      }
    } else {
      console.error("Review wrapper not found");
    }
  } catch (error) {
    console.error("Error updating reviews section:", error);
  }
};

// delete function to delete review

// fetch("https://game-review-board.onrender.com/delete",   
// {
//     method: "DELETE",
//     body: JSON.stringify({game_id: game_id}),
//     headers: {
//         "Content-Type": "application/json"
//     },
// });
