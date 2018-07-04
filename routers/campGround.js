const   express                     =   require("express"),
        router                      =   express.Router({mergeParams: true}),
        Campground                  =   require("../models/campground"),
        isLoggedIn                  =   require("../middleware/isLoggedIn"),
        isAuthorizedUser            =   require("../middleware/isAuthorizedUser");

//campGround route
router.get("/", function(req, res)
{
    // res.render("campGround", {campGround: campGround});
    Campground.find({}, function(err, campgrounds)
    {
        if(err)
        {
            console.log("There is an error");
        }
        else
        {
            res.render("campGround/index", {campGround: campgrounds});
        }
    });
});

//new campground getting form route
router.get("/new", isLoggedIn, function(req, res)
{
    res.render("campGround/new");
});

//CREATE Route
router.post("/", isLoggedIn, function(req, res)
{
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.desc;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let object_ = {name: name, image: image, description: desc, author: author};


    Campground.create(object_, function(err, campground)
    {
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("/campGround");
        }
        else
        {
            req.flash("success", "Campground added successfully");
            res.redirect("/campGround");
        }
    });

});

//SHOW campground route
router.get("/:id", function(req, res)
{
    let id = req.params.id;

    Campground.find({"_id": id}).populate("comments").exec(function(err, found)
    {
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("/campGround");
        }
        else
        {
            res.render("campGround/show", {camp: found[0]})
        }
    });
});

//edit
router.get("/:id/edit", isAuthorizedUser, function(req, res)
{
    //if user is logged in
        //if the same user is logged in as the owner of the post

    Campground.findById(req.params.id, function(err, found)
    {
        if(err)
        {
            req.flash("error", err.message)
            res.redirect("campGround");
        }
        else
        {
            res.render("campGround/edit", {camp: found})
        }
    });
});

//update router
router.put("/:id", isAuthorizedUser, function(req, res)
{
    let name    = req.body.name,
        image   = req.body.image,
        desc    = req.body.desc;

    let object = {
        name: name,
        image: image,
        description: desc
    };


    Campground.findByIdAndUpdate(req.params.id, object, function(err, updated)
    {
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("campGround/" + req.params.id + "/edit");
        }
        else
        {
            req.flash("success", updated.name + " Campground updated Successfully");
            res.redirect("/campGround/" + req.params.id);
        }
    });
});

//delete route
router.delete("/:id", isAuthorizedUser, function(req, res)
{
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground)
    {
        if(err)
        {
            req.flash("error", err.message);
            res.redirect("/campGround");
        }
        else
        {
            req.flash("success", deletedCampground.name + " deleted successfully");
            res.redirect("/campGround");
        }
    });
});

module.exports = router;
