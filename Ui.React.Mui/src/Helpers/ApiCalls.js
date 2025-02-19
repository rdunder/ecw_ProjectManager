
import { Options } from "./Options";


/**
 * This async function makes a fetch request and returns a bolean depending on the response code
 * @param {string} method
 * @param {string} entity
 * @param {number} id 
 * @param {object} object 
 * @returns true if the response code is 200
 */
async function tryCallApiAsync(method, entity, id = null, object = null, accessToken = null) {
    
    const url = id === null 
        ? `${Options.apiBaseUrl}${entity}` 
        : `${Options.apiBaseUrl}${entity}/${id}`

    const bodyContent = object === null
        ? null
        : JSON.stringify(object)

    const res = await fetch(url, {
        method: method,
        headers: {
            'authorization': `Bearer ${accessToken}`,
            'accept': '*/*',
            'content-type': 'application/json'          
        },
        body: bodyContent
    });
    const data = await res.json();
    return data;
}

export {tryCallApiAsync}