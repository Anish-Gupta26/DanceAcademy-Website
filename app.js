var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/danceContact', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true}));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//Mongoose Schema
const contactSchema = new mongoose.Schema({
    name : String,
    age : Number,
    phone : String,
    email : String
  });
  
const Model = mongoose.model('Contact', contactSchema);

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var myData = new Model(req.body)
    myData.save().then(()=>{
         res.status(200).render('contact');
    }).catch((err)=>{
        res.send(err)
    })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


