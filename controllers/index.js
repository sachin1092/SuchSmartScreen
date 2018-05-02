module.exports = function (router) {
    router

    .get('/', function (req, res, next) {
    res.json({"version": require('../package.json').version});
    })

}
