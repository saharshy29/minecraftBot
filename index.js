const mineflayer = require('mineflayer')
const express = require("express")
const app = express()

console.log("starting bot"); //A heads-up when the bot is starting up

app.get("/", (req, res) => res.send("I'm awake."))

const bot = mineflayer.createBot({
	host: process.env.HOST,
	port: parseInt(process.env.PORT),
	username: process.env.NAME ? process.env.NAME : 'index',
	password: process.env.PASSWORD,
})

// Initial things when bot joins the server
bot.on('login', () => {
	console.clear(); // Clears the console to make the chat easier to read

	bot.chat('/nick Booomerr Bot') // Setting nickname to make it clear that it's a bot
	bot.chat('yo') // Bot makes itself known
	bot.chat('/afk') // Sets the bot to AFK
})

// Bot will quit when whispered to
bot.on('whisper', function(username, message) {
	if (username === bot.username) return; // Checks to make sure that the bot isn't whispering to itself

	// Bot messes with people when whispered to before leaving
	bot.chat('I see that all of you do not like me. I will leave then.')
	bot.chat('meanies')
	bot.chat('I want to file a courtcase')
	bot.quit();
});

// Logs all chat messages in the console
bot.on('chat', function(username, message) {
	console.log(username + ": " + message)
});

// Logs info when kicked
bot.on('kicked', function(reason, loggedIn) {
	console.log("Reason for kick: " + reason);
	console.log("Logged In? "+ loggedIn)
});

// Says hi to players when they join
bot.on('playerJoined', function(player) {
	bot.chat('sup ' + player);
});

// Calls people out when bed is broken
bot.on('spawnReset', () => {
	bot.chat('Who broke my bed');
})

// Has some fun with people when killed
bot.on('death', () => {
	bot.chat('why u got to be so rude');
})

// Makes hatred of rain known
bot.on('rain', () => {
	bot.chat('ugghhhh. I hate the rain');
})

app.listen(3000) // Keeping an open port for Uptime Robot