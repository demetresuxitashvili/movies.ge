const API_KEY = "5e7f829a";
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie`;
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const toggleBtn = document.getElementById("toggleBtn");

let apiMovies = [];
let localMovies = [];
let currentMovies = [];
let isExpanded = false;

async function getMovies() {
  try {
    const response = await fetch(URL);
    const result = await response.json();
    apiMovies = result.Search || [];

    const localResponse = await fetch("../data.json");
    localMovies = await localResponse.json();

    updateMoviesList();
  } catch (error) {
    console.error(error);
  }
}

function updateMoviesList() {
  currentMovies = isExpanded ? [...apiMovies, ...localMovies] : [...apiMovies];
  toggleBtn.innerText = isExpanded ? "Show Less" : "Show More";
  
  const searchValue = searchInput.value.toLowerCase();
  const filtered = currentMovies.filter((movie) => 
    movie.Title.toLowerCase().includes(searchValue)
  );

  displayMovies(filtered);
}

function displayMovies(arr) {
  moviesContainer.innerHTML = "";
  arr.forEach((movie) => {
    moviesContainer.innerHTML += `
      <div class="card">
        <a href="movie-details.html?id=${movie.imdbID}">
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h2>${movie.Title}</h2>
        </a>
        <p>Year: ${movie.Year}</p>
        <button onclick="addToWatchlist('${movie.imdbID}')"> Watchlist </button>
      </div>
    `;
  });
}

toggleBtn.addEventListener("click", function() {
  isExpanded = !isExpanded;
  updateMoviesList();
});

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = currentMovies.filter((movie) => movie.Title.toLowerCase().includes(value));
  displayMovies(filtered);
});

sortSelect.addEventListener("change", function () {
  if (this.value === "year") {
    apiMovies.sort((a, b) => b.Year - a.Year);
    localMovies.sort((a, b) => b.Year - a.Year);
  }
  updateMoviesList();
});

function addToWatchlist(id) {

  const currentUser = localStorage.getItem('currentUser');

  if(!currentUser){
    alert('please login to add movies to wathlist');
    location.href = 'login.html';
    return;
  }

  const movie = currentMovies.find((m) => m.imdbID === id);
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const exists = watchlist.find((item) => item.imdbID === id);
  
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