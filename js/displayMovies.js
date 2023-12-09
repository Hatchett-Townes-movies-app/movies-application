"use strict";

/**
 *
 * buildPosterCards()
 *
 */


async function buildPosterCards(movieDb) {

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
           <div hidden>
               <div id="movieTitle">${movie.title}</div>
               <div id="movieSummary">${movie.movieSummary}</div>
               <div id="movieRating">${movie.rating}</div>
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


export {buildPosterCards};
