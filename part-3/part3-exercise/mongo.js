const mongoose = require('mongoose');

if(process.argv.length < 3)
{
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1);
}

const password = process.argv[2]

const url = `mongodb+srv://m001-student:${password}@sandbox.4ljz4.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const person = mongoose.model('person',personSchema);

/* const newPerson = new person({
  name: process.argv[3],
  number: process.argv[4],
})

newPerson.save().then(result => {
    console.log("Person details saved!!");
    console.log(result);
    mongoose.connection.close();
})

 */

person.find({}).then(result => {
  console.log("Phonebook:");
    result.map(obj => console.log(obj.name +' '+ obj.number));
    mongoose.connection.close();
})