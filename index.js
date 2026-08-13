require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const {
Client,
Collection,
GatewayIntentBits,
Events,
} = require("discord.js");

const client = new Client({
intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
console.log(`${client.user.tag} is online!`);
client.commands = new Collection();

// Load all commands
const commandsPath = path.join(\_\_dirname, "commands");
const commandFiles = fs
.readdirSync(commandsPath)
.filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
const command = require(path.join(commandsPath, file));

if ("data" in command && "execute" in command) {
client.commands.set(command.data.name, command);
}
}

client.once(Events.ClientReady, readyClient => {
console.log(`✅ ${readyClient.user.tag} is online!`);
});

// Listen for slash commands
client.on(Events.InteractionCreate, async interaction => {

if (!interaction.isChatInputCommand()) return;

const command = client.commands.get(interaction.commandName);

if (!command) return;

try {
await command.execute(interaction);
} catch (error) {

console.error(error);

if (interaction.replied || interaction.deferred) {
  await interaction.followUp({
    content: "Something went wrong.",
    ephemeral: true,
  });
} else {
  await interaction.reply({
    content: "Something went wrong.",
    ephemeral: true,
  });
}

}
});

client.login(process.env.TOKEN);
