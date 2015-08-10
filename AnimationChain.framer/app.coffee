# Animation Chain
# by Isaac Weinhausen
# http://isaacw.com




{AnimationChain} = require "AnimationChainClass"

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

chain1.start()
# chain2.start()

