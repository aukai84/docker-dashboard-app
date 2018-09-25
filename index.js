#!/usr/bin/env node
let express = require('express')
let open = require('open')
let join = require('path').join
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let cors = require('cors')
const PORT = process.env.PORT || 8000
const docker = require('./dockerapi')

app.use(cors())
app.use(express.static('./dist'))

app.get('/*', (req, res, next) => res.sendFile('./dist/index.html'))

server.listen(PORT, () => {
    console.log('Docker Dashboard Server running on port ', PORT)
    open('http://localhost:8000')
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
    socket.on('container.usage', () => {
        refreshContainerUsage()
    })
    socket.on('container.start', (args) => {
        const container = docker.getContainer(args.id)
        if (container) {
            container.start((err, data) => refreshContainers())
        }
    })
    socket.on('container.stop', (args) => {
        const container = docker.getContainer(args.id)
        if (container) {
            container.stop((err, data) => refreshContainers())
        }
    })
    socket.on('container.restart', (args) => {
        const container = docker.getContainer(args.id)
        if (container) {
            container.restart((err, data) => refreshContainers())
        }
    })
    socket.on('container.remove', (args) => {
        const container = docker.getContainer(args.id)
        if (container) {
            container.stop((err, data) => {
                container.remove((err, data) => refreshContainers())
            })
        }
    })
})

function refreshContainers() {
    docker.listContainers({ all: true }, (err, containers) => {
        io.emit('containers.list', containers)
    })
}
function refreshImages() {
    docker.listImages({ all: false }, (err, images) => {
        io.emit('images.list', images)
    })
}
function refreshNetworks() {
    docker.listNetworks({ all: true }, (err, networks) => {
        io.emit('networks.list', networks)
    })
}

function calculatePercentage(cpu, preCpu, system, preSystem) {
    let cpuDelta = cpu - preCpu
    let systemDelta = system - preSystem
    let usage = (cpuDelta / systemDelta) * 100
    return usage
}

function refreshContainerUsage() {
    docker.listContainers({ all: true }, (err, containers) => {
        if (containers) {
            containers.forEach((container) => {
                if (container) {
                    let dockerContainer = docker.getContainer(container.Id)
                    dockerContainer.stats({ stream: false }, (err, res) => {
                        if (err) {
                            console.log(err)
                        } else if (res) {
                            let cpuStats = res.cpu_stats.cpu_usage.total_usage
                            let preCpuStats = res.precpu_stats.cpu_usage.total_usage
                            let systemCpuStats = res.cpu_stats.system_cpu_usage
                            let systemPreCpuStats = res.precpu_stats.system_cpu_usage
                            io.emit('container.usage', {
                                id: container.Id,
                                usage: calculatePercentage(cpuStats, preCpuStats, systemCpuStats, systemPreCpuStats),
                            })
                        } else {
                            io.emit('container.usage', { id: '', usage: 0 })
                        }
                    })
                } else {
                    io.emit('container.usage', { id: '', usage: 0 })
                }
            })
        } else {
            io.emit('container.usage', { id: '', usage: 0 })
        }
    })
}

function refreshCpuUsage() {
    docker.listContainers({ all: true }, (err, containers) => {
        if (containers) {
            let totalUsage = containers.reduce((prev, current) => {})
        }
    })
}
setInterval(refreshCpuUsage, 2000)
setInterval(refreshContainerUsage, 500)
setInterval(refreshContainers, 2000)
setInterval(refreshImages, 2000)
setInterval(refreshNetworks, 2000)
