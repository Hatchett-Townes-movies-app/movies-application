"use strict";

import * as jsonSrvCalls from "./jsonSrvCalls.js";


// TODO: *****
// info icon
function clickedInfo(movieId) {
    console.log(movieId, "info");

}


// pencil icon
async function clickedPencil(movieId) {

    // get the movie details from the db
    let urlMovieDb = `http://localhost:3000/movies/${movieId}`;
    let movie = await jsonSrvCalls.jsonGet(urlMovieDb);

    // add the movie id to the modal
    document.querySelector("#movieModal").setAttribute("data-id", movieId)

    // edit the fields
    document.querySelector("#modalTitle").innerText = "Edit Movie";
    document.querySelector("#movieTitle").value = movie.title;
    document.querySelector("#movieSummary").value = movie.movieSummary;
    document.querySelector("#posterUrl").value = movie.posterUrl;

    // add star rating
    let starElements= document.querySelector("#modalStars").children;
    let rating = parseInt(movie.rating);
    for ( let i= 0; i < rating; i++) {
        starElements[i].classList.add("goldStar");
    }

    // call the modal
    document.querySelector("#movieButton").click();
}


// TODO: *****
// trash icon
function clickedTrash(movieId) {
    console.log(movieId, "trash");

}


export {clickedInfo, clickedPencil, clickedTrash};
