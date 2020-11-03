const Discord = require('discord.js'); // Utilisation du module "discord.js"
const client = new Discord.Client(); // Création d"un client Discord
const fs = require('fs'); // Utilisation du module "fs"
client.commands = new Discord.Collection(); // Création d'une collection discord pour nos commandes

fs.readdir("./commands/", (err, files) => { 

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Commande introuvable.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} est lancé!`);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => { // Evénement qui s'execute au démarrage
    console.log(`Connéctée avec pour nom ${client.user.tag}.`); // Affichage d'uen réponce dans la console
});

client.on('message', async (message) => { // Evénement qui s'execute lorsqu'un message est envoyé
    if (message.author.bot) return; // Si l'autheur du message est un bot ont ne répond pas
    if (message.channel.type === "dm") return; // Si le message et en message privée ont ne répond pas


    let prefix = "!" // Ont définie le préfix 
    let messageArray = message.content.split(" "); // Ont décortique le message
    let cmd = messageArray[0]; //Ont atribue le nom "cmd" au premier mot du message
    let args = messageArray.slice(1); //Ont atribue le nom "args" au autres mots du message

    if (message.content.startsWith(prefix)) { // Ont execute le code si le message commence par le prefix
        let commandfile = client.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(client, message, args);
    } else {

        return;

    }
});

client.login('token'); //connection du bot