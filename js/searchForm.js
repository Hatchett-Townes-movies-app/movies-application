"use strict";

/**
 *
 * search()
 * searchLocal()
 *
 */

import * as index from "./index.js";
import {movieDb} from "./index.js";
import * as displayMovies from "./displayMovies.js";


const searchEl = document.querySelector("#searchForm");


async function search() {

    // searching local or remote ?
    // only build for local
    let searchLocRem = "local";

    const searchString = searchEl.value;

    switch (searchLocRem) {
        case "local":
            await searchLocal(searchString);
            break;
    }
}

async function searchLocal(searchString) {

    // lower case and no zero string words
    let words = searchString.toLowerCase().split(" ").filter(item => item !== "");

    // only process when at least a few characters
    if (searchString.length >= 1) {

        // find words in db
        let foundMovieIds = [];
        for (let word of words) {

            // using the index here - using 'in'
            for (let index in movieDb) {

                // pick the keys to search on
                let tempArray = [
                    movieDb[index].title.toLowerCase(),
                    movieDb[index].movieSummary.toLowerCase(),
                ];

                // see if the word is in the temp array
                for (let value of tempArray) {
                    if (value.includes(word)) {
                        if (!foundMovieIds.includes(index)) {
                            foundMovieIds.push(index);
                        }
                    }
                }
            }
        }

        // create a new filtered movie db
        let filteredMovieDb = [];
        foundMovieIds.forEach((el, i) => {
            filteredMovieDb.push(movieDb[el]);
        });

        // build the filtered db
        await displayMovies.buildPosterCards(filteredMovieDb);
    } else {
        index.spinnerToggle(); // on
        await index.initSite();
        index.spinnerToggle(); // off
    }
}


export {search};
