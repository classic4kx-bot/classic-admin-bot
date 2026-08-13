const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

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

    const title = interaction.options.getString("title");
    const message = interaction.options.getString("message");

    const embed = new EmbedBuilder()
      .setColor(0x111111)
      .setTitle(`📢 ${title}`)
      .setDescription(message)
      .setFooter({
        text: "TAKE PROFITS IN MOTION"
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });

  }
};
