io = require 'socket.io'
express = require 'express'
connect = require 'connect'
sys = require 'sys'
http = require 'http'
jsdom = require 'jsdom'

app = module.exports =  express.createServer()

app.register '.coffee', require('coffeekup')
app.set 'view engine', 'coffee'

app.configure ->
  app.set 'views', __dirname + '/views'
  app.use(connect.bodyDecoder())
  app.use(connect.methodOverride())
  app.use(connect.compiler({ src: __dirname + '/public', enable: ['less', 'coffeescript'] }))
  app.use(app.router)
  app.use(connect.staticProvider(__dirname + '/public'))
  
app.configure 'development', ->
  app.use(connect.errorHandler({ dumpExceptions: true, showStack: true}))

app.configure 'production', ->
  app.use connect.errorHandler()

app.get '/', (req, res) ->
  res.render 'layout', {
      context: {
          title: 'layout'
      }
  }
  
app.listen(8001) if !module.parent


players = []

socket = io.listen(app)
socket.on('connection', (client) ->
  player = new Player client.sessionId
  players.push(player)
  sys.puts("new socket connection")
  client.player = player
  message = {}
  message.id = client.sessionId
  client.send JSON.stringify(message)
  client.on('message', (data) ->
    if data.coords?
      client.player.x = data.coords.x
      client.player.y = data.coords.y
    else
      sys.puts sys.inspect data
  )
)

init = ->
  setInterval(updatePlayers, 100)

updatePlayers = ->
  message = {}
  message.players = []
  for a, b of socket.clients
    if b.player?
      message.players.push b.player
  socket.broadcast JSON.stringify(message)

class Player
  id = -1
  x = 0
  y = 0
  constructor: (id) ->
    @id = id
    @x = 0
    @y = 0
    sys.puts "new client with id " + @id

    
init()