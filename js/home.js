const API_KEY = "5e7f829a";
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie`;

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const movies2 = document.getElementById("movies2")
const btn5 = document.getElementById("btn5")
const btn6 = document.getElementById("btn6")

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
                    ❤️
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

btn5.addEventListener("click", async () => {
  const response = await fetch("../json/data.json")
  const data = await response.json()
  movies2.innerHTML = ""
  data.movies.forEach(m => {
    movies2.innerHTML += `<div class="card">

                <img src="${m.Poster}" alt="${m.Title}">

                <h2>${m.Title}</h2>

                <p>Year: ${m.Year}</p>

                <button onclick="addToWatchlist(${m.id})">
                    ❤️
                </button>

            </div>`
  })
  btn5.style.display = "none"
  btn6.style.display = "inline"
})

btn6.addEventListener("click", () => {
  movies2.innerHTML = ""
  btn5.style.display = "inline"
  btn6.style.display = "none"
})