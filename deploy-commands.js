const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

const OWNER_ID = "1174777690872627271";

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
    ),

  async execute(interaction) {

    // Only allow you to use the command
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ You don't have permission to use this command.",
        ephemeral: true,
      });
    }

    const title = interaction.options.getString("title");
    const message = interaction.options.getString("message");

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setFooter({
        text: "Classic Trades",
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });
  },
};
    console.error(error);
  }
})();
