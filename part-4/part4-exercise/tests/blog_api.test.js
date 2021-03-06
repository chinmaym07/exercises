
const mongoose = require('mongoose');
const api = require('./test_config');
const helper = require('./test_helper');
const Blog = require('../models/blogs');




beforeEach(async () => {
    
    jest.setTimeout(30000);
    await Blog.deleteMany({});
    
    const blogsPromise = helper.initialBlogs.map((blog) => new Blog(blog));
        
    const savedBlogs = blogsPromise.map(blog => blog.save());
    
    await Promise.all(savedBlogs);
});


describe('when there is initially some Blogs are saved', () => {
    
    test('Blogs are returned as Json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    });

    test('there are 6 blogs', async () => {
        const allBlogs = await helper.blogsInDb();
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    });

    test('the first blog is about Announcing Meshery v0.5.0', async () => {
        const allBlogs = await helper.blogsInDb();
        const titles = allBlogs.map(rp => rp.title);
        expect(titles).toContain('Announcing Meshery v0.5.0');
    });
});    

describe('viewing a specific Blog', () => {

    test('a specific blog can be viewed',async () => {
        let blogAtStart = await helper.blogsInDb();
        let blogToFetch = blogAtStart[0];
        let id = blogToFetch._id;
        
        
        const resultBlog = await api
        .get(`/api/blogs/${id}`)
        .expect(200)
        .expect('Content-Type',/application\/json/)

        let processedBlog = JSON.parse(JSON.stringify(blogToFetch));
        expect(resultBlog.body).toEqual(processedBlog);

    });

    test('Viewing Fails with status code 404 if blog does not exist', async() => {
        const validNonexistingId = await helper.nonExistingId();
        
        let resp = await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404);

        expect(resp.body.message).toBe("Not Found");
        
    });

    test('Viewing Fails with status code 400 if id is invalied', async() => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400);
        
    });
});
describe('addition of a new blog', () => {
    
    test('a valid blog can be added !!' , async() => {
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);
        
        const newTestBlog = {
            "title":"Type wars",
            "author":"Robert C. Martin",
            "url":"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            "likes":2
        }
        await api
        .post('/api/blogs')
        .send(newTestBlog)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(201)
        .expect('Content-Type',/application\/json/);
        

        const allBlogs = await helper.blogsInDb();
        const titles = allBlogs.map(blog => blog.title);
        
        expect(allBlogs).toHaveLength(helper.initialBlogs.length+1);

        expect(titles).toContain(newTestBlog.title);

    });
    test('a valid blog can not be added if Authorization token is not provided !!' , async() => {
        
        const newTestBlog = {
            "title":"Type wars",
            "author":"Robert C. Martin",
            "url":"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            "likes":2
        }
        await api
        .post('/api/blogs')
        .send(newTestBlog)
        .set('Authorization', 'bearer ')
        .expect(401)
        .expect('Content-Type',/application\/json/);
        

        const allBlogs = await helper.blogsInDb();
        const titles = allBlogs.map(blog => blog.title);
        
        expect(allBlogs).toHaveLength(helper.initialBlogs.length);

        expect(titles).not.toContain(newTestBlog.title);

    });

    test('Blog without title cannot be inserted',async () =>{
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);

        const newTestBlog = {
            "author":"Robert C. Martin",
            "url":"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            "likes":2
        }
        await api
        .post('/api/blogs')
        .send(newTestBlog)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(400)

        const allBlogs = await helper.blogsInDb();
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    });


    test('Blog without Author cannot be inserted',async () =>{
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);
        
        const newTestBlog = {
            "title":"Type wars",
            "url":"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            "likes":2
        }
        await api
        .post('/api/blogs')
        .send(newTestBlog)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(400)

        const allBlogs = await helper.blogsInDb();
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    });


    test('Blog without url cannot be inserted',async () =>{
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);

        const newTestBlog = {
            "title":"Type wars",
            "author":"Robert C. Martin",
            "likes":2
        }
        await api
        .post('/api/blogs')
        .send(newTestBlog)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(400)

        const allBlogs = await helper.blogsInDb();
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    });

    test('Blog without likes can be inserted & likes will be assigned a default values of 0',async () =>{
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);

        const newTestBlog = {
            "title":"Type wars",
            "author":"Robert C. Martin",
            "url":"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }
        await api
        .post('/api/blogs')
        .send(newTestBlog)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(201)
        .expect('Content-Type',/application\/json/);

        const allBlogs = await helper.blogsInDb();
        expect(allBlogs).toHaveLength(helper.initialBlogs.length+1)
        
        let blog = allBlogs.filter(blg => blg.title === newTestBlog.title)
        expect(blog[0].likes).toEqual(0);
    });

});
describe('deletion of a blog', () => {

    test('a specific blog can be deleted',async () => {
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };
        
        let result = await api
        .post('/api/login')
        .send(newUser);

        const insertBlogToDelete = {
            "title":"First class tests",
            "author":"Robert C. Martin",
            "url":"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            "likes":10
        }
        let newBlogToDeleteResult = await api
        .post('/api/blogs')
        .send(insertBlogToDelete)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(201)
        .expect('Content-Type',/application\/json/);
        

        let blogsAtStart = await helper.blogsInDb();
        let id = newBlogToDeleteResult.body._id;

        
        let res = await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(200)

        
        let blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1 );

        expect(res.body.message).toBe('Blog Deleted!!');
        
        let titles = blogsAtEnd.map(blog => blog.title);

        expect(titles).not.toContain(insertBlogToDelete.title);
        
    });
    test('Deletion Fails with status code 404 if blog does not exist', async ()=>{
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);

        const validNonexistingId = await helper.nonExistingId();
        let resp = await api
        .delete(`/api/blogs/${validNonexistingId}`)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(404);
        
        expect(resp.body.message).toBe("Not Found");
    });

    test('Deletion Fails with status code 400 if id is invalied', async() => {
        const newUser = {
            username:"rootuser",
            password: 'sekret'
        };

        
        let result = await api
        .post('/api/login')
        .send(newUser);

        const invalidId = '5a3d5da59070081a82a3445'

        await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', 'bearer '+result.body.token)
        .expect(400);
        
    });
});

