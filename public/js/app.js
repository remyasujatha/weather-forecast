console.log('Client side js file is loaded')

fetch("http://puzzle.mead.io/puzzle").then(response => {
    response.json().then(data => console.log(data))
})

let weatherForecast = (location, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ location + '.json?access_token=pk.eyJ1IjoicnN1amF0aGEiLCJhIjoiY2t0NzJ3OTVoMGkwOTJ4cGh6a3Q0cTRkMiJ9.YOsjt5XpE19L3rMQCkjXVg&limit=1'
fetch(url).then(response => {
    response.json().then(data => {
        if (data.features.length == 0) {
            console.log("No data retreived for the given address!")
            callback("No data retreived for the given address!")
        }
        else {
            let location = {
                'latitude': data.features[0].center[0],
                'longitude': data.features[0].center[1],
                'location': data.features[0].place_name
            }
            console.log(location)
            const forecast_url = 'http://api.weatherstack.com/current?access_key=2970b16ba4e498c7e0f8efb449eb01eb&query='+ location.longitude +',' + location.latitude + '&units=m'
   
            fetch(forecast_url).then(response=> {
                response.json().then(data=>{
                    if(data.current == undefined){
                        callback.log('Error fetching data for the given location!')
                    }else{
                        let weatherData = {
                            'weather_descriptions': data.current.weather_descriptions[0],
                            'temperature' : data.current.temperature
                        }
                        console.log(weatherData.weather_descriptions + ". It is currently " + weatherData.temperature + " degress out.")
                        callback(weatherData.weather_descriptions + ". It is currently " + weatherData.temperature + " degress out.")
                    }
                }).catch(error => callback('Error connecting to weatherstack!' + error))
            })
        }
    }).catch(error =>
        callback("Error connecting to mapbox"))
})
}
const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault() // to prevent pg to be refreshed after pressing the button
    const search = document.querySelector('input')
    const message1 = document.querySelector('#message-1')
    const message2 = document.querySelector("#message-2")

    message2.textContent = 'Fetching weather data'
    message1.textContent = ""
    console.log('testing!')
    const location = search.value
    // console.log(location)
    if(location.length == 0){
       return console.log("You must provide a value!")
    }
    weatherForecast(location,
        (callback) => {
            message2.textContent = ""
            message1.textContent = callback
        })

   
})