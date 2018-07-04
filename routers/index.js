const   express             =   require("express"),
        router              =   express.Router({mergeParams: true}),
        User                =   require("../models/user"),
        passport            =   require("passport");


//root route
router.get("/", function(req, res)
{
    res.render("landing");
});

//get register form route
router.get("/register", function(req, res)
{
    res.render("register");
});

//create registration route
router.post("/register", function(req, res)
{
    let username = req.body.username;
    let password = req.body.password;

    let newUser = new User({
        username: username
    });

    User.register(newUser, password, function(err, user)
    {
        if(err)
        {
            req.flash("error", err.message);
            return res.redirect("/register");
        }

        passport.authenticate("local")(req, res, function()
        {
            req.flash("success", "Welcome " + newUser.username.toUpperCase() + "! in the Campground");
            res.redirect("/campGround");
        });

    });

});

//get login form route
router.get("/login", function(req, res)
{
    res.render("login");
});

// create login
router.post("/login", passport.authenticate("local", {
    failureRedirect : "/login",
    failureFlash    :   true
}), function(req, res)
{

    req.flash("success", "Welcome again " + req.body.username.toUpperCase() + " in the Yelpcamp");
    res.redirect("/campGround");

});

//get logout route
router.get("/logout", function(req, res)
{
    req.logout();
    req.flash("success", "Logged Out Successfully");
    res.redirect("/campGround");
});

module.exports = router;