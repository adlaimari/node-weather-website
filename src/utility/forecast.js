const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fd7eb2fe2ae7d81a62deea223081827b&query=${latitude},${longitude}&units=f`
    console
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service!')
        } else if (latitude !== parseFloat(latitude) || longitude !== parseFloat(longitude)) {
            callback('Something is wrong with your coordinates!')
        } else {
            const { temperature, feelslike, weather_descriptions } = body.current
            callback(undefined, {
                temperature,
                feelslike,
                weather_description: weather_descriptions[0]
            })
        }

    })
}

module.exports = forecast