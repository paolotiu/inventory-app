const Item = require('../models/item');

exports.item_count = (req, res) => {
    Item.countDocuments((err, count) => {
        res.render('index', { item_count: count });
    });
};
