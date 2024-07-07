const jwt = require('jsonwebtoken');
const secret = "12345";

function setUser(user){
   
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },secret); //user object --> Token
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secret);
}


module.exports = {
    setUser,
    getUser,
}