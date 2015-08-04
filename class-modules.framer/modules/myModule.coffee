# Add the following line to your project in Framer Studio. 
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar



class exports.Obj
	_secret = "Shhh"
	constructor: ->
		print "new Obj created"
	getSecret: -> _secret
	setSecret: (str) -> _secret = str
	