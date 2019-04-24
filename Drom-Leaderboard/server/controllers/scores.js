const models = require('../models');

const Scores = models.scores;

const setScore = (req, res) => {
    console.log(req.body);
  if (!req.body.team || !req.body.score || !req.body.streak) {
    return res.status(400).json({ error: 'Not all fields are filled.' });
  }

  const teamData = {
    team: req.body.team,
    score: req.body.score,
    streak: req.body.streak,
  };

  const newScore = new scores.scoreModel(teamData);

  const scorePromise = newScore.save();
    
  scorePromise.then(() => res.status(200));

  scorePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Score already exists.' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return scorePromise;
};

const getScores = (request, response) => {
  const req = request;
  const res = response;

  //Don't think I need everything in the ()
  return Scores.scoreModel.findAll(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ domos: docs });
  });
};

module.exports.getScores = getScores;
module.exports.setScore = setScore;