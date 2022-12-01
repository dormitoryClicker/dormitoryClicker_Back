const express = require('express');
const weathers = require('./controllers/weather.js')
const cors = require('cors')
let routes = require("./routes/routes.js");

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', routes);

app.get("/", (req, res)=>{
    res.json({message: "Hello World!"});
});

app.get('/api/weather', weathers.getWeather);

// require("./routes/userRoutes.js")(app);
// require("./routes/machineRoutes.js")(app);

var server = app.listen(8080, function() {
    console.log('server running on', server.address().port, 'port');
})