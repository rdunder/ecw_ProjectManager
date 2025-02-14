
import { Options } from "./Options";


/**
 * This async function makes a fetch request and returns a bolean depending on the response code
 * @param {string} method
 * @param {string} entity
 * @param {number} id 
 * @param {object} object 
 * @returns true if the response code is 200
 */
async function tryCallApiAsync(method, entity, id = null, object = null) {
    
    const url = id === null 
        ? `${Options.baseUrl}${entity}` 
        : `${Options.baseUrl}${entity}/${id}`

    const bodyContent = object === null
        ? null
        : JSON.stringify(object)

    const res = await fetch(url, {
        method: method,
        headers: {
            'X-API-Key': '484c6f3e-40db-4fae-b225-9562c7d0ca43',
            'accept': '*/*',
            'content-type': 'application/json'          
        },
        body: bodyContent
    });
    const data = await res.json();
    return data;
}

export {tryCallApiAsync}