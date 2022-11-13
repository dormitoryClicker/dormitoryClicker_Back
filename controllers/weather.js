const request = require('request')
require('dotenv').config();

exports.getWeather = (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=36.14524577397831&lon=128.39206568417444&appid=${process.env.KEY}`;
    
    const weather = new Promise((resolve, reject) => {
            request(url, {json: true}, (err, res, body) => {
                if(err)
                    reject(err);
    
                var list = body.list;
    
                var weather = new Array();
                list.forEach(element => {
                    var date_weather = new Object();
                    date_weather.date = element.dt_txt;
                    date_weather.weather = element.weather[0].main;
                    weather.push(date_weather);
                });
    
                resolve(weather);
            })
        })
    weather.then(result => res.send(result))
            .catch(err => res.send(err));
}
