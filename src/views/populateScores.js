import axios from 'axios';

function populateScores(URI, score) {
  axios.get(`${URI}${score}`)
    .then((response) => {
      const highScoreNormalTable = document.querySelector('#NormalBody');
      const highScoreHardTable = document.querySelector('#HardBody');
      const highScoreOopsTable = document.querySelector('#OopsBody');

      const tableData = response.data.map((highscore, index) => `<tr class="tableData">
          <td>${index + 1}</td>
          <td>${highscore.alias}</td>
          <td>${highscore.score}</td>
          </tr>`).join('');
      if (score === 'normal') { highScoreNormalTable.innerHTML = tableData; }
      if (score === 'hard') { highScoreHardTable.innerHTML = tableData; }
      if (score === 'oops') { highScoreOopsTable.innerHTML = tableData; }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

function updateScore(URI, alias, difficulty, newScore) {
  axios.post(`${URI}update/${alias}/${difficulty}`, { score: newScore })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
}


export { populateScores, updateScore };