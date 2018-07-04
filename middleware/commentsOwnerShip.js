let Comment     =   require("../models/comments");

function isAuthorized_(req, res, next)
{
    if(req.isAuthenticated())
    {
        let comment_id  =   req.params.comment_id;
        let camp_id     =   req.params.id;
        let user_id     =   req.user.id;

        Comment.findById(comment_id, function(err, foundComment)
        {
            if(!err)
            {
                if(foundComment.author.id.equals(user_id))
                {
                    next();
                }
                else
                {
                    res.redirect("back");
                }
            }
        });
    }
    else
    {
        res.redirect("back");
    }
}

module.exports = isAuthorized_;