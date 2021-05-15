
const blogRouter = require('express').Router();
const Blog = require('../models/blogs');

const User = require('../models/users');
const userExtractor = require('../utils/middleware').userExtractor;

blogRouter.get('/', async (request, response) => {
  try{
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 ,email: 1})
    response.json(blogs);
  }
  catch(err){
    response.status(400).json(err);
  }
});

blogRouter.post('/', userExtractor , async (request, response) => {
  let body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    url : body.url,
    user: user.id
  });
  const userObj = await User.findById(user.id);
  try{
    const result = await blog.save()
    userObj.blogs = userObj.blogs.concat(result._id);
    await userObj.save();
    response.status(201).json(result)
  }
  catch(err){
    response.status(400).json(err);
  }
  
});


blogRouter.get('/:id', async (request, response) => {
  let id = request.params.id;
  try{
    const blog = await Blog.findById(id);
    if(blog)
      response.status(200).json(blog);
    else
      response.status(404).json({"message":"Not Found"});
  }
  catch(err){
    response.status(400).json(err);
  }
  
});

blogRouter.delete('/:id', userExtractor ,async (request, response) => {
  let id = request.params.id;
  const user = request.user;
  try{
    let blog = await Blog.findById(id);
    if(blog)
    {
      if(blog.user.toString() === user.id.toString())
      {    
        await Blog.findByIdAndRemove(id);
        response.status(200).json({"message":"Blog Deleted!!"});  
      }
      else
        response.status(401).json({"message":"Unauthorized to delete this blog"});
    }
    else{
      response.status(404).json({"message":"Not Found"});
    }
  }
  catch(err){
    response.status(400).json(err);
  }
  
});


blogRouter.put('/:id',async (request,response) => {
  let id = request.params.id;
  try{
    const newUpdatedBlog = await Blog.findByIdAndUpdate(id,request.body)
    response.status(200).json(newUpdatedBlog);
  }
  catch(err){
    response.status(400).json(err);
  }
  
})

module.exports = blogRouter;
  