# Scroll Component
# by Isaac Weinhausen
# http://isaacw.com

# Defaults
Framer.Defaults.Animation.time = 0.5
# Framer.Defaults.Animation.curve = "cubic-bezier(0.165, 0.84, 0.44, 1)"
Framer.Defaults.Animation.curve = "cubic-bezier(0.77, 0, 0.175, 1)"

# Set background
bg = new BackgroundLayer 
	backgroundColor: "#2DD7AA"

# Create fullscreen ScrollComponent
scroll = new ScrollComponent
	backgroundColor: ""
	scrollHorizontal: false
	width: Screen.width
	height: Screen.height

# Create 10 layers
for i in [0..6]
	layer = new Layer
		superLayer: scroll.content
		backgroundColor: "#fff"
		borderRadius: 4
		width: 400
		height: 160
		x: 10
		y: 170 * i
	layer.centerX()
	layer.on Events.Click, ->
		showOffers()

overlay = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "rgba(0,0,0,0.5)"
	opacity: 0
	name: "overlay"
	visible: false

bottomSheet = new Layer
	width: Screen.width
	height: 800
	y: Screen.height
	backgroundColor: "white"
	name: "bottomSheet"

bottomSheet.draggable.enabled = true
bottomSheet.draggable.horizontal = false
bottomSheet.draggable.constraints =
	x: 0
	y: Screen.height - bottomSheet.height
	width: Screen.width
	height: bottomSheet.height


# Events & handlers

overlay.on Events.Click, (event, layer) ->
	console.log event
	hideOffers()

overlayHandler = ->
	scroll.scroll = true
	scroll.scrollHorizontal = false
	overlay.visible = false

bottomSheet.on Events.Click, (event, layer) ->
	# 	Leave empty to simply intercept the click


showOffers = ->
	scroll.scroll = false
	overlay.visible = true
	overlay.animate
		properties:
			opacity: 1
		time: 0.95
		delay: 0.1
	overlay.off Events.AnimationEnd, overlayHandler
	bottomSheet.animate
		properties:
			maxY: Screen.height

hideOffers = ->
	overlay.animate
		properties:
			opacity: 0
		time: 0.95
		delay: 0.1
	overlay.on Events.AnimationEnd, overlayHandler
	bottomSheet.animate
		properties:
			y: Screen.height

# showOffers()
