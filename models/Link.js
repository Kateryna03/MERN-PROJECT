const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  from: {
    type: String,
    required: true,
    unique: true, //с одинаковым имейлом только один юзер
  },
  to: {
    type: String,
    required: true,
    unique: true, //с одинаковым имейлом только один юзер
  },
  code: {
    type: String,
    required: true,
    unique: true, //с одинаковым имейлом только один юзер
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  owner: [{ type: Types.ObjectId, ref: "User" }], //связка модели юзера с базой данных
});

module.exports = model("Link", schema);
