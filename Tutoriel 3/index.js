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

client.on('ready', () => { // Voici le nom de l'event
    client.user.setActivity("ceci est un test!");
    console.log(`${client.user.username} est connectée sur ${client.guilds.size} serveur !`); // Ce "console.log" vous permet de voir si le bot est bien connectée.
});

client.on("guildMemberAdd", async member => { // Voici le nom de l'event

    let channeldebienvenue = member.guild.channels.get("611577136758784049"); // A la place de "611577136758784049" vous pouvez mettre l'id du channel ou vous souhaitez que le bot envoie le message.
    channeldebienvenue.send(`Souhaitez la bienvenue à ${member}.`)

});

client.on("guildMemberRemove", async member => { // Voici le nom de l'event

    let channeldeadieu = member.guild.channels.get("611577136758784049"); // A la place de "611577136758784049" vous pouvez mettre l'id du channel ou vous souhaitez que le bot envoie le message.
    channeldeadieu.send(`A la prochaine ${member}`)

});

client.on('messageUpdate', (oldMessage, newMessage) => { // Voici le nom de l'event
    if (oldMessage.author.bot) return; // Si l’auteur est un bot on ne répond pas
    var guild = oldMessage.guild;    // Ont définie le serveur à une variable
    var Channeldelogs = guild.channels.get("611577136758784049");  // A la place de "611577136758784049" vous pouvez mettre l'id du channel ou  vous souhaitez que le bot envoie le message.

    if (oldMessage != newMessage) { // Si le message nouveau et l'ancien sont différent, ont fait l'action suivante, ce qui évite de detecter lorsqeu les liens sont update.

        Channeldelogs.send(`Le message de ${oldMessage.author} a été modifier, le message précédent est ${oldMessage} est le nouveau est ${newMessage} dans le salon ${oldMessage.channel}`)

    }
});

client.on("messageDelete", (message) => { // Voici le nom de l'event
    if (message.author.bot) return; // Si l’auteur est un bot on ne répond pas
    var Channeldelogs = message.guild.channels.get("611577136758784049"); // A la place de "611577136758784049" vous pouvez mettre l'id du channel ou vous souhaitez que le bot envoie le message.

    Channeldelogs.send(`Le message de ${message.author} a été supprimé, le message supprimé est ${message.cleanContent} dans le salon ${message.channel}`)
});

client.login('token'); //Connection au bot