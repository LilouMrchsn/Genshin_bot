const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('abysses')
		.setDescription('Dans combien de temps vont se reset les abysses ?'),
	async execute(interaction) {
        let aujourd_hui = new Date();
        if(aujourd_hui.getDate() > 15 && aujourd_hui.getHours() > 4){
            if(aujourd_hui.getMonth() === 11){
                var nextMonth = new Date(aujourd_hui.getFullYear() + 1, 0, 1, 4, 0, 0, 0);
            } else {
                var nextMonth = new Date(aujourd_hui.getFullYear(), aujourd_hui.getMonth() + 1, 1, 4, 0, 0, 0);
            }

        } else {
            var nextMonth = new Date(aujourd_hui.getFullYear(), aujourd_hui.getMonth(), 16, 4, 0, 0, 0);
        }
        // nextmonth to unix timestamp
        nextMonth = Math.floor(nextMonth.getTime() / 1000);
		await interaction.reply(content="Prochaines abysses : <t:" + nextMonth + ":R> !, soit le <t:" + nextMonth + ":F>");
	},
};