import mongoose from "mongoose";

let rosterSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "players",
  },
  joinDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

let teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  foundedAt: {
    type: Date,
  },
  roster: {
    type: [rosterSchema]
  },
});

let Team = mongoose.model("teams", teamSchema);
export default Team;
