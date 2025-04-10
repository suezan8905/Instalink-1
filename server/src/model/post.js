import {Schema, model } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  media: {
    type: [String],
    required: [true, "Media files are required"], // tjis is so users can make upload on instagram be it images or videos
  },
  mediaPublicIds: {
    type: [String],
  },
  //the mediaPublicIds is to monitor images being deleted
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  savedBy: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
},
{
    timestamps: true,
  }
);

const post = model("Post", postSchema);

export default post;



// the above here is for controlling post made

// we are using the userId so other platform like twitter knows we are logged in, hence we use type: Schema, Type etc.