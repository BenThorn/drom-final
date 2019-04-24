const controllers = require('./controllers');

const router = (app) => {
    app.post('/setScores', controllers.scores.setScore);
    app.get('/getScores', controllers.scores.getScores);
};

module.exports = router;