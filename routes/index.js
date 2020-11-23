var express = require('express');
var router = express.Router();
const async = require('async');
const Item = require('../models/item');
const Category = require('../models/category');
const categoryController = require('../controllers/categoryController');
/* GET home page. */
router.get('/', (req, res) => {
    async.parallel(
        {
            category_count: (cb) => {
                Category.countDocuments(cb);
            },
            item_count: (cb) => {
                Item.countDocuments(cb);
            },
        },
        (err, results) => {
            const { category_count, item_count } = results;
            res.render('index', { category_count, item_count });
        }
    );
});

router.get('/categories', categoryController.category_list);
router.get('/category/:id/', categoryController.open_category);
module.exports = router;
