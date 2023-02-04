const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const materials = {
    "livres" : {
        "Gorge de l'oubli" : {
            produits : {
                "liberté" : {
                    jour : [1, 4],
                    utilise : ["Barbara", "Amber", "Klee", "Tartaglia", "Diona", "Sucrose", "Aloy", "Voyageur"]
                },
                "résistance" : {
                    jour : [2, 5],
                    utilise : ["Jean", "Diluc", "Razor", "Bennett", "Noëlle", "Mona", "Eula"]
                },
                "poésie" : {
                    jour : [3, 6],
                    utilise : ["Lisa", "Kaeya", "Venti", "Fischl", "Albedo", "Rosaria"]
                },
            },
            localisation : "Mondstadt"
        },
        "Manoir Taishan" : {
            produits : {
                "prospérité" : {
                    jour : [1, 4],
                    utilise : ["Voyageur", "Xiao", "Ningguang", "Qiqi", "Keqing", "Yelan", "Shenhe"]
                },
                "diligence" : {
                    jour : [2, 5],
                    utilise : ["Xiangling", "Chonghyun", "Ganyu", "Hu Tao", "Kazuha", "Yun Jin", "Yaoyao"]
                },
                "or" : {
                    jour : [3, 6],
                    utilise : ["Beidou", "Xingqiu", "Zhongli", "Xinyan", "Yanfei"]
                },
            },
            localisation : "Liyue"
        },
        "Cour violette" : {
            produits : {
                "éphémère" : {
                    jour : [1, 4],
                    utilise : ["voyageur", "Yoimiya", "Thoma", "Kokomi", "Heizou"]
                },
                "élégance" : {
                    jour : [2, 5],
                    utilise : ["voyageur", "Ayaka", "Sara", "Itto", "Kuki", "Ayato"]
                },
                "lumière" : {
                    jour : [3, 6],
                    utilise : ["voyageur", "Raiden Shogun", "Sayu", "Gorou", "Yae Miko"]
                },
            },
            localisation : "Inazuma"
        },
        "Tour de l'ignorance" : {
            produits : {
                "admonestation" : {
                    jour : [1, 4],
                    utilise : ["Voyageur", "Tighnari", "Cyno", "Candace", "Faruzan"]
                },
                "ingénuité" : {
                    jour : [2, 5],
                    utilise : ["voyageur", "Dori", "Nahida", "Layla", "Alhaitham"]
                },
                "usage" : {
                    jour : [3, 6],
                    utilise : ["voyageur", "Collei", "Nilou", "Wanderer"]
                },
            },
            localisation : "Sumeru"
        },
    },
    "armes" : {
        "Pépinière des cécilias" : {
            produits : {
                "Décabarian" : {
                    jour : [1, 4],
                    utilise : ["Épée en argent", "Lame froide", "Épée de Favonius", "Épée longue royale", "Éclair des impasses", "Fuseau de cinabre", "Épée du faucon", "Ombre ferreuse", "Épée-horloge", "Tombe-neige en argétoile", "Ode au chant du vent", "Notes de l'apprentiGrimoire de poche", "Guide de magie", "Code de Favonius", "Grimoire royal", "Arc du corbeau", "Dernière corde", "Arc de chasse verdoyant", "Valse nocturne"]
                },
                "Loup boréal" : {
                    jour : [2, 5],
                    utilise : ["Messager de l'Aube", "Flûte", "Épée noire", "Épée de la descente", "Lame de la Voûte d'Azur", "Épée d'entraînement", "Lame du mercenaire", "Épée sanglante", "Espadon rituel", "Fierté de la Voûte d'Azur", "Scion de la victoire", "Lance Dosdragon", "Lance du vent saisonnier", "Histoire des chasseurs de dragon", "Mouvement vagabond", "Vins et chants", "Contes de Dodoco", "Atlas de la Voûte d'Azur", "Arc de chasse", "Arc de chasse aguerri", "Serment de l'archer", "Arc rituel", "Ailes de la Voûte d'Azur", "Ultime soupir"]
                },
                "Chevalier du Croc de Lion" : {
                    jour : [3, 6],
                    utilise : ["Épée du voyageur", "Épée rituelle", "Croc suppurant", "Serment de la liberté", "Grande épée en fer blanc", "Espadon de Favonius", "Espadon royal", "Mort-du-loup", "Lance de Favonius", "Berge de la Voûte d'Azur", "Conte d'un autre monde", "Mémoires de rituels", "Fruit du permafrost", "L'origine des Quatre Vents", "Arc courbé", "Arc de chasse de Favonius", "Arc royal", "Traqueur des impasses", "Ode aux alizées", "Arc d'Amos"]
                },
            },
            localisation : "Mondstadt"
        },
        "Palais secret de Lianshan" : {
            produits : {
                "Guyun" : {
                    jour : [1, 4],
                    utilise : ["Épée en fer noir", "Rugissement du Lion", "Épée longue de Rochenoire", "Tranche-sommets", "Grande épée en quartz", "Ombre immaculée", "Épée antique des Millelithes", "Pampille blanche", "Pique du croissant de lune", "Lance de jade ailée", "Orbe jadien", "Perle solaire", "Agate de Rochenoire", "Lance-pierres", "Arc rouillé", "Arc de guerre de Rochenoire", "Simulacre d'eau"]
                },
                "karstique" : {
                    jour : [2, 5],
                    utilise : ["Messager de l'Aube", "Flûte", "Épée noire", "Épée de la descente", "Lame de la Voûte d'Azur", "Épée d'entraînement", "Lame du mercenaire", "Épée sanglante", "Espadon rituel", "Fierté de la Voûte d'Azur", "Scion de la victoire", "Lance Dosdragon", "Lance du vent saisonnier", "Histoire des chasseurs de dragon", "Mouvement vagabond", "Vins et chants", "Contes de Dodoco", "Atlas de la Voûte d'Azur", "Arc de chasse", "Arc de chasse aguerri", "Serment de l'archer", "Arc rituel", "Ailes de la Voûte d'Azur", "Ultime soupir"]
                },
                "aérosidérite noire" : {
                    jour : [3, 6],
                    utilise : ["Couteau à filets", "Tailleur de pierre (prototype)", "Coupeur de jade primordial", "Épée de la raison", "Fluorescence", "Trancheuse de Rochenoire", "Lame brute", "Hallebarde", "Fléau du dragon", "Lance de Rochenoire", "Lance de chasse royale", "Étouffeur de calamités", "Néphrite jumelle", "Malice (prototype)", "Œil de la perception", "MessagerLune paisible (prototype)"]
                },
            },
            localisation : "Liyue"
        },
        "Cour des sables mouvants" : {
            produits : {
                "branche marine" : {
                    jour : [1, 4],
                    utilise : ["Lame kageuchi d'Amenoma", "Reflet de tranche-brume", "Akuoumaru", "Anneau des Hakushin", "Œil d'assermentation", "Lueur de la lune éternelle"]
                },
                "Narukami" : {
                    jour : [2, 5],
                    utilise : ["Pluie florale", "Lune ondulante de Futsu", "Espadon de Nagamasa", "Brise-pierre de corne rouge", "Arc d'exorcisme", "Predator", "Lune de Mouun", "Pulsation du tonnerre"]
                },
                "masque" : {
                    jour : [3, 6],
                    utilise : ["Kagotsurube Isshin", "Lance en croix de Kitain", "« La prise »", "Aileron de brise-vagues", "Lumière du faucheur", "Vérité de Kagura", "Étoile polaire"]
                },
            },
            localisation : "Inazuma"
        },
        "Tour de la fierté" : {
            produits : {
                "talisman" : {
                    jour : [1, 4],
                    utilise : ["Lame d'aubier", "Clair de lune de Xiphos", "Clé de Khaj-Nisut", "Lumière d'incision foliaire", "Apparat de la forêt"]
                },
                "Narukami" : {
                    jour : [2, 5],
                    utilise : ["Perce-lune", "Bâton des sables écarlates", "Étoile du soir errante", "Le fruit de l'accomplissement", "Mille rêves flottants"]
                },
                "masque" : {
                    jour : [3, 6],
                    utilise : ["Aigue-marine de Makhaira", "Mémoire de Tulaytullah", "Le valet du roi", "Chalutier", "La voie du chasseur"]
                },
            },
            localisation : "Sumeru"
        },
    },
} 

