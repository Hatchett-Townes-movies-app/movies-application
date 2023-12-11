"use strict";

/**
 *
 * randomize()
 * buildPosterCards()
 *
 */


async function randomize(movieDb) {

    let randomizeArray = [];
    let maxNum = movieDb.length;
    let minNum = 0;

    do {
        let randomNumber =
            Math.floor(Math.random() * (maxNum - minNum)) + minNum;

        if (!randomizeArray.includes(randomNumber)){
            randomizeArray.push(randomNumber);
            // converge on the range
            randomNumber === minNum ? minNum += +1 : null;
            randomNumber === maxNum ? maxNum += -1 : null;
        }
    } while(randomizeArray.length !==  movieDb.length);

    return randomizeArray;
}


async function buildPosterCards(movieDb) {

    let randomizeArray = await randomize(movieDb);

    // build the posters div
    let posters = "";
    for (let index of randomizeArray) {

        let movie = movieDb[index];

        // quick check for valid url
        let moviePosterUrl = movie.posterUrl;
        if (!moviePosterUrl.includes("http")) {
            moviePosterUrl = "../media/coming-soon.png";
        }

        // <starColor> is a false class - used as id for replace()
        let cardTemplate =
        `
        <div class="card p-0" data-id=${movie.id}>
           <div id="image-container">
               <img src=${moviePosterUrl} class="card-img-top" alt="movie poster">                                             
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

    // add placeholder text for search form
    const placeHolderText = `Search the database - ${movieDb.length} titles`
    document.querySelector("#searchForm").setAttribute("placeholder", placeHolderText);
}


export {buildPosterCards};
