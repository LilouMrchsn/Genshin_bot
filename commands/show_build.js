// at the top of your file
require("dotenv").config();
const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { inspect } = require("util")
const { CommunityBuilds } = require("communitybuilds-node");
const { elements } = require("genshin-db");
const { link } = require("fs");
var urlExists = require('url-exists');


// you must init the package with a google-console apikey
CommunityBuilds.init(process.env.APIkey)

// inside a command, event listener, etc.
function buildEmbed(charName, build, nbbuild, nbmaxbuilds) {
    let mainstats = "<:sablier:1064176937825738773> Sablier : " + build.artifactsMainStats.sands + "\n" +
                    "<:coupe:1064176695336255588> coupe : " + build.artifactsMainStats.goblet + "\n" +
                    "<:couronne:1064176697483735171>  couronne : " + build.artifactsMainStats.circlet
                    
    
    let image = "https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_" + charName.charAt(0).toUpperCase() + charName.slice(1).replace(/\s+/g, '') + ".png"


    let embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(build.role + " build")
	.setAuthor({ name: charName, iconURL: 'https://media.discordapp.net/attachments/1023249831365455954/1050507080425029713/Baron_bunnny_hey.png?width=671&height=671'})
	.setThumbnail(image)
	.addFields(
		{ name: '<:arme:1064244331743035412> Recommanded weapons', value: "✦ " + build.equipment.join("\n✦ "), inline: true },
		{ name: '<:artefact:1064176694027624559> Recommanded sets', value: "✦ " + build.artifacts.join("\n✦ "), inline: true },
		{ name: '<:artefact:1064176694027624559> Artifacts substats', value: build.artifactsSubStats.join(" > "),inline: true },
		{ name: '<:artefact:1064176694027624559> Artifacts mainstats', value: mainstats, inline: true },
		{ name: 'Talent priorities', value: build.artifactsSubStats.join(" > "), inline: true },
	)
	.setTimestamp()
	.setFooter({ text: "build " + nbbuild + "/" + nbmaxbuilds});
    
    if(build.ability_tips !== undefined) {
        embed.setDescription(build.ability_tips)
    }
    return embed;
}

function buildRow(nbbuild, nbmaxbuilds, link) {
    let row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('previous')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(nbbuild === 1)
            .setEmoji('⬅️'),
        new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(nbbuild === nbmaxbuilds)
            .setEmoji('➡️'),
    );
    if(link !== undefined){
        row.addComponents(
            new ButtonBuilder()
            .setLabel('More informations')
            .setStyle(ButtonStyle.Link)
            .setURL(link.replace(/\s+/g, ''))
        )
    }
    return row;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('builds')
		.setDescription('Provides information on build for a character.')
        .addStringOption(option =>
            option.setName('character')
            .setDescription('The character you want to get the build for.')
            .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        async function getAllBuilds(){
            return Promise.all([await CommunityBuilds.cryo(), await CommunityBuilds.pyro(), await CommunityBuilds.hydro(), await CommunityBuilds.electro(), await CommunityBuilds.anemo(), await CommunityBuilds.geo(), await CommunityBuilds.dendro()]);
        }

        let elements = await getAllBuilds()
        let character;
        elements.forEach(element => {
            if(element.data.filter(character => character.name === interaction.options.getString('character').toLowerCase()).length > 0){
                character = element.data.filter(character => character.name === interaction.options.getString('character').toLowerCase())
            }
        });

        if(character === undefined){
            interaction.editReply(content="Personnage non trouvé", ephemeral=true)
            return;
        }

        builds = character[0].builds
        console.log(builds)
        let build_tracker = 1;
        let link = "https://keqingmains.com/" + interaction.options.getString('character').toLowerCase();
        if(urlExists(link, function(err, exists) {
            return exists; // false
          })){
            console.log(link)
            link = undefined;
        }
        let mess = await interaction.editReply({ embeds: [buildEmbed(interaction.options.getString('character'), builds[0], build_tracker, builds.length)], components: [buildRow(build_tracker, builds.length, link)] });
        const filter = i => (i.customId === 'previous' || i.customId === 'next') && i.user.id === interaction.user.id && i.message.id === mess.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });

        collector.on('collect', async i => {
            if (i.customId === 'previous') {
                build_tracker -= 1;
                await i.update({ embeds: [buildEmbed(interaction.options.getString('character'), builds[build_tracker-1], build_tracker, builds.length)], components: [buildRow(build_tracker, builds.length, link)] });
            } else if (i.customId === 'next') {
                build_tracker += 1;
                await i.update({ embeds: [buildEmbed(interaction.options.getString('character'), builds[build_tracker-1], build_tracker, builds.length)], components: [buildRow(build_tracker, builds.length, link)] });
            }
        });
	},
};