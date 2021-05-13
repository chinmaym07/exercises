
const blogRoutes = require('express').Router();
const { findById } = require('../models/blogs');
const Blog = require('../models/blogs');

blogRoutes.get('/', async (request, response) => {
  try{
    const blogs = await Blog.find({})
    response.json(blogs);
  }
  catch(err){
    response.status(400).json(err);
  }
  
});

blogRoutes.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  try{
    const result = await blog.save()
    response.status(201).json(result)
  }
  catch(err){
    response.status(400).json(err);
  }
});


blogRoutes.get('/:id', async (request, response) => {
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

blogRoutes.delete('/:id', async (request, response) => {
  let id = request.params.id;
  try{
    let blog = await Blog.findById(id)
    if(blog)
    {
      await Blog.findByIdAndRemove(id);
      response.status(204).end();
      
    }
    else
      response.status(404).json({"message":"Not Found"});
  }
  catch(err){
    response.status(400).json(err);
  }
  
});


blogRoutes.put('/:id',async (request,response) => {
  let id = request.params.id;
  try{
    const newUpdatedBlog = await Blog.findByIdAndUpdate(id,request.body)
    response.status(200).json(newUpdatedBlog);
  }
  catch(err){
    response.status(400).json(err);
  }
  
})

module.exports = blogRoutes;
  