# Animation Chain
# Manages a sequence of Animations
# 
# by Isaac Weinhausen
# http://isaacw.com


class exports.AnimationChain extends Framer.EventEmitter
	
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



