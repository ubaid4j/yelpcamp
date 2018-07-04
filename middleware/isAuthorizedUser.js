let Campground = require("../models/campground");

function isAuthorizedUser(req, res, next)
{
    if(req.isAuthenticated())
    {
        //we want an id of user from the campgroud
        Campground.findById(req.params.id, function(err, foundCamp)
        {
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                let user_id_from_campGround =   foundCamp.author.id;
                let user_Logged_in_user_id  =   req.user.id;
                
             

                if(user_id_from_campGround.equals(user_Logged_in_user_id))
                {
                    next();
                }
                else
                {
                    res.redirect("back");
                }
            }
        });
        //and then id of user from the req
    }
    else
    {
        res.redirect("back");
    }        
}

module.exports = isAuthorizedUser;