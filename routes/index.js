var express = require('express');
var router = express.Router();
const async = require('async');
const Item = require('../models/item');
const Category = require('../models/category');
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');
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
router.get('/category/:id/delete', categoryController.delete_category);
router.get('/category/:id/add', itemController.create_item_form);
router.post('/category/:id/add', itemController.create_item);
router.get('/category_form', categoryController.create_category_form);
router.post('/category_form', categoryController.create_category);
router.get(
    '/category/:id/delete/confirm',
    categoryController.delete_category_confirm
);
router.get('/item/:id', itemController.item_details);

router.get('/item/:id/delete', itemController.delete_item);
module.exports = router;