describe('Verfying the existence of a property',() => {
    test('Verify Unique Identifier property for each blog', async () => {
        const allBlogs = await helper.blogsInDb();
        allBlogs.map(blog => expect(blog._id).toBeDefined())
        
    });
})


describe('Updating properties of blogs',() => {
    test('Updating author of a specific blog', async () => {
        
        let blogsAtStart = await helper.blogsInDb();
        let blogToUpdate = blogsAtStart[0];
        blogToUpdate.author = "Chinmay Mehta";
        let id = blogToUpdate._id;
        
        await api
        .put(`/api/blogs/${id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type',/application\/json/)

        let allBlogs = await helper.blogsInDb();
        
        let check = allBlogs.filter(blog => blog.title === blogToUpdate.title);

        expect(check[0].author).toBe(blogToUpdate.author);
        
    });
    test('Updating title of a specific blog', async () => {
        let blogsAtStart = await helper.blogsInDb();
        let blogToUpdate = blogsAtStart[0];
        blogToUpdate.title = "MeshMate of the Year 2020: Chinmay Mehta";
        let id = blogToUpdate._id;

        
        await api
        .put(`/api/blogs/${id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type',/application\/json/)

        let allBlogs = await helper.blogsInDb();
        
        let check = allBlogs.filter(blog => blog.url === blogToUpdate.url);

        expect(check[0].title).toBe(blogToUpdate.title);
        
    });

    test('Updating likes of a specific blog', async () => {
        let blogsAtStart = await helper.blogsInDb();
        let blogToUpdate = blogsAtStart[0];
        blogToUpdate.likes = 20;
        let id = blogToUpdate._id;

        
        await api
        .put(`/api/blogs/${id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type',/application\/json/)

        let allBlogs = await helper.blogsInDb();
        
        let check = allBlogs.filter(blog => blog.url === blogToUpdate.url);

        expect(check[0].likes).toBe(blogToUpdate.likes);
    });
})

    


afterAll(() => {
    
    mongoose.connection.close();
    jest.clearAllTimers();
});
