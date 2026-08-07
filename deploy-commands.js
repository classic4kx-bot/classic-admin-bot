const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const OWNER_ID = "1174777690872627271";

const FOREX_NEWS = "1531350712204787893";
const GENERAL_CHAT = "1302408452534173848";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Send an announcement")

    .addStringOption(option =>
      option
        .setName("title")
        .setDescription("Announcement title")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Announcement message")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("channel")
        .setDescription("Where should the announcement go?")
        .setRequired(true)
        .addChoices(
          { name: "General Chat", value: "general" },
          { name: "Forex News", value: "forex" },
          { name: "Both", value: "both" }
        )
    )

    .addBooleanOption(option =>
      option
        .setName("everyone")
        .setDescription("Ping everyone?")
    ),

  async execute(interaction) {

    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ You don't have permission to use this command.",
        ephemeral: true,
      });
    }

    const title = interaction.options.getString("title");
    const message = interaction.options.getString("message");
    const channelChoice = interaction.options.getString("channel");
    const everyone = interaction.options.getBoolean("everyone") ?? false;

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setFooter({
        text: "Classic Trades",
      })
      .setTimestamp();

    const channels = [];

    if (channelChoice === "general" || channelChoice === "both") {
      channels.push(GENERAL_CHAT);
    }

    if (channelChoice === "forex" || channelChoice === "both") {
      channels.push(FOREX_NEWS);
    }

    for (const id of channels) {
      const channel = await interaction.client.channels.fetch(id);

      await channel.send({
        content: everyone ? "@everyone" : "",
        embeds: [embed],
        allowedMentions: {
          parse: everyone ? ["everyone"] : [],
        },
      });
    }

    await interaction.reply({
      content: "✅ Announcement sent successfully.",
      ephemeral: true,
    });
  },
};
