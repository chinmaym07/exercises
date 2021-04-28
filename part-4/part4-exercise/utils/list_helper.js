

const dummy = (blogs)=> {

    return 1;
}
const totalLikes = (blogs) => {
    const reducer = (sum ,item)=> {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer,0);
}

const favoriteBlog = (blogs) => {
    const reducer = (mx ,item)=> {
        return Math.max(mx,item.likes) ;
    }
    let favrBlog =  blogs.length === 0 ? 0 : blogs.reduce(reducer,0);

    return favrBlog == 0 ? {} : blogs.find(blog => blog.likes == favrBlog);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};