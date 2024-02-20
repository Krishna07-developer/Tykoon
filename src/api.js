export const addNewContact = (async(data) => {
    return new Promise(async(resolve, reject) => {
      return new Promise(async(resolve, reject) => {
        const appUpdateResp = await fetch(`https://www.api.tykoon.io/createSamathaContact`, {
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "accept": "application/json"
          },
          "body": JSON.stringify(data)
        }).then((response) => response.json())
        .then(function(data) { 
          resolve(data)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
    })
  })