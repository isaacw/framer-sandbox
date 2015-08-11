# Animation Chain
# by Isaac Weinhausen
# http://isaacw.com




{AnimationChain} = require "AnimationChainClass"

# Classes
# -------------------------------------

# AnimationSet
# Manages a group of concurrent Animations
class AnimationSet extends Framer.EventEmitter
	
	constructor: (options = {}) ->
		@_animationsArray = []
		@add(animation) for k, animation of options.animations
		@repeat = options.repeat ? false
			
	add: (animation) =>
		# Ensure the animation is stopped (needed when passed via the layer.animate method)
		animation.stop()
		# Have the animation track its animating state
		animation.isAnimating = false
		# Set event handler		
		animation.on Events.AnimationEnd, =>
			@_animationEndHandler(animation)
		# Add it to the array	
		@_animationsArray.push animation
	
	_animationEndHandler: (animation) =>
		animation.isAnimating = false
		if @allAnimationsComplete()
			if @repeat is false
				# Emit end event for the set
				@emit Events.AnimationEnd
			else
				# Restart animations
				@start()
	
	allAnimationsComplete: =>
		_.all(@_animationsArray, "isAnimating", false)
	
	start: =>
		for animation in @_animationsArray
			animation.start()
			animation.isAnimating = true
		@emit Events.AnimationStart
		
	stop: =>
		for animation in @_animationsArray
			animation.stop()
			animation.isAnimating = false
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

this.group1 = new AnimationSet
	animations:
		a: moveDown(teal)
		b: flip(teal)
		c: moveDown(green)
		d: flip(green)
# 	repeat: true
group1.on Events.AnimationEnd, ->
	print "group1 ended"




# Execute
# -------------------------------------

# chain1.add moveDown(purple)
# chain1.add flip(purple)
# chain1.add moveDown(blue)
# chain1.add flip(blue)
# chain1.repeat = true

# chain1.start()
group1.start()

