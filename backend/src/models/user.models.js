import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }

}, {timestamps: true});

userSchema.pre("save", async (next)=> {
    if( !this.isModified("password")){
        return next();
    }

    const salt = bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(this.password, enteredPassword);
}

export default mongoose.model("User",userSchema);
