/* eslint-disable import/no-unresolved */
const router = require('express').Router();
const HighScore = require('../models/highScore.model');

router.route('/').get((req, res) => {
  HighScore.find().sort({ difficulty: 1, score: -1, date: -1 })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/easy').get((req, res) => {
  HighScore.find({ difficulty: 'easy' }).sort({ score: -1, date: -1 })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/normal').get((req, res) => {
  HighScore.find({ difficulty: 'normal' }).sort({ score: -1, date: -1 })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/hard').get((req, res) => {
  HighScore.find({ difficulty: 'hard' }).sort({ score: -1, date: -1 })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/oops').get((req, res) => {
  HighScore.find({ difficulty: 'oops' }).sort({ score: -1, date: -1 })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/alias').get((req, res) => {
  const aliasG = req.query.alias.toLowerCase();
  const difficultyG = req.query.difficulty.toLowerCase();
  HighScore.findOne({ alias: aliasG, difficulty: difficultyG })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/update/:alias/:difficulty').post((req, res) => {
  const aliasG = req.params.alias.toLowerCase();
  const difficultyG = req.params.difficulty.toLowerCase();
  const query = { alias: aliasG, difficulty: difficultyG };
  const { score } = req.body;
  HighScore.findOne(query)
    .then(highscore => {
      highscore.score = Number(score);
      highscore.date = Date.now();

      highscore.save()
        .then(() => res.json('Highscore Updated'))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => {
      const newHighScore = new HighScore(
        {
          difficulty: req.params.difficulty.toLowerCase(),
          alias: req.params.alias.toLowerCase(),
          score: Number(req.body.score),
          date: Date.now(),
        },
      );
      newHighScore.save()
        .then(() => res.json('new Highscore Added'))
        .catch(err => res.status(400).json(err));
      // res.status(400).json(err);
    });
});

router.route('/add').post((req, res) => {
  const {
    difficulty, alias, score, date,
  } = req.body;

  const newHighScore = new HighScore(
    {
      difficulty: difficulty.toLowerCase(),
      alias: alias.toLowerCase(),
      score: Number(score),
      date,
    },
  );

  newHighScore.save()
    .then(() => res.json('new Highscore Added'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;