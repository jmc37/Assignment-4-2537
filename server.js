var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
const express = require('express')
const app = express()
app.set('view engine', 'ejs');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})   

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepage </h1>')    
// })

const https = require('https');

app.get('/profile/:id', function (req, res) {
    // console.log(req);


    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    https.get(url, function (https_res) {
        data = '';
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on('end', function () {
            data = JSON.parse(data)
            console.log(data)
            hp_ =  data.stats.filter((obj_)=>{
                return obj_.stat.name == "hp"
            }).map( (obj_2)=> {
                return obj_2.base_stat
            })
            console.log(hp_)
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "img_path": data.sprites.other["official-artwork"]["front_default"],
                "hp": hp_[0],
                "type": data.types[0].type.name,
                "weight": data.weight


            });
        })
    })


})



app.use(express.static('./public'));