const mongoose = require('mongoose');

const url = process.env.MONGO_DB_URI;

console.log('connecting to', url)

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
});

personSchema.set('toJSON',{
    transform:(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})
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

