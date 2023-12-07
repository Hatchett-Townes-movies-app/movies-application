"use strict";

// notes
// maybe need a () that also takes an api key

/***
 * getData is a method that calls an api using 'GET' - assumes the API token is part of the url
 * @param {string} url is the url for the call
 * @returns {Promise} a promise containing the api data
 *
 * EXAMPLE:
 *
 *  getData(url) {
 *      // do something with results
 *  })
 *
 */
async function getData(url) {
    try {
        // const resp = await fetch(url);
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        if ( !resp.ok ) {
            throw new Error(`*-*-* try: ${resp.statusText}`);
        }
        return await resp.json();
    } catch (error) {
        console.error(`*-*-* catch: ${error}`);
        throw error; //re-throw for the caller
    } finally {
        console.info(`*-*-* finally: done`);
    }
}
