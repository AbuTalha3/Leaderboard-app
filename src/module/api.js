import './style.css';
import Game from '../src/module/api.js'; // Import the Game class from the api.js file

const game = new Game(); // Create an instance of the Game class

const scoreList = document.querySelector('.added-scores');
const refreshButton = document.querySelector('.refresh');
const formArea = document.querySelector('.form-area');

// Function to fetch and display the scores
const fetchScores = async () => {
  try {
    const gameId = /games/:id/scores/; // Replace this with the actual game ID
    const scores = await game.getScore(gameId);
    scoreList.innerHTML = ''; // Clear the current scores

    scores.result.forEach((score) => {
      const li = document.createElement('li');
      li.textContent = `${score.user}: ${score.score}`;
      scoreList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
};

// Function to add a new score
const addScore = async (event) => {
  event.preventDefault();
  const userNameInput = formArea.querySelector('input[type="text"][placeholder="Enter your name"]');
  const scoreInput = formArea.querySelector('input[type="text"][placeholder="Enter your score"]');

  const userName = userNameInput.value.trim();
  const scoreValue = parseInt(scoreInput.value);

  if (!userName || isNaN(scoreValue)) {
    alert('Please enter a valid name and score.');
    return;
  }

  try {
    const gameId = /games/:id/scores/; // Replace this with the actual game ID
    await game.newScore(gameId, { user: userName, score: scoreValue });
    fetchScores(); // Fetch and display the updated scores
    userNameInput.value = '';
    scoreInput.value = '';
  } catch (error) {
    console.error(error);
  }
};

// Event listeners
refreshButton.addEventListener('click', fetchScores);
formArea.addEventListener('submit', addScore);

// Initial fetch to populate the score list on page load
fetchScores();
