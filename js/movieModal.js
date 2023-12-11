"use strict";

/***
 * just to handle the movie modal
 *
 * addMovieBtn()
 * removeStarRatings()
 * cleanUp()
 * modalStarsClick()
 * modalSaveChanges()
 *
 */

import * as index from "./index.js";
import * as jsonSrvCalls from "./jsonSrvCalls.js";


const modalMovieEl = document.querySelector("#modalMovie");
const modalMovieButton = document.querySelector("#modalMovieButton");


// nav bar 'add movie' button
function addMovieBtn() {
    modalMovieEl.querySelector("#modalTitle").innerText = "Add Movie";
    modalMovieButton.click();
}


// what are the star ratings in nums from db and translate it to colored stars
modalMovieEl.querySelector("#modalMovieRating").addEventListener("click", modalStarsClick);

function modalStarsClick(ev) {
    if (ev.target.className.includes("bi-star-fill")) {
        let rating = parseInt(ev.target.id);
        let starElements = modalMovieEl.querySelector("#modalMovieRating").children;

        // user can change star ratings within the modal - requires a reset each time
        removeStarRatings();

        // build the user star selection
        for (let i = 0; i < rating; i++) {
            starElements[i].classList.add("goldStar");
        }
    } else {
        removeStarRatings();
    }
}


// modalSaveChanges
modalMovieEl.querySelector("#modalSaveChanges").addEventListener("click", modalSaveChanges);

async function modalSaveChanges() {
    // toggle on
    index.spinnerToggle();

    modalMovieEl.querySelector("#modalClose").click();

    // count the gold stars
    let starCount = 0;
    for (let el of modalMovieEl.querySelector("#modalMovieRating").children) {
        if (el.className.includes("goldStar")) {
            starCount++;
        }
    }

    // build the object
    let movieId = modalMovieEl.dataset.id;
    let movieObj = {
        "id": movieId,
        "title": modalMovieEl.querySelector("#modalMovieTitle").value,
        "movieSummary": modalMovieEl.querySelector("#modalMovieSummary").value,
        "posterUrl": modalMovieEl.querySelector("#modalMoviePosterUrl").value,
        "rating": starCount,
    }

    // send to json server - adding or editing ?
    let modalTitle = modalMovieEl.querySelector("#modalTitle").innerText;
    let jsonReturn;
    if (modalTitle === "Add Movie") {
        jsonReturn = await jsonSrvCalls.jsonPost(movieObj);
    } else { // "editing"
        jsonReturn = await jsonSrvCalls.jsonPut(movieObj, movieId);
    }

    // changes so, rebuild it all
    await index.initSite();

    // move any edit or add as a first element
    const savedMovieEl = document.querySelector(`[data-id="${jsonReturn.id}"]`);
    document.querySelector("#poster-div").removeChild(savedMovieEl);
    document.querySelector("#poster-div").prepend(savedMovieEl);

    // toggle off
    index.spinnerToggle();
}


// reset the fields from modal else it inherits from the previous call
modalMovieEl.addEventListener("hidden.bs.modal", cleanUp);

function cleanUp() {
    modalMovieEl.querySelector("#modalMovieTitle").value = "";
    modalMovieEl.querySelector("#modalMovieSummary").value = "";
    modalMovieEl.querySelector("#modalMoviePosterUrl").value = "";
    removeStarRatings();
}


// remove star ratings from modal else it inherits from the previous call
function removeStarRatings() {
    let starElements = modalMovieEl.querySelector("#modalMovieRating").children;
    for (let el of starElements) {
        el.classList.remove("goldStar");
    }
}


export {addMovieBtn, cleanUp, modalStarsClick, modalSaveChanges};
