import axios from 'axios';

function populateScores(URI, score) {
  axios.get(`${URI}${score}`)
    .then((response) => {
      // handle success
      const highScoreNormalTable = document.querySelector('#NormalBody');
      const highScoreHardTable = document.querySelector('#HardBody');
      const highScoreOopsTable = document.querySelector('#OopsBody');

      const tableData = response.data.map((highscore, index) => {
        return `<tr class="tableData">
          <td>${index + 1}</td>
          <td>${highscore.alias}</td>
          <td>${highscore.score}</td>
          </tr>`;
      }).join('');
      if (score === 'normal') { highScoreNormalTable.innerHTML = tableData; }
      if (score === 'hard') { highScoreHardTable.innerHTML = tableData; }
      if (score === 'oops') { highScoreOopsTable.innerHTML = tableData; }

      console.log(response.data);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
}

function updateScore() {
  return null;
}

export { populateScores, updateScore };