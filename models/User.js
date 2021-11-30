const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, //с одинаковым имейлом только один юзер
  },
  password: {
    type: String,
    required: true,
  },
  links: [{ type: Types.ObjectId, ref: "Link" }], //связка модели юзера с базой данных
});

module.exports = model("User", schema);
