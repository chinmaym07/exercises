
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
    
    test('Creation Succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            email: 'mluukkai@gmail.com',
            password: 'salainen',
        };

        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1);

        const usernames = usersAtEnd.map(user => user.username);

        expect(usernames).toContain(newUser.username);
    });

    test('Creation Fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'rootuser',
            email: "rootuser2@gmail.com",
            name: 'Superuser',
            password: 'salainen',
        };

        let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
        

        expect(result.body.message).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    });
 
});


describe('Users Valid username & password are successfully created in the DB', () => {
    
    test('Creation Succeeds with a fresh username & password', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'alok',
            name: 'alok kumar',
            email: 'alokkumar@gmail.com',
            password: 'helloworld',
        };

        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1);

        const usernames = usersAtEnd.map(user => user.username);

        expect(usernames).toContain(newUser.username);
    });

    test('Creation Fails with proper statuscode and message if username is missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            name: 'Prashant Singh',
            email: 'prashant@gmail.com',
            password: 'helloworld',
        };

        let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('Username or password missing');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    });
    
    test('Creation Fails with proper statuscode and message if password is missing', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username:"parashant",
            name: 'Prashant Singh',
            email: 'prashant@gmail.com',
        };

        let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('Username or password missing');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    });
    test('Creation Fails with proper statuscode and message if username have less than 3 characters ', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username:"pl",
            name: 'Prashant Singh',
            email: 'prashant@gmail.com',
            password: 'hddsa',
        };

        let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('Username or password must have atleast 3 charaters');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    });
    test('Creation Fails with proper statuscode and message if password have less than 3 characters ', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username:"prash",
            name: 'Prashant Singh',
            email: 'prashant@gmail.com',
            password: 'ha',
        };

        let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('Username or password must have atleast 3 charaters');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

    });
});

