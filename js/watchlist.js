const moviesContainer = document.getElementById("movies");

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

displayMovies();

function displayMovies() {
  moviesContainer.innerHTML = "";

  if (watchlist.length === 0) {
    moviesContainer.innerHTML = `
            <h2 style="text-align:center;">
                Watchlist is empty.
            </h2>
        `;

    return;
  }

  watchlist.forEach((movie, index) => {
    moviesContainer.innerHTML += `

        <div class="card">

            <img src="${movie.Poster}" alt="${movie.Title}">

            <h2>${movie.Title}</h2>

            <p>${movie.Year}</p>

            <button onclick="removeMovie(${index})">
                Remove
            </button>

        </div>

        `;
  });
}

function removeMovie(index) {
  watchlist.splice(index, 1);

  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  displayMovies();
}
