const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWRsYWltYXJpIiwiYSI6ImNrcDVqZXNycjBhYzgyb253dG5oMm5jY3gifQ.4AAq6RNJ28VzXfBBpYor6g&limit=1`

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!')
        } else if (body.features.length === 0) {
            callback(`${address} not found! Try another seach!`)
        } else {
            const { center: center, place_name: location } = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }
    })
}

module.exports = geocode