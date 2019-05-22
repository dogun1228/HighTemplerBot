const Discord = require('discord.js')
const config = require('./config')
const commands = require('./command')

const client = new Discord.Client()

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
	client.user
		.setActivity(`${config.prefix} to Biscuit No.1`, { type: 'STREAMING' })
		.then(console.log)
		.catch(console.error)
})

client.on('message', msg => {
	if (msg.author === client.user) return

	if (msg.content === '안녕하살법!') {
		const embed = new Discord.RichEmbed()
			.setTitle('안녕하살법! 받아치기!')
			.setColor(0xff007f)
			.setImage(
				'https://user-images.githubusercontent.com/10864343/57971060-29011b00-79c4-11e9-8a43-781119d4ae44.png'
			)
		msg.channel.send(embed)
		return
	}
	if (msg.content === '상상도 못한 정체') {
		const embed = new Discord.RichEmbed()
			.setTitle('ㄴㅇㄱ')
			.setColor(0xff007f)
			.setImage(
				'https://user-images.githubusercontent.com/10864343/58185286-c1add880-7ced-11e9-8c3e-b936578ace42.png'
			)
		msg.channel.send(embed)
		return
	}

	if (!msg.content.startsWith(config.prefix)) return

	const command = msg.content
		.replace(config.prefix, '')
		.split(' ')[0]
		.toLowerCase()

	commands.has(command) && commands.get(command)(msg)
})

client.login(config.token)
