const express = require('express');

const router = express.Router();

module.exports = router;

const Subscriber = require('../models/subscriber')



//getAll
router.get('/', async (req, res) => {

try {

    const subscribers = await Subscriber.find();
    res.json(subscribers);

} catch (err) {
    
    res.status(500).json({ message: err.message });
}

});


//getOne using middleware
router.get('/:id', getSubscriber, (req, res) => {

    res.send(res.subscriber);

    //res.send(res.subscriber.name) -- if I just wanted the name


});

//Create
router.post('/', async (req, res) => {

    const subscriber = new Subscriber({

        name: req.body.name,
        age: req.body.age,
        subStatus: req.body.subStatus,
    })

    try{

        const newSubscriber = await subscriber.save();

        //sending 201 instead of 200 as this means successfully created an object
        res.status(201).json(newSubscriber);

    }catch(err){
        

        //res 400 here for catching bad data 
        res.status(400).json({message: err.message});

    }

});

// patch update 
router.patch('/:id', getSubscriber, async (req, res) => {


    //NEED TO CHECK IF THE BODY CONTAINS ANY INFO, IF ITS NOT NULL I 
    //NEED TO UPDATE THE BODY, IF NULL SKIP.
    if(req.body.name != null) {
        res.subscriber.name = req.body.name;
    }


    
    if(req.body.age != null) {
        res.subscriber.age = req.body.age;
    }


    if(req.body.subStatus != null) {
        res.subscriber.subStatus = req.body.subStatus;
    }


        
    if(req.body.subDate != null) {
        res.subscriber.subDate = req.body.subDate;
    }



    try {

        const UpdateSubscriber = await res.subscriber.save();

        res.json(UpdateSubscriber);

    }catch(err ) {

        res.status(400).json({message: 'Please enter the correct details'})
    }


});

// delete
router.delete('/:id', getSubscriber, async (req, res) => {

    try{

        await res.subscriber.remove();
        res.json({message: 'success delete'});

    }catch(err){

        res.status(500).json({message: 'error deleting subscriber'})

    }
   
   });


//creating a middleware

async function getSubscriber(req, res, next) {

    let subscriber;

    try{

        subscriber = await Subscriber.findById(req.params.id);

        if (subscriber == null){
          return res.status(404).json({message: 'No subscriber found'});
        }

    } catch(err){

        res.status(500).json({message: err.message});

    }

    res.subscriber = subscriber;
    next();
};