let mongoose = require("mongoose");

let commentsSchema = mongoose.Schema(
    {
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

            username: String
        },
        content_text: String
    }
);

let Comment = mongoose.model("Comment", commentsSchema);

module.exports = Comment;