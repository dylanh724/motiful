const config = require('../config.json'); // Import configuration
const fs = require('fs'); // For custom emotes

exports.main = function(selfbot, msg, msgArray) { // Export command function
    var command = "delEmote";
    if(msg.content == config.commandPrefix + command.toLowerCase()) { 
        // If no emoteName was specified...
        msg.edit('Specify an emoteName!').then(msg => msg.delete(2000));
        // ...tell the user to do so and set auto-delete to 2s.
        return; // Abort command execution 
    };
    var emoteName = "";
    var emoteURL = "";
    // Define placeholders
    if(msgArray[1].startsWith('"')) {
    // If the emoteName name is a multi-word emote...
        emoteName = msg.content.substring(msg.content.indexOf('"')+1, msg.content.lastIndexOf('"')).replace(/ /g,"_");
        // ...assign the emoteName value to the cut-out "" part and replace all spaces with underscores.
    }
    else {
    // If the emoteName is a single-word emote...
        emoteName = msgArray[1];
        // ...assign the emote value out of the array.
    }
    var customPath = require("path").join(__dirname, "../customemotes/");
    // Set the path the custom emotes are stored in
    var emotePath = "";
    // Define path placeholder for emote to be deleted
    if(fs.existsSync(`${customPath + emoteName}.png`) || fs.existsSync(`${customPath + emoteName}.jpg`) || fs.existsSync(`${customPath + emoteName}.gif`)) {
        if(fs.existsSync(`${customPath + emoteName}.png`)) {
        // ... 1) and if the file is a png file...
            emotePath =  customPath + emoteName + ".png";
            // ...set emoteURL to the emote path and add the png extension...
        };
        if(fs.existsSync(`${customPath + emoteName}.jpg`)) {
        // ... 2) and if the file is a jpg file...
            emotePath =  customPath + emoteName + ".jpg";
            // ...set emoteURL to the emote path and add the jpg extension...
        };
        if(fs.existsSync(`${customPath + emoteName}.gif`)) {
        // ... 3) and if the file is a gif file...
            emotePath =  customPath + emoteName + ".gif";
            // ...set emoteURL to the emote path and add the gif extension...
        };               
    };
    fs.unlink(emotePath, function (error) {
        if(error) {
        // If there is an error deleting the emote...
            msg.edit(`Error deleting emote!: \`\`\`${error}\`\`\``).then(msg => msg.delete(2000));
            // ...tell the user and set auto-delete to 2s.
            return;        
        };
        msg.edit(`Successfully deleted emote '${emoteName.replace(/_/g," ")}'!`).then(msg => msg.delete(2000));
        // Notify user of success and set auto-delete to 2s
    });
};

exports.desc = "Delete a custom emote - Multi-word custom emotes need to be enclosed by quotes."; // Export command description
exports.syntax = "<emotename>"; // Export command syntax 