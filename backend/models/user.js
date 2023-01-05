import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    modules: {
        type: [ String ],
        default: []
    }
})

const User = mongoose.model('users', UserSchema);

export default User;