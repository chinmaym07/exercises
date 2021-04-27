const PhoneBookRouter = require('express').Router();
const Person = require('../models/mongo');


PhoneBookRouter.get('/',(req,res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

PhoneBookRouter.get('/:id',(req,res,next) => {
    let id = req.params.id;
    console.log(id);
    Person.findById(req.params.id)
        .then(person => {
            if(person)
                res.json(person) ;
            else
                res.status(404).end(`<p>No Element Found with id ${id} !!</p>`);
        })
        .catch(error => next(error));
});

PhoneBookRouter.post('/',(req,res,next) => {
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
    });
    newPersonsObj
        .save()
        .then(result => res.json(result))
        .catch(error => next(error));
/*         }
    }).catch(error=> {
        console.log(error)
        res.json({
            error:error.message
        })
        return;
    }); */
});

PhoneBookRouter.delete('/:id',(req,res,next) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

PhoneBookRouter.put('/:id',(req,res,next) => {
    let body = req.body;
    let personObj = {
        name: body.name,
        number: body.number
    };
    Person.findByIdAndUpdate(req.params.id,personObj,{ new:true } )
        .then(updatedPersonObj => {
            res.json(updatedPersonObj);
        })
        .catch(error => next(error));
});

module.exports = PhoneBookRouter;