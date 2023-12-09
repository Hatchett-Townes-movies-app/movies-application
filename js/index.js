"use strict";

/**
 *
 * initSite()
 * posterDivEv()
 * spinnerToggle()
 *
 */


import * as jsonSrvCalls from "./jsonSrvCalls.js";
import * as displayMovies from "./displayMovies.js";
import * as posterClicks from "./posterClicks.js";
import * as movieModal from "./movieModal.js";


// really for init and re-init/dynamic reloads
async function initSite() {
    const movieDb = await jsonSrvCalls.jsonGetAll();
    await displayMovies.buildPosterCards(movieDb);
}


// add poster div event delegator
document.querySelector("#poster-div").addEventListener("click", posterDivEv);
function posterDivEv(ev) {
    let clickedArea = ev.target.className;

    // only capture an icon click
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


// crank it up
await initSite();
// turn it off
spinnerToggle();


// nav bar 'add movie' button
document.querySelector("#addMovie").addEventListener("click", movieModal.addMovieBtn);


export {initSite, spinnerToggle};
