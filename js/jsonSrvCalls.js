"use strict";

let urlMovieDb = "http://localhost:3000/movies";


// get the whole db by default - init
async function jsonGetAll(){
    return await jsonGet(urlMovieDb);
}


// json get
async function jsonGet(urlStr) {
    let url = urlStr;
    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    }
    let resp = await fetch(url, options);
    let data = await resp.json();
    return data;
}


// json put
async function jsonPut(movieObj, movieId) {
    let url = `${urlMovieDb}/${movieId}`;
    try {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        };
        let resp = await fetch(url, options);
        let updatedMovie = await resp.json();
        return updatedMovie;
    } catch (error) {
        console.error(error);
    }
}


// json post
async function jsonPost(movieObj) {
    let url = urlMovieDb;
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        };
        let resp = await fetch(url, options);
        let newMovie = await resp.json();
        return newMovie;
    } catch (error) {
        console.error(error);
    }
}


// TODO: *****
// json delete
async function jsonDelete(movieObj) {
    console.log("json delete: ", movieObj);

}


export {jsonGetAll, jsonGet, jsonPut, jsonPost};
