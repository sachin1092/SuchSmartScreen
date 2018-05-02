const envLoaded = require('dotenv').load({silent: true});
if(!envLoaded)
    console.log("warning:", __filename, "LINE_N", ".env cannot be found");

require('babel-register')
require('./app.js')
