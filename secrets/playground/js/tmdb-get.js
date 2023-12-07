"use strict";

import {bearer_movieDb} from "../../moviedb.js";

// https://developer.themoviedb.org/reference/movie-details
// https://developer.themoviedb.org/reference/search-movie
// https://developer.themoviedb.org/reference/movie-images

// /wwdqGLwzfpe6SmqVE9HGd55IMDs.jpg
// https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg
// https://image.tmdb.org/t/p/original/oZRVDpNtmHk8M1VYy1aeOWUXgbC.jpg
// https://image.tmdb.org/t/p/original/5M0j0B18abtBI5gi2RhfjjurTqb.jpg




async function test() {

    let url = "https://api.themoviedb.org/3/search/movie?query=terminator&include_adult=false&language=en-US&page=1";
    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${bearer_movieDb}`
        }
    }
    let resp = await fetch(url, options);
    let data= await resp.json();



    console.log(data);
}

export {test};


