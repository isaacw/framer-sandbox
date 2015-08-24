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
		backgroundColor: "rgba(255,255,255,0.8)"
		borderRadius: 4
		width: 400
		height: 160
		x: 10
		y: 170 * i
		name: "button#{i}"
	layer.centerX()
	layer.on Events.Click, (event, layer) ->
		console.log event, layer
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
bottomSheet.draggable.momentum = false
bottomSheet.draggable.constraints =
	x: 0
	y: Screen.height - bottomSheet.height
	width: Screen.width
	height: bottomSheet.height


# Events & handlers
# windowHandler = (event, layer) ->
# 	console.log event, layer
# window.addEventListener Events.TouchStart, windowHandler, false
# window.addEventListener Events.TouchStart, windowHandler, true
# Events.wrap(window).on Events.TouchStart, windowHandler, true

overlay.on Events.Click, (event, layer) ->
# 	console.log event
	hideOffers()

overlayEndHandler = ->
	overlay.visible = false
	
windowHandler = ->
	Events.wrap(document).off Events.TouchEnd, windowHandler
	if overlay.isAnimating
		overlay.on Events.AnimationEnd, overlayEndHandler
	else
		overlay.visible = false

bottomSheetEndHandler = ->
	bottomSheet.draggable.enabled = true
	
bottomSheetWillMoveHandler = ->

	# Reset back to default updatePosition
	bottomSheet.draggable.updatePosition = (point) ->
		return point
# 	bottomSheet.draggable.enabled = true
	
	if bottomSheet.draggable.direction is "down"
		print bottomSheet.draggable.offset.y
		
		# Should we snap?
		if bottomSheet.draggable.offset.y > 200
			# Override updatePosition, allow bottom sheet to stay in its current position
			bottomSheet.draggable.updatePosition = () ->
				return bottomSheet.point
			hideOffers()
# 		print bottomSheet.draggable.constraints.y
	else
		if bottomSheet.draggable.offset.y <= 0
			# Override updatePosition, prevent bottom sheet from moving up
			bottomSheet.draggable.updatePosition = () ->
				return bottomSheet.point
# 			bottomSheet.draggable.enabled = false
# 			bottomSheet.maxY = Screen.height
			
bottomSheet.draggable.on Events.DragWillMove, bottomSheetWillMoveHandler

bottomSheet.on Events.Click, (event, layer) ->
	# 	Leave empty to simply intercept the click


showOffers = ->
	overlay.visible = true
	overlay.animate
		properties:
			opacity: 1
		time: 0.95
		delay: 0.1
	overlay.off Events.AnimationEnd, overlayEndHandler
	bottomSheet.animate
		properties:
			maxY: Screen.height
	bottomSheet.on Events.AnimationEnd, bottomSheetEndHandler

hideOffers = ->
	overlay.animate
		properties:
			opacity: 0
		time: 0.95
		delay: 0.1
# 	overlay.on Events.AnimationEnd, overlayEndHandler
	bottomSheet.animate
		properties:
			y: Screen.height
	bottomSheet.off Events.AnimationEnd, bottomSheetEndHandler
	bottomSheet.draggable.enabled = false
	Events.wrap(document).on Events.TouchEnd, windowHandler

# showOffers()
