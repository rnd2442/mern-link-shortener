const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  // String - this is JS class
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Every User has own private array of references. This
  // required for every person can see only his own information
  // Types.ObjectID <-- this is ID of MongoDB object
  // ref <-- this is another collection of DB
  links: [{ type: Types.ObjectId, ref: "Link" }],
});

module.exports = model("User", schema);
