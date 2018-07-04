let     express                     =   require("express"),
        app                         =   express(),
        bodyParser                  =   require("body-parser"),
        mongoose                    =   require("mongoose"),
        Campground                  =   require("./models/campground"),
        seed                        =   require("./seed"),
        Comment                     =   require("./models/comments"),
        passport                    =   require("passport"),
        LocalStrategy               =   require("passport-local"),
        passportLocalMongoose       =   require("passport-local-mongoose"),
        User                        =   require("./models/user"),
        methodOverride              =   require("method-override"),
        flash                       =   require("connect-flash");

//routers
let     indexRouter                 =   require("./routers/index"),
        commentsRouter              =   require("./routers/comments"),
        campGroundRouter            =   require("./routers/campGround");

//connection
mongoose.connect("mongodb://localhost/yelp_camp");


//==============================================app set===============================================//
app.set("view engine", "ejs");

//==============================================app use================================================//
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//============================================passport use===============================================//
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//most important//
app.use(function(req, res, next)
{
    res.locals.currentUser      =   req.user;
    res.locals.success          =   req.flash("success");
    res.locals.error            =   req.flash("error");
    next();
});

//using routers
app.use("/", indexRouter);
app.use("/campGround", campGroundRouter);
app.use("/campGround/:id/comments", commentsRouter);

let port = process.env.PORT || 3000;
//server
app.listen(port, function()
{
    console.log("Server started");
});


