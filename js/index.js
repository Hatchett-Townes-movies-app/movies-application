"use strict";

// https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg
// https://image.tmdb.org/t/p/original/oZRVDpNtmHk8M1VYy1aeOWUXgbC.jpg
// https://image.tmdb.org/t/p/original/5M0j0B18abtBI5gi2RhfjjurTqb.jpg

function addMovie() {
    // Get form data
    const title = document.getElementById('title').value;
    const rating = document.getElementById('rating').value;
    const summary = document.getElementById('summary').value;

    // Create a FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('rating', rating);
    formData.append('summary', summary);

    // Make a POST request using Fetch API
    fetch('http://localhost:3000/movies', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response, if needed
            console.log('Movie added successfully:', data);

            // Update the movie list after adding a new movie
            updateMovieList();
        })
        .catch(error => {
            // Handle error
            console.error('Error adding movie:', error);
        });
}

function updateMovieList() {
    // Make AJAX request to get the updated movie list
    fetch(' http://localhost:3000/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movieData => {
            // Update the displayed movie list
            displayMovies(movieData);
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching updated movie data:', error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    // Display loading message
    document.getElementById("loading").style.display = "block";

    // Initial AJAX request to get the movie list
    fetch(' http://localhost:3000/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movieData => {
            // Display the initial movie list
            displayMovies(movieData);

            // Hide loading message
            document.getElementById("loading").style.display = "none";
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching initial movie data:', error);
            document.getElementById("loading").innerHTML = "Error loading data";
        });
});

function displayMovies(movieData) {
    var movieListDiv = document.getElementById("movieList");

    // Clear existing content
    movieListDiv.innerHTML = "";

    // Loop through each movie in the data
    movieData.forEach(movie => {
        // Create a div element for each movie
        var movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        // Create elements for title, rating, and summary
        var titleElement = document.createElement("h2");
        titleElement.textContent = movie.title;

        var ratingElement = document.createElement("p");
        ratingElement.textContent = "Rating: " + movie.rating;

        var summaryElement = document.createElement("p");
        summaryElement.textContent = movie.summary;

        // Append elements to the movie div
        movieDiv.appendChild(titleElement);
        movieDiv.appendChild(ratingElement);
        movieDiv.appendChild(summaryElement);

        // Append the movie div to the movieListDiv
        movieListDiv.appendChild(movieDiv);
    });
}