const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get('/mario',(req,res)=>{
    marioModel.find().then(ele => {
        res.send(ele)
        return
    })
    
})

app.get('/mario/:id',(req,res)=>{
    const marioId = req.params.id;
    // if(!marioId){
    //     res.status(400).send({ message: error.message })
    //     return
    // }
    marioModel.find({ _id: marioId })
    .then((mariochars) =>
      mariochars.map((mariochars) => res.send(mariochars))
    )
    .catch((error) => res.status(400).send({ message: error.message }));
    return;
});

app.post('/mario',(req,res)=>{
    const mario= new marioModel({
        ...req.body,
        weight: parseInt(req.body.weight)
    })

    if(!mario.name || !mario.weight){
        
        res.status(400).send({message: 'either name or weight is missing'});
        return;
    }
    mario.save().then((mario)=>res.status(201).send(mario))
    
})

app.patch('/mario/:id',(req,res)=>{
    const marioId = req.params.id;
    const mario= {
        ...req.body,
        weight: parseInt(req.body.weight)
    }
    marioModel.findByIdAndUpdate(marioId, mario, {new: true}).then(result => {
        res.send(result);
    }).catch((err)=>res.status(400).send({message: error.message}))
})

app.delete('/mario/:id',(req,res)=>{
    const marioId = req.params.id;
    marioModel.findOneAndDelete({_id:marioId}, function(result) {
        if(!result) {
            res.status(400).send({message: error.message});
            return;
        }
        res.status(200).send({message: 'character deleted'});
    });
})



module.exports = app;