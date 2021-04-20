const express = require('express');
const app = express();

app.use(express.json());

let persons =[
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
];


app.get('/info',(req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    let dt = new Date();
    let html = `<div><p>PhoneBook has info for ${persons.length} people</p><p>${dt}</p></div>`
    res.end(html);
})

app.get('/api/persons',(req,res)=>{
    res.json(persons);
})

app.get('/api/persons/:id',(req,res)=>{
    let id = Number(req.params.id);
    let person = persons.find(person => person.id === id);

    if(person)
        res.json(person);
    else
        res.status(404).end(`<p>No Element Found with id ${id} !!</p>`);
})

app.post('/api/persons',(req,res)=>{
    const getNewObjId = ()=> {
       const maxId =  persons.length > 0
        ? Math.max(...persons.map(n => n.id)) 
        : 0
        return maxId+1;
    }
    const checkPresence = (name)=> {
        let val = persons.find(pers => pers.name === name);
         return val;
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
    if(!checkPresence(body.name)){
        return res.status(400).json({ 
            error: 'name must be unique' 
          })
    }
    
    
    const newObj = {
        id:getNewObjId(),
        name:body.name,
        number:body.number
    }
    persons = persons.concat(newObj);
    res.json(newObj);
})

app.delete('/api/persons/:id',(req,res)=> {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server is running on Port ${PORT}`);
});
