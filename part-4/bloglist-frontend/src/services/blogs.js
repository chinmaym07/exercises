import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const res = axios.get(baseUrl)
  return res.then(response => response.data)
}

const createNewBlog = async (newBlog) =>{
  const config = {
    headers:{Authorization: token},
  }
  let result = await axios.post(baseUrl,newBlog,config);
  return result.data;
}

const updateExistingBlog = async (id,newUpdatedBlog) => {
  let res = await axios.put(`${baseUrl}/${id}`,newUpdatedBlog);
  return res.data;
}

const services = { getAll, createNewBlog, updateExistingBlog, setToken};
export default services;