doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "SoTiny"
    meta(name: 'description', content: @description) if @description?
    link rel: 'stylesheet', href: '/stylesheets/style.css'
    
    link href: "/jquery/css/ui-lightness/jquery-ui-1.8.6.custom.css", rel: "stylesheet"
    script src: "/jquery/js/jquery-1.4.2.min.js"
    script src: "/jquery/js/jquery-ui-1.8.6.custom.min.js"
		
    script src: '/javascripts/support/socket.io/socket.io.js'
    
    script src: '/javascripts/support/yabble/yabble.js'
    
    coffeescript (->
      require.setModuleRoot 'javascripts/'
      require.run 'bootstrap'
    )

  body ->
    canvas id: "canvas"
      
      