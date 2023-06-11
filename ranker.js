require('dotenv').config();
const express = require('express');
const app = express();
const noblox = require('noblox.js');

// Define a POST route to handle the ranking request
app.post('/ranker', async (req, res) => {
  const userId = req.query.userid;
  const rank = req.query.rank;

  const botUsername = process.env.BOT_USERNAME;
  const botPassword = process.env.BOT_PASSWORD;
  const GROUP_ID = process.env.GROUP_ID

  try {
    // Log in with the bot account
    await noblox.login({ username: botUsername, password: botPassword });

    // Rank the user in the group
    await noblox.setRank({ group: GROUP_ID, target: userId, rank });

    // Optionally, you can add additional actions after ranking the user

    // Log out the bot account
    await noblox.logout();

    res.sendStatus(200);
  } catch (error) {
    console.error('Error ranking user:', error);
    res.sendStatus(500);
  }
});

// Start the server
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
