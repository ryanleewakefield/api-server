const queryRoutes = require('./queryRoutes');

const appRouter = (app, fs) => {
    app.get('/', (req, res) =>{
        res.send("Welcome api-server by Ryan Wakefield");
    });

    queryRoutes(app, fs);
};



module.exports = appRouter;