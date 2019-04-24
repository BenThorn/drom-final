const models = require('../models');

const Scores = models.scores;

const setScore = (req, res) => {
  if (!req.body.team || !req.body.score || !req.body.streak) {
    return res.status(400).json({
      error: 'Not all fields are filled.'
    });
  }

  const teamData = {
    team: req.body.team,
    score: req.body.score,
    streak: req.body.streak,
  };

  const newScore = new Scores.scoreModel(teamData);

  const scorePromise = newScore.save();

  scorePromise.then(() => {
    res.end();
  });

  scorePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Score already exists.'
      });
    }

    return res.status(400).json({
      error: 'An error occured'
    });
  });

  return scorePromise;
};

const getScores = (request, response) => {
  const req = request;
  const res = response;

  return Scores.scoreModel.findAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occured'
      });
    }

    return res.json({
      scores: docs
    });
  });
};

module.exports.getScores = getScores;
module.exports.setScore = setScore;
