//  ----- Get some things from index.html -----
const gameData = document.getElementById("gameData");
const userSubmitForm = document.getElementById("userSubmitForm");
const gameContainer = document.getElementById("game-container")
//  ----- Get user search term -----

async function handleFormSubmit(event) {
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
  await testAPI(`${userSearchTerm}`);
}

userSubmitForm.addEventListener("submit", (event) => handleFormSubmit(event));

//  ----- Get game information from the IGDB API -----

async function testAPI(userSearchTerm) {
  console.log(userSearchTerm);
  try {
    const response = await fetch("http://localhost:8080/fetch-igdb", {
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
    });
    const data = await response.json();
    console.log(data);
    gameContainer.innerHTML = "";
    data.forEach((element) => {
      // ----- Alternative display method -----
      //   const newP = document.createElement("p");
      //   newP.textContent = element.name;
      //   newP.classList.add("game-entry");
      //   gameData.appendChild(newP);

      //    Put the information on the page
      let gameItem = `
      <div class="game-card game-id-${element.id}">
      <img src="./assets/1.png" alt="logo" width=100% height=70%/>
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

      const toggleBtn = document.querySelector(`.toggle-reviews.toggle-reviews-id-${element.id}`)
      toggleBtn.addEventListener("click", () => toggleReview(element.id))
    });
  } catch (error) {
    // response.status(500).json({ message: "Internal Server Error" });
  }
}


function toggleReview(gameId) {
  const gameCard = document.querySelector(`.game-id-${gameId}`)
  if (gameCard) {
    const form = gameCard.querySelector(".new-review")
    form.classList.toggle("hidden")
    const allReviews = gameCard.querySelector(".reviews-wrapper")
    allReviews.classList.toggle("hidden")
  }
}