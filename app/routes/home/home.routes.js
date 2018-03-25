const {
    Router,
} = require('express');

const HomeController = require('./home.controller');

const init = (app, data) => {
    const controller = new HomeController(data);

    const router = new Router();
    app.use('', router);
    router
        .get('/success', (req, res) => {
            req.login.success = true;
            res.redirect('/home');
        })
        .get('/', (req, res) => {
            res.redirect('/home');
        })
        .get('/home', async (req, res) => {
            const viewName = '../../views/forum/home';
            const model = await controller.getAllHomeData();
            if (req.login.success) {
                model.logged = true;
                delete req.login.success;
            }
            res.render(viewName, model);
        });
        // .get('/myprofile', async (req, res) => {
        //     const viewName = '../../views/forum/privateLogin';
        //     res.render(viewName);
        // });
};

module.exports = {
    init,
};