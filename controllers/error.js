const path = require('path');

exports.getError404 = (req, res, next) => {
    res.render(path.join("error", "404.pug"), {
        title: 'Error 404'
    });
}