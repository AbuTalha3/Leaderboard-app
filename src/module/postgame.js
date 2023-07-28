const name = document.getElementById('name');
const score = document.getElementById('score');
const submit = document.getElementById('submit');
const ul = document.getElementById('ul');
const refresh = document.getElementById('refresh');

export const getGameId = localStorage.getItem('gameId');

export const postData = (gameId) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name.value,
      score: score.value,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

submit.addEventListener('click', async () => {
  await postData(getGameId);
});

export const getData = (getGameId) => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${getGameId}/scores`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export const displayData = () => {
  ul.innerHTML = '';

  getData(getGameId)
    .then((data) => {
      const games = data.result;
      games.forEach((game) => {
        ul.innerHTML += `
          <li class='li'>
            <p>${game.user}</p>
            <p>${game.score}</p>
          </li>`;
      });
    })
    .catch((error) => {
      // Handle errors, if any
      error('Error occurred:', error);
    });
};

refresh.addEventListener('click', () => {
  displayData();
});
