"use strict";

import * as jsonSrvCalls from "./jsonSrvCalls.js";
import * as posterClicks from "./posterClicks.js";
import * as movieModal from "./movieModal.js";


await buildPosterDiv();
spinnerToggle();

async function buildPosterDiv() {

    let movieDb = await jsonSrvCalls.jsonGetAll();

    // build the posters div
    let posters = "";
    for (let movie of movieDb) {

        // <starColor> is a false class - used as id for replace()
        let cardTemplate =
        `
        <div class="card p-0" data-id=${movie.id}>
           <div id="image-container">
               <img src=${movie.posterUrl} class="card-img-top" alt="movie poster">
               <i class="bi bi-info-circle"></i>
           </div>
           <div class="card-body p-0 d-flex justify-content-between align-items-center">
               <button type="button" class="btn btn-sm" id="btnEdit"><i class="bi bi-pencil"></i></button>
               <i class="bi bi-star-fill <starColor>"></i>
               <i class="bi bi-star-fill <starColor>"></i>
               <i class="bi bi-star-fill <starColor>"></i>
               <i class="bi bi-star-fill <starColor>"></i>
               <i class="bi bi-star-fill <starColor>"></i>
               <button type="button" class="btn btn-sm" id="btnDelete"><i class="bi bi-trash"></i></button>
           </div>
        </div>
        `

        // color the rating stars
        let rating = parseInt(movie.rating);
        for (let i = 1; i <= rating; i++) {
            cardTemplate = cardTemplate.replace("<starColor>", 'goldStar');
        }

        // build html
        posters += cardTemplate;
    }

    document.querySelector("#poster-div").innerHTML = posters;
}


// add poster event delegator
document.querySelector("#poster-div").addEventListener("click", posterDivEv);
function posterDivEv(ev) {
    let clickedArea = ev.target.className;

    let info = clickedArea.includes("info-circle");
    let pencil = clickedArea.includes("pencil");
    let trash = clickedArea.includes("trash");

    if (info + pencil + trash > 0) {
        // which card ?
        let movieId = ev.target.closest(".card").dataset.id;

        // what action ?
        info ? posterClicks.clickedInfo(movieId) : null;
        pencil ? posterClicks.clickedPencil(movieId) : null;
        trash ? posterClicks.clickedTrash(movieId) : null;
    }
}


function spinnerToggle() {
    document.querySelector(".spinner-border").classList.toggle("hidden");
}


// nav bar 'add movie' button
document.querySelector("#addMovie").addEventListener("click", movieModal.addMovieBtn);


// clean up the fields from the movie modal on close
document.querySelector("#movieModal").addEventListener("hidden.bs.modal", movieModal.cleanUp);


// capture the movie modal stars
document.querySelector("#modalStars").addEventListener("click", movieModal.modalStarsClick);


// modalSaveChanges
document.querySelector("#modalSaveChanges").addEventListener("click", movieModal.modalSaveChanges);


export {buildPosterDiv, spinnerToggle};
