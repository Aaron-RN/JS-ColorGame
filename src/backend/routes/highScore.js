const router = require('express').Router();
const HighScore = require('../models/highScore.model');

router.route('/').get((req, res) => {
  HighScore.find().sort('-score')
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/easy').get((req, res) => {
  HighScore.find({ difficulty: 'easy' }).sort('-score')
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/normal').get((req, res) => {
  HighScore.find({ difficulty: 'normal' }).sort('-score')
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/hard').get((req, res) => {
  HighScore.find({ difficulty: 'normal' }).sort('-score')
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/oops').get((req, res) => {
  HighScore.find({ difficulty: 'normal' }).sort('-score')
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/alias').get((req, res) => {
  const aliasG = req.query.alias;
  const difficultyG = req.query.difficulty;
  HighScore.findOne({ alias: aliasG, difficulty: difficultyG })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/update/:alias/:difficulty').post((req, res) => {
  const aliasG = req.params.alias;
  const difficultyG = req.params.difficulty;
  const query = { alias: aliasG, difficulty: difficultyG };
  const { score } = req.query;
  HighScore.findOneAndUpdate(query, {
    score: Number(score),
    date: Date.now(),
  }, { useFindAndModify: false }, (err, item) => {
    if (err) res.status(400).json(err);
    if (!item) res.status(400).json("Error: Highscore couldn't be found");
    res.json(`Alias: ${item.alias} - Highscore Updated`);
  });
});

router.route('/add').post((req, res) => {
  const {
    difficulty, alias, score, date,
  } = req.query;

  const newHighScore = new HighScore(
    {
      difficulty,
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