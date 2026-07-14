const API_KEY = "5e7f829a";
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie`;

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let movies = [];

async function getMovies() {
  const response = await fetch(URL);
  const result = await response.json();

  const data = result.Search || [];

  movies = data;

  displayMovies(movies);
}

function displayMovies(arr) {
  moviesContainer.innerHTML = "";

  arr.forEach((movie, index) => {
    moviesContainer.innerHTML += `
            <div class="card">

                <img src="${movie.Poster}" alt="${movie.Title}">

                <h2>${movie.Title}</h2>

                <p>Year: ${movie.Year}</p>

                <button onclick="addToWatchlist(${index})">
                    Watchlist
                </button>

            </div>
        `;
  });
}

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(value),
  );

  displayMovies(filtered);
});

sortSelect.addEventListener("change", function () {
  let sorted = [...movies];

  if (this.value === "year") {
    sorted.sort((a, b) => b.Year - a.Year);
  }

  displayMovies(sorted);
});

function addToWatchlist(index) {
  const movie = movies[index];

  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const exists = watchlist.find((item) => item.Title === movie.Title);

  if (exists) {
    alert("Movie already added!");
    return;
  }

  watchlist.push(movie);

  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  alert("Movie added successfully!");
}

getMovies();

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");

  location.href = "login.html";
});
