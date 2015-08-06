# Animation Chain
# by Isaac Weinhausen
# http://isaacw.com




# Classes
# -------------------------------------

class AnimationChain extends Framer.EventEmitter
	
	constructor: (o) ->
		@_animations = []
		for k, a of o.animations
			# Ensure the animation is stopped (needed for when passed via the layer.animate method)
			a.stop()
			@_animations.push a
		@repeat = o.repeat ? false
		@_currentAnimation = @_animations[0]
		@_chain()
	
	_chain: =>
		# For each animation
		_.map @_animations, (a, i) =>
		
			# Find the next (or first) animation in the array
			nextAnimation = if i+1 < @_animations.length then @_animations[i+1] else @_animations[0]
			
			# Chain the current animtation to the next animation
			a.on Events.AnimationEnd, =>
				if nextAnimation is @_animations[0] and @repeat is false
					@emit Events.AnimationEnd
				else
					nextAnimation.start()
				@_currentAnimation = nextAnimation
				
	start: => 
		@_currentAnimation.start()
		@emit Events.AnimationStart
	stop: =>
		@_currentAnimation.stop()
		@emit Events.AnimationStop




# App
# -------------------------------------


# Set canvas props

bg = new BackgroundLayer 
	backgroundColor: "#292929"


# Render colored squares

colors = 
	"purple" : "#877DD7"
	"blue" : "#28affa"
	"teal" : "#2DD7AA"
	"green" : "#7DDD11"

do ->
	i = 0
	for key, value of colors
		@[key] = new Layer
			width: 50, height: 50
			x: 50*i
			backgroundColor: value
		i++


# Animation functions

moveDown = (layer) ->
	new Animation
		layer: layer
		properties: 
			y: -> 
				if layer.y > Screen.height
					0
				else
					layer.y + 100
		time: 0.5

flip = (layer) ->
	flipAnimation = new Animation
		layer: layer
		properties: 
			rotationZ: 360
		time: 0.5
	flipAnimation.on Events.AnimationStop, ->
		layer.rotationZ = 0


# Animation Chains

this.chain1 = new AnimationChain
	animations:
		a: moveDown(purple)
		b: flip(purple)
		c: moveDown(blue)
		d: flip(blue)
	repeat: true

this.chain2 = new AnimationChain
	animations:
		a: moveDown(teal)
		b: flip(teal)
		c: moveDown(green)
		d: flip(green)
	repeat: true




# Execute
# -------------------------------------

chain1.start()
chain2.start()

