const mongoose = require("mongoose");
if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('../connections/mongo'));
}
const Schema = mongoose.Schema;

const newSchema = new Schema(
  {
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    email:String, //Foreign Key
    win:Number,
    loss:Number,
    tie:{type:Number},
    highScore:Number,
    totalMatch:Number,
    isActive:{type:Boolean,default:true} //For soft delete
  },
  { timestamps: true }
);

const GameData = mongoose.model('GameData',newSchema);

module.exports = GameData