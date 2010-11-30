S4 = ->
   (((1+Math.random())*0x10000)|0).toString(16).substring(1)

exports.generate = ->
  S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()

# exports.GUID = {}
# exports.GUID.generate = ->
  # return 