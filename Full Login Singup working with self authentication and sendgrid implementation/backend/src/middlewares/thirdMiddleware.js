aapp.use((req, res, next) => {
    console.log("Third Middleware");
    next();
})

module.exports = thirdMiddleware;