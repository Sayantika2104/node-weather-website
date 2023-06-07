const request = require('postman-request')

const forecast = (lat,lon,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=0d91c2d1e960f2357b999ce7296542f6&query='+lat+','+lon
    request({url:url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback('Unable to connect to weather sevices',undefined)
        }
        else if(body.error)
        {
            callback('There is some error in the api',undefined)
        }
        else
        {
            callback(undefined,
                body.current.weather_descriptions+". It is currently "+body.current.temperature+" degrees out, but it feels like "+ body.current.feelslike +" .There is a "+body.current.precip+"% chance of rain."
                )
            
        }
    })
}

module.exports = forecast


