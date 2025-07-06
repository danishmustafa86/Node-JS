app.use((req, res, next) => {
    console.log(`second middleware ${req.method} request for '${req.url}'`);
    next();
})

module.exports = secondMiddleware;