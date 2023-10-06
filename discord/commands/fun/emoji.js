const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType,
  SlashCommandBuilder
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emoji')
		.setDescription('Special emojis only for you!'),
	async execute(interaction) {
    const emojis = [
      [
        {
          label: `nanaWow`,
          id: `1159633715333435392`,
        },
        {
          label: `lolitaWle`,
          id: `1159633686740877403`,
        },
        {
          label: `chou`,
          id: `1159633645145964695`,
        },
        {
          label: `aluCool`,
          id: `1159633608542257153`,
        },
      ],
      [
        {
          label: `laylalaugh`,
          id: `1159356821878870216`,
        },
        {
          label: `laylacry`,
          id: `1159358890358607904`,
        },
        {
          label: `laylalove`,
          id: `1159358858427383898`,
        },
        {
          label: `laylawle`,
          id: `1159358828496814081`,
        },
      ],
    ];

    const rows = [];

    for(let i = 0; i < emojis.length; i++) {
      const emojiButtons = [];
      const _row = emojis[i];
      for(let j = 0; j < _row.length; j++) {
        const emoji = _row[j];
        emojiButtons.push({
          custom_id: `<:${emoji.label}:${emoji.id}>`,
          type: ComponentType.Button,
          style: ButtonStyle.Secondary,
          emoji: emoji.id,
        });
      }
      const row = new ActionRowBuilder({
        components: emojiButtons,
      });
      rows.push(row);
    }

		const response = await interaction.reply({
      content: `Choose one of the emoji below...`,
      components: rows,
    });

    const collectorFilter = i => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter, time: 10_000
      });
      await interaction.editReply({ content: confirmation.customId, components: []});
    } catch (e) {
      await interaction.editReply({
        content: `<a:diamond:1159623409169350748>`, components: []
      });
    }
	},
};
