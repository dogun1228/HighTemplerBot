const Discord = require('discord.js')
const config = require('./config')
const request = require('request-promise-native')

const commands = new Map()

commands.set('ping', msg => {
	msg.channel.send('pong!')
})

commands.set('avatar', msg => {
	msg.channel.send(
		new Discord.RichEmbed()
			.setTitle(`${msg.author.username}'s avatar is...`)
			.setImage(msg.author.avatarURL)
			.setColor(0xff007f)
	)
})

commands.set('한강수온', async function(msg) {
	const temp = await request('http://hangang.dkserver.wo.tc/')
	msg.channel.send(
		new Discord.RichEmbed()
			.setTitle('한강 물 온도는...!')
			.setDescription(`${JSON.parse(temp).temp}도!`)
			.setColor(0x1e22f8)
	)
})

commands.set('색깔', msg => {
	const colorcode = msg.content
		.replace(config.prefix, '')
		.split(' ')
		.slice(1)
		.join('')

	const colors = [colorcode.slice(0, 2), colorcode.slice(2, 4), colorcode.slice(4, 6)].map(color =>
		Number('0x' + color)
	)

	msg.channel.send(new Discord.RichEmbed().setTitle('<<당신이 고른 색!').setColor(colors))
})

commands.set('dice', msg => {
	const dice = msg.content
		.replace(config.prefix, '')
		.split(' ')
		.slice(1)
		.shift()

	msg.channel.send(dice)
})

module.exports = commands
