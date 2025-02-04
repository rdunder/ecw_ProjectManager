// helper funktion för att skicka formulär
// genom att returnera true eller false så kan jag enkelt sätta en feedback på formuläret.


/**
 * This async function makes a fetch request and returns a bolean depending on the response code
 * @param {string} url 
 * @param {string} method 
 * @param {object} object 
 * @returns true if the response code is 200
 */
async function tryCallApiAsync(url, method, object) {
    
    const res = await fetch(url, {
        method: method,
        headers: {
          'accept': '*/*',
          'content-type': 'application/json'
        },
        body: JSON.stringify(object)
    });
    return res.status === 200;
}

export {tryCallApiAsync}