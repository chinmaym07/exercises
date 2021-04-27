const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength:3
    },
    number: {
        type: String,
        required: true,
        unique: true,
        minlength:8
    },
});

personSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
personSchema.plugin(uniqueValidator);

const Person = mongoose.model('person',personSchema);

module.exports = Person;


/* const newPerson = new person({
  name: process.argv[3],
  number: process.argv[4],
})

newPerson.save().then(result => {
    console.log("Person details saved!!");
    console.log(result);
    mongoose.connection.close();
})
person.find({}).then(result => {
  console.log("Phonebook:");
    result.map(obj => console.log(obj.name +' '+ obj.number));
    mongoose.connection.close();
})
 */

