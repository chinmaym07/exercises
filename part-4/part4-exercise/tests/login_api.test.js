
const User = require('../models/users');
const helper = require('./test_helper');
const bcrypt = require('bcryptjs');
const api = require('./test_config');

describe('When There is initially one user in DB', () => {
    beforeEach(async () => {
        jest.setTimeout(6000);
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ name:"rootuser",email:"rootuser@gmail.com",username: 'rootuser', passwordHash })
    
        await user.save()
      })
    
    test('Login Succeeds When user has already registered', async () => {

        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);
        
        expect(result.body).toHaveProperty('token');
    });
    test('Login Fails When user has not registered', async () => {

        const newUser = {
            username:"root",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/);

        
        expect(result.body.error).toBe('invalid username or password');
    });

    
});

