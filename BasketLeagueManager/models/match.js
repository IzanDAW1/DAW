import mongoose from "mongoose";

let playerStatsSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "players",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    red: "teams",
  },
  points: {
    type: Number,
    min: 0,
    required: true,
  },
  rebounds: {
    type: Number,
    min: 0,
    required: true,
  },
  assists: {
    type: Number,
    min: 0,
    required: true,
  },
  steals: {
    type: Number,
    min: 0,
    required: true,
  },
  fouls: {
    type: Number,
    min: 0,
    required: true,
  },
  mvp: {
    type: Boolean,
    default: false,
  },
});

let matchSchema = new mongoose.Schema({
  tournament: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  date: {
    type: Date,
    required: true,
  },
  stage: {
    type: String,
    required: true,
    enum: ["Group", "Quarterfinal", "Semifinal", "Final"],
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
    validate: {
      validator: function (value) {
        return value.toString() !== this.homeTeam.toString();
      },
      message: "They have to be different",
    },
  },
  homeScore: {
    type: Number,
    required: true,
    min: 0,
  },
  awayScore: {
    type: Number,
    required: true,
    min: 0,
  },
  playerStats: {
    type: [playerStatsSchema],
  },
});

matchSchema.index(
  { tournament: 1, date: 1, homeTeam: 1, awayTeam: 1 },
  { unique: true }
);

let Match = mongoose.model("matches", matchSchema);
export default Match;
