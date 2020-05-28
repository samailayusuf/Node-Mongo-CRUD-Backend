const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const Thing = require('./models/thing');

const app = express();
app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://yusuf:yusuf@cluster0-4lthi.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/stuff', (req, res, next)=>{
    const thing = new Thing({
        title:req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    thing.save()
    .then( () => {
            res.status(201).json({message:'saved successfully'});
        }
    )
    .catch( (error)=>{
            res.status(400).json({
                error:error
            });
        }
    );
});

app.get('/api/stuff/:id', (req, res, next)=>{
    Thing.findOne({
        _id: req.params.id
    }).then( (thing)=>{
        res.status(200).json(thing);
    }).catch( (error)=>{
        res.status(404).json({
            error:error
        })
    });
});


app.use('/api/stuff', (req, res, next) => {
    Thing.find().then(
        (things)=>{
            res.status(200).json(things);
        }
    ).catch(
        (error)=>{
            res.status(404).json({error:error});
        }
    )
    //res.status(200).json(stuff);
  });

module.exports = app;