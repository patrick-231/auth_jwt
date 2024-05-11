const Post = require('../schemas/Posts')

const getAllPost = async (req, res) =>{
    try {
        const user_id = req.user._id;
        const posts = await Post.find({ user_id });
        if(!posts.length) {
            return res.status(200).json({message: 'No posts found'})
        }
        return res.status(200).json(posts);
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};
const createPost = async (req, res) => {
    const {title, body} = req.body;
    let emptyFields = [];
    if(!title) {
        emptyFields.push(title);
    }
    if(!body) {
        emptyFields.push('body');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields'})
    }
    
    try {
        const user_id = req.user._id
        const post = await Post.create({title, body, user_id});
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = {createPost, getAllPost}