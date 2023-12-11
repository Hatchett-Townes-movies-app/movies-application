"use strict";

/***
 * handles either an info, pencil, or trash icon click
 *
 * clickedInfo()
 * clickedPencil()
 * clickedTrash()
 *
 */

import * as index from "./index.js";
import * as jsonSrvCalls from "./jsonSrvCalls.js";

// movie modal
const modalEl = document.querySelector("#modalMovie");


// info icon
function clickedInfo(movieId) {

    // card element
    const cardEl = document.querySelector(`[data-id="${movieId}"]`);
    const movieTitle = cardEl.querySelector("#movieTitle").innerText;
    const movieSummary = cardEl.querySelector("#movieSummary").innerText;

    const modalInfoEl = document.querySelector("#modalInfo");
    modalInfoEl.querySelector("#modalInfoTitle").innerText = movieTitle;
    modalInfoEl.querySelector("#modalInfoText").innerText = movieSummary;
    document.querySelector("#modalInfoButton").click();
}


// pencil icon
async function clickedPencil(movieId) {

    // movie html
    const movieCardEl = document.querySelector(`[data-id="${movieId}"]`);

    // populate the fields
    modalEl.querySelector("#modalTitle").innerText = "Edit Movie";
    modalEl.querySelector("#modalMovieTitle").value = movieCardEl.querySelector("#movieTitle").innerText;
    modalEl.querySelector("#modalMovieSummary").value = movieCardEl.querySelector("#movieSummary").innerText;
    modalEl.querySelector("#modalMoviePosterUrl").value = movieCardEl.querySelector("img").src;

    // add star rating
    let starElements = document.querySelector("#modalMovieRating").children;
    let rating =  parseInt(movieCardEl.querySelector("#movieRating").innerText);
    for (let i = 0; i < rating; i++) {
        starElements[i].classList.add("goldStar");
    }

    // send the movie id to the modal
    modalEl.dataset.id = movieId;

    // call the modal
    document.querySelector("#modalMovieButton").click();
}


// trash icon
async function clickedTrash(movieId) {
    index.spinnerToggle(); // on
    await jsonSrvCalls.jsonDelete(movieId);
    await index.initSite();
    index.spinnerToggle(); // off
}


export {clickedInfo, clickedPencil, clickedTrash};
