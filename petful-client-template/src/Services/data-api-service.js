import config from '../config';

const DataApiService={
       getPeople(){
        return   fetch(`${config.API_ENDPOINT}/people`) 
                  .then(res => (!res.ok)
                            ? res.json().then(e=> Promise.reject(e))
                            : res.json()
                    )  
                    
     
        },
     postPeople(name) {
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(
                name
            ),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
     getPet(){
        return  fetch(`${config.API_ENDPOINT}/pets`) 
                    .then(res => (!res.ok)
                            ? res.json().then(e=> Promise.reject(e))
                            : res.json()
                    )  
        
        }, 
    deletePeople(){
        return fetch(`${config.API_ENDPOINT}/people`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        })

            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : undefined
            )
    },
     deletePet(type){
        return fetch(`${config.API_ENDPOINT}/pets`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({type})
        })
    }
        
}

export default DataApiService;
