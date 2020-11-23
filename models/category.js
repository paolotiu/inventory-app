const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

// Virtual for url
CategorySchema.virtual('url').get(function () {
    return '/category/' + this._id;
});

//Export
module.exports = mongoose.model('Category', CategorySchema);
