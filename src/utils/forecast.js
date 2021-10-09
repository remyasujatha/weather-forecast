const axios = require('axios')

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location services!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search.')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
// })

const forecast = ({latitude, longitude} = {}, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=2970b16ba4e498c7e0f8efb449eb01eb&query='+ longitude +',' + latitude + '&units=m'
    console.log(url)
    axios.get(url)
         .then(({data} )=>{
            if(data.current == undefined){
                callback('No data retrived weatherstack', undefined)
            }else {
                callback(undefined, {
                    'weather_descriptions': data.current.weather_descriptions[0],
                    'temperature' : data.current.temperature
                })
            }
    })
         .catch(error => callback('Unable to connect to weatherstack', undefined))
}

module.exports = forecast