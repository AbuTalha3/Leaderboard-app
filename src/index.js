import './style.css';
import './module/postgame.js';

const getGameId = () => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'shah Game',
    }),
  })
    .then((response) => response.json())
    .then((game) => {
      // console.log(game);
      const gameId = game.result.split(': ')[1].replace(' added.', '');
      localStorage.setItem('gameId', gameId);
    });
};

if (!localStorage.getItem('gameId')) {
  getGameId();
}
