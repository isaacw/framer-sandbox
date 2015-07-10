# Welcome to Framer

# Learn how to prototype: http://framerjs.com/learn
# Drop an image on the device, or import a design from Sketch or Photoshop

iconLayer = new Layer width:256, height:256, image:"images/framer-icon.png"
iconLayer.center()


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



# On a click, go to the next state
# iconLayer.on Events.Click, ->
# 	iconLayer.states.next()