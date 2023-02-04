const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('collector')
		.setDescription('Test collector'),
	async execute(interaction) {
        const filter = (m) => m.author.id === interaction.user.id;

        const collector = interaction.channel.createMessageCollector({
        filter,
        max: 5,
        time: 1000 * 20,
        });

        collector.on('collect', async (collected) => {
        if (collected.content.toLowerCase() === 'quit') {
            // collector stops and emits the end event
            collector.stop('user cancelled');
            // although the collector stopped this line is still executed
            await interaction.channel.send('Bye!');
        }

        // this line only runs if the above if statement is false
        await interaction.channel.send(`You said _"${collected.content}"_`);
        });

        // listening for the end event
        collector.on('end', async (collected, reason) => {
        // reason is the one you passed above with the stop() method
        await interaction.channel.send(`I'm no longer collecting messages. Reason: ${reason}`);
        });
    },
};