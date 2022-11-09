const express = require('express');

var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res)=>{
    res.json({message: "Hello World!"});
});

require("./routes/userRoutes.js")(app);
require("./routes/machineRoutes.js")(app);

var server = app.listen(3000, function() {
    console.log('server running on', server.address().port, 'port');
})