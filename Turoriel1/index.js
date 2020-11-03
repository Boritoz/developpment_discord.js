const Discord = require('discord.js'); // Utilisation du module "discord.js"
const client = new Discord.Client(); // Création d"un client Discord

client.on('ready', () => { // Evénement qui s'execute au démarrage
    console.log(`Connéctée avec pour nom ${client.user.tag}.`); // Affichage d'uen réponce dans la console
});

client.on('message', msg => { // Evénement qui s'execute lors de la récéption d'un message
    if (msg.content === 'ping') { // message "ping" réponce "pong"
        msg.reply('Pong!');
    }
});

client.login('token'); //Connection au bot
