const moviesContainer = document.getElementById("movies");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

displayMovies();

function displayMovies() {
  moviesContainer.innerHTML = "";
  if (watchlist.length === 0) {
    moviesContainer.innerHTML = `
      <h2 style="text-align:center;"> Watchlist is empty. </h2>
    `;
    return;
  }
  
  watchlist.forEach((movie) => {
    moviesContainer.innerHTML += `
      <div class="card">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
        <button onclick="removeMovie('${movie.imdbID}')"> ❌ </button>
      </div>
    `;
  });
}

function removeMovie(id) {
  watchlist = watchlist.filter((movie) => movie.imdbID !== id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  displayMovies();
}