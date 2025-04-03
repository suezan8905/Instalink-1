import { Schema, model } from "mongoose";

const userSchema = new Schema (
    {
        username: {
            type: String, //this is the format we got from mongoose, and the tyope is us filling in the exact properties we want. 
            unique: true, //this is because no 2 names are same, hence theyre unique prob.
            required: [true, "Username is required"],
            trim: true, //trim from js is to remove excess spacing 
        },
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true, 
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false, //prevents this field from being sent to the client. 
            minLength: [5, "Password must be at least 5 characters"],
        },
        isVerified: {
        type: Boolean,
        default: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"], // [predefined values specified that must be picked from, that is either a user, or an admin]
            default: "user",
        },
        verificationToken: {
            type: String,
            select: false,
        },
        verificationTokenExpires: {
            type: Date,
            select: false,
        },
        passwordResetToken: {
            type: String,
            select: false,
        },
        passwordResetTokenExpires: {
            type: Date,
            select: false,
        },
        profilePicture: {
            type: String,
            default: "", // an empty value will be used. we intend using claudinary
        },
        profilePictureId: {
            type: String,
            default: "", //this is to track the profilePic id coming from cloudinary server in order to delet the profilePic if the user updates to a new one.
        },
        bio: {
            type: String,
            maxLength: [150, "Bio cannot be more than 150 characters"],
        },
        followers: {
            type: [String], //This is an array of strings
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
      },
    { timesstamps: true } //Adds createdAt and updatedAt to a document
);

const User = model("User", userSchema);

export default User; 


// NOTE: Any schema you create must follow the pattern above

//You're on the right track! In programming, an enum (short for enumeration) is a way to define a set of named values that represent a collection of possible options or states. The values in an enum are predefined and cannot be changed or added to dynamically.






// A schema is like a blueprint or map that tells the system how to organize and store data in a database on the backend. Hence we need to import from mongoose