import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try{
    const res = await axios.get(baseUrl);
    return res.data;
  }
  catch(err)
  {
    return err;
  }
};

const createNewBlog = async (newBlog) => {
  const config = {
    headers:{ Authorization: token },
  };
  try{
    let result = await axios.post(baseUrl,newBlog,config);
    return result.data;
  }
  catch(err)
  {
    return err;
  }
};

const updateExistingBlog = async (id,newUpdatedBlog) => {
  try{
    let res = await axios.put(`${baseUrl}/${id}`,newUpdatedBlog);
    return res.data;
  }
  catch(err)
  {
    return err;
  }
};

const deleteBlogPost = async (id) => {
  const config = {
    headers:{ Authorization: token },
  };
  try{
    return await axios.delete(`${baseUrl}/${id}`,config);
  }
  catch(err)
  {
    return err;
  }
};

const services = { getAll, createNewBlog, updateExistingBlog, setToken, deleteBlogPost };

export default services;