const emotes = { "Mondstadt" : "<:Anemo:810554224504340560>",
                "Liyue" : "<:Geo:810554364116598824>",
                "Inazuma" : "<:Electro:810554340041162782>",
                "Sumeru" : "<:Dendro:810554253374259240>",
                "Fontaine" : "<:Hydro:810554191213887528>",
                "Natlan" : "<:Pyro:810554310781566978>",
                "Snezhnaya" : "<:Cryo:810554279014039572>"
            };
const jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

// fonction qui créé un embed avec les matériaux disponibles aujourd'hui, séparé par localisation dans des champs, avec le nom du donjon ainsi que le matériaux en titre de champ, et les matériaux pour lesquels c'est utile en description de champ, et enfin le jour de la semaine où c'est disponible, en dessous du nom du donjon et retourne cet embed
function donjons_embed(materiaux, aujourd_hui){

    let embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Matériaux disponibles aujourd\'hui')
        .setTimestamp()
        .setFooter({text:'Disponible le ' + jours[aujourd_hui]});
    materiaux.forEach(element => {
        embed.addFields({name : emotes[element[3]] + " " + element[0] + " - " + element[1] + " ("+ element[3] +")", value : element[2].utilise.join(", ")});
    });
    return embed;
};


module.exports = {
	data: new SlashCommandBuilder()
		.setName('farm')
		.setDescription('Qu\'est-ce qui est disponible dans les donjons aujourd\'hui ?')
        .addStringOption(option =>
            option.setName('material')
                .setDescription('What do you want to farm ?')
                .setRequired(true)
                .addChoices(
                    { name: 'livres', value: 'livres' },
                    { name: 'armes', value: 'armes' }
                )
                .setRequired(true))
        .addStringOption(option => 
            option.setName('jour')
            .setDescription('Quel jour de la semaine ?')),
	async execute(interaction) {
        let aujourd_hui = new Date().getDay();
        if(interaction.options.getString('jour') != null){
            aujourd_hui = jours.indexOf(interaction.options.getString('jour'));
        }  

        if(aujourd_hui == 0){
            interaction.reply("Le dimanche, tous les matériaux sont disponibles dans tous les donjons");
            return;
        };

        let today_mat = [];
        for (const [key, value] of Object.entries(materials[interaction.options.getString('material')])) {
            let loc = value.localisation;
            for (const [key2, value2] of Object.entries(value.produits)) {
                if(value2.jour.includes(aujourd_hui)){
                    today_mat.push([key, key2, value2, loc]);
                };
            }
        };
        console.log(today_mat);
        await interaction.reply({ content: 'Liste des donjons pour le ' + interaction.options.getString('material'), embeds: [donjons_embed(today_mat, aujourd_hui)] });
	},
};