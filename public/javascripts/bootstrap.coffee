console.log("Bootstrapping")

# @player = new jsPlayer()
# @player.playSong("21879031")

socket = new io.Socket('localhost', {port: 8001, rememberTransport: false})
socket.connect()

auto_callback = null

ctx = ""
x = 10
y = 10
dx = 2
dy = 4
width = 1
height = 1

otherPlayers = []
myId = -1

socket.on('connect', (-> console.log "connect"))
socket.on('message', (data) -> 
  data = JSON.parse(data)
  if data.id?
    #my id
    myId = data.id

  if data.players?
    otherPlayers = []
    for player in data.players
      if player.id isnt myId
        p = new Player player.id
        p.x = player.x
        p.y = player.y
        otherPlayers.push p
  else 
    console.log data
)



socket.on('disconnect', (-> console.log "disconnect"))

$(document).ready(->
  socket.send "test"
)

#Just some messing with drawing in canvas

draw = ->
  clear()
  #me
  rectangle(x, y, 10, 10)
  for player in otherPlayers
    rectangle(player.x, player.y, 10, 10)
  if rightDown
    x += 3
  if leftDown
    x -= 3
  if upDown
    y -= 3
  if downDown
    y += 3
  
init = ->
  ctx = $('#canvas')[0].getContext("2d")
  width = $("#canvas").width()
  height = $("#canvas").height()
  setInterval(draw, 10)
  setInterval(updateServer, 100)
  
updateServer = ->
  message = {}
  message.coords = {}
  message.coords.x = x
  message.coords.y = y
  socket.send(message)
#drawing
  
circle = (x, y, r) ->
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, true)
  ctx.closePath()
  ctx.fill()
  
rectangle = (x, y, w, h) ->
  ctx.beginPath()
  ctx.rect(x,y,w,h)
  ctx.closePath()
  ctx.fill()

clear = ->
  ctx.clearRect(0, 0, width, height)
  
#keyboard

rightDown = false
leftDown = false
upDown = false
downDown = false
onKeyDown = (evt) ->
  if evt.keyCode is 39
    rightDown = true
  else if evt.keyCode is 37
    leftDown = true
  else if evt.keyCode is 38
    upDown = true
  else if evt.keyCode is 40
    downDown = true

onKeyUp = (evt) ->
  if evt.keyCode is 39
    rightDown = false
  else if evt.keyCode is 37
    leftDown = false
  else if evt.keyCode is 38
    upDown = false
  else if evt.keyCode is 40
    downDown = false

$(document).keydown(onKeyDown)
$(document).keyup(onKeyUp)
init()


class Player
  id = -1
  x = 0
  y = 0
  constructor: (id) ->
    @id = id
    @x = 0
    @y = 0
