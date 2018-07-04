const mongoose = require("mongoose");

//Schema Setup
const camp_ground_schema = mongoose.Schema(
    {
        name: String,
        image: String,
        description: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    }
);

const Campground = mongoose.model("Campground", camp_ground_schema);

module.exports = Campground;
