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

app.use(express.static(join(__dirname, 'dist')))

app.get('/*', (req, res, next) => {
    res.sendFile(join(__dirname, 'dist/index.html'))
})

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
    /*socket.on('cpu.usage', () => {
        refreshCpuUsage()
    })*/
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

function calculatePercentage({ cpuStats, preCpuStats, systemCpuStats, systemPreCpuStats }) {
    let cpuDelta = cpuStats - preCpuStats
    let systemDelta = systemCpuStats - systemPreCpuStats
    let usage = (cpuDelta / systemDelta) * 100
    return usage
}

async function refreshContainerUsage() {
    let containers = await docker.listContainers({ all: true })
    if (containers) {
        let containersUsage = await containers.reduce(async (agg, container) => {
            let dockerContainer = docker.getContainer(container.Id)
            let res = await dockerContainer.stats({ stream: false })
            if (res) {
                let cpuStats = res.cpu_stats.cpu_usage.total_usage
                let preCpuStats = res.precpu_stats.cpu_usage.total_usage
                let systemCpuStats = res.cpu_stats.system_cpu_usage
                let systemPreCpuStats = res.precpu_stats.system_cpu_usage
                const resolvedAgg = await agg
                if (!resolvedAgg.totalUsage) {
                    resolvedAgg.totalUsage = 0
                }
                resolvedAgg.totalUsage += calculatePercentage({
                    cpuStats,
                    preCpuStats,
                    systemCpuStats,
                    systemPreCpuStats,
                })

                if (!resolvedAgg[container.Names[0].substr(1)]) {
                    resolvedAgg[container.Names[0].substr(1)] = calculatePercentage({
                        cpuStats,
                        preCpuStats,
                        systemCpuStats,
                        systemPreCpuStats,
                    })
                }
                return resolvedAgg
            }
        }, {})
        io.emit('container.usage', containersUsage)
    }
}

/*function refreshCpuUsage() {
    docker.listContainers({ all: true }, (err, containers) => {
        if (containers) {
            let totalUsage = containers.reduce(
                (prev, current) => {
                    let dockerContainer = docker.getContainer(current.Id)
                    dockerContainer.stats({ stream: false }, (err, res) => {
                        if (err) {
                            console.log(err)
                        } else if (res) {
                            prev.cpuStats += res.cpu_stats.cpu_usage.total_usage
                            prev.preCpuStats += res.precpu_stats.cpu_usage.total_usage
                            prev.systemCpuStats += res.cpu_stats.system_cpu_usage
                            prev.systemPreCpuStats += res.precpu_stats.system_cpu_usage
                            console.log('prev', prev)
                        } else {
                            return prev
                        }
                    })
                    return prev
                },
                {
                    cpuStats: 0,
                    preCpuStats: 0,
                    systemCpuStats: 0,
                    systemPreCpuStats: 0,
                },
            )
            io.emit('cpu.usage', calculatePercentage(totalUsage))
        }
    })
}*/
//setInterval(refreshCpuUsage, 2000)
setInterval(refreshContainerUsage, 2500)
setInterval(refreshContainers, 2000)
setInterval(refreshImages, 2000)
setInterval(refreshNetworks, 2000)
