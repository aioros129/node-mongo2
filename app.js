const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/Person');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const MONGO_URI = "mongodb+srv://kiozamora:STbT9tw4RQ53VxlN@cluster0.p1pzqlv.mongodb.net/certus2025?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Se conecto exitosamente");
}).catch((err)=>{
    console.error("Error encontrado", err);
});

app.post('/submit', async (req, res) => {
    try{
        const person = new Person(req.body);
        await person.save();
        res.status(200).json({message: 'Se guardo correctamente'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Error al guardar'});
    }
});

app.listen(3000);