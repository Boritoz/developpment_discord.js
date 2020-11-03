module.exports.run = async (client, message, args) => {

    const msg = await message.channel.send("Ping..."); // Envoie d'un message

    var ping = msg.createdTimestamp - message.createdTimestamp; //calcul du temp en milisenconde entre l'envoie su message précédent et notre commande

    await msg.edit(Math.round(ping) + "ms") // Envoie du message éditée avec le temp en miliseconde.

}

module.exports.help = {
    name: "ping"
}