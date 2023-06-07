const request = require('postman-request')

const geocode = (address, callback) =>{

    const url = 'https://api.geoapify.com/v1/geocode/search?text='+ encodeURIComponent(address) + '&apiKey=5c636098705547e5a310992fd35012b5'
    request({url:url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback("Unable to connect to location services",undefined)
        }
        else if(body.features.length===0){
            callback("Unable to find location. Try another search.",undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].properties.lat,
                longitude: body.features[0].properties.lon,
                place: body.features[0].properties.formatted
            })
        }
    })
}

module.exports = geocode