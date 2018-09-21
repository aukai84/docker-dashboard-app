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
    socket.on('cpu.usage', () => {
        refreshCpuUsage()
    })
})

function refreshContainers() {
    docker.listContainers({ all: true }, (err, containers) => {
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

function refreshCpuUsage() {
    docker.listContainers({ all: true }, (err, containers) => {
        let cpuStats = 0
        let preCpuStats = 0
        let systemCpuStats = 0
        let systemPreCpuStats = 0
        let dockerContainer = docker.getContainer(containers[0].Id)
        dockerContainer.stats((err, stream) => {
            stream.on('data', (data) => {
                console.log('data', data)
            })
            stream.on('end', () => {
                console.log('end stream')
            })
        })
        /*containers.forEach((container) => {
            let dockerContainer = docker.getContainer(container.Id)
            dockerContainer.stats((err, res) => {
                cpuStats += res.cpu_stats.cpu_usage.total_usage
                preCpuStats += res.precpu_stats.cpu_usage.total_usage
                systemCpuStats += res.cpu_stats.system_cpu_usage
                systemPreCpuStats += res.precpu_stats.system_cpu_usage
            })
        })*/
    })
}

/*setInterval(refreshContainers, 2000)
setInterval(refreshImages, 2000)
setInterval(refreshNetworks, 2000)*/
