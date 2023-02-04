const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const mots = require('../hangman.json');
const fs = require('fs');

const difficultes = {
	"facile": ["personnages", "oculus", "zones", "ennemis", "pets", "ressources", "dropsBossHebdo", "gadgets"],
	"moyen": ["lance", "arcs", "catalyseurs", "épées", "claymores", "recettes", "crafts", "pierres", "dropsBossQuotidien", "artefacts", "animaux"],
	"difficile": ["panoramas", "livresTalent", "donjons", "events", "cannes", "ailes"]
};

function buildRow() {
    let row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('oui')
            .setLabel('oui')
            .setStyle(ButtonStyle.Success)
            .setEmoji('✅')
    );
	return row;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pendu')
		.setDescription('Jeu du pendu, version genshin impact')
		.addSubcommand(subcommand =>
			subcommand.setName('jouer')
			.setDescription('Lance une partie')
			.addStringOption(option =>
				option.setName('difficulte')
				.setDescription('What do you want to farm ?')
				.setRequired(true)
				.addChoices(
				{ name: 'facile', value: 'facile' },
				{ name: 'moyen', value: 'moyen' },
				{ name: 'difficile', value: 'difficile' },
				)
			.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('ajouter')
				.setDescription('ajouter un mot dans la liste')
				.addStringOption(option =>
					option.setName('mot')
					.setDescription('mot à ajouter')
					.setRequired(true))
				.addStringOption(option =>
					option.setName('catégorie')
					.setDescription('catégorie du mot'))),

	async execute(interaction) {
		if(interaction.options.getSubcommand() === 'ajouter'){
			let mot = interaction.options.getString('mot');
			let cat = interaction.options.getString('catégorie');
			if(cat === null){
				await interaction.reply({content:"Catégorie non renseignée, mot non ajouté. Souhaitez-vous voir les catégories existantes ?", components:[buildRow()]});
			}
			if(mots[cat] === undefined){
				await interaction.reply({content:"Catégorie inconnue, mot non ajouté. Souhaitez-vous voir les catégories existantes ?", components:[buildRow()]});
			}
			else if(mots[cat].includes(mot)){
				await interaction.reply(content="Mot déjà existant dans la catégorie, mot non ajouté");
				return;
			}
			else{
				mots[cat].push(mot);
				await interaction.reply(content="Mot ajouté !");
				fs.writeFile('hangman.json', JSON.stringify(mots), {indent:4},  (err) => {
					if (err) console.error(err);
				});
				return;
			}
			const filter = i => i.customId === 'oui' || i.customId === 'non' && i.user.id === interaction.user.id;
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
			collector.on('collect', async i => {
				if (i.customId === 'oui') {
					let liste_cat = [];
					for(const [clef, valeur] of Object.entries(mots)){
						liste_cat.push(clef);
					}
					await i.reply(content="Voici la liste des catégories existantes : " + liste_cat.join(", "), components=[]);
				}
				collector.stop();
			});
			
		}
		else{
			await interaction.deferReply();
			let liste_mots = [];
			let difficulte = interaction.options.getString('difficulte');
			let liste_check = difficultes["facile"];
			if(difficulte === "moyen"){
				liste_check.push(difficultes["moyen"]);
			}
			else if(difficulte === "difficile"){
				liste_check.push(difficultes["moyen"]);
				liste_check.push(difficultes["difficile"]);
			}
			for(const [clef, valeur] of Object.entries(mots)){
				if(liste_check.includes(clef)){
					liste_mots.push(clef);
				}
			}
			let cat = liste_mots[Math.floor(Math.random() * liste_mots.length)];
			let nbInCat = Math.floor(Math.random() * mots[cat].length);

			let mot = mots[cat][nbInCat];
			mot = mot.replace(/[éèêë]/gi, 'e');
			mot = mot.replace(/[àâä]/gi, 'a');
			mot = mot.replace(/[ùûü]/gi, 'u');
			mot = mot.replace(/[îï]/gi, 'i');
			mot = mot.replace(/[ôö]/gi, 'o');
			mot = mot.replace(/[ç]/gi, 'c');

			mot = mot.toUpperCase();
			let motCache = mot.replace(/[a-z]/gi, '_');
			let nbEssais = 7;
			let lettres = [];
			message = await interaction.editReply(content="Le mot à trouver est : `" + motCache + "`\nIl vous reste " + nbEssais + " essais.\nLettres déjà proposées : " + lettres.join(', '));
			
			const filter = m => m.author.id === interaction.user.id;
			const collector = message.channel.createMessageCollector(filter, { time: 15000 });

			collector.on('collect', async (collected) => {
				let lettre = collected.content.toUpperCase();
				if(lettre.length === 1){
					if(lettres.includes(lettre)){
						await interaction.editReply(content= "Le mot à trouver est : `" + motCache + "`\nIl vous reste " + nbEssais + " essais.\nLettres déjà proposées : " + lettres.join(', ') + "**Vous avez déjà proposé cette lettre !**");
					} else {
						lettres.push(lettre);
						if(mot.includes(lettre)){
							let motCacheTemp = motCache.split('');
							for(let i = 0; i < mot.length; i++){
								if(mot[i].toUpperCase() === lettre){
									motCacheTemp[i] = lettre;
								}
							}
							motCache = motCacheTemp.join('');
							if(motCacheTemp === mot){
								collector.stop('Reussite');
							} else {
								await interaction.editReply(content="Le mot à trouver est : `" + motCache + "`\nIl vous reste " + nbEssais + " essais.\nLettres déjà proposées : " + lettres.join(', '));
							}
						} else {
							nbEssais--;
							await interaction.editReply(content="Le mot à trouver est : `" + motCache + "`\nIl vous reste " + nbEssais + " essais.\nLettres déjà proposées : " + lettres.join(', '));
						}
					}
				} else {
					//remove accents and special characters from lettre
					lettre = lettre.replace(/[éèêë]/gi, 'e');
					lettre = lettre.replace(/[àâä]/gi, 'a');
					lettre = lettre.replace(/[ùûü]/gi, 'u');
					lettre = lettre.replace(/[îï]/gi, 'i');
					lettre = lettre.replace(/[ôö]/gi, 'o');
					lettre = lettre.replace(/[ç]/gi, 'c');

					if(lettre === mot){
						collector.stop('Reussite');
					} else {
						if(nbEssais === 0){
							collector.stop('Echec');
						} else {
							await interaction.editReply(content="Le mot à trouver est : `" + motCache + "`\nIl vous reste " + nbEssais + " essais.\nLettres déjà proposées : " + lettres.join(', '));
						}
					}
				}
				if(nbEssais === 0){
					collector.stop('Echec');
				}

				collected.delete();
			});
			collector.on('end', async (collected, reason) => {
				if(reason === 'Reussite'){
					await interaction.editReply(content="Le mot à trouver était : `" + mot + "`\nLettres proposées : " + lettres.join(', ') + "\n:tada: Vous avez gagné ! :tada:");
				}
				else if(reason === 'Echec' || reason === 'time'){
					await interaction.editReply(content="Le mot à trouver était : `" + mot + "`\nVous avez perdu !");
				}
			});
			
		}
	},
};