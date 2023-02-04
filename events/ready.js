const { Events } = require('discord.js');
const cronJob = require('cron').CronJob;
const { getTimestampAbysses } = require('../genshinUtils.js');

const reminder = new cronJob('0 0 12 8,14,24,28 * *', async () => {
	const cycleSuivant = getTimestampAbysses();
	await salonRappel.send(`<@&${roleRappel.id}> Prochaines abysses : <t:${cycleSuivant.getTime() / 1000}:R> !, soit le <t:${cycleSuivant.getTime() / 1000}:F>`);
});

//créer un rappel qui se déclenche tous les 1 et 16 du mois à 4h du matin
const rappel = new cronJob('0 0 4 1,16 * *', async () => {
	const cycleSuivant = getTimestampAbysses();
	await salonRappel.send(`<@&${roleRappel.id}>, les nouvelles abysses commencent !`);
});

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('Genshin Impact');

		const roleRappel = client.guilds.cache.get(process.env.guildId).roles.cache.find(role => role.name === 'rappel abysses');
		const salonRappel = client.guilds.cache.get(process.env.guildId).channels.cache.find(channel => channel.name === 'abysses');
		if (roleRappel === undefined || salonRappel === undefined) {
			console.log('Le rôle ou le channel n\'existe pas');
			return;
		}
		
		reminder.start();
		const days = [8,14,23,28]
		const aujourd_hui = new Date();
		const cyclePrecedent = new Date();
		if(aujourd_hui.getDate() < 8){
			cyclePrecedent.setMonth(aujourd_hui.getMonth() - 1);
			cyclePrecedent.setDate(28);
		}
		if(aujourd_hui.getDate() > 28){
			cyclePrecedent.setDate(28);
		}
		else{
			for(let i = 0; i < days.length; i++){
				if(aujourd_hui.getDate() <= days[i]){
					cyclePrecedent.setDate(days[i - 1]);
					break;
				}
			}
		}
		const precedentsMessages = await salonRappel.messages.fetch({ limit: 1 });
		const precedentMessage = precedentsMessages.first();
		

		if(precedentMessage.author.id !== client.user.id || precedentMessage.createdTimestamp < cyclePrecedent.getTime()){
			const cycleSuivant = getTimestampAbysses();
			await salonRappel.send(`<@&${roleRappel.id}> Prochaines abysses : <t:${cycleSuivant.getTime() / 1000}:R> !, n'oubliez pas de les faire pour ne pas perdre de primogemmes`);
		}
		
		
	},
};