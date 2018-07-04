
name        url             verb            desc.                                                               mongooese
===========================================================================================================================
INDEX       /dogs           GET             display a list of dogs                                              Dog.find()            
NEW         /dogs/new       GET             display a form to make a new dog                                    N/A
CREATE      /dogs           POST            Add new dog to dB                                                   Dog.create()
SHOW        /dogs/:id       GET             shows info about one dog                                            Dog.findById()
Edit        /dogs/:id/edit  GET             Show edit form for one dog                                          Dog.findById()
Update      /dogs/:id       PUT             Updatea a particular dog, then redirect somewhere                   Dog.findByIdAndUpdate()
Destroy     /dogs/:id       DELETE          Delete a particular dog, then redirect somewhere                    Dog.findByIdAndRemove()


REST: Representation of State Transition: A mapping between HTTP routes and CRUD
CRUD: Create, Read, Update, Destroy
Blog
CREATE
READ    /allBlogs
Update  /updateBlogs/:id
Destroy /destroyBlog/:id

express sanitizer
req.sanitize


Saturday 30 2018
To do: Show the comments in the Show route


req.locals.CurrentUser = req.users to access the users to all templates


