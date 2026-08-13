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
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
],
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

// Welcome new members
client.on(Events.GuildMemberAdd, async member => {
try {
const welcomeChannel = member.guild.channels.cache.get(
"1433179678524309616"
);

if (!welcomeChannel) return;

await welcomeChannel.send(
`Hey ${member}\n\n` +
`Welcome to **TAKE PROFITS IN MOTION**\n\n` +
`You’re officially part of the community\n\n` +
`📌 Start Here <#1387871982124531874>\n` +
`💬 Community Chat <#1302408452534173848>\n` +
`📰 Forex News <#1531350712204787893>\n\n` +
`Introduce yourself and tap in with the community\n\n` +
`**TPM 🔵**`
);

} catch (error) {
console.error("Welcome message error:", error);
}
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
