const express = require('express')
const path = require('path')
const hbs = require('hbs')
const e = require('express')
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')
const app = express()

//Define paths for express config
const pubDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(pubDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adlai Mari'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adlai Mari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        name: 'Adlai Mari'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide location to search'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, { temperature, feelslike, weather_description } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecastReport: `It's ${weather_description} at  ${location} with temperature of ${temperature} degrees that feels like ${feelslike} degrees.`
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: 'Error 404:',
        name: 'Adlai Mari',
        errorMsg: 'Article page not found!'
    })
})
app.get('*', (req, res) => {
    res.render('404error', {
        title: 'Error 404:',
        name: 'Adlai Mari',
        errorMsg: 'Page not found!'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})