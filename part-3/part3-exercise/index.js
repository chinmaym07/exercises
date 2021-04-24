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

app.get('/api/persons/:id',(req,res)=>{
    let id = Number(req.params.id);
    Person.findById(req.params.id)
    .then(person => person ? res.json(person) : res.status(404).end(`<p>No Element Found with id ${id} !!</p>`));

})

app.post('/api/persons',(req,res)=>{
   /*  const getNewObjId = ()=> {
       const maxId =  persons.length > 0
        ? Math.max(...persons.map(n => n.id)) 
        : 0
        return maxId+1;
    } */
    const checkPresence = (name)=> {
        let obj=[];
        Person.find({"name":name}).then(result =>{
            result.map((personObj)=> obj.push(personObj));
            console.log("result",result);
        })
        
        return obj;
    }

    let body = req.body;

    if (!body.name || !body.number) {
        if (!body.name && !body.number) {
            return res.status(400).json({ 
            error: 'name & number missing' 
            })
        }
        if (!body.name) {
            return res.status(400).json({ 
            error: 'name missing' 
            })
        }
        if (!body.number) {
            return res.status(400).json({ 
              error: 'number missing' 
            })
        }
    }
    /* let personObj = checkPresence(body.name);
    console.log(personObj);
    if(personObj){
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    } */
    
    
    const newPersonsObj = new Person({
        name: body.name,
        number: body.number
    })
    newPersonsObj
    .save()
    .then(result => res.json(result));
    
})

app.delete('/api/persons/:id',(req,res)=> {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`);
});
