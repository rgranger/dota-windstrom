const http = require('http')
const polka = require('polka')
const { join } = require('path')
const serveStatic = require('serve-static')
const { json } = require('body-parser')

const { PORT = 80 } = process.env
const buildDir = join(__dirname, 'build')
const serve = serveStatic(buildDir)

polka()
	.use(serve)
	.use(json())
	.post('/api/send-email', (req, res) => {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		let json = JSON.stringify(req.body);
		res.end(json);
	})
	.listen(PORT, (err) => {
		if (err) throw err
		console.log(`> Running on localhost:${PORT}`)
	})

// Prevents heroku from "sleeping"
setInterval(() => {
	http.get('http://dota-windstrom.herokuapp.com/')
}, 1800000) // Every 30 minutes
