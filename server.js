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
    socket.on('images.list', () => {
        refreshImages()
    })
    socket.on('networks.list', () => {
        refreshNetworks()
    })
})

function refreshContainers() {
    docker.listContainers({ all: true }, (err, containers) => {
        console.log('containers', containers)
        io.emit('containers.list', containers)
    })
}
function refreshImages() {
    docker.listImages({ all: true }, (err, images) => {
        io.emit('images.list', images)
    })
}
function refreshNetworks() {
    docker.listNetworks({ all: true }, (err, networks) => {
        io.emit('networks.list', networks)
    })
}

setInterval(refreshContainers, 2000)
setInterval(refreshImages, 2000)
setInterval(refreshNetworks, 2000)
