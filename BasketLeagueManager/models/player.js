import mongoose from "mongoose";

let playerSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    country: {
        type: String,
        required: true,
        match: /^[A-Z]{2}$/
    },
    birthDate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["Base","Escolta","Alero","Ala-pívot","Pívot","Polivalente"]
    }
});

let Player = mongoose.model('players', playerSchema);
export default Player;