const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const Person = require('./models/mongo');

morgan.token('data',(req, res)=> req.method === 'POST'?JSON.stringify(req.body):null);

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));



app.get('/info',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    let dt = new Date();
    let html = `<div><p>PhoneBook has info for ${persons.length} people</p><p>${dt}</p></div>`
    res.end(html);
})

app.get('/api/persons',(req,res)=>{
    Person.find({}).then(persons => {
        res.json(persons);    
    });
})

app.get('/api/persons/:id',(req,res,next)=>{
    let id = req.params.id;
    console.log(id);
    Person.findById(req.params.id)
    .then(person => {
        if(person)
            res.json(person) 
        else
            res.status(404).end(`<p>No Element Found with id ${id} !!</p>`)
    })
    .catch(error => next(error))


})

app.post('/api/persons',(req,res,next) => {
   /*  const getNewObjId = ()=> {
       const maxId =  persons.length > 0
        ? Math.max(...persons.map(n => n.id)) 
        : 0
        return maxId+1;
    } */

    let body = req.body;

    
    /* Person.find({"name":body.name}).then(result =>{
        console.log(result);
        if(result.length > 1)
            res.json({error:"Many Users have same name"});
        else if(result.length == 1)
        { 
            let id = result[0]._id.toString();
            let personObj={
                name:body.name,
                number:body.number
            }
            console.log(personObj);
            Person.findByIdAndUpdate(id,personObj,{new:true})
            .then(updatedPersonObj => {
                res.json(updatedPersonObj)
            })
            .catch(error => next(error))
        }
        else
        { */
            const newPersonsObj = new Person({
                name: body.name,
                number: body.number
            })
            newPersonsObj
            .save()
            .then(result => res.json(result))
            .catch(error=> next(error));
/*         }
    }).catch(error=> {
        console.log(error)
        res.json({ 
            error:error.message
        })
        return;
    }); */
})

app.delete('/api/persons/:id',(req,res,next)=> {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id',(req,res,next)=>{
    let body = req.body;
    let personObj = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id,personObj,{new:true})
    .then(updatedPersonObj => {
        res.json(updatedPersonObj)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
  }

app.use(errorHandler);

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`);
});
