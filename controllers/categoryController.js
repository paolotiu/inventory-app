const Category = require('../models/category');
const Item = require('../models/item');
const async = require('async');
// Count the numebr of categories
exports.category_count = (req, res) => {
    Category.countDocuments({}, (err, count) => {
        res.render('index', { category_count: count });
    });
};

// List of all categories
exports.category_list = (req, res) => {
    Category.find().exec((err, category_list) => {
        console.log(category_list);
        res.render('categories', { categories: category_list });
    });
};

// Open category, list items
exports.open_category = (req, res, next) => {
    async.parallel(
        {
            category: (cb) => {
                Category.findById(req.params.id).populate('items').exec(cb);
            },
        },
        (err, results) => {
            const { category } = results;
            if (err) return next(err);
            res.render('view_items', {
                category_name: category.name,
                items: category.items,
            });
        }
    );
};
