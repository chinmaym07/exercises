

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

const mostBlogs = (blogs) => {
    if(blogs.length === 0)
        return {};
    else 
    { 
        let mp = new Map();
        blogs.map(blog =>{
            if(!mp.has(blog.author))
                mp.set(blog.author,1);
            else
                mp.set(blog.author,mp.get(blog.author)+1);
        });
        let mx = 0,obj={};

        for (let [author,cnt] of mp.entries()) {
            if(cnt > mx)
            {
                mx = cnt;
                obj = {
                    author:author,
                    blogs:cnt
                }
            }
        }
        return obj;
    }
}

const mostLikesOnAnAuthorBlog = (blogs) => {
    if(blogs.length === 0)
        return {};
    else 
    { 
        let mp = new Map();
        blogs.map(blog =>{
            if(!mp.has(blog.author))
                mp.set(blog.author,blog.likes);
            else
                mp.set(blog.author,mp.get(blog.author)+blog.likes);
        });
        let mx = 0,obj={};

        for (let [author,likes] of mp.entries()) {
            if(likes > mx)
            {
                mx = likes;
                obj = {
                    author:author,
                    likes:likes
                }
            }
        }
        return obj;
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikesOnAnAuthorBlog
};