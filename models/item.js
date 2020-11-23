const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
});

itemSchema.virtual('url').get(function () {
    return '/item/' + this._id;
});

//Export
module.exports = mongoose.model('Item', itemSchema);
