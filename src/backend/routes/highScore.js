const router = require('express').Router();
const HighScore = require('../models/highScore.model');

router.route('/').get((req, res) => {
  HighScore.find()
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/easy').get((req, res) => {
  HighScore.find({ difficulty: 'easy' })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/normal').get((req, res) => {
  HighScore.find({ difficulty: 'normal' })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/hard').get((req, res) => {
  HighScore.find({ difficulty: 'normal' })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/oops').get((req, res) => {
  HighScore.find({ difficulty: 'normal' })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/add').post((req, res) => {
  const {
    difficulty, place, alias, score, date,
  } = req.query;

  const newHighScore = new HighScore(
    {
      difficulty,
      place: Number(place),
      alias,
      score: Number(score),
      date,
    },
  );

  newHighScore.save()
    .then(() => res.json('new Highscore Added'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;