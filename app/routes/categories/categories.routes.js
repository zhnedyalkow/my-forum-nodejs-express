const {
    Router,
} = require('express');


const CategoriesController = require('./categories.controller');

const init = (app, data) => {
    const controller = new CategoriesController(data);

    const router = new Router();
    app.use('/Category', router);

    router
        .post('/createCategory', async (req, res) => {
            if (req.user) {
                await controller.createCategory(req.body);
            }
            res.redirect('/');
        })

        // .post('/createCategory', async (req, res) => {
        //     let result;
        //     if (req.user) {
        //         result = await controller.createCategory(req.body);
        //     }

        //     // const errors = result.errors;
        //     // req.flash('error', errors);
        //     const error = ['failed', 'smt'];

        //     res.redirect('/home?error=' + error);
        // })
        .get('/:cat', async (req, res) => {
            const {
                cat,
            } = req.params;
            const viewName = '../../views/forum/category';
            const threads = await controller.getAllThreadsByCatName(cat);
            const posts = await controller.getAllPostsbyId(threads);

            res.locals.search = { in: 'threads',
                catName: cat,
            };
            const model = {
                threads,
                posts,
                catName: cat,
            };
            res.render(viewName, model);
        });
};

module.exports = {
    init,
};