const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.post('/setScores', controllers.scores.setScore);
    app.get('/getScore', controllers.scores.getScore);
};

module.exports = router;