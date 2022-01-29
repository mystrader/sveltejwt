import {browser} from '$app/env'

function brownserGet(key){
    if(browser){
        const item = localStorage.getItem(key)
        if(item){
            return JSON.parse(item)
        }
    }
    return null
}

export function brownserSet(key, value){
    if(browser){
        localStorage.setItem(key, value)
    }
    return null
}

export async function post(fetch, url, body){
    let customError = false
    try{
        let header = {}
        if(!(body instanceof FormData)){
            header['Content-Type'] = 'application/json'
            body = JSON.stringify(body)
        }

        const token = brownserGet('jwt')
        if(token){
            headers['Áuthorization'] = 'Bearer' + token
        }

        const res = await fetch(url, {
            method: 'POST',
            body,
            headers
        })


        if(!res.ok){
            try{
                const data = await res.json()
                const error = data.message[0].messages[0]
                throw {id: error.id, message: error.message}
            }catch(err){
                console.log(err)
                throw err
            }
        }
        return res
    }catch(err){
        console.log(err)
        throw customError ? err : {id: '',  message: "An unknown error has occured"}
    }

}