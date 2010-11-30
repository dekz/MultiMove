(function() {
  var Player, auto_callback, circle, clear, ctx, downDown, draw, dx, dy, height, init, leftDown, myId, onKeyDown, onKeyUp, otherPlayers, rectangle, rightDown, socket, upDown, updateServer, width, x, y;
  console.log("Bootstrapping");
  socket = new io.Socket('localhost', {
    port: 8001,
    rememberTransport: false
  });
  socket.connect();
  auto_callback = null;
  ctx = "";
  x = 10;
  y = 10;
  dx = 2;
  dy = 4;
  width = 1;
  height = 1;
  otherPlayers = [];
  myId = -1;
  socket.on('connect', (function() {
    return console.log("connect");
  }));
  socket.on('message', function(data) {
    var p, player, _i, _len, _ref, _results;
    data = JSON.parse(data);
    if (data.id != null) {
      myId = data.id;
    }
    if (data.players != null) {
      otherPlayers = [];
      _ref = data.players;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        _results.push(player.id !== myId ? (p = new Player(player.id), p.x = player.x, p.y = player.y, otherPlayers.push(p)) : void 0);
      }
      return _results;
    } else {
      return console.log(data);
    }
  });
  socket.on('disconnect', (function() {
    return console.log("disconnect");
  }));
  $(document).ready(function() {
    return socket.send("test");
  });
  draw = function() {
    var player, _i, _len;
    clear();
    rectangle(x, y, 10, 10);
    for (_i = 0, _len = otherPlayers.length; _i < _len; _i++) {
      player = otherPlayers[_i];
      rectangle(player.x, player.y, 10, 10);
    }
    if (rightDown) {
      x += 3;
    }
    if (leftDown) {
      x -= 3;
    }
    if (upDown) {
      y -= 3;
    }
    if (downDown) {
      return y += 3;
    }
  };
  init = function() {
    ctx = $('#canvas')[0].getContext("2d");
    width = $("#canvas").width();
    height = $("#canvas").height();
    setInterval(draw, 10);
    return setInterval(updateServer, 100);
  };
  updateServer = function() {
    var message;
    message = {};
    message.coords = {};
    message.coords.x = x;
    message.coords.y = y;
    return socket.send(message);
  };
  circle = function(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    return ctx.fill();
  };
  rectangle = function(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    return ctx.fill();
  };
  clear = function() {
    return ctx.clearRect(0, 0, width, height);
  };
  rightDown = false;
  leftDown = false;
  upDown = false;
  downDown = false;
  onKeyDown = function(evt) {
    if (evt.keyCode === 39) {
      return rightDown = true;
    } else if (evt.keyCode === 37) {
      return leftDown = true;
    } else if (evt.keyCode === 38) {
      return upDown = true;
    } else if (evt.keyCode === 40) {
      return downDown = true;
    }
  };
  onKeyUp = function(evt) {
    if (evt.keyCode === 39) {
      return rightDown = false;
    } else if (evt.keyCode === 37) {
      return leftDown = false;
    } else if (evt.keyCode === 38) {
      return upDown = false;
    } else if (evt.keyCode === 40) {
      return downDown = false;
    }
  };
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);
  init();
  Player = function() {
    var id;
    function Player(id) {
      this.id = id;
      this.x = 0;
      this.y = 0;
    }
    id = -1;
    x = 0;
    y = 0;
    return Player;
  }();
}).call(this);
