const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  random: { type: String, required: true, unique: true },
  // Generate current date by default
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  // ref <-- this is another collection of DB
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Link", schema);
