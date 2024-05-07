const jwt = require("jsonwebtoken")
const User = require('../schemas/User')

const requireAuth = async (req, res) => {
    //not a chicken
    const { authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({error: 'not authorized'});
    }


    //token of post

    const token = authorization.split('')[1];
    try {
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.user = await User.findById(_id).select('_id');
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Not Authorized'})
    }
};

module.exports = requireAuth;