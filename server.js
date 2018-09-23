#!/usr/bin/env node
let express = require('express')
let join = require('path').join
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let cors = require('cors')
const PORT = process.env.PORT || 8000
const docker = require('./dockerapi')

app.use(cors())
app.use(express.static('./dist'))

app.get('/*', (req, res, next) => res.sendFile(join(__dirname, 'dist/index.html')))

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
                refreshContainers()
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

function refreshCpuUsage() {
    function calculatePercentage(cpu, preCpu, system, preSystem) {
        let cpuDelta = cpu - preCpu
        let systemDelta = system - preSystem
        let usage = (cpuDelta / systemDelta) * 100
        return usage
    }
    docker.listContainers({ all: true }, (err, containers) => {
        if (containers && containers[0]) {
            let dockerContainer = docker.getContainer(containers[0].Id)
            dockerContainer.stats({ stream: false }, (err, res) => {
                if (err) {
                    console.log('error', err)
                } else if (res) {
                    let cpuStats = res.cpu_stats.cpu_usage.total_usage
                    let preCpuStats = res.precpu_stats.cpu_usage.total_usage
                    let systemCpuStats = res.cpu_stats.system_cpu_usage
                    let systemPreCpuStats = res.precpu_stats.system_cpu_usage
                    io.emit('cpu.usage', calculatePercentage(cpuStats, preCpuStats, systemCpuStats, systemPreCpuStats))
                } else {
                    io.emit('cpu.usage', 0)
                }
            })
        } else {
            io.emit('cpu.usage', 0)
        }
        /*containers.forEach((container) => {
            let dockerContainer = docker.getContainer(container.Id)
            dockerContainer.stats({ stream: false }, (err, res) => {
                cpuStats += res.cpu_stats.cpu_usage.total_usage
                preCpuStats += res.precpu_stats.cpu_usage.total_usage
                systemCpuStats += res.cpu_stats.system_cpu_usage
                systemPreCpuStats += res.precpu_stats.system_cpu_usage
            })
        })*/
    })
}

setInterval(refreshCpuUsage, 2000)
setInterval(refreshContainers, 2000)
setInterval(refreshImages, 2000)
setInterval(refreshNetworks, 2000)
