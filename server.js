let express = require('express')
let path = require('path')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let cors = require('cors')
const PORT = process.env.PORT || 8000

let docker = require('./dockerapi')

app.use(cors())
app.use(express.static('dist'))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

server.listen(PORT, () => {
    console.log('Docker Dashboard Server running on port ', PORT)
})

io.on('connection', (socket) => {
    socket.on('containers.list', () => {
        refreshContainers()
    })
})

function refreshContainers() {
    docker.listContainers({ all: true }, (err, containers) => {
        console.log('containers', containers)
        io.emit('containers.list', containers)
    })
}
