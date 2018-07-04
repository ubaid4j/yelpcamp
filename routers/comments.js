const   express                 =   require("express"),
        router                  =   express.Router({mergeParams: true}),
        Campground              =   require("../models/campground"),
        Comment                 =   require("../models/comments"),
        isLoggedIn              =   require("../middleware/isLoggedIn"),
        commentAuth             =   require("../middleware/commentsOwnerShip");

//get new comments route
router.get("/new", isLoggedIn, function(req, res)
{
    let id = req.params.id;

    Campground.findById(id, function(err, found)
    {
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("back");
        }
        else
        {
            res.render("comments/new", {campGround: found});
        }
    });

});

//create comments route
router.post("/", isLoggedIn,  function(req, res)
{
    //creating a comment
    let comment = req.body.content_text;
    let author  = req.user.username;

    let comment_ = {
        content_text: comment,
        author: {
            username: req.user.username,
            id: req.user._id
        }
    };


    Comment.create(comment_, function(err, comment)
    {
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("back");
        }
        else
        {
            //inserting reference of comments for campGround
            Campground.findById(req.params.id, function(err, campGround)
            {
                if(err)
                {
                    req.flash("error", err.message);
                    req.redirect("back");
                }
                else
                {
                    campGround.comments.push(comment);
                    campGround.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect(/campGround/ + req.params.id);
                }
            });
        }
    });
});

//edit comment route
router.get("/:comment_id/edit", commentAuth, function(req, res)
{
    let campGround_id   =   req.params.id;
    let comment_id      =   req.params.comment_id;

    Campground.findById(campGround_id, function(err, foundCampground)
    {
        if(!err)
        {
            Comment.findById(comment_id, function(err, foundComment)
            {
                if(!err)
                {
                    res.render("comments/edit", {campGround: foundCampground, comment: foundComment});            
                }
                else
                {
                    req.flash("error", err.message);
                    res.redirect("back");
                }
            });    
        }
        else
        {
            req.flash("error", err.message);
            res.redirect("back");
        }
    });
});

//update route
router.put("/:comment_id", commentAuth, function(req, res)
{
    let comment_id = req.params.comment_id;
    
    let object = {
        content_text: req.body.content_text
    }

    Comment.findByIdAndUpdate(comment_id, object, function(err, updatedComment)
    {
                
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("back");
        }
        else
        {
            req.flash("success", "Comment updated successfully");
            res.redirect("/campGround/" + req.params.id);
        }
    });
});

//destroy comment route
router.delete("/:comment_id", commentAuth, function(req, res)
{
    Comment.findByIdAndRemove(req.params.comment_id, function(err)
    {
        if(!err)
        {
            req.flash("success", "comment deleted succeessfully");
            res.redirect("/campGround/" + req.params.id);
        }
        else
        {
            req.flash("error", err.message)
            res.redirect("back");
        }
    });
});


module.exports = router;
