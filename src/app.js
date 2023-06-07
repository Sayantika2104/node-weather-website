const path = require('path')
const geocode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000
// Define path for Express config
pubPath = path.join(__dirname,'../public')
viewsPath = path.join(__dirname,'../templates/views')
partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubPath))

app.get('',(req , res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sayantika'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message: 'How may I help you?',
        name:'Sayantika'})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Sayantika'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please enter an address.'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
    {
        return res.send({error:error})
    }

    forecast(latitude,longitude,(error,forecastData)=>{
        if(error)
        {
            return res.send({error:error})
        }
        res.send({
            weather: forecastData,
            location: place,
            address: req.query.address
        })
    })
})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please enter a search term.'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found here',
        name:'Sayantika'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page Not Found',
        name:'Sayantika'
    })
})
app.listen(port,()=>{
    console.log("The server is up and running at port " + port)
})