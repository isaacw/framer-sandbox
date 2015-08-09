# Animation Chain
# by Isaac Weinhausen
# http://isaacw.com




# Classes
# -------------------------------------

# AnimationChain
# Manages a sequence of Animations
class AnimationChain extends Framer.EventEmitter
	
	constructor: (o) ->
		@_animationsArray = []
		@add(animation) for k, animation of o.animations
		@repeat = o.repeat ? false
		@_currentAnimation = @_animationsArray[0]
		@_chain()
	
	_chain: =>
		_.each @_animationsArray, (animation, i) =>
			animation.on Events.AnimationEnd, @_animationEndHandler
			
	_animationEndHandler: =>
		if @_isEndofChain() and @repeat is false
			# End animation chain
			@emit Events.AnimationEnd
		else
			# Restart animation chain
			@_next().start()
		@_currentAnimation = @_next()

	
	add: (animation) =>
		# Ensure the animation is stopped (needed for when passed via the layer.animate method)
		animation.stop()
		# Have the animation track it's own position in the chain
		animation.index = @_animationsArray.length
		# Add it to the array	
		@_animationsArray.push animation
		
	_isEndofChain: (animation = @_currentAnimation) =>
		animation.index is @_animationsArray.length - 1
		
	_next: (animation = @_currentAnimation) =>
		@_animationsArray[animation.index + 1] ? @_animationsArray[0]
	
	start: => 
		@_currentAnimation.start()
		@emit Events.AnimationStart
		
	stop: =>
		@_currentAnimation.stop()
		@emit Events.AnimationStop
		

# AnimationChainLink
class AnimationChainLink




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
	flipAnimation.on Events.AnimationEnd, ->
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
# chain2.start()

