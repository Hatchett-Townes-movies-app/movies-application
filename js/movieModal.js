"use strict";

import * as index from "./index.js";
import * as jsonSrvCalls from "./jsonSrvCalls.js";
// import * as displayMovies from "./displayMovies.js";


// from 'add movie' button in nav bar
function addMovieBtn(ev) {
    document.querySelector("#modalTitle").innerText = "Add Movie";
    document.querySelector("#movieButton").click();
}


// remove star ratings from modal else it inherits from the previous call
function removeStarRatings() {
    let starElements= document.querySelector("#modalStars").children;
    for (let el of starElements) {
        el.classList.remove("goldStar");
    }
}


// reset the fields from modal else it inherits from the previous call
document.querySelector("#movieModal").addEventListener("hidden.bs.modal", cleanUp);
function cleanUp() {
    document.querySelector("#movieTitle").value = "";
    document.querySelector("#movieSummary").value = "";
    document.querySelector("#posterUrl").value = "";
    removeStarRatings();
}


// what are the star ratings in nums from db and translate it to colored stars
document.querySelector("#modalStars").addEventListener("click", modalStarsClick);
function modalStarsClick(ev) {
    if (ev.target.className.includes("bi-star-fill")) {
        let rating = parseInt(ev.target.id);
        let starElements= document.querySelector("#modalStars").children;

        // user can change star ratings within the modal - requires a reset each time
        removeStarRatings();

        // build the user star selection
        for ( let i= 0; i < rating; i++) {
            starElements[i].classList.add("goldStar");
        }
    }
}


// modalSaveChanges
document.querySelector("#modalSaveChanges").addEventListener("click", modalSaveChanges);
async function modalSaveChanges() {
    // toggle on
    index.spinnerToggle();

    document.querySelector("#modalClose").click();

    // count the gold stars
    let starCount = 0;
    for (let el of document.querySelector("#modalStars").children) {
        if (el.className.includes("goldStar")) {
            starCount++;
        }
    }

    // build the object
    let movieId = document.querySelector("#movieModal").dataset.id;
    let movieObj = {
        "id": movieId,
        "title": document.querySelector("#movieTitle").value,
        "movieSummary": document.querySelector("#movieSummary").value,
        "posterUrl": document.querySelector("#posterUrl").value,
        "rating": starCount,
    }

    // send to json server - adding or editing ?
    let modalTitle = document.querySelector("#modalTitle").innerText;
    if (modalTitle === "Add Movie") {
        console.log("adding");
        await jsonSrvCalls.jsonPost(movieObj);
    } else { // "editing"
        console.log("editing");
        await jsonSrvCalls.jsonPut(movieObj, movieId);
    }

    // changes so, rebuild it all
    await index.initSite();
    // toggle off
    index.spinnerToggle();
}


export { addMovieBtn, cleanUp, modalStarsClick, modalSaveChanges};
