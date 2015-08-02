# Welcome to Framer

# Learn how to prototype: http://framerjs.com/learn
# Drop an image on the device, or import a design from Sketch or Photoshop

# Classes

class AnimationChain extends Framer.EventEmitter
	
	constructor: (o) ->
		@_animations = []
		@repeat = false
		for k, a of o.animations
			# Ensure the animation is stopped (needed for when passed via the layer.animate method)
			a.stop()
			@_animations.push a
		@repeat = if o.repeat? then o.repeat
		@_currentAnimation = @_animations[0]
		@_chain()
	
	_chain: ->
		# For each animation
		_.map @_animations, (a, i) =>
		
			# Find the next (or first) animation in the array
			nextAnimation = if i+1 == @_animations.length then @_animations[0] else @_animations[i+1]
			
			# Chain the current animtation to the next animation
			a.on Events.AnimationEnd, =>
				if nextAnimation is @_animations[0] and @repeat is false
					@emit Events.AnimationEnd
				else
					nextAnimation.start()
				@_currentAnimation = nextAnimation
				
	start: -> 
		@_currentAnimation.start()
		@emit Events.AnimationStart
	stop: ->
		@_currentAnimation.stop()
		@emit Events.AnimationStop





# App

square = new Layer
	width: 250, height: 250
	backgroundColor: "#fff", borderRadius: 25
square.centerX()

circle = new Layer
	width: 200, height: 200, y: 25
	backgroundColor: "#369", borderRadius: 100
circle.centerX()



fadeOut = new Animation
	layer: square
	properties:
		opacity: 0.2
	time: 0.5

fadeIn = new Animation
	layer: square
	properties: 
		opacity: 1
	time: 0.5

moveSquare = new Animation
	layer: square
	properties: 
		y: -> 
			if square.y > Screen.height
				0
			else
				square.y + 200
	time: 0.5

moveCircle = new Animation
	layer: circle
	properties: 
		y: -> 
			if circle.y > Screen.height
				25
			else
				circle.y + 200
	time: 0.25
	curve: "spring(160,10,0)"



magicAnimation = new AnimationChain
	animations:
		a: fadeOut
		b: fadeIn
		c: moveSquare
		d: moveCircle
	repeat: true



magicAnimation.start()



# On a click, go to the next state
# iconLayer.on Events.Click, ->
# 	iconLayer.states.next()