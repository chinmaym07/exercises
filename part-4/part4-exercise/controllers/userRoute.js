const bcrypt = require('bcryptjs');
const UserRouter = require('express').Router();
const User = require('../models/users');

UserRouter.get('/', async (request, response) => {
    try{
      const users = await User.find({}).populate('blogs',{ title: 1 , author: 1 , url: 1 , likes: 1});
      response.json(users);
    }
    catch(err){
      response.status(400).json(err);
    }
    
});

UserRouter.post('/', async (request,response) => {
    
    let newUserObj = request.body;
    const saltRounds = 10
    if(!newUserObj.username || !newUserObj.password){
        return response.status(400).json({error: 'Username or password missing'});
    }
    else if(newUserObj.username.length < 3 || newUserObj.password.length < 3){
        return response.status(400).json({error: 'Username or password must have atleast 3 charaters'});
    }
    
    let passwordHash = await bcrypt.hash(newUserObj.password,saltRounds);


    let userObj = new User({
        username: newUserObj.username,
        name: newUserObj.name,
        email: newUserObj.email,
        passwordHash
    });
    
    try{
        const resp = await userObj.save();
        response.status(200).json(resp);
    }
    catch(err){
        response.status(400).json(err);
    }
    
});

module.exports = UserRouter;