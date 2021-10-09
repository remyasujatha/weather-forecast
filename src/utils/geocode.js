const axios = require('axios')
const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicnN1amF0aGEiLCJhIjoiY2t0NzJ3OTVoMGkwOTJ4cGh6a3Q0cTRkMiJ9.YOsjt5XpE19L3rMQCkjXVg&limit=1'
    axios.get(url).then(({data})=>{
        console.log(url)
       if(data.features.length == 0){
            callback('No data retreived' , undefined)
        }else{
            callback(undefined,{
                'latitude' : data.features[0].center[0],
                'longitude' : data.features[0].center[1],
                'location' : data.features[0].place_name
    
            })
        }
    
    })
    .catch((error) =>{
        callback('Unable to connect to map services', error)
       
    })
    }
    module.exports = {geocode :geocode}