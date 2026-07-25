const detailsContainer = document.getElementById("movie-details-container");

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const API_KEY = "5e7f829a";

async function loadMovieDetails() {
    if (!movieId) {
        detailsContainer.innerHTML = "<h2>Movie not found!</h2>";
        return;
    }

    try {
        let movieData = null;

        if (movieId.startsWith("local_")) {
            const response = await fetch("../data.json");
            const localMovies = await response.json();
            movieData = localMovies.find(m => m.imdbID === movieId);
        } else {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
            movieData = await response.json();
        }

        if (!movieData || movieData.Response === "False") {
            detailsContainer.innerHTML = "<h2>Movie details could not be loaded.</h2>";
            return;
        }
        displayDetails(movieData);

    } catch (error) {
        console.error(error);
        detailsContainer.innerHTML = "<h2>An error occurred while fetching details.</h2>";
    }
}

function displayDetails(movie) {
    const trailerHTML = movie.trailer 
        ? `
            <div style="margin-top: 30px;">
                <h3>Watch Trailer</h3>
                <video width="100%" controls style="max-width: 640px; border-radius: 8px;">
                    <source src="${movie.trailer}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            `
        : `<p style="margin-top: 20px; color: gray;">Trailer not available for this movie.</p>`;

    detailsContainer.innerHTML = `
        <div class="details-card" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
            <img src="${movie.Poster}" alt="${movie.Title}" style="max-width: 300px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            <h1>${movie.Title}</h1>
            <p><strong>Year:</strong> ${movie.Year}</p>
            ${movie.Plot ? `<p style="max-width: 600px;"><strong>Plot:</strong> ${movie.Plot}</p>` : ''}
            ${movie.Genre ? `<p><strong>Genre:</strong> ${movie.Genre}</p>` : ''}
            
            ${trailerHTML}
            
            <br>
            <button onclick="history.back()" style="padding: 10px 20px; cursor: pointer;">Go Back</button>
        </div>
    `;
}

loadMovieDetails();