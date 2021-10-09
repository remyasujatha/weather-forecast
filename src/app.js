const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { text } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


console.log(__dirname)

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//for dynamic contents.. hbs is used
//Setup handlerbar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dorectory to serve
app.use(express.static(publicDirectoryPath))

//app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Remya Sujatha'
    })
})
//app.com/products
app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
    return    res.send({
            error: "You must provide value for search"
        })
    }
    res.send({
        products : []
    })
})
//app.com/help
app.get('/help', (req, res)=>{
    // res.send('<title>Help</title>')
    res.render('help',{
        mailID: 'remya.sujatha@outlook.com',
        title: 'Help',
        name: "Remya Sujatha"
    })
})


// app.com/about
app.get('/about', (req,res)=>{
    // res.send({
    //     'name': 'Remya',
    //     'age': 31
    // })
    res.render('about', {
        title: 'About Me',
        name: 'Remya Sujatha'
    })
})

//app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "You must provide an address!"
        })
    }
    // res.send({
    //     'forecast' : "Cloudy",
    //     'location': 'Vienna',
    //     address : req.query.address
    // })

    geocode.geocode(req.query.address, (error, data)=>{
   
        if(error){
             console.log(error + " " + data)
             return res.send({
                 error : error + " " + data
             })
        }
            console.log(data)
           forecast(data, (error,response) => {
                if(error){
                   return res.send({
                       error : error
                   })
                }
                res.send({
                    address: req.query.address,
                    forecast : 
                    
                })
            })
    })
})

//handle for a bunch of unmathcing requests
app.get('/help/*', (req, res)=> {
    // res.send('Help article not found')
    res.render('404',{
        errorMessage: 'Help article not found'
    })
})

//all other requests which doesn't match any of the above 
app.get('*', (req,res)=>{
    // res.send('404 Page not found!')
    res.render('404', {
        errorMessage : '404 Page Not Found!'
    });
})
app.listen(3000, ()=>{
    console.log("Server Started")
})