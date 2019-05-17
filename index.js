const Discord = require('discord.js')
const config = require('./config')

const client = new Discord.Client()

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	if (msg.author === client.user) return
	if (!msg.content.startsWith(config.prefix)) return

	const msgs = msg.content.replace(config.prefix, '').split(' ')
	const commands = new Map()

	commands.set('ping', () => {
		msg.channel.send('pong!')
	})

	commands.has(msgs[0].toLowerCase()) && commands.get(msgs[0].toLowerCase())()
})

client.login(config.token)
