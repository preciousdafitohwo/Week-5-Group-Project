//  ----- Get some things from index.html -----
const gameData = document.getElementById("gameData");
const userSubmitForm = document.getElementById("userSubmitForm");

//  ----- Get user search term -----

async function handleFormSubmit(event) {
  gameData.innerHTML = "";
  let loading = `<p class="loading">Loading new games...</p>`;
  gameData.insertAdjacentHTML("afterbegin", loading);

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
    gameData.innerHTML = "";
    data.forEach((element) => {
      // ----- Alternative display method -----
      //   const newP = document.createElement("p");
      //   newP.textContent = element.name;
      //   newP.classList.add("game-entry");
      //   gameData.appendChild(newP);

      //    Put the information on the page
      let gameItem = `
      <div>
        <h2>${element.name}</h2>
        <p class="game-entry" id="${element.id}">Unique Game ID: ${element.id}</p>
        <p class="game-entry" id="${element.id}">URL: ${element.url}</p>
        <p class="game-entry" id="${element.id}">Cover number (We'll use this to find images from their other endpoints): ${element.cover}</p>
        <p class="game-entry" id="${element.id}">Summary: ${element.summary}</p>
      </div>
      `;
      gameData.insertAdjacentHTML("afterbegin", gameItem);
    });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
}
