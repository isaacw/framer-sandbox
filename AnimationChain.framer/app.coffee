# Animation Chain
# by Isaac Weinhausen
# http://isaacw.com




# Classes
# -------------------------------------

# AnimationChain
# Manages a sequence of Animations
class AnimationChain extends Framer.EventEmitter
	
	constructor: (options = {}) ->
		@_animationsArray = []
		@_currentAnimation = null
		@add(animation) for k, animation of options.animations
		@repeat = options.repeat ? false
			
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
		# Set event handler		
		animation.on Events.AnimationEnd, @_animationEndHandler
		# Add it to the array	
		@_animationsArray.push animation
		# Set _currentAnimation if this is the first animation to get added
		if @_animationsArray.length is 1
			@_currentAnimation = @_animationsArray[0]
		
	_isEndofChain: (animation = @_currentAnimation) =>
		animation.index is @_animationsArray.length - 1
		
	_next: (animation = @_currentAnimation) =>
		@_animationsArray[animation.index + 1] ? @_animationsArray[0]
	
	start: =>
		if @_currentAnimation?
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
# 	animations:
# 		a: moveDown(purple)
# 		b: flip(purple)
# 		c: moveDown(blue)
# 		d: flip(blue)
# 	repeat: true

# this.chain2 = new AnimationChain
# 	animations:
# 		a: moveDown(teal)
# 		b: flip(teal)
# 		c: moveDown(green)
# 		d: flip(green)
# 	repeat: true




# Execute
# -------------------------------------

chain1.add moveDown(purple)
chain1.add flip(purple)
chain1.add moveDown(blue)
chain1.add flip(blue)
chain1.repeat = true

# chain1.start()
# chain2.start()

