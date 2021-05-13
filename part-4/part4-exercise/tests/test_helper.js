const Blog = require('../models/blogs');

const initialBlogs = [
    {
        "title":"Announcing Meshery v0.5.0",
        "author":"Aisuko Li",
        "url":"https://layer5.io/blog/announcements/announcing-meshery-v050",
        "likes":10
    },
    {
        "title":"MeshMate of the Year 2020: Nikhil Ladha",
        "author":"Lee Calcote",
        "url":"https://layer5.io/blog/community/meshmate-of-the-year-2020-nikhil-ladha",
        "likes":10
    },
    {
        "title":"Functional Testing with Cypress in Meshery UI",
        "author":"Rodolfo Martinez Vega",
        "url":"https://layer5.io/blog/meshery/functional-testing-with-cypress-in-meshery-ui",
        "likes":15
    },
    {
        "title":"React patterns",
        "author":"Michael Chan",
        "url":"https://reactpatterns.com/",
        "likes":7
    },
    {
        "title":"Go To Statement Considered Harmful",
        "author":"Edsger W. Dijkstra",
        "url":"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        "likes":5
    },
    {   
        "title":"Canonical string reduction",
        "author":"Edsger W. Dijkstra",
        "url":"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        "likes":2
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ title: 'Hello World', author: 'Chinmay Mehta', likes:1000,url:"https://github.com/chinmaym07"})
    const resp = await blog.save();
    await Blog.findByIdAndRemove(resp._id);
    return blog._id.toString()
  }
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
};