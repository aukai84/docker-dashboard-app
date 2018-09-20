let express = require('express')
let path = require('path')
let app = express()
let server = require('http').Server(app)
const PORT = process.env.PORT || 8000
let io = require('socket.io')(server)

app.use(express.static('dist'))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

server.listen(PORT, () => {
    console.log('Docker Dashboard Server running on port ', PORT)
})
