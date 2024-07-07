const URL = require('../models/url');
const shortid = require('shortid');

async function generateURL(req,res){
    const body = req.body;

    if(!body.url) return res.status(400).json({err:"url is required"});
    const shortID = shortid();

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    
    return res.render("home",{
        id: shortID,
    });
    
}

module.exports = {
    generateURL,
}