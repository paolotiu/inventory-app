const { nextTick } = require('async');
const Item = require('../models/item');
const Category = require('../models/category');
const upload = require('./multer');
const { itemValidators, validationResult } = require('./validation');

exports.item_count = (req, res) => {
    Item.countDocuments((err, count) => {
        res.render('index', { item_count: count });
    });
};

exports.item_details = (req, res, next) => {
    Item.findById(req.params.id, (err, item) => {
        if (err) return next(err);

        res.render('item_details', { item });
    });
};

exports.create_item_form = (req, res) => {
    res.render('category_form', {
        title: 'Add an Item',
        isItem: true,
        id: req.params.id,
    });
};

exports.create_item = [
    (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                res.locals.fileErr = 'File too large!';
            }
            next();
        });
    },
    ...itemValidators,
    (req, res, next) => {
        const { name, price, qty, desc, categoryId } = req.body;
        const params = {
            name,
            price,
            qty,
            desc,
            title: 'Add an Item',
            isItem: true,
            id: req.params.id,
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let { param, msg } = errors.array({ onlyFirstError: true })[0];
            param = param + 'Err';
            return res.render('category_form', {
                fileErr: res.locals.fileErr,
                [param]: msg,
                ...params,
            });
        } else if (res.locals.fileErr) {
            return res.render('category_form', {
                fileErr: res.locals.fileErr,
                ...params,
            });
        }
        const item = new Item({
            name: name,
            price: price,
            quantity: qty,
            description: desc,
            img: req.file ? req.file.filename : 'placeholder.jpg',
        });

        Category.findByIdAndUpdate(
            categoryId,
            { $push: { items: item._id } },
            (err, doc) => {
                if (err) return next(err);
                item.save((err, doc) => {
                    if (err) return next(err);
                    res.redirect('/category/' + categoryId);
                });
            }
        );
    },
];

exports.delete_item = (req, res, next) => {
    const itemId = req.params.id;
    Item.findByIdAndRemove(itemId, (err, doc) => {
        console.log(itemId);
        if (err) return next(err);
        else res.redirect('/');
    });
};
