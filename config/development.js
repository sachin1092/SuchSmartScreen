module.exports = {
    isDev: true,
    server: {
        port: process.env.PORT || 8000
    },
    geocode: {
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address='
    },
    db: {
        c_string: 'mongodb://localhost:27017/sss'
    },
    weather: {
        url: `https://api.weather.com/v1`,
        key: process.env.WEATHER_KEY
    },
    nest: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }
}
