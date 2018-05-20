
const port = process.env.PORT || 3000;
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('viewengine','hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} :${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
if(err){
    console.log(err);
}
    });
next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));



hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
    });

    hbs.registerHelper('Case',(text) => {
        return text.toUpperCase();
        });

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle:'Home Page',
        Welcome:'Welcome home'
    });
});

app.get('/about',(req,res) => {
res.render('about.hbs',{
    pageTitle:'About Page'
});
});

app.listen(port,() => {
    console.log(`server running on port ${port}`);
});