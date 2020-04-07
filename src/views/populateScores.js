/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import axios from 'axios';

async function populateScores(URI) {
  const normalScores = await axios.get(`${URI}normal`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  const hardScores = await axios.get(`${URI}hard`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  const oopsScores = await axios.get(`${URI}oops`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
  const highScoreNormalTable = document.querySelector('#NormalBody');
  const highScoreHardTable = document.querySelector('#HardBody');
  const highScoreOopsTable = document.querySelector('#OopsBody');

  const normalData = normalScores.map((highscore, index) => `<tr class="tableData">
      <td>${index + 1}</td>
      <td>${highscore.alias}</td>
      <td>${highscore.score}</td>
      </tr>`).join('');
  const hardData = hardScores.map((highscore, index) => `<tr class="tableData">
      <td>${index + 1}</td>
      <td>${highscore.alias}</td>
      <td>${highscore.score}</td>
      </tr>`).join('');
  const oopsData = oopsScores.map((highscore, index) => `<tr class="tableData">
      <td>${index + 1}</td>
      <td>${highscore.alias}</td>
      <td>${highscore.score}</td>
      </tr>`).join('');
  highScoreNormalTable.innerHTML = normalData;
  highScoreHardTable.innerHTML = hardData;
  highScoreOopsTable.innerHTML = oopsData;
}

async function updateScore(URI, alias, difficulty, newScore) {
  const oldScore = await axios.get(`${URI}alias`, {
    params: {
      alias,
      difficulty,
    },
  })
    .then(response => response.data.score)
    .catch(error => console.log(error));

  if (oldScore < newScore || !oldScore) {
    axios.post(`${URI}update/${alias}/${difficulty}`, { score: newScore })
      .then(() => {
        populateScores(URI);
      })
      .catch(error => console.log(error));
  } else {
    await populateScores(URI);
  }
}

export { populateScores, updateScore